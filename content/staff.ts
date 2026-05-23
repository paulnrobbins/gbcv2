/*
 * Pastoral + ministry staff. Six people.
 *
 * Per Paul's direction: names + titles + emails only, no bios.
 * Circle-crop headshots drop into /public/photos/staff/{slug}.jpg —
 * until then the page renders a tasteful initials placeholder.
 */

export interface StaffMember {
  slug: string;
  name: string;
  title: string;
  email: string;
  /** Optional photo path under /public — initials placeholder until present */
  photoPath?: string;
}

export const staff: StaffMember[] = [
  {
    slug: 'jim-woychuk',
    name: 'Jim Woychuk',
    title: 'Senior Pastor',
    email: 'jim@gbcdayton.org',
  },
  {
    slug: 'david-hobbs',
    name: 'David Hobbs',
    title: 'Pastor of Discipleship & Pastoral Care',
    email: 'dave@gbcdayton.org',
  },
  {
    slug: 'stephen-powell',
    name: 'Stephen Powell',
    title: 'Family Pastor',
    email: 'stephen@gbcdayton.org',
  },
  {
    slug: 'timothy-hostetler',
    name: 'Timothy Hostetler',
    title: 'Worship Leader & Ministry Assistant',
    email: 'timothy@gbcdayton.org',
  },
  {
    slug: 'betty-palmer',
    name: 'Betty Palmer',
    title: 'Office Administrator',
    email: 'betty@gbcdayton.org',
  },
  {
    slug: 'katie-terpstra',
    name: 'Katie Terpstra',
    title: 'Financial Secretary',
    email: 'office@gbcdayton.org',
  },
];
