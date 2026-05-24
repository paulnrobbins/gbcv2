/*
 * Markdown content loader — frontmatter + body for any future .md/.mdx files.
 *
 * Current build doesn't use these helpers (the v2 routes load typed data
 * directly from `content/beliefs.ts`, `content/ministries/ministries.ts`,
 * `content/missionaries/missionaries.ts`, `content/grace-groups/grace-groups.ts`,
 * and `content/staff.ts` — TypeScript editing gives autocomplete + type
 * checking when adding entries). These helpers stay so Paul can drop a
 * `.md` file into `content/pages/` later and pick it up without rewiring.
 *
 * For full MDX rendering, install a current/non-vulnerable MDX renderer
 * (next-mdx-remote v6+, or @next/mdx, or @mdx-js/react) at that point —
 * we deliberately don't ship one preemptively.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export interface ContentFrontmatter {
  title?: string;
  description?: string;
  order?: number;
  [key: string]: unknown;
}

export interface LoadedContent {
  frontmatter: ContentFrontmatter;
  body: string;
  slug: string;
}

export async function loadPage(slug: string): Promise<LoadedContent | null> {
  const candidates = [
    path.join(CONTENT_ROOT, 'pages', `${slug}.mdx`),
    path.join(CONTENT_ROOT, 'pages', `${slug}.md`),
  ];
  for (const file of candidates) {
    try {
      const raw = await fs.readFile(file, 'utf-8');
      const { data, content } = matter(raw);
      return { frontmatter: data as ContentFrontmatter, body: content, slug };
    } catch {
      // try next candidate
    }
  }
  return null;
}

export async function listContent(subdir: string): Promise<LoadedContent[]> {
  const dir = path.join(CONTENT_ROOT, subdir);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const loaded: LoadedContent[] = [];
  for (const entry of entries) {
    if (!entry.endsWith('.md') && !entry.endsWith('.mdx')) continue;
    const slug = entry.replace(/\.(md|mdx)$/, '');
    try {
      const raw = await fs.readFile(path.join(dir, entry), 'utf-8');
      const { data, content } = matter(raw);
      loaded.push({ frontmatter: data as ContentFrontmatter, body: content, slug });
    } catch {
      // skip unreadable files
    }
  }
  loaded.sort((a, b) => {
    const ao = (a.frontmatter.order as number | undefined) ?? 999;
    const bo = (b.frontmatter.order as number | undefined) ?? 999;
    return ao - bo;
  });
  return loaded;
}
