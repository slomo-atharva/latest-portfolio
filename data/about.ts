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

export type AboutExperience = {
  label: string;
  title: string;
  description: string;
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

export const aboutExperience: AboutExperience[] = [
  {
    label: "Now",
    title: "Designing AI and strategic experiences at Gravity One",
    description:
      "Working on product ideas where strategy, user experience, and execution need to come together quickly and clearly.",
  },
  {
    label: "Recent work",
    title: "Government, healthcare, destination, and enterprise products",
    description:
      "Projects include a health policy landscape, national initiatives command view, destination experience system, and business services workflow suite.",
  },
  {
    label: "How I fit in",
    title: "Between product thinking and hands-on interface craft",
    description:
      "I can help with the early messy thinking, the structure behind the product, and the final screen-level detail.",
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
