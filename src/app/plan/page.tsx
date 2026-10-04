import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Icon } from "@/components/icon";
import { TripComposer } from "@/components/trip-composer";
import { DestinationRail } from "@/components/landing/destination-rail";
import { getCurrentUser } from "@/lib/auth";
import { aiMode } from "@/lib/ai/client";

export const metadata: Metadata = {
  title: "Plan a trip — Voyagoa",
  description:
    "Tell Voyagoa your budget, travel dates and preferences. Get a complete AI-generated plan with flights, hotels, food, transport, visa guidance and a day-by-day itinerary.",
};

const INCLUDED = [
  ["flight", "Flights"],
  ["hotel", "Hotels"],
  ["restaurant", "Restaurants"],
  ["map", "Things to do"],
  ["directions_bus", "Local transport"],
  ["verified", "Visa guidance"],
  ["event", "Day-by-day itinerary"],
  ["account_balance_wallet", "Budget breakdown"],
] as const;

export default async function PlanPage() {
  const user = await getCurrentUser();
  const demo = aiMode() === "demo";

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1 overflow-x-clip">
        <section className="relative">
          <div className="blob blob-a" aria-hidden />
          <div className="blob blob-b" aria-hidden />

          <div id="start" className="relative mx-auto w-[min(100%-48px,760px)] scroll-mt-24 pb-20 pt-16 text-center sm:pb-28 sm:pt-24">
            <span className="animate-rise inline-flex rounded-full border border-blue/20 bg-white/70 px-4 py-1.5 text-[0.72rem] font-black tracking-wide text-blue">
              PLAN A TRIP
            </span>
            <h1 className="animate-rise-1 mt-6 font-display text-[2.3rem] leading-[1.05] sm:text-[3.2rem]">
              Where to, and how much
              <br className="hidden sm:block" /> <span className="text-shine">do you want to spend?</span>
            </h1>
            <p className="animate-rise-2 mx-auto mt-5 max-w-[540px] text-[1.05rem] leading-relaxed text-ink-soft">
              Describe your trip in your own words — budget, days, where you&apos;re flying from and what
              you love. Voyagoa only asks a follow-up if something essential is missing.
            </p>

            <div className="animate-rise-2 mt-10 text-left">
              <TripComposer authed={!!user} />
              {demo && (
                <p className="mt-3 text-xs text-ink-faint">
                  Running in demo mode (no OPENAI_API_KEY configured) — plans are sample data.
                </p>
              )}
            </div>

            <ul className="mt-10 flex flex-wrap justify-center gap-2.5" data-reveal-stagger>
              {INCLUDED.map(([icon, label]) => (
                <li
                  key={label}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-[#33435e]"
                >
                  <Icon name={icon} className="icon-pop text-[17px] text-blue" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-[min(100%-48px,1280px)] pb-24 sm:pb-32">
          <div className="mb-10 text-center" data-reveal>
            <span className="text-[0.72rem] font-black tracking-wide text-blue">NEED INSPIRATION?</span>
            <h2 className="mt-2 font-display text-[1.85rem] leading-[1.1] sm:text-[2.25rem]">
              Popular places to start
            </h2>
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <DestinationRail />
          </div>
        </section>
      </main>
    </div>
  );
}
