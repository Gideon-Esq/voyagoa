import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Icon } from "@/components/icon";
import { LinkedInGlyph, SocialRow } from "@/components/landing/social";
import { TeamAvatar } from "@/components/landing/team-avatar";
import { Wave } from "@/components/landing/wave";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the team — Voyagoa",
  description: "The people building Voyagoa, the AI travel planner that turns your budget and dates into a complete trip.",
};

const VALUES = [
  ["account_balance_wallet", "Budget first", "Every plan starts from what you can actually spend — and shows where each dollar goes."],
  ["verified", "Honest by default", "AI estimates are always labeled, and visa guidance links official sources to verify."],
  ["public", "Built for every traveler", "Great planning shouldn’t depend on where you start your journey."],
] as const;

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1 overflow-x-clip">
        {/* Hero */}
        <section className="relative bg-[#eef5ff]">
          <div className="blob blob-a" aria-hidden />
          <div className="blob blob-b" aria-hidden />
          <div className="relative mx-auto w-[min(100%-48px,1100px)] pb-16 pt-20 text-center sm:pb-20 sm:pt-28">
            <span className="animate-rise inline-flex rounded-full border border-blue/20 bg-white/70 px-4 py-1.5 text-[0.72rem] font-black tracking-wide text-blue">
              MEET THE TEAM
            </span>
            <h1 className="animate-rise-1 mx-auto mt-6 max-w-[760px] font-display text-[2.4rem] leading-[1.05] text-navy sm:text-[3.6rem]">
              The people behind <span className="text-shine">Voyagoa</span>
            </h1>
            <p className="animate-rise-2 mx-auto mt-6 max-w-[600px] text-[1.05rem] leading-relaxed text-ink-soft">
              A small team that believes travel planning should be effortless, intelligent and personal —
              so anyone can turn a budget and a few free days into a trip worth taking.
            </p>
          </div>
          <Wave position="bottom" fill="#eef5ff" className="absolute inset-x-0 top-full" />
        </section>

        {/* Team */}
        <section className="mx-auto w-[min(100%-48px,1100px)] pb-24 pt-28 sm:pb-32 sm:pt-36">
          <div className="grid gap-10 md:grid-cols-2" data-reveal-stagger>
            {TEAM.map((m) => (
              <article
                key={m.slug}
                id={m.slug}
                className="lift group relative scroll-mt-28 rounded-[2rem] border border-line bg-white px-7 pb-10 pt-12 text-center shadow-[0_24px_60px_rgba(12,43,97,0.08)] sm:px-10"
              >
                <TeamAvatar src={m.photo} initials={m.initials} name={m.name} size="lg" className={m.avatar} />
                <span className="mt-6 inline-flex min-h-7 items-center rounded-full bg-blue-soft px-4 text-[0.74rem] font-black text-blue">
                  {m.role}
                </span>
                <h2 className="mt-4 font-display text-[1.7rem] text-navy">{m.name}</h2>
                <p className="mt-1 text-[0.9rem] font-bold text-ink-soft">{m.title}</p>
                <p className="mx-auto mt-6 max-w-[420px] text-[0.98rem] leading-relaxed text-[#334560]">{m.bio}</p>

                <ul className="mt-7 flex flex-wrap justify-center gap-2">
                  {m.focus.map((f) => (
                    <li key={f} className="rounded-full border border-line bg-paper-soft px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#33435e]">
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${m.name} on LinkedIn`}
                    className="btn-shine inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0a66c2] px-5 text-[0.86rem] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#08539e]"
                  >
                    <LinkedInGlyph />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue bg-white px-5 text-[0.86rem] font-extrabold text-blue transition hover:-translate-y-0.5 hover:bg-blue-soft"
                  >
                    <Icon name="mail" className="text-[18px]" />
                    {m.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="relative bg-[#eef5ff]">
          <Wave position="top" fill="#eef5ff" className="absolute inset-x-0 bottom-full" />
          <div className="mx-auto w-[min(100%-48px,1100px)] py-24 sm:py-32">
            <div className="text-center" data-reveal>
              <span className="text-[0.72rem] font-black tracking-wide text-blue">WHAT WE BELIEVE</span>
              <h2 className="mt-3 font-display text-[1.9rem] leading-[1.1] text-navy sm:text-[2.4rem]">
                How we build Voyagoa
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3" data-reveal-stagger>
              {VALUES.map(([icon, title, body]) => (
                <article key={title} className="lift group rounded-3xl border border-line bg-white p-8">
                  <span className="icon-pop grid size-14 place-items-center rounded-2xl bg-blue-soft text-blue">
                    <Icon name={icon} className="text-[28px]" />
                  </span>
                  <h3 className="mt-6 text-[1.1rem] font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
                </article>
              ))}
            </div>
          </div>
          <Wave position="bottom" fill="#eef5ff" className="absolute inset-x-0 top-full" />
        </section>

        {/* Contact */}
        <section className="mx-auto w-[min(100%-48px,1100px)] pb-28 pt-32 sm:pb-36 sm:pt-40">
          <article
            data-reveal
            className="grid items-center gap-8 rounded-[2rem] border border-line bg-white px-8 py-10 shadow-[0_24px_60px_rgba(12,43,97,0.08)] sm:px-12 md:grid-cols-[1.3fr_0.7fr]"
          >
            <div>
              <span className="text-[0.72rem] font-black tracking-wide text-blue">CONNECT WITH US</span>
              <h2 className="mt-3 font-display text-[1.6rem] text-navy">Partnership, media, or product questions?</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Whether you have a partnership opportunity, a feature request, or simply want to say hello,
                we’d love to hear from you.
              </p>
            </div>
            <div className="grid justify-items-start gap-4 md:justify-items-end">
              <a href="mailto:ema@voyagoa.com" className="inline-flex items-center gap-2 font-extrabold text-navy hover:text-blue">
                <Icon name="mail" className="text-[18px] text-blue" />
                ema@voyagoa.com
              </a>
              <SocialRow label="Voyagoa social links" />
              <Link href="/plan" className="font-extrabold text-blue hover:underline">
                Plan a trip →
              </Link>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
