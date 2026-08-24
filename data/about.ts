export type AboutFact = {
  label: string;
  value: string;
  detail: string;
};

export type AboutCapability = {
  title: string;
  description: string;
  points: string[];
};

export type AboutEngagement = {
  client: string;
  context?: string;
  description: string;
  metrics?: string[];
};

export type AboutRole = {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  period: string;
  duration: string;
  isCurrent?: boolean;
  engagements: AboutEngagement[];
  skills?: string[];
  sideProject?: {
    name: string;
    description: string;
  };
};

export type AboutPrinciple = {
  id: string;
  title: string;
  description: string;
};

export const aboutIntro = {
  kicker: "About Akshay",
  title: "Making complex products feel simple.",
  lead:
    "I am a product designer working across AI, strategy, information architecture, and interface design.",
  paragraphs: [
    "The simple version: I help teams take messy ideas, dense workflows, and scattered requirements, then turn them into products people can understand and use.",
    "My recent work has sat across government, healthcare, destination operations, executive tooling, and enterprise services. A lot of it comes down to one thing: make the important thing obvious without flattening the product.",
  ],
  current:
    "Currently designing AI and strategic experiences at Gravity One, with a focus on calm systems, useful prototypes, and decision surfaces that help teams move with more confidence.",
};

export const aboutFacts: AboutFact[] = [
  {
    label: "Current focus",
    value: "AI + product UX",
    detail: "Designing useful AI workflows, trust layers, and product systems.",
  },
  {
    label: "Recent domains",
    value: "Gov, health, enterprise",
    detail: "Policy platforms, executive tools, destinations, and service workflows.",
  },
  {
    label: "Core strength",
    value: "Making sense",
    detail: "Turning complexity into structure, hierarchy, and clear next steps.",
  },
];

export const aboutCapabilities: AboutCapability[] = [
  {
    title: "Product and UX strategy",
    description:
      "I help shape what a product should do, who it is really for, and which decisions matter first.",
    points: ["Problem framing", "User journeys", "Product scope"],
  },
  {
    title: "Information architecture",
    description:
      "I organize complicated content, roles, permissions, states, and workflows into simpler product models.",
    points: ["Navigation models", "Content systems", "Role-based flows"],
  },
  {
    title: "Interface and visual systems",
    description:
      "I design polished screens, reusable patterns, and calm UI systems that can scale beyond one presentation.",
    points: ["Design systems", "Executive dashboards", "Interaction states"],
  },
  {
    title: "Prototyping and AI experience",
    description:
      "I use prototypes to make ideas discussable, especially when AI, governance, or complex logic needs to feel understandable.",
    points: ["Clickable prototypes", "AI trust cues", "MVP storytelling"],
  },
];

export const aboutExperience: AboutRole[] = [
  {
    id: "gravity-one",
    title: "Product Designer",
    company: "Gravity One",
    employmentType: "Full-time",
    period: "Jan 2026 — Present",
    duration: "8 months",
    isCurrent: true,
    engagements: [
      {
        client: "Tasama",
        context: "Public Investment Fund, Saudi Arabia",
        description:
          "Multi-persona enterprise execution platform for project, program, portfolio, PMO, and executive teams. Translated fragmented governance, planning, and delivery workflows into role-based workspaces, AI-assisted planning tools, and structured registers.",
      },
      {
        client: "ADEO GPT",
        context: "Abu Dhabi Executive Office",
        description:
          "Secure enterprise AI ecosystem that replaced public LLM use with an air-gapped system. Delivered department-specific GPTs, project workspaces, knowledge-base management, and a verified prompt library.",
        metrics: ["12+ departments", "~400 daily users", "3× response accuracy"],
      },
      {
        client: "Australian Department of Health",
        description:
          "Two-phase national health strategy platform. Designed an interactive landscape model for navigating complex health ecosystems, then an AI-assisted workspace that removed Excel and developer bottlenecks, with human-in-the-loop controls throughout.",
        metrics: ["Content turnaround: 6 months → weeks"],
      },
      {
        client: "Dubai Holding Real Estate",
        description:
          "Performance scorecards and reporting workflows built for C-suite review. Layered navigation gives executives KPI health, initiative tracking, and risk visibility with no onboarding required.",
        metrics: ["10+ subsidiaries"],
      },
      {
        client: "SDZ Orchestrate",
        description:
          "AI-assisted strategy onboarding platform that replaced months of manual consulting. Organisations model their ecosystem, define operating structures, and build strategy foundations through guided AI workflows.",
      },
    ],
    skills: [
      "UX",
      "Product Design",
      "Research",
      "Figma",
      "Artificial Intelligence",
      "Business Analysis",
    ],
    sideProject: {
      name: "NiftyAI",
      description: "Autonomous stock analysis agent.",
    },
  },
  {
    id: "tandemloop-technologies",
    title: "UI UX Designer",
    company: "Tandemloop Technologies",
    employmentType: "Full-time",
    period: "Jan 2024 — Sep 2025",
    duration: "1 year 9 months",
    engagements: [
      {
        client: "StrategyDotZero",
        description:
          "Rebuilt the executive dashboard from a cluttered Power BI layout into a progressive-disclosure interface, so critical metrics, risks, and actions surface on first load.",
        metrics: ["3 enterprise clients migrated in the launch quarter"],
      },
      {
        client: "Curio Capital",
        description:
          "Fractional real estate investment platform for high-net-worth and institutional investors. Delivered digital KYC, real-time portfolio dashboards, and direct investor-to-manager communication.",
        metrics: ["Onboarding: days → under 4 hours"],
      },
      {
        client: "Zone CRM & Minutes of Meeting",
        description:
          "Design improvements across CRM, meeting management, and investment products, focused on usability, workflow optimisation, UI consistency, and feature enhancements.",
      },
    ],
  },
];

export const aboutPrinciples: AboutPrinciple[] = [
  {
    id: "clarity",
    title: "Clarity before decoration",
    description:
      "A screen can look polished and still be confusing. I care most about whether the right thing is easy to understand.",
  },
  {
    id: "system",
    title: "Design the system, not only the screen",
    description:
      "Good product work needs patterns that survive more content, more users, and more edge cases.",
  },
  {
    id: "judgment",
    title: "Use AI with human judgment",
    description:
      "AI can speed up work, but trust, review, and control still need to be visible in the product experience.",
  },
];
