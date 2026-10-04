import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Icon } from "@/components/icon";
import { getCurrentUser } from "@/lib/auth";
import { Faq } from "@/components/landing/faq";
import { DestinationRail } from "@/components/landing/destination-rail";
import { SocialRow } from "@/components/landing/social";
import { TeamAvatar } from "@/components/landing/team-avatar";
import { Wave } from "@/components/landing/wave";
import { CountUp } from "@/components/landing/count-up";
import { TEAM } from "@/lib/team";

/** Page gutter from the design's `.shell`: 1280px max, 32px gutters. */
function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`mx-auto w-[min(100%-48px,1280px)] ${className ?? ""}`}>{children}</div>
  );
}

function CenterHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center">
      <span className="text-[0.68rem] font-black tracking-wide text-blue">{eyebrow}</span>
      <h2 className="mt-2 font-display text-[1.85rem] leading-[1.1] sm:text-[2.25rem]">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-[650px] text-[0.98rem] text-ink-soft">{sub}</p>}
    </div>
  );
}

const HERO_STATS = [
  { to: 18, suffix: " sec", label: "sample trip build" },
  { to: 10, suffix: " days", label: "full itinerary" },
  { to: 2.5, prefix: "$", suffix: "k", decimals: 1, label: "budget tracked" },
] as const;

const RAIL = [
  ["dashboard", "Overview"],
  ["assignment", "Itinerary"],
  ["flight", "Flights"],
  ["hotel", "Hotels"],
  ["map", "Things to Do"],
  ["restaurant", "Food"],
  ["directions_bus", "Transport"],
  ["verified", "Visa"],
  ["account_balance_wallet", "Budget"],
] as const;

/** Accent per tile mirrors the design's nth-of-type colour rules. */
const MINI_STATS = [
  { icon: "flight", title: "Flights", note: "Round trip from Lagos", value: "$850", tone: "text-blue bg-[#eaf2ff]" },
  { icon: "hotel", title: "Hotels", note: "9 nights", value: "$700", tone: "text-blue bg-[#eaf2ff]" },
  { icon: "sunny", title: "Activities", note: "6 experiences", value: "$250", tone: "text-yellow bg-yellow-soft" },
  { icon: "restaurant", title: "Food", note: "Restaurants & dining", value: "$300", tone: "text-yellow bg-yellow-soft" },
  { icon: "train", title: "Transport", note: "Airport transfer & local", value: "$150", tone: "text-teal bg-teal-soft" },
  { icon: "verified_user", title: "Visa Guidance", note: "Tourist visa required", value: "See details", tone: "text-purple bg-purple-soft" },
] as const;

const PROOF = [
  ["auto_fix_high", "Personalized", "AI Plans"],
  ["timer", "Budget-Aware", "Recommendations"],
  ["verified", "Visa", "Guidance"],
  ["checklist", "Smart", "Itineraries"],
  ["public", "Built for Travelers", "Worldwide"],
] as const;

const BUILD_STEPS = [
  "Destination selected: Bali, Indonesia",
  "Flights found",
  "Hotels selected",
  "Attractions planned",
  "Restaurants added",
  "Local transport arranged",
  "Visa information ready",
  "Budget calculated",
  "10-day itinerary created",
];

const FEATURES = [
  { icon: "flight", title: "Smart Flight Finder", body: "Find flight options that align with your schedule and budget.", tone: "text-blue" },
  { icon: "king_bed", title: "Hotel Matching", body: "Recommendations tailored to your travel style and location preferences.", tone: "text-blue" },
  { icon: "bakery_dining", title: "Local Food Discovery", body: "Discover highly rated restaurants, cafes, and local favorites.", tone: "text-yellow" },
  { icon: "verified", title: "Visa Guidance", body: "Understand entry requirements, documents, and official resources before travel.", tone: "text-purple" },
  { icon: "directions_bus", title: "Local Transport", body: "Get practical recommendations for airport transfers, public transit, and getting around.", tone: "text-blue" },
  { icon: "event", title: "Dynamic Itinerary", body: "A personalized day-by-day schedule that adapts when your plans change.", tone: "text-red" },
] as const;

const STEPS = [
  { n: "1", icon: "edit", title: "Tell Us About Your Trip", lines: ["Budget", "Travel dates", "Departure city", 'Destination or "surprise me"', "Travel style"] },
  { n: "2", icon: "auto_awesome", title: "AI Builds Everything", lines: ["Flights", "Hotels", "Restaurants", "Activities", "Transport", "Visa Guidance", "Budget Breakdown"] },
  { n: "3", icon: "work", title: "Travel with Confidence", lines: ["Save your trip", "Share it", "Edit it", "Book it", "Regenerate parts instantly"] },
] as const;

const LEGEND = [
  ["Flights", "$850", "bg-blue"],
  ["Hotels", "$700", "bg-teal"],
  ["Food", "$300", "bg-yellow"],
  ["Activities", "$250", "bg-red"],
  ["Transport", "$150", "bg-purple"],
  ["Buffer", "$250", "bg-[#8cc9ff]"],
] as const;

const DAY4 = [
  ["08:00", "Breakfast by the beach"],
  ["10:00", "Guided island tour"],
  ["13:00", "Seafood lunch"],
  ["15:00", "Relax at the resort"],
  ["18:30", "Sunset cruise"],
  ["21:00", "Rooftop dinner"],
] as const;

const TRADITIONAL = [
  "Search dozens of websites",
  "Compare hundreds of hotels",
  "Build itinerary manually",
  "Estimate your budget",
  "Research visa requirements",
  "Organize everything yourself",
];

const VOYAGOA_WAY = [
  "One AI prompt",
  "Smart recommendations",
  "AI-generated itinerary",
  "Live budget tracking",
  "Built-in visa guidance",
  "One intelligent workspace",
];

const TESTIMONIALS = [
  { initials: "TA", name: "Tosin A.", where: "Lagos, Nigeria", quote: "I planned my entire Italy vacation in under five minutes. It saved me hours of research." },
  { initials: "DM", name: "David M.", where: "London, UK", quote: "The budget tracker kept us on target without sacrificing great experiences. Voyagoa is a game changer." },
  { initials: "PS", name: "Priya S.", where: "Toronto, Canada", quote: "It felt like having a personal travel agent powered by AI. Everything was so well organized." },
];

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        {/* ============================== HERO ============================== */}
        <div className="relative overflow-x-clip">
        <div className="blob blob-a" aria-hidden />
        <div className="blob blob-b" aria-hidden />
        <Shell className="relative grid min-h-[600px] items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.25fr)]" >
          <div id="start">
            <h1 className="animate-rise mb-6 max-w-[530px] font-display text-[2.35rem] leading-none sm:text-[3rem] xl:text-[3.75rem]">
              Your Entire Trip.
              <br />
              <span className="text-shine">Planned by AI.</span>
            </h1>
            <p className="animate-rise-1 mb-8 max-w-[460px] text-[1.05rem] leading-relaxed text-[#263753]">
              Tell Voyagoa your budget, travel dates, and preferences. In seconds, get a
              complete AI-generated travel plan with flights, hotels, restaurants,
              attractions, transport, visa guidance, and a personalized itinerary.
            </p>

            <div className="animate-rise-2 flex max-w-[455px] flex-col gap-3 sm:flex-row">
              <Link
                href="/plan"
                className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue px-7 font-extrabold text-white shadow-[0_12px_28px_rgba(17,103,241,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-dark"
              >
                <Icon name="auto_awesome" className="text-[18px]" />
                Plan My Trip
              </Link>
              <Link
                href="/#how"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-7 font-extrabold text-navy transition hover:-translate-y-0.5 hover:border-blue hover:text-blue"
              >
                See How It Works
              </Link>
            </div>

            <div className="animate-rise-2 mt-10 grid max-w-[455px] gap-3 sm:grid-cols-3">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#dce8fb] bg-white/82 px-3.5 py-3 shadow-[0_10px_28px_rgba(12,43,97,0.07)]"
                >
                  <strong className="block text-base text-navy">
                    <CountUp
                      to={stat.to}
                      prefix={"prefix" in stat ? stat.prefix : ""}
                      suffix={stat.suffix}
                      decimals={"decimals" in stat ? stat.decimals : 0}
                    />
                  </strong>
                  <span className="block text-[0.68rem] font-semibold text-ink-soft">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product mock — decorative */}
          <div className="relative hidden min-h-[505px] items-center justify-center lg:flex" aria-hidden>
            <div
              className="absolute inset-y-0 bottom-3 left-[6%] right-[min(-24px,calc((1280px-100vw)/2))] rounded-br-[110px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.75), rgba(255,255,255,0.02) 40%), url('/assets/hero-scene.jpg') center / cover no-repeat",
                filter: "saturate(1.05)",
              }}
            />

            <div className="animate-float relative grid w-[min(100%,680px)] grid-cols-[122px_1fr] overflow-hidden rounded-2xl border border-line/95 bg-white/94 shadow-[0_20px_55px_rgba(12,43,97,0.13)]">
              <aside className="flex flex-col gap-1.5 border-r border-[#e5ecf8] bg-white/90 px-2.5 pb-3.5 pt-5">
                <div className="mb-1.5 flex gap-1.5">
                  <span className="grid size-8 place-items-center rounded-2xl bg-white text-[#21345a] shadow-[0_6px_18px_rgba(10,22,51,0.09)]">
                    <Icon name="chevron_left" className="text-sm" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-2xl bg-white text-[#21345a] shadow-[0_6px_18px_rgba(10,22,51,0.09)]">
                    <Icon name="search" className="text-sm" />
                  </span>
                </div>
                {RAIL.map(([icon, label], i) => (
                  <span
                    key={label}
                    className={`flex min-h-[30px] items-center gap-2 rounded-lg px-2.5 text-[0.69rem] font-bold ${
                      i === 0 ? "bg-blue text-white" : "text-[#4d5a71]"
                    }`}
                  >
                    <Icon name={icon} className="text-sm" />
                    {label}
                  </span>
                ))}
              </aside>

              <div className="px-6 pb-5 pt-6">
                <div className="mb-5">
                  <strong className="block text-base">Your Trip to Bali, Indonesia</strong>
                  <span className="text-[0.77rem] text-ink-soft">10 Days - Budget $2,500</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <article className="relative col-span-2 min-h-[132px] rounded-2xl border border-[#e3ebf7] bg-white py-4 pl-4 pr-28 shadow-[0_8px_20px_rgba(10,22,51,0.05)]">
                    <span className="text-[0.75rem] text-ink-soft">Total Budget</span>
                    <strong className="mb-4 mt-1 block text-[1.75rem]">$2,500</strong>
                    <div className="mb-1.5 h-[5px] overflow-hidden rounded-full bg-[#dce7fb]">
                      <span className="block h-full w-[90%] bg-green" />
                    </div>
                    <small className="font-semibold text-green">$2,250 of $2,500</small>
                    <div className="mini-ring absolute right-5 top-4 grid size-[76px] place-items-center rounded-full text-[0.86rem] font-black">
                      90%
                    </div>
                  </article>

                  <article className="overflow-hidden rounded-2xl border border-[#e3ebf7] bg-white shadow-[0_8px_20px_rgba(10,22,51,0.05)]">
                    <div className="relative h-[88px] w-full">
                      <Image src="/assets/bali-preview.jpg" alt="" fill className="object-cover" sizes="200px" />
                    </div>
                    <div className="p-3">
                      <strong className="mb-2 block text-[0.84rem]">Bali, Indonesia</strong>
                      <span className="my-0.5 flex items-center gap-1.5 text-[0.67rem] text-ink-soft">
                        <Icon name="sunny" className="text-[13px] text-yellow" /> 28°C
                      </span>
                      <span className="my-0.5 flex items-center gap-1.5 text-[0.67rem] text-ink-soft">
                        <Icon name="partly_cloudy_day" className="text-[13px] text-yellow" /> Perfect time to visit
                      </span>
                    </div>
                  </article>

                  {MINI_STATS.map((s) => (
                    <article
                      key={s.title}
                      className="grid min-h-[88px] grid-cols-[42px_1fr] content-start gap-x-2 rounded-2xl border border-[#e3ebf7] bg-white p-3.5 shadow-[0_8px_20px_rgba(10,22,51,0.05)]"
                    >
                      <span className={`row-span-3 grid size-9 place-items-center rounded-full ${s.tone}`}>
                        <Icon name={s.icon} className="text-[20px]" />
                      </span>
                      <strong className="text-[0.78rem]">{s.title}</strong>
                      <small className="text-[0.62rem] text-ink-soft">{s.note}</small>
                      <b className="text-[0.69rem] text-blue-dark">{s.value}</b>
                    </article>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-5">
                  <span className="text-[0.7rem] text-ink-soft">Next: Review your itinerary</span>
                  <span className="inline-flex min-h-[38px] items-center gap-2 rounded-2xl bg-blue px-5 text-[0.84rem] font-extrabold text-white">
                    View Itinerary
                    <Icon name="arrow_forward" className="text-[17px]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Shell>
        </div>

        {/* =========================== PROOF STRIP ========================== */}
        <Shell className="grid grid-cols-2 gap-x-4 gap-y-8 pb-24 pt-6 sm:grid-cols-3 sm:pb-32 lg:grid-cols-5" data-reveal-stagger>
          {PROOF.map(([icon, a, b]) => (
            <div key={a} className="group flex items-center justify-start gap-2.5 text-[0.76rem] font-extrabold leading-tight text-navy sm:justify-center">
              <Icon name={icon} className="icon-pop shrink-0 text-2xl text-blue-dark" />
              <span>
                {a}
                <br />
                {b}
              </span>
            </div>
          ))}
        </Shell>

        {/* ============================= AI AT WORK ========================= */}
        <section className="relative">
          <Wave position="top" fill="#eef5ff" />
          <div className="bg-[#eef5ff] py-16 sm:py-24">
          <Shell className="grid min-h-[210px] items-center gap-8 lg:grid-cols-[0.9fr_0.82fr_40px_1.52fr]">
            <div data-reveal>
              <span className="inline-flex min-h-[22px] items-center rounded-lg border border-[#92b9ff] bg-white/70 px-3.5 text-[0.68rem] font-black text-navy">
                AI AT WORK
              </span>
              <h2 className="mb-4 mt-4 max-w-[330px] font-display text-[2rem] leading-[1.08]">
                From your request to the perfect trip.
              </h2>
              <p className="max-w-[310px] text-[0.9rem] text-[#394965]">
                Voyagoa&apos;s AI analyzes millions of data points to craft a personalized
                journey that fits your budget, style, and dreams.
              </p>
            </div>

            <article data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="min-h-[150px] rounded-2xl bg-white p-6 shadow-[0_18px_45px_rgba(12,43,97,0.08)]">
              <strong className="mb-4 block text-[0.84rem]">Your Request</strong>
              <p className="text-[0.98rem]">
                I have $2,500 and 10 days. Flying from Lagos. I love beaches and nightlife.
              </p>
            </article>

            <Icon name="chevron_right" className="nudge hidden justify-self-center text-2xl text-blue lg:block" />

            <article data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties} className="rounded-2xl bg-white px-7 py-5 shadow-[0_18px_45px_rgba(12,43,97,0.08)]">
              <strong className="mb-4 block text-[0.84rem]">Voyagoa is building your trip...</strong>
              <ul className="ai-sequence mb-4 grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-8">
                {BUILD_STEPS.map((step) => (
                  <li key={step} className="flex items-center gap-2 text-[0.72rem]">
                    <Icon
                      name="check"
                      className="shrink-0 rounded-full bg-green p-0.5 text-[16px] text-white"
                    />
                    {step}
                  </li>
                ))}
              </ul>
              <span className="text-[0.84rem] font-black">Trip ready in 18 seconds</span>
            </article>
          </Shell>
          </div>
          <Wave position="bottom" fill="#eef5ff" />
        </section>

        {/* ============================= FEATURES =========================== */}
        <Shell className="scroll-mt-20 pb-24 pt-28 sm:pb-36 sm:pt-40">
          <div id="features" className="scroll-mt-24" data-reveal>
            <CenterHeading eyebrow="EVERYTHING YOU NEED" title="Everything you need for the perfect trip" />
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" data-reveal-stagger>
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="lift group flex min-h-[175px] flex-col items-center justify-center rounded-2xl border border-line bg-white px-4 py-8 text-center"
              >
                <Icon name={f.icon} className={`icon-pop mb-5 text-[38px] ${f.tone}`} />
                <h3 className="mb-2 text-[0.88rem] font-bold">{f.title}</h3>
                <p className="text-[0.78rem] text-[#30435d]">{f.body}</p>
              </article>
            ))}
          </div>
        </Shell>

        {/* =========================== HOW IT WORKS ========================= */}
        <Shell className="pb-24 sm:pb-36">
          <div id="how" className="scroll-mt-24" data-reveal>
            <CenterHeading eyebrow="HOW IT WORKS" title="Three simple steps to your next adventure" />
          </div>
          <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_44px_1fr_44px_1fr]" data-reveal>
            {STEPS.map((step, i) => (
              <div key={step.n} className="contents">
                <article className="lift group relative grid min-h-[190px] grid-cols-[36px_1fr] gap-3 overflow-hidden rounded-3xl border border-transparent bg-[#f4f8ff] p-7 sm:grid-cols-[36px_1fr_62px]">
                  <span className="grid size-[30px] place-items-center rounded-full border border-blue bg-white font-black text-blue">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-[0.88rem] font-bold">{step.title}</h3>
                    <p className="text-[0.76rem] leading-relaxed">
                      {step.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>
                  <Icon
                    name={step.icon}
                    className="icon-pop absolute bottom-4 right-4 grid size-[54px] place-items-center rounded-full bg-[#dfeaff] p-3.5 text-2xl text-blue opacity-55 sm:static sm:self-end sm:opacity-100"
                  />
                </article>
                {i < STEPS.length - 1 && (
                  <Icon name="arrow_right_alt" className="nudge hidden justify-self-center text-2xl text-blue lg:block" />
                )}
              </div>
            ))}
          </div>
        </Shell>

        {/* ==================== BUDGET + ITINERARY PANELS =================== */}
        <Shell className="pb-24 sm:pb-36">
          <div
            data-reveal
            id="budget"
            className="grid scroll-mt-24 overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_24px_60px_rgba(12,43,97,0.06)] lg:grid-cols-2"
          >
            <article className="min-h-[310px] border-b border-line p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <span className="text-[0.68rem] font-black text-blue">SMART BUDGET TRACKER</span>
              <h2 className="mb-6 font-display text-[1.55rem] leading-[1.08]">
                Every dollar has a purpose
              </h2>
              <p className="mb-2 text-ink-soft">Total Budget</p>
              <strong className="mb-3 block text-[1.75rem]"><CountUp to={2500} prefix="$" /></strong>
              <small className="mb-2 block text-ink-soft">$2,250 of $2,500 estimated</small>
              <div className="mt-5 grid items-center gap-7 sm:grid-cols-[150px_1fr]">
                <div
                  className="donut grid size-[150px] place-items-center justify-self-center rounded-full"
                  aria-label="90 percent of budget planned"
                >
                  <span className="text-[1.38rem] font-black">90%</span>
                </div>
                <ul className="grid w-full gap-2.5 text-[0.83rem] text-[#243550]">
                  {LEGEND.map(([label, amount, dot]) => (
                    <li key={label} className="grid grid-cols-[12px_1fr_auto] items-center gap-2.5">
                      <span className={`size-2.5 rounded-full ${dot}`} />
                      {label}
                      <b>{amount}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article id="itinerary" className="min-h-[310px] scroll-mt-24 p-8 sm:p-10">
              <span className="text-[0.68rem] font-black text-blue">DYNAMIC ITINERARY PREVIEW</span>
              <h2 className="mb-6 font-display text-[1.55rem] leading-[1.08]">Day 4 - Explore Bali</h2>
              <div className="grid gap-6 sm:grid-cols-[1fr_168px]">
                <ol className="timeline-draw relative grid gap-3 pl-5 before:absolute before:bottom-2 before:left-1 before:top-2 before:w-0.5 before:bg-blue">
                  {DAY4.map(([time, what]) => (
                    <li
                      key={time}
                      className="relative grid grid-cols-[56px_1fr] items-start gap-2.5 text-[0.82rem] before:absolute before:-left-5 before:top-1.5 before:size-2.5 before:rounded-full before:bg-blue"
                    >
                      <time className="font-bold">{time}</time>
                      <span>{what}</span>
                    </li>
                  ))}
                </ol>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
                  {["dest-bali.jpg", "bali-preview.jpg", "hero-scene.jpg"].map((file, i) => (
                    <div key={file} className="group relative h-[72px] w-full overflow-hidden rounded-xl">
                      <Image
                        src={`/assets/${file}`}
                        alt={`Bali scene ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="168px"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/plan"
                className="mt-3 inline-flex min-h-9 items-center rounded-2xl border border-blue bg-white px-4 text-[0.82rem] font-extrabold text-blue transition hover:-translate-y-px hover:bg-blue-soft"
              >
                Regenerate Day
              </Link>
            </article>
          </div>
        </Shell>

        {/* =========================== DESTINATIONS ========================= */}
        <Shell className="pb-24 sm:pb-36">
          <div id="destinations" className="mb-14 scroll-mt-24" data-reveal>
            <CenterHeading eyebrow="POPULAR DESTINATIONS" title="Inspiration for your next journey" />
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <DestinationRail />
          </div>
        </Shell>

        {/* ============================ COMPARISON ========================== */}
        <Shell className="pb-24 sm:pb-36">
          <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_24px_60px_rgba(12,43,97,0.06)] lg:grid-cols-[1.05fr_0.95fr]">
            <article className="p-8 sm:p-10">
              <h2 className="mb-4 font-display text-[1.6rem] leading-[1.08]">
                Why travelers choose Voyagoa
              </h2>
              <div className="grid items-center gap-4 sm:grid-cols-[1fr_42px_1fr]">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 rounded-lg bg-[#f4f7fb] px-2.5 py-2 text-[0.8rem] font-bold">
                    <Icon name="content_paste" className="text-sm text-ink-soft" />
                    Traditional Planning
                  </h3>
                  <ul className="grid gap-2.5">
                    {TRADITIONAL.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-[0.72rem]">
                        <Icon name="close" className="shrink-0 rounded-full bg-red p-0.5 text-[16px] text-white" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <strong className="justify-self-center text-navy">VS</strong>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 rounded-lg bg-[#f4f7fb] px-2.5 py-2 text-[0.8rem] font-bold">
                    <Icon name="smart_toy" className="text-sm text-ink-soft" />
                    Voyagoa
                  </h3>
                  <ul className="grid gap-2.5">
                    {VOYAGOA_WAY.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-[0.72rem]">
                        <Icon name="check" className="shrink-0 rounded-full bg-green p-0.5 text-[16px] text-white" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="relative min-h-[276px] overflow-hidden text-[#071631]">
              <Image
                src="/assets/traveler.png"
                alt="Traveler with arms outstretched facing a mountain lake"
                fill
                className="kenburns object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(236,245,255,0.86),rgba(236,245,255,0.05))]" />
              <div className="absolute left-10 top-16 z-10 max-w-[260px] [&_p]:mt-3">
                <h2 className="font-display text-[1.72rem] leading-[1.08]">
                  Less planning.
                  <br />
                  More exploring.
                </h2>
                <p className="text-[0.88rem] text-[#334560]">
                  Voyagoa handles the details so you can focus on making unforgettable
                  memories.
                </p>
              </div>
            </article>
          </div>
        </Shell>

        {/* =========================== TESTIMONIALS ======================== */}
        <Shell className="pb-24 sm:pb-36">
          <div data-reveal>
            <CenterHeading eyebrow="TRUSTED BY TRAVELERS" title="Real travelers. Real stories." />
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3" data-reveal-stagger>
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="lift relative min-h-[132px] overflow-hidden rounded-3xl border border-line bg-white px-7 py-7"
              >
                <span aria-hidden className="pointer-events-none absolute -right-1 -top-6 font-display text-[7rem] leading-none text-blue/[0.07]">&rdquo;</span>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#b87558,#2d6cdf)] text-[0.7rem] font-black text-white">
                    {t.initials}
                  </span>
                  <div>
                    <strong className="block text-[0.82rem]">{t.name}</strong>
                    <small className="block text-[0.7rem] text-ink-soft">{t.where}</small>
                  </div>
                </div>
                <p className="mb-4 text-[0.92rem] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-[0.9rem] text-yellow" aria-label="Five stars">
                  ★ ★ ★ ★ ★
                </div>
              </article>
            ))}
          </div>
        </Shell>

        {/* ============================== TEAM ============================= */}
        <Shell className="pb-24 sm:pb-36">
          <div id="team" className="scroll-mt-24" data-reveal>
            <CenterHeading
              eyebrow="MEET THE TEAM"
              title="Meet the people behind Voyagoa"
              sub="Voyagoa was built by people who believe travel planning should be effortless, intelligent, and personalized."
            />
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2" data-reveal-stagger>
            {TEAM.map((m) => (
              <Link
                key={m.slug}
                href={`/team#${m.slug}`}
                className="lift group block rounded-3xl border border-line bg-white px-6 pb-8 pt-10 text-center shadow-[0_18px_42px_rgba(12,43,97,0.06)]"
              >
                <TeamAvatar src={m.photo} initials={m.initials} name={m.name} className={m.avatar} />
                <span className="mt-5 inline-flex min-h-6 items-center rounded-full bg-blue-soft px-3 text-[0.72rem] font-black text-blue">
                  {m.role}
                </span>
                <h3 className="mt-3 font-display text-[1.2rem] text-navy">{m.name}</h3>
                <p className="mt-1 text-[0.82rem] font-bold text-ink-soft">{m.title}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[0.84rem] font-extrabold text-blue">
                  View profile
                  <Icon name="arrow_forward" className="text-[17px] transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center" data-reveal>
            <Link
              href="/team"
              className="btn-shine inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-7 text-[0.92rem] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-ink"
            >
              Meet the whole team
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>

          <article data-reveal className="mt-24 grid items-center gap-8 rounded-[2rem] border border-line bg-white px-8 py-10 shadow-[0_18px_42px_rgba(12,43,97,0.08)] sm:px-12 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <span className="text-[0.68rem] font-black text-blue">CONNECT WITH US</span>
              <h3 className="mb-2 mt-1 font-display text-[1.35rem]">
                Partnership, media, or product questions?
              </h3>
              <p className="text-ink-soft">
                Whether you have a partnership opportunity, feature request, or simply want
                to say hello, the Voyagoa team would love to hear from you.
              </p>
            </div>
            <div className="grid justify-items-start gap-3 md:justify-items-end">
              <a
                href="mailto:ema@voyagoa.com"
                className="inline-flex items-center gap-2 text-[0.9rem] font-extrabold text-navy"
              >
                <Icon name="mail" className="text-[17px] text-blue" />
                ema@voyagoa.com
              </a>
              <a
                href="https://www.voyagoa.com"
                className="inline-flex items-center gap-2 text-[0.9rem] font-extrabold text-navy"
              >
                <Icon name="language" className="text-[17px] text-blue" />
                www.voyagoa.com
              </a>
              <SocialRow label="Voyagoa social links" />
            </div>
          </article>
        </Shell>

        {/* =========================== FAQ + CTA =========================== */}
        <Shell className="grid gap-10 pb-28 sm:pb-40 lg:grid-cols-2" data-reveal-stagger>
          <article id="faqs" className="min-h-[262px] scroll-mt-24 rounded-[2rem] border border-line bg-white px-8 py-9 sm:px-10">
            <span className="text-[0.68rem] font-black text-blue">FAQS</span>
            <h2 className="mb-6 mt-2 font-display text-[1.5rem] leading-[1.08]">
              Frequently asked questions
            </h2>
            <Faq />
          </article>

          <article className="relative grid min-h-[300px] place-items-center overflow-hidden rounded-[2rem] bg-navy text-center text-white">
            <Image
              src="/assets/cta-bg.jpg"
              alt=""
              fill
              className="slow-zoom object-cover opacity-[0.58]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,16,34,0.62),rgba(4,16,34,0.92))]" />
            <div className="relative z-10 w-[min(100%-48px,520px)] py-8">
              <h2 className="font-display text-[1.8rem] leading-[1.08]">
                Ready for Your Next Adventure?
              </h2>
              <p className="mx-auto mb-5 mt-3.5 max-w-[390px] text-[0.9rem] text-white/[0.88]">
                Stop juggling dozens of travel websites. Tell Voyagoa your budget, and let
                AI handle the planning.
              </p>
              <div className="mb-3 flex flex-col justify-center gap-3.5 sm:flex-row">
                <Link
                  href="/plan"
                  className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue px-7 font-extrabold text-white shadow-[0_12px_28px_rgba(17,103,241,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-dark"
                >
                  <Icon name="auto_awesome" className="text-[17px]" />
                  Plan My Trip
                </Link>
                <Link
                  href={user ? "/trips" : "/register"}
                  className="inline-flex min-h-12 min-w-[156px] items-center justify-center rounded-full border border-white/75 bg-white/[0.04] px-6 font-extrabold text-white transition hover:-translate-y-px hover:bg-white/10"
                >
                  {user ? "My Trips" : "See a Demo"}
                </Link>
              </div>
              <small className="text-[0.75rem] text-white/[0.72]">
                No credit card required. Free to try.
              </small>
            </div>
          </article>
        </Shell>
      </main>
    </div>
  );
}
