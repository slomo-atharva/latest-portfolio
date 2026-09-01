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

export type ComingSoonProject = {
  id: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  scope: string[];
  tone: ProjectTone;
  availability: "comingSoon";
};

export type ShowcaseProject =
  | (SelectedProject & { availability: "active" })
  | ComingSoonProject;

export const selectedProjects: SelectedProject[] = [
  {
    id: "strategy-dot-zero-change-impact",
    title: "Change impact workspace",
    client: "Strategy Dot Zero",
    category: "Enterprise strategy platform",
    year: "1-week sprint",
    summary:
      "A connected workflow for defining organisational change, preparing affected groups, tracking actions, and seeing impact across a portfolio.",
    role: "Product design, workflow architecture, interaction design",
    scope: ["Impact profile", "Action tracking", "PMO impact map"],
    highlights: ["Change-centred model", "Cross-project visibility"],
    tone: "mint",
    logo: {
      src: "/client-logos/strategy-dot-zero.svg",
      width: 86,
      height: 16,
      className: "h-9 w-[12.1rem] sm:h-10 sm:w-[13.5rem]",
    },
  },
  {
    id: "strategy-dot-zero-ai-project-extraction",
    title: "AI project extraction",
    client: "Strategy Dot Zero",
    category: "AI onboarding workflow",
    year: "2026",
    summary:
      "An agent that turns the documents a new client already keeps into structured, reviewable projects inside the platform.",
    role: "Product design, AI workflow design, information architecture",
    scope: ["Guided extraction", "Review and readiness", "Register handoff"],
    highlights: ["Human-in-the-loop by design", "Migration at portfolio scale"],
    tone: "violet",
    logo: {
      src: "/client-logos/strategy-dot-zero.svg",
      width: 86,
      height: 16,
      className: "h-9 w-[12.1rem] sm:h-10 sm:w-[13.5rem]",
    },
  },
  {
    id: "strategy-dot-zero-dependency-module",
    title: "Dependency module",
    client: "Strategy Dot Zero",
    category: "Portfolio management",
    year: "2026",
    summary:
      "A two-sided workflow for requesting, agreeing, and tracking what one project needs from another.",
    role: "Product design, workflow architecture, interaction design",
    scope: ["Get and Give registers", "Approval workflow", "Live dependency status"],
    highlights: ["Two-sided agreement", "Status from real reporting"],
    tone: "rose",
    logo: {
      src: "/client-logos/strategy-dot-zero.svg",
      width: 86,
      height: 16,
      className: "h-9 w-[12.1rem] sm:h-10 sm:w-[13.5rem]",
    },
  },
  {
    id: "strategy-dot-zero-kpi-management-module",
    title: "KPI management module",
    client: "Strategy Dot Zero",
    category: "Performance management",
    year: "2026",
    summary:
      "A governed workflow for defining a KPI, computing its status from a baselined measure, and reporting it every interval — owned end to end by the PMO.",
    role: "Product design, workflow architecture, information architecture",
    scope: ["KPI registers", "KPI profile", "Interval tracking"],
    highlights: ["Single-owner model", "Alignment spine"],
    tone: "rose",
    logo: {
      src: "/client-logos/strategy-dot-zero.svg",
      width: 86,
      height: 16,
      className: "h-9 w-[12.1rem] sm:h-10 sm:w-[13.5rem]",
    },
  },
  {
    id: "dhda-service-journeys",
    title: "Interactive Health Landscape",
    client: "Australian Department of Health",
    category: "Health policy platform",
    year: "2025",
    summary:
      "A two-sided platform for exploring a national health ecosystem and governing the data that powers the visual landscape.",
    role: "Lead Product Designer, UX strategy, information architecture",
    scope: ["Explore Landscape", "PMO Management Hub", "AI Trust Layer"],
    highlights: ["Ontology-led UX", "Governed AI publishing"],
    tone: "blue",
    logo: {
      src: "/client-logos/australian-government-dhda.svg",
      width: 263,
      height: 42,
      className: "h-8 w-[12.25rem] sm:h-9 sm:w-[13.5rem]",
    },
  },
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

const selectedProjectsById = new Map(
  selectedProjects.map((project) => [project.id, project]),
);

function getSelectedProject(id: SelectedProject["id"]) {
  const project = selectedProjectsById.get(id);

  if (!project) {
    throw new Error(`Missing selected project: ${id}`);
  }

  return project;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    ...getSelectedProject("strategy-dot-zero-change-impact"),
    availability: "active",
  },
  {
    ...getSelectedProject("dhda-service-journeys"),
    availability: "active",
  },
  {
    ...getSelectedProject("strategy-dot-zero-ai-project-extraction"),
    availability: "active",
  },
  {
    ...getSelectedProject("strategy-dot-zero-dependency-module"),
    availability: "active",
  },
  {
    id: "strategy-dot-zero-planning-proposal-agents",
    title: "Project planning & proposal agents",
    client: "Strategy Dot Zero",
    category: "AI workflow",
    summary:
      "AI-assisted planning and proposal generation for turning early inputs into a stronger starting point.",
    scope: ["Project planning", "Proposal generation", "AI agents"],
    tone: "blue",
    availability: "comingSoon",
  },
  {
    ...getSelectedProject("strategy-dot-zero-kpi-management-module"),
    availability: "active",
  },
  {
    id: "strategy-dot-zero-risk-benefits-modules",
    title: "Risk & benefits modules",
    client: "Strategy Dot Zero",
    category: "Portfolio governance",
    summary:
      "Bringing risk and benefit signals into the project flow so leaders can make better-informed decisions.",
    scope: ["Risk management", "Benefits", "Governance"],
    tone: "mint",
    availability: "comingSoon",
  },
  {
    id: "strategy-dot-zero-budget-tracking-module",
    title: "Project budget & tracking module",
    client: "Strategy Dot Zero",
    category: "Project controls",
    summary:
      "A connected view of budget, delivery status, and the signals teams need to keep work on track.",
    scope: ["Budget tracking", "Project controls", "Delivery status"],
    tone: "blue",
    availability: "comingSoon",
  },
];
