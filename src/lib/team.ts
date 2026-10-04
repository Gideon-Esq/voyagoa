/**
 * The Voyagoa team, shared by the homepage preview and /team.
 * Photos are self-hosted: drop a square headshot at `photo` and it appears;
 * until then the card falls back to initials.
 */
export const TEAM = [
  {
    slug: "ema",
    initials: "EK",
    name: "Ema Kings",
    role: "Founder",
    title: "Founder & Product Visionary",
    email: "ema@voyagoa.com",
    linkedin: "https://www.linkedin.com/in/emmanuel-o-adelani-b6099a3a7/",
    photo: "/assets/team/ema.png",
    avatar: "bg-[linear-gradient(135deg,rgba(17,103,241,0.92),rgba(16,185,129,0.82))]",
    bio: "Ema founded Voyagoa with a simple mission: make world-class travel planning accessible to everyone through AI. From product vision to user experience, Ema focuses on turning one prompt into a complete travel plan.",
    focus: ["Product vision", "User experience", "Partnerships"],
  },
  {
    slug: "gideon",
    initials: "G",
    name: "Gideon",
    role: "Lead Developer",
    title: "Lead Software Engineer & AI Systems Developer",
    email: "gideon@voyagoa.com",
    linkedin: "https://www.linkedin.com/in/ayooluwa-gideon-oloyede-a85028290/",
    photo: "/assets/team/gideon.png",
    avatar: "bg-[linear-gradient(135deg,rgba(103,87,232,0.94),rgba(34,184,199,0.82))]",
    bio: "Gideon leads the engineering behind Voyagoa, transforming ambitious product ideas into a fast, reliable, and scalable AI platform across web and mobile experiences.",
    focus: ["AI systems", "Platform engineering", "Web & mobile"],
  },
] as const;

export type TeamMember = (typeof TEAM)[number];
