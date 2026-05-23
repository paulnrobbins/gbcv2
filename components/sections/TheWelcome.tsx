/*
 * Scene 2 — The Welcome
 *
 * Phase 3: transparent background — Bible cover opens behind the content.
 * Display headline pulled verbatim from the sign outside the actual GBC
 * building. Photo billboard pins to the right column.
 *
 * Tier-aware: in low-tier / reduced-motion, this becomes a flat editorial
 * layout — content positioning still works in both modes.
 */
import Image from 'next/image';

export function TheWelcome() {
  return (
    <section
      data-scene="welcome"
      aria-label="You are welcome here"
      className="
        relative min-h-screen flex items-center
        px-[var(--gutter)]
        py-[var(--section-gap)]
      "
    >
      {/* Soft bone field — non-blocking, just lifts contrast where text lives */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, var(--bone) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 lg:col-span-7">
          <h2 className="display text-display-xl text-ink leading-[1.02]">
            You are<br />welcome here.
          </h2>
          <p className="mt-8 text-body-lg text-ink/80 max-w-xl leading-relaxed">
            Whether you came for the music, the coffee in the lobby, the question you
            haven&rsquo;t been able to shake, or because someone you trust said come — you
            don&rsquo;t have to know what to do with any of that. Walk in. Sit anywhere.
            Stay for as much or as little as feels right.
          </p>
        </div>

        <figure className="md:col-span-5 lg:col-span-5 relative aspect-[4/5] bg-bone-warm overflow-hidden">
          <Image
            src="/photos/church/GBC-0085.jpg"
            alt="Grace Bible Church congregation gathered in the sanctuary"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw"
            priority
          />
          <div className="absolute inset-0 mix-blend-overlay" style={{ background: 'rgba(200, 150, 74, 0.10)' }} />
        </figure>
      </div>
    </section>
  );
}
