export type ProjectTone = "violet" | "blue" | "mint" | "rose";

export type SelectedProject = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  scope: string[];
  highlights: string[];
  tone: ProjectTone;
  logo: {
    src: string;
    width: number;
    height: number;
    className: string;
  };
};

export const selectedProjects: SelectedProject[] = [
  {
    id: "dubai-holding-destination-system",
    title: "Destination experience system",
    client: "Dubai Holding",
    category: "Experience strategy",
    year: "2025",
    summary:
      "A polished operating layer for complex destination moments, helping teams see journeys, priorities, and handoffs with less noise.",
    role: "Product strategy, service UX, interface direction",
    scope: ["Journey mapping", "Dashboard UX", "Design system"],
    highlights: ["Multi-team workflows", "Guest experience signals"],
    tone: "violet",
    logo: {
      src: "/client-logos/dubai-holding.avif",
      width: 251,
      height: 172,
      className: "h-16 w-[7.5rem] sm:h-[4.75rem] sm:w-[8.75rem]",
    },
  },
  {
    id: "dhda-service-journeys",
    title: "Accessible service journeys",
    client: "Australian Government DHDA",
    category: "Public service UX",
    year: "2024",
    summary:
      "A clearer service flow for high-trust government interactions, built around plain language, accessibility, and structured decisions.",
    role: "UX systems, content structure, interaction design",
    scope: ["Accessibility", "Forms UX", "Content hierarchy"],
    highlights: ["WCAG-aware flows", "Decision support"],
    tone: "blue",
    logo: {
      src: "/client-logos/australian-government-dhda.svg",
      width: 263,
      height: 42,
      className: "h-8 w-[12.25rem] sm:h-9 sm:w-[13.5rem]",
    },
  },
  {
    id: "national-projects-command-view",
    title: "National initiatives command view",
    client: "Presidential Court and National Projects Office",
    category: "Executive tooling",
    year: "2024",
    summary:
      "A composed decision surface for initiative tracking, designed to make progress, ownership, and next actions easier to scan.",
    role: "Information architecture, visual systems, prototyping",
    scope: ["Command view", "Status models", "Executive UI"],
    highlights: ["Portfolio visibility", "Calm escalation paths"],
    tone: "rose",
    logo: {
      src: "/client-logos/presidential-court-national-projects-office.webp",
      width: 864,
      height: 242,
      className: "h-12 w-[13.25rem] sm:h-14 sm:w-[15rem]",
    },
  },
  {
    id: "tasama-workflow-suite",
    title: "Business services workflow suite",
    client: "Tasama Business Services",
    category: "Enterprise product",
    year: "2023",
    summary:
      "A modular workflow experience for service teams, balancing operational density with clean, low-friction interaction patterns.",
    role: "Product UX, component patterns, motion polish",
    scope: ["Workflow design", "Component library", "Interaction states"],
    highlights: ["Repeatable patterns", "Dense operational views"],
    tone: "mint",
    logo: {
      src: "/client-logos/tasama-business-services.webp",
      width: 1113,
      height: 234,
      className: "h-10 w-[13.25rem] sm:h-11 sm:w-[15rem]",
    },
  },
];
