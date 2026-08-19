import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleDot,
  FileText,
  Layers3,
  ListChecks,
  Maximize2,
  Network,
  Route,
  Search,
  ShieldCheck,
  Sparkle,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  type CaseStudy,
  type CaseStudyMedia,
} from "@/data/case-studies";
import { heroCopy } from "@/data/hero";
import {
  projectToneStyles,
  type ProjectToneStyle,
} from "@/lib/project-tones";
import { CaseStudyNavigator } from "./case-study-navigator";

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
};

type VisualWeight = "high" | "medium" | "low";
type PersonaType = "primary" | "secondary" | "admin" | "executive";
type AnnotationType = "design_intent" | "user_value";
type ImpactCategory = "user" | "business" | "team";

type PersonaCard = {
  personaName: string;
  type: PersonaType;
  goals: string[];
  painPoints: string[];
  designImplication: string;
};

type ProcessStep = {
  stepName: string;
  oneLineDescription: string;
};

type SynthesisRow = {
  need: string;
  painPoint: string;
  designOpportunity: string;
};

type DecisionBlock = {
  title: string;
  problem: string;
  designChoice: string;
  whyItWorked: string;
  resultTradeoff: string;
};

type SolutionScreen = {
  screenName: string;
  media: CaseStudyMedia[];
  annotations: {
    type: AnnotationType;
    text: string;
  }[];
};

type ImpactMetricCard = {
  value: string;
  label: string;
  category: ImpactCategory;
};

type StructuredCaseStudy = {
  hero: {
    client: string;
    domain: string;
    impact: string;
    projectTitle: string;
    valueProposition: string;
    role: string;
    timeline: string;
    team: string;
    users: string;
    platform: string;
    visualPlatform: string;
    visualRole: string;
    visualTimeline: string;
    impactMetrics: string[];
  };
  context: {
    whoItsFor: string;
    businessPosition: string;
    modules: string[];
    moduleDescriptions: string[];
  };
  problem: {
    beforeState: string;
    painPoints: string[];
    whyItMattered: string;
  };
  users: {
    personas: PersonaCard[];
  };
  approach: {
    owned: string[];
    collaboratedOn: string[];
    constraints: string[];
    processSteps: ProcessStep[];
  };
  research: {
    methods: string[];
    synthesis: SynthesisRow[];
  };
  ia: {
    sitemapOrModel: string[];
    rolePermissionMap: PersonaCard[];
    iaBeforeAfter: {
      beforeTitle: string;
      beforeItems: string[];
      afterTitle: string;
      afterItems: string[];
    };
  };
  decisions: DecisionBlock[];
  solution: {
    screens: SolutionScreen[];
  };
  impact: {
    metrics: ImpactMetricCard[];
    qualitativeEvidence: string[];
  };
  reflection: {
    whatILearned: string;
    whatIdImprove: string;
    howApproachChanged: string;
  };
};

type SectionSpec = {
  id:
    | "hero"
    | "context"
    | "problem"
    | "users"
    | "approach"
    | "research"
    | "ia"
    | "decisions"
    | "solution"
    | "impact"
    | "reflection";
  name: string;
  intent: string;
  weight: VisualWeight;
};

const sectionSpecs: SectionSpec[] = [
  {
    id: "hero",
    name: "Hero",
    intent: "Make the project understandable in 10 seconds.",
    weight: "high",
  },
  {
    id: "context",
    name: "Context",
    intent: "Explain what the product is, without jargon.",
    weight: "medium",
  },
  {
    id: "problem",
    name: "Problem",
    intent: "Show the real product problem, not just the UI task.",
    weight: "high",
  },
  {
    id: "users",
    name: "Users & Needs",
    intent: "Prove multi-persona thinking.",
    weight: "medium",
  },
  {
    id: "approach",
    name: "Approach",
    intent: "Role, constraints, and process kept compact.",
    weight: "low",
  },
  {
    id: "research",
    name: "Research",
    intent: "Show how the domain and workflow were understood.",
    weight: "medium",
  },
  {
    id: "ia",
    name: "Information Architecture",
    intent: "Show how the product/system was structured.",
    weight: "medium",
  },
  {
    id: "decisions",
    name: "Key Decisions",
    intent: "Show thinking, not just screens.",
    weight: "high",
  },
  {
    id: "solution",
    name: "Final Solution",
    intent: "Show polished screens with focused annotations.",
    weight: "high",
  },
  {
    id: "impact",
    name: "Impact",
    intent: "Connect design to outcomes.",
    weight: "high",
  },
  {
    id: "reflection",
    name: "Reflection",
    intent: "Show maturity and self-awareness.",
    weight: "low",
  },
];

const collaborationByProject: Record<string, string[]> = {
  "strategy-dot-zero-change-impact": [
    "Product and business stakeholder alignment",
    "Design manager review and iteration",
    "Project manager and PMO workflow validation",
  ],
  "dubai-holding-destination-system": [
    "Operations alignment",
    "Partner handoff model",
    "Leadership review language",
  ],
  "dhda-service-journeys": [
    "GravityONE, Scyne, and department stakeholder alignment",
    "Policy team, analyst, and executive workshops",
    "Ontology, AI, and governance model alignment",
  ],
  "national-projects-command-view": [
    "Executive review rituals",
    "Program owner input",
    "Escalation workflow shaping",
  ],
  "tasama-workflow-suite": [
    "Service team workflows",
    "Component system handoff",
    "Operational state refinement",
  ],
};

const constraintsByProject: Record<string, string[]> = {
  "strategy-dot-zero-change-impact": [
    "One-week delivery window",
    "Legacy MVC product constraints",
    "Multi-persona permissions and views",
    "Business pressure for a business-unit-first model",
  ],
  "dubai-holding-destination-system": [
    "Sensitive operational context",
    "Multi-team ownership",
    "Leadership scanability",
  ],
  "dhda-service-journeys": [
    "High-consequence government health context",
    "Complex ontology fixed before interface design",
    "Verified source material and AI-generated insight in one product",
    "Compressed concept-to-MVP delivery timeline",
  ],
  "national-projects-command-view": [
    "Executive attention span",
    "Status and risk clarity",
    "Accountability across owners",
  ],
  "tasama-workflow-suite": [
    "Dense daily usage",
    "Repeatable service tasks",
    "Consistent interaction states",
  ],
};

const platformByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact":
    "Web, enterprise planning and PMO oversight",
  "dubai-holding-destination-system": "Web, destination operations",
  "dhda-service-journeys": "Web, Explore and PMO management hub",
  "national-projects-command-view": "Web, executive command view",
  "tasama-workflow-suite": "Web, enterprise workflow",
};

const domainByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact":
    "Portfolio governance, organisational change, enterprise planning",
  "dhda-service-journeys": "Healthcare, policy systems, enterprise AI",
};

const timelineByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact": "One-week design sprint",
  "dhda-service-journeys": "Concept pitch to MVP roadmap",
};

const visualRoleByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact":
    "Product Designer for PMO and executive product experiences",
  "dhda-service-journeys":
    "Lead design strategy, product UX, information architecture, UX/UI",
};

const visualPlatformByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact":
    "Web, project planning and organisation-wide impact oversight",
  "dhda-service-journeys": "Web, visual exploration layer and management hub",
};

const heroImpactByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact":
    "A static register became a connected workflow for assessment, readiness, reporting, and portfolio visibility.",
  "dhda-service-journeys": "MVP demonstrated to senior government executives",
};

const productModelDescriptionsByProject: Record<string, string[]> = {
  "strategy-dot-zero-change-impact": [
    "Define the change, linked deliverables, impact level, and expected period.",
    "Plan stakeholder readiness, then track actions through recurring updates.",
    "Compare project impacts across business units, months, and reporting states.",
  ],
  "dhda-service-journeys": [
    "Public-facing visual model for exploring systems, cohorts, domains, and pressures.",
    "PMO-facing workspace for creating, previewing, approving, and publishing domain data.",
    "Visible provenance layer separating verified source content from reviewed AI drafts.",
  ],
};

const researchMethodsByProject: Record<string, string[]> = {
  "strategy-dot-zero-change-impact": [
    "Existing workflow audit",
    "PRD synthesis",
    "Relationship mapping",
    "Business review",
    "User validation",
    "Rapid interaction prototyping",
  ],
  "dhda-service-journeys": [
    "Stakeholder workshops",
    "User story mapping",
    "Domain relationship audit",
    "Ontology alignment",
    "AI trust model",
    "PRD authoring",
  ],
};

const iaModelByProject: Record<string, string[]> = {
  "strategy-dot-zero-change-impact": [
    "Project deliverable",
    "Named organisational change",
    "Impacted stakeholders and timing",
    "Change actions, owners, and dates",
    "Organisation-wide impact map",
  ],
  "dhda-service-journeys": [
    "Operating Environment",
    "Operating Model",
    "Core Health System",
    "Cohorts and Determinants",
    "Global Health",
    "Health Domains",
  ],
};

const impactMetricsByProject: Record<string, ImpactMetricCard[]> = {
  "strategy-dot-zero-change-impact": [
    {
      value: "1 week",
      label: "from initial framing through iteration and final approval",
      category: "team",
    },
    {
      value: "4",
      label: "connected views from change assessment to enterprise oversight",
      category: "business",
    },
    {
      value: "3",
      label: "clear reporting states for action and overall change health",
      category: "user",
    },
  ],
  "dhda-service-journeys": [
    {
      value: "3",
      label: "platform sections scoped and designed end-to-end",
      category: "team",
    },
    {
      value: "4",
      label: "interconnected systems translated into the product model",
      category: "business",
    },
    {
      value: "9+",
      label: "population cohorts mapped across the landscape",
      category: "user",
    },
    {
      value: "MVP",
      label: "demonstrated to senior government executives",
      category: "business",
    },
  ],
};

const reflectionDetailsByProject: Record<
  string,
  Pick<
    StructuredCaseStudy["reflection"],
    "whatIdImprove" | "howApproachChanged"
  >
> = {
  "strategy-dot-zero-change-impact": {
    whatIdImprove:
      "I would test the impact and action timelines with a larger set of portfolio managers using denser, real-world project data. That is where overlap, filtering, and exception handling become most demanding.",
    howApproachChanged:
      "I now look for the object that carries meaning across personas before I design the screens. Here, the change connected project planning, stakeholder readiness, reporting, and executive oversight far better than a business unit could.",
  },
  "dhda-service-journeys": {
    whatIdImprove:
      "I would bring version history, source confidence, and audit trail interactions into the earliest prototypes, because governance is part of the user experience in this kind of product.",
    howApproachChanged:
      "I now start complex system products by finding the durable information model first. Once that structure is clear, screens become a way to reveal the system rather than decorate it.",
  },
};

const personasByProject: Record<string, PersonaCard[]> = {
  "strategy-dot-zero-change-impact": [
    {
      personaName: "Project and program managers",
      type: "primary",
      goals: [
        "Explain the organisational change created by a project",
        "Prepare affected groups and keep actions moving",
      ],
      painPoints: [
        "The old record ended after data entry",
        "Impact, timing, actions, and reporting were disconnected",
      ],
      designImplication:
        "The project workflow needed one clear progression from assessment to action and reporting, without feeling like a full change-management system.",
    },
    {
      personaName: "PMO and change teams",
      type: "admin",
      goals: [
        "Compare change pressure across projects and business units",
        "Review action health and intervene where support is needed",
      ],
      painPoints: [
        "Individual project records did not reveal cumulative impact",
        "Static registers were poor at showing timing and overlap",
      ],
      designImplication:
        "The PMO experience needed both a visual timeline for pattern recognition and a register for verification and governance.",
    },
    {
      personaName: "Executive reviewers",
      type: "executive",
      goals: [
        "Understand where organisational pressure is building",
        "See whether project teams are preparing affected groups",
      ],
      painPoints: [
        "Operational detail obscured the portfolio-level signal",
        "Impact status lacked an accountable response plan",
      ],
      designImplication:
        "The summary layer had to reveal severity, timing, and status first, with project detail available only when a follow-up was needed.",
    },
  ],
  "dubai-holding-destination-system": [
    {
      personaName: "Destination operations team",
      type: "primary",
      goals: ["See journey health", "Act on priority signals"],
      painPoints: ["Signals were visible but not comparable"],
      designImplication:
        "The interface needed a shared grammar for scanning journey moments side by side.",
    },
    {
      personaName: "Partner and service teams",
      type: "secondary",
      goals: ["Understand ownership", "Move issues to the right next action"],
      painPoints: ["Ownership was easy to lose"],
      designImplication:
        "Status, owner, and next step had to appear together instead of living in separate places.",
    },
    {
      personaName: "Leadership reviewers",
      type: "executive",
      goals: ["Read risk quickly", "Spot where attention is needed"],
      painPoints: ["Leadership needed less noise"],
      designImplication:
        "The summary layer had to be calm enough for executive review while preserving depth.",
    },
  ],
  "dhda-service-journeys": [
    {
      personaName: "Senior policymakers and executives",
      type: "executive",
      goals: [
        "Explore the health ecosystem at a strategic level",
        "Trust what the product shows before using it in decision conversations",
      ],
      painPoints: [
        "Policy information was fragmented across reports and teams",
        "AI-generated insight needed visible provenance and limits",
      ],
      designImplication:
        "The first layer needed to feel like a clear map, with source confidence and drill-down available when the conversation demanded evidence.",
    },
    {
      personaName: "Policy analysts and department users",
      type: "primary",
      goals: [
        "Move from a system overview into cohorts, domains, and pressures",
        "Understand relationships that are difficult to see in static documents",
      ],
      painPoints: [
        "Relationships between systems were invisible",
        "Context was difficult to maintain across levels of detail",
      ],
      designImplication:
        "The Explore flow had to preserve orientation while moving from system of systems to cohort, domain, pressure, and impact.",
    },
    {
      personaName: "PMO managers and domain owners",
      type: "admin",
      goals: [
        "Populate and maintain domain content safely",
        "Preview, verify, approve, and publish only governed information",
      ],
      painPoints: [
        "Content creation, ownership, and approval needed a controlled workflow",
        "The management experience could not leak complexity into Explore",
      ],
      designImplication:
        "The Manage hub needed a separate operating model with roles, entry methods, preview, approval, and publishing states.",
    },
  ],
  "national-projects-command-view": [
    {
      personaName: "Executive reviewers",
      type: "executive",
      goals: ["Understand portfolio movement", "Ask the first useful follow-up question"],
      painPoints: ["Every metric wanted attention"],
      designImplication:
        "The page needed a selective first layer that made exceptions easy to see.",
    },
    {
      personaName: "Initiative owners",
      type: "primary",
      goals: ["Clarify progress", "Connect blockers to accountable next action"],
      painPoints: ["Ownership was visible too late"],
      designImplication:
        "Every concern needed owner context before deeper supporting material.",
    },
    {
      personaName: "Program office administrators",
      type: "admin",
      goals: ["Maintain status consistency", "Prepare review-ready updates"],
      painPoints: ["Status did not explain momentum"],
      designImplication:
        "Progress, risk, urgency, and confidence needed separate treatments.",
    },
  ],
  "tasama-workflow-suite": [
    {
      personaName: "Service agents",
      type: "primary",
      goals: ["Process work quickly", "Return to the queue without losing context"],
      painPoints: ["Queues needed sharper hierarchy"],
      designImplication:
        "Rows and task details needed stable positions for priority, status, and action cues.",
    },
    {
      personaName: "Team leads",
      type: "secondary",
      goals: ["Review exceptions", "Understand handoffs across services"],
      painPoints: ["Task details were too one-off"],
      designImplication:
        "Repeated work patterns needed one recognizable structure across modules.",
    },
    {
      personaName: "Product administrators",
      type: "admin",
      goals: ["Extend workflows", "Keep interface states consistent"],
      painPoints: ["States needed more polish"],
      designImplication:
        "Loading, empty, disabled, focus, and completion states had to feel systematic.",
    },
  ],
};

const fieldLabelText: Record<string, string> = {
  annotations: "Annotations",
  before_state: "Before state",
  business_position: "Business position",
  collaborated_on: "Collaborated on",
  constraints: "Constraints",
  design_choice: "Design choice",
  design_implication: "Design implication",
  design_opportunity: "Design opportunity",
  design_intent: "Design intent",
  evidence: "Evidence",
  goals: "Goals",
  ia_before_after: "IA before and after",
  metrics: "Metrics",
  methods: "Methods",
  modules: "Modules",
  need: "Need",
  owned: "Owned",
  pain_point: "Pain point",
  pain_points: "Pain points",
  problem: "Problem",
  process_steps: "Process steps",
  qualitative_evidence: "Qualitative evidence",
  result_tradeoff: "Result and tradeoff",
  role_permission_map: "Role and permission map",
  sitemap_or_model: "Sitemap or model",
  user_value: "User value",
  what_i_learned: "What I learned",
  what_id_improve: "What I would improve",
  who_its_for: "Who it's for",
  why_it_mattered: "Why it mattered",
  why_it_worked: "Why it worked",
  how_approach_changed: "How the approach changed",
};

const caseCardChrome =
  "rounded-[8px] border border-[var(--case-line)] bg-[var(--case-surface)] shadow-[var(--case-shadow-soft)]";
const caseInsetChrome =
  "rounded-[8px] border border-[var(--case-line-soft)] bg-[var(--case-surface-muted)]";
const caseEyebrow =
  "text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)]";
const caseFineRule = "border-[var(--case-line-soft)]";

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const structured = buildStructuredCaseStudy(caseStudy);
  const { project } = caseStudy;
  const tone = projectToneStyles[project.tone];

  return (
    <main className="case-study-scroll-experience bg-[var(--case-paper)] text-[var(--case-ink)]">
      <CaseStudyHeader />
      <HeroSection caseStudy={caseStudy} structured={structured} tone={tone} />

      <div className="px-5 pb-16 sm:px-8 sm:pb-20 xl:px-8 2xl:px-10">
        <div className="mx-auto grid max-w-[92rem] gap-10 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-0 2xl:grid-cols-[15rem_minmax(0,1fr)]">
          <CaseStudyNavigator sectionSpecs={sectionSpecs} />

          <div className="min-w-0 xl:px-8 2xl:px-10">
            <ContextSection structured={structured} />
            <ProblemSection structured={structured} tone={tone} />
            <UsersSection structured={structured} tone={tone} />
            <ApproachSection structured={structured} tone={tone} />
            <ResearchSection structured={structured} tone={tone} />
            <InformationArchitectureSection structured={structured} tone={tone} />
            <DecisionSection structured={structured} tone={tone} />
            <SolutionSection structured={structured} tone={tone} />
            <ImpactSection structured={structured} tone={tone} />
            <ReflectionSection structured={structured} tone={tone} />
            <CaseStudyClose />
          </div>
        </div>
      </div>
    </main>
  );
}

function buildStructuredCaseStudy(caseStudy: CaseStudy): StructuredCaseStudy {
  const { project } = caseStudy;
  const personas = personasByProject[project.id] ?? [];
  const processSteps = caseStudy.process.slice(0, 6).map((step) => ({
    stepName: step.title,
    oneLineDescription: step.description,
  }));
  const reflectionDetails = reflectionDetailsByProject[project.id];
  const researchMethods =
    researchMethodsByProject[project.id] ??
    processSteps.map((step) => step.stepName);

  return {
    hero: {
      client: project.client,
      domain: domainByProject[project.id] ?? "",
      impact: heroImpactByProject[project.id] ?? "",
      projectTitle: project.title,
      valueProposition: caseStudy.headline,
      role: project.role,
      timeline: timelineByProject[project.id] ?? project.year,
      team: "",
      users: personas.map((persona) => persona.personaName).join(", "),
      platform: platformByProject[project.id] ?? "",
      visualPlatform:
        visualPlatformByProject[project.id] ?? platformByProject[project.id] ?? "",
      visualRole: visualRoleByProject[project.id] ?? project.role,
      visualTimeline: project.year,
      impactMetrics: caseStudy.snapshot
        .slice(0, 4)
        .map((item) => `${item.label}: ${item.value}`),
    },
    context: {
      whoItsFor: project.summary,
      businessPosition: caseStudy.deck,
      modules: project.scope,
      moduleDescriptions: productModelDescriptionsByProject[project.id] ?? [],
    },
    problem: {
      beforeState: caseStudy.problem,
      painPoints: caseStudy.frictions.map(
        (friction) => `${friction.title}. ${friction.description}`,
      ),
      whyItMattered: caseStudy.outcome,
    },
    users: {
      personas,
    },
    approach: {
      owned: project.role.split(", ").slice(0, 6),
      collaboratedOn: collaborationByProject[project.id] ?? [],
      constraints: constraintsByProject[project.id] ?? [],
      processSteps,
    },
    research: {
      methods: researchMethods,
      synthesis: caseStudy.frictions.map((friction, index) => ({
        need: friction.title,
        painPoint: friction.description,
        designOpportunity:
          caseStudy.decisions[index]?.decision ?? caseStudy.outcome,
      })),
    },
    ia: {
      sitemapOrModel: iaModelByProject[project.id] ?? project.scope,
      rolePermissionMap: personas,
      iaBeforeAfter: caseStudy.beforeAfter,
    },
    decisions: caseStudy.decisions.slice(0, 4).map((decision) => ({
      title: decision.issue,
      problem: decision.issue,
      designChoice: decision.decision,
      whyItWorked: decision.result,
      resultTradeoff:
        decision.tradeoff ??
        "The first read stayed focused, while deeper context remained available for review.",
    })),
    solution: {
      screens: caseStudy.finalMoments.slice(0, 6).map((moment) => ({
        screenName: moment.title,
        media: moment.media ?? [],
        annotations: [
          {
            type: "design_intent" as const,
            text: moment.description,
          },
          {
            type: "user_value" as const,
            text: `Focus area: ${moment.tags.join(", ")}`,
          },
        ].slice(0, 3),
      })),
    },
    impact: {
      metrics: impactMetricsByProject[project.id] ?? [],
      qualitativeEvidence: caseStudy.impact.map(
        (item) => `${item.label}: ${item.value}`,
      ),
    },
    reflection: {
      whatILearned: caseStudy.reflection,
      whatIdImprove: reflectionDetails?.whatIdImprove ?? "",
      howApproachChanged: reflectionDetails?.howApproachChanged ?? "",
    },
  };
}

function CaseStudyHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--case-line)] bg-[rgb(251_252_254_/_0.86)] px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            aria-label="Go to portfolio home"
            className="inline-flex items-center transition duration-300 hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)]"
            href="/#top"
          >
            <Image
              alt={heroCopy.logoAlt}
              className="h-8 w-auto sm:h-9"
              height={490}
              loading="eager"
              priority
              src="/aa-logo.svg"
              width={682}
            />
          </Link>

          <Link
            className="group inline-flex h-9 items-center gap-1.5 rounded-[6px] px-1 text-sm font-medium leading-none text-[var(--case-ink-soft)] transition duration-300 hover:-translate-x-0.5 hover:text-[var(--case-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)]"
            href="/#top"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition duration-300 group-hover:-translate-x-0.5"
              strokeWidth={2.3}
            />
            Home
          </Link>
        </div>

        <nav aria-label="Case study navigation" className="flex items-center gap-4">
          <Link
            className="hidden h-9 items-center rounded-[6px] px-1 text-sm font-medium leading-none text-[var(--case-ink-soft)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--case-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)] sm:inline-flex"
            href="/#work"
          >
            Work
          </Link>
          <Link
            className="inline-flex h-9 items-center rounded-[6px] px-1 text-sm font-medium leading-none text-[var(--case-ink-soft)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--case-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)]"
            href="#footer"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HeroSection({
  caseStudy,
  structured,
  tone,
}: {
  caseStudy: CaseStudy;
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  const { project } = caseStudy;

  return (
    <section
      className="case-study-snap-section relative isolate overflow-hidden border-b border-[var(--case-line)] bg-[var(--case-paper)] px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-12"
      id="hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(253_253_255_/_0.94),rgb(251_252_254_/_0.96)_52%,rgb(245_247_250_/_0.68))]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(20rem,0.52fr)] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
              <span>Case study</span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${tone.softFill}`}
              />
              <span>{project.category}</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[var(--case-line)]"
              />
              <span>{project.year}</span>
            </div>

            <p className="mt-7 max-w-4xl text-2xl font-medium leading-tight tracking-normal text-[var(--case-ink)] sm:text-3xl">
              {structured.hero.client}
            </p>

            <h1 className="mt-4 max-w-5xl text-5xl font-medium leading-[1.03] tracking-normal text-[var(--case-ink)] sm:text-6xl lg:text-7xl">
              {structured.hero.projectTitle}
            </h1>

            <p className="mt-8 max-w-3xl text-lg font-light leading-8 text-[var(--case-ink-soft)] sm:text-xl sm:leading-9">
              {structured.hero.valueProposition}
            </p>
          </div>

          <aside className={`${caseCardChrome} relative isolate overflow-hidden p-0`}>
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-1 ${tone.softFill}`}
            />
            <div className="flex items-start justify-between gap-5 border-b border-[var(--case-line-soft)] bg-[var(--case-surface-muted)] p-5 sm:p-6">
              <div>
                <p className={caseEyebrow}>Project brief</p>
                <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                  A compact read for role, scope, and context.
                </p>
              </div>
              <div className="grid h-16 w-44 max-w-[42vw] shrink-0 place-items-center overflow-hidden rounded-[8px] border border-[var(--case-line)] bg-[var(--case-surface)] px-3 py-2">
                <Image
                  alt={`${project.client} logo`}
                  className="block h-auto max-h-10 w-full object-contain mix-blend-multiply"
                  height={project.logo.height}
                  priority
                  sizes="144px"
                  src={project.logo.src}
                  width={project.logo.width}
                />
              </div>
            </div>

            <div className="divide-y divide-[var(--case-line-soft)] px-5 sm:px-6">
              <HeroBriefRow label="Role" value={structured.hero.role} />
              <HeroBriefRow label="Timeline" value={structured.hero.timeline} />
              <HeroBriefRow label="Platform" value={structured.hero.platform} />
              <HeroBriefRow label="Client" value={structured.hero.client} />
              <HeroBriefRow label="Domain" value={structured.hero.domain} />
            </div>

            {structured.hero.impact ? (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className={`border-l-2 bg-[var(--case-surface-muted)] py-4 pl-4 pr-4 ${tone.border}`}>
                  <p className={`text-[0.68rem] font-medium uppercase tracking-normal ${tone.accentText}`}>
                    Outcome signal
                  </p>
                  <p className="mt-3 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                    {structured.hero.impact}
                  </p>
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        <div className="mt-10 sm:mt-12">
          <HeroVisual caseStudy={caseStudy} structured={structured} tone={tone} />
        </div>
      </div>
    </section>
  );
}

function HeroBriefRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "NOT SUPPLIED YET") return null;
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
      <p className="text-[0.65rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
        {label}
      </p>
      <p className="text-sm font-light leading-6 text-[var(--case-ink)]">
        {value}
      </p>
    </div>
  );
}

function HeroVisual({
  caseStudy,
  structured,
  tone,
}: {
  caseStudy: CaseStudy;
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  const { project } = caseStudy;
  const hasImpact = Boolean(structured.hero.impact);

  if (caseStudy.heroMedia) {
    return (
      <ProductScreenHero
        caseStudy={caseStudy}
        media={caseStudy.heroMedia}
        structured={structured}
        tone={tone}
      />
    );
  }

  return (
    <div className={`${caseCardChrome} relative isolate overflow-hidden`}>
      <div className="grid gap-0 lg:grid-cols-[0.35fr_0.65fr]">
        <aside className="border-b border-[var(--case-line)] bg-[var(--case-surface-muted)] p-6 lg:border-b-0 lg:border-r">
          <Image
            alt={`${project.client} logo`}
            className={`max-w-full object-contain mix-blend-multiply ${project.logo.className}`}
            height={project.logo.height}
            priority
            sizes="(min-width: 1024px) 240px, 190px"
            src={project.logo.src}
            width={project.logo.width}
          />

          <div className="mt-8 flex items-center gap-2">
            <Sparkle
              aria-hidden="true"
              className={`h-4 w-4 ${tone.accentText}`}
              strokeWidth={2.35}
            />
            <p className={caseEyebrow}>Signals</p>
          </div>

          <div className="mt-4 divide-y divide-[var(--case-line-soft)] border-y border-[var(--case-line-soft)]">
            {structured.hero.impactMetrics.map((metric, index) => (
              <div
                className="grid grid-cols-[2rem_1fr] gap-3 py-4"
                key={metric}
              >
                <p className={`text-xs font-medium ${index === 0 ? tone.accentText : "text-[var(--case-muted)]"}`}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                  {metric}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--case-line-soft)] pb-4">
            <div className="flex items-center gap-3">
              <Route
                aria-hidden="true"
                className={`h-4 w-4 ${tone.accentText}`}
                strokeWidth={2.35}
              />
              <p className={caseEyebrow}>
                Product model
              </p>
            </div>
            <span className={`h-2 w-2 rounded-full ${tone.softFill}`} />
          </div>

          <div className="mt-6 grid gap-0 divide-y divide-[var(--case-line-soft)] border-y border-[var(--case-line-soft)]">
            {structured.context.modules.map((module, index) => (
              <div
                className="grid gap-4 py-4 sm:grid-cols-[2.75rem_minmax(0,1fr)]"
                key={module}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full border text-xs font-medium ${
                    index === 1
                      ? `${tone.softFill} ${tone.accentText} ${tone.border}`
                      : "border-[var(--case-line)] bg-[var(--case-surface)] text-[var(--case-muted)]"
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium leading-6 text-[var(--case-ink)]">
                    {module}
                  </p>
                  <p className="mt-1 text-xs font-light leading-5 text-[var(--case-ink-soft)]">
                    {structured.context.moduleDescriptions[index] ??
                      (index === 0
                        ? "Entry layer"
                        : index === 1
                          ? "Core decision layer"
                          : "System support layer")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-6 grid gap-5 ${
              hasImpact ? "sm:grid-cols-4" : "sm:grid-cols-3"
            }`}
          >
            <div>
              <p className={caseEyebrow}>Role</p>
              <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                {structured.hero.visualRole}
              </p>
            </div>
            <div>
              <p className={caseEyebrow}>Timeline</p>
              <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                {structured.hero.visualTimeline}
              </p>
            </div>
            <div>
              <p className={caseEyebrow}>Platform</p>
              <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                {structured.hero.visualPlatform}
              </p>
            </div>
            {hasImpact ? (
              <div>
                <p className={caseEyebrow}>Impact</p>
                <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                  {structured.hero.impact}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductScreenHero({
  caseStudy,
  media,
  structured,
  tone,
}: {
  caseStudy: CaseStudy;
  media: CaseStudyMedia;
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <article className={`${caseCardChrome} overflow-hidden`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-8 w-8 place-items-center rounded-[6px] border ${tone.softFill} ${tone.accentText} ${tone.border}`}
          >
            <Route aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
          </span>
          <div>
            <p className={caseEyebrow}>Product workspace</p>
            <p className="mt-1 text-sm font-medium text-[var(--case-ink)]">
              {media.label ?? caseStudy.project.title}
            </p>
          </div>
        </div>
        <p className="text-xs font-light text-[var(--case-muted)]">
          Final approved direction
        </p>
      </div>

      <div className={`border-y border-[var(--case-line)] p-2 sm:p-4 ${tone.canvas}`}>
        <div className="overflow-hidden rounded-[7px] border border-[rgb(255_255_255_/_0.78)] bg-[var(--case-surface)] shadow-[0_20px_50px_rgb(24_32_43_/_0.14)]">
          <a
            aria-label={`Open ${media.label ?? "product screen"} at full size`}
            className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2"
            href={media.src}
            rel="noreferrer"
            target="_blank"
            title="Open full-size screen"
          >
            <Image
              alt={media.alt}
              className="block h-auto w-full"
              height={media.height}
              priority
              sizes="(min-width: 1440px) 1240px, (min-width: 768px) 92vw, 96vw"
              src={media.src}
              width={media.width}
            />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[7px] border border-[rgb(223_227_232_/_0.9)] bg-[rgb(253_253_255_/_0.9)] text-[var(--case-ink)] opacity-100 shadow-[0_10px_26px_rgb(24_32_43_/_0.12)] backdrop-blur-sm transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              <Maximize2 aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
        <div className="border-b border-[var(--case-line-soft)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className={caseEyebrow}>Connected product model</p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {structured.context.modules.map((module, index) => (
              <li
                className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3"
                key={module}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-medium ${
                    index === 0
                      ? `${tone.softFill} ${tone.accentText} ${tone.border}`
                      : "border-[var(--case-line)] bg-[var(--case-surface-muted)] text-[var(--case-muted)]"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-sm font-medium leading-5 text-[var(--case-ink)]">
                  {module}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-5 sm:p-6">
          <p className={`text-[0.68rem] font-medium uppercase tracking-normal ${tone.accentText}`}>
            What changed
          </p>
          <p className="mt-3 text-sm font-light leading-7 text-[var(--case-ink-soft)]">
            {structured.hero.impact}
          </p>
        </div>
      </div>
    </article>
  );
}



function ContextSection({ structured }: { structured: StructuredCaseStudy }) {
  return (
    <SectionShell spec={sectionSpecs[1]}>
      <div className="grid gap-5 lg:grid-cols-2">
        <NarrativePanel
          eyebrow="who_its_for"
          title="Who the product serves"
          value={structured.context.whoItsFor}
        />
        <NarrativePanel
          eyebrow="business_position"
          title="Where it sits"
          value={structured.context.businessPosition}
        />
      </div>

      <div className="mt-8 rounded-[8px] border border-[var(--case-line)] bg-[var(--case-surface)] p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Layers3
            aria-hidden="true"
            className="h-4 w-4 text-[var(--blue)]"
            strokeWidth={2.35}
          />
          <p className={caseEyebrow}>
            <FieldName value="modules" />
          </p>
        </div>
        <ul className="mt-5 grid gap-0 divide-y divide-[var(--case-line-soft)] border-y border-[var(--case-line-soft)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {structured.context.modules.map((module) => (
            <li
              className="px-0 py-4 text-sm font-medium leading-6 text-[var(--case-ink)] sm:px-4 sm:first:pl-0"
              key={module}
            >
              {module}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

function ProblemSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[2]}>
      <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr]">
        <NarrativePanel
          eyebrow="before_state"
          title="What existed before"
          value={structured.problem.beforeState}
          strong
        />

        <div>
          <div className="flex items-center gap-2">
          <ListChecks
            aria-hidden="true"
            className={`h-4 w-4 ${tone.accentText}`}
            strokeWidth={2.35}
          />
            <p className={caseEyebrow}>
              <FieldName value="pain_points" />
            </p>
          </div>
          <ul className="mt-6 grid gap-4">
            {structured.problem.painPoints.map((painPoint, index) => (
              <li
                className={`${caseCardChrome} p-5 sm:grid sm:grid-cols-[3rem_1fr] sm:gap-4 sm:p-6`}
                key={painPoint}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border text-base font-medium ${tone.softFill} ${tone.accentText} ${tone.border}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 text-sm font-light leading-7 text-[var(--case-ink-soft)] sm:mt-0">
                  {painPoint}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${caseCardChrome} mt-10 border-l-4 p-7 sm:p-8 ${tone.border}`}>
        <p className={caseEyebrow}>
          <FieldName value="why_it_mattered" />
        </p>
        <p className="mt-4 max-w-4xl text-lg font-light leading-8 text-[var(--case-ink)] sm:text-xl sm:leading-9">
          {structured.problem.whyItMattered}
        </p>
      </div>
    </SectionShell>
  );
}

function UsersSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[3]}>
      <div className="grid gap-8 md:grid-cols-3">
        {structured.users.personas.length > 0 ? (
          structured.users.personas.map((persona) => (
            <PersonaCardView key={persona.personaName} persona={persona} tone={tone} />
          ))
        ) : (
          <EmptyPanel label="personas" />
        )}
      </div>
    </SectionShell>
  );
}

function ApproachSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[4]}>
      <div className="grid gap-8 lg:grid-cols-3">
        <ListPanel icon={<ShieldCheck aria-hidden="true" className={`h-4 w-4 ${tone.accentText}`} strokeWidth={2.35} />} label="owned" items={structured.approach.owned} />
        <ListPanel icon={<Users aria-hidden="true" className={`h-4 w-4 ${tone.accentText}`} strokeWidth={2.35} />} label="collaborated_on" items={structured.approach.collaboratedOn} />
        <ListPanel icon={<FileText aria-hidden="true" className={`h-4 w-4 ${tone.accentText}`} strokeWidth={2.35} />} label="constraints" items={structured.approach.constraints} />
      </div>

      <div className="mt-10 border-t border-[var(--case-line)] pt-8">
        <p className={caseEyebrow}>
          <FieldName value="process_steps" />
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {structured.approach.processSteps.map((step, index) => (
            <li
              className={`${caseCardChrome} p-5`}
              key={step.stepName}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-medium ${tone.softFill} ${tone.accentText} ${tone.border}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-4">
                <h3 className="text-base font-medium leading-6 text-[var(--case-ink)]">
                  {step.stepName}
                </h3>
                <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                  {step.oneLineDescription}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}

function ResearchSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[5]}>
      <div>
        <div className="flex items-center gap-2">
          <Search
            aria-hidden="true"
            className={`h-4 w-4 ${tone.accentText}`}
            strokeWidth={2.35}
          />
          <p className={caseEyebrow}>
            <FieldName value="methods" />
          </p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {structured.research.methods.map((method) => (
            <li
              className="rounded-full border border-[var(--case-line)] bg-[var(--case-surface)] px-4 py-2 text-xs font-medium text-[var(--case-ink-soft)]"
              key={method}
            >
              {method}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${caseCardChrome} mt-8 overflow-hidden`}>
        <div className="grid grid-cols-1 border-b border-[var(--case-line)] bg-[var(--case-surface-muted)] px-5 text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)] md:grid-cols-3">
          <span className="py-4 pr-4">
            <FieldName value="need" />
          </span>
          <span className="hidden py-4 pr-4 md:block">
            <FieldName value="pain_point" />
          </span>
          <span className="hidden py-4 md:block">
            <FieldName value="design_opportunity" />
          </span>
        </div>
        <div className="divide-y divide-[var(--case-line-soft)] px-5">
          {structured.research.synthesis.map((row) => (
            <article
              className="grid gap-3 py-5 md:grid-cols-3 md:gap-6"
              key={row.need}
            >
              <SynthesisCell label="need" value={row.need} />
              <SynthesisCell label="pain_point" value={row.painPoint} />
              <SynthesisCell label="design_opportunity" value={row.designOpportunity} />
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function InformationArchitectureSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[6]}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-2">
            <Network
              aria-hidden="true"
              className={`h-4 w-4 ${tone.accentText}`}
              strokeWidth={2.35}
            />
            <p className={caseEyebrow}>
              <FieldName value="sitemap_or_model" />
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <div className={`border-l-2 py-1 pl-4 ${tone.border}`}>
              <p className="text-sm font-semibold text-[var(--case-ink)]">
                Product entry
              </p>
              <p className="mt-1 text-xs font-light leading-5 text-[var(--case-ink-soft)]">
                The first scan answers what this product is and where to go next.
              </p>
            </div>
            <div className="grid gap-3 border-t border-[var(--case-line)] pt-4 sm:grid-cols-3">
              {structured.ia.sitemapOrModel.map((node) => (
                <div
                  className="border-l border-[var(--case-line)] pl-4"
                  key={node}
                >
                  <p className="text-sm font-medium leading-5 text-[var(--case-ink)]">
                    {node}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className={caseEyebrow}>
            <FieldName value="role_permission_map" />
          </p>
          <div className="mt-4 grid gap-0 divide-y divide-[var(--case-line-soft)] border-y border-[var(--case-line)]">
            {structured.ia.rolePermissionMap.map((persona) => (
              <div
                className="py-4"
                key={persona.personaName}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[var(--case-ink)]">
                    {persona.personaName}
                  </p>
                  <PersonaTypeBadge type={persona.type} />
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-light leading-5 text-[var(--case-ink-soft)]">
                  {persona.designImplication}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <BeforeAfterPanel
          items={structured.ia.iaBeforeAfter.beforeItems}
          title={structured.ia.iaBeforeAfter.beforeTitle}
          variant="before"
        />
        <BeforeAfterPanel
          items={structured.ia.iaBeforeAfter.afterItems}
          title={structured.ia.iaBeforeAfter.afterTitle}
          variant="after"
        />
      </div>
    </SectionShell>
  );
}

function DecisionSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[7]}>
      <div className="grid gap-5">
        {structured.decisions.map((decision, index) => (
          <DecisionBlockView
            decision={decision}
            index={index}
            key={decision.title}
            tone={tone}
          />
        ))}
      </div>
    </SectionShell>
  );
}

function SolutionSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  const hasMedia = structured.solution.screens.some(
    (screen) => screen.media.length > 0,
  );

  return (
    <SectionShell spec={sectionSpecs[8]}>
      <div className={hasMedia ? "grid gap-6" : "grid gap-5 md:grid-cols-2"}>
        {structured.solution.screens.map((screen, index) => (
          <SolutionScreenCard
            index={index}
            key={screen.screenName}
            screen={screen}
            tone={tone}
          />
        ))}
      </div>
    </SectionShell>
  );
}

function ImpactSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[9]}>
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp
              aria-hidden="true"
              className={`h-4 w-4 ${tone.accentText}`}
              strokeWidth={2.35}
            />
            <p className={caseEyebrow}>
              <FieldName value="metrics" />
            </p>
          </div>

          {structured.impact.metrics.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {structured.impact.metrics.map((metric) => (
                <ImpactMetricView key={`${metric.value}-${metric.label}`} metric={metric} />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyPanel label="Real numeric metrics not supplied yet" />
            </div>
          )}
        </div>

        <div className={`border-l-2 py-1 pl-5 ${tone.border}`}>
          <p className={`text-xs font-medium uppercase tracking-normal ${tone.accentText}`}>
            <FieldName value="qualitative_evidence" />
          </p>
          <div className="mt-5 grid gap-4">
            {structured.impact.qualitativeEvidence.map((evidence) => (
              <div
                className="text-base font-light leading-8 text-[var(--case-ink-soft)]"
                key={evidence}
              >
                {evidence}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ReflectionSection({
  structured,
  tone,
}: {
  structured: StructuredCaseStudy;
  tone: ProjectToneStyle;
}) {
  return (
    <SectionShell spec={sectionSpecs[10]}>
      <div className="grid gap-8 lg:grid-cols-3">
        <ReflectionCard
          label="what_i_learned"
          tone={tone}
          value={structured.reflection.whatILearned}
        />
        <ReflectionCard
          label="what_id_improve"
          tone={tone}
          value={structured.reflection.whatIdImprove}
        />
        <ReflectionCard
          label="how_approach_changed"
          tone={tone}
          value={structured.reflection.howApproachChanged}
        />
      </div>
    </SectionShell>
  );
}

function SectionShell({
  children,
  spec,
}: {
  children: ReactNode;
  spec: SectionSpec;
}) {
  const padding =
    spec.weight === "high"
      ? "py-16 sm:py-20"
      : spec.weight === "medium"
        ? "py-12 sm:py-16"
        : "py-10 sm:py-12";

  return (
    <section
      className={`case-study-snap-section scroll-mt-24 border-t border-[var(--case-line)] ${padding}`}
      id={spec.id}
    >
      <div className="grid gap-8">
        <header className="border-b border-[var(--case-line)] pb-7">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.28fr)] lg:items-end">
            <h2 className="max-w-3xl text-3xl font-medium leading-[1.12] tracking-normal text-[var(--case-ink)] sm:text-4xl lg:text-5xl">
              {spec.name}
            </h2>
            <p className="max-w-md text-sm font-light leading-7 text-[var(--case-ink-soft)]">
              {spec.intent}
            </p>
          </div>
        </header>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}



function NarrativePanel({
  eyebrow,
  strong = false,
  title,
  value,
}: {
  eyebrow: string;
  strong?: boolean;
  title: string;
  value: string;
}) {
  return (
    <article className="rounded-[8px] border border-[var(--case-line)] bg-[var(--case-surface)] p-5 shadow-[var(--case-shadow-soft)] sm:p-6">
      <p className={caseEyebrow}>
        <FieldName value={eyebrow} />
      </p>
      <h3
        className={`mt-4 max-w-2xl font-medium tracking-normal text-[var(--case-ink)] ${
          strong ? "text-3xl leading-[1.2]" : "text-xl leading-7"
        }`}
      >
        {title}
      </h3>
      <p className="mt-5 max-w-3xl text-base font-light leading-8 text-[var(--case-ink-soft)]">
        <OptionalValue value={value} />
      </p>
    </article>
  );
}

function PersonaCardView({
  persona,
  tone,
}: {
  persona: PersonaCard;
  tone: ProjectToneStyle;
}) {
  return (
    <article className={`${caseCardChrome} flex flex-col p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <PersonaTypeBadge type={persona.type} />
          <h3 className="mt-4 text-xl font-medium tracking-normal text-[var(--case-ink)]">
            {persona.personaName}
          </h3>
        </div>
        <span
          className={`grid h-10 w-10 flex-none place-items-center rounded-full border ${tone.softFill} ${tone.accentText} ${tone.border}`}
        >
          <Users aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-6">
        <PersonaList label="goals" items={persona.goals} />
        <PersonaList label="pain_points" items={persona.painPoints} />
      </div>

      <div className={`${caseInsetChrome} mt-8 p-4`}>
        <p className={caseEyebrow}>
          <FieldName value="design_implication" />
        </p>
        <p className="mt-2 text-sm font-normal leading-6 text-[var(--case-ink)]">
          {persona.designImplication}
        </p>
      </div>
    </article>
  );
}

function PersonaList({ items, label }: { items: string[]; label: string }) {
  return (
    <div>
      <p className={caseEyebrow}>
        <FieldName value={label} />
      </p>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li
            className="flex gap-3 text-sm font-light leading-6 text-[var(--case-ink-soft)]"
            key={item}
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-none text-[var(--case-muted)]"
              strokeWidth={2}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListPanel({
  icon,
  items,
  label,
}: {
  icon: ReactNode;
  items: string[];
  label: string;
}) {
  return (
    <article className={`${caseCardChrome} p-5 sm:p-6`}>
      <div className="flex items-center gap-3 border-b border-[var(--case-line-soft)] pb-4">
        {icon}
        <p className={caseEyebrow}>
          <FieldName value={label} />
        </p>
      </div>
      {items.length > 0 ? (
        <ul className="mt-5 grid gap-3">
          {items.map((item) => (
            <li
              className="text-sm font-light leading-6 text-[var(--case-ink-soft)]"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5">
          <EmptyInline />
        </div>
      )}
    </article>
  );
}

function SynthesisCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)] md:hidden">
        <FieldName value={label} />
      </p>
      <p className="text-sm font-light leading-7 text-[var(--case-ink-soft)]">
        {value}
      </p>
    </div>
  );
}

function BeforeAfterPanel({
  items,
  title,
  variant,
}: {
  items: string[];
  title: string;
  variant: "before" | "after";
}) {
  const isAfter = variant === "after";

  return (
    <article
      className={`border-t pt-5 ${
        isAfter
          ? "border-[rgb(51_109_72_/_0.34)]"
          : "border-[rgb(155_71_114_/_0.34)]"
      }`}
    >
      <p className={caseEyebrow}>
        <FieldName value="ia_before_after" />
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-7 text-[var(--case-ink)]">
        {title}
      </h3>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li
            className="flex gap-3 text-sm font-light leading-7 text-[var(--case-ink-soft)]"
            key={item}
          >
            <CircleDot
              aria-hidden="true"
              className={`mt-1 h-4 w-4 flex-none ${
                isAfter ? "text-[#336d48]" : "text-[#9b4772]"
              }`}
              strokeWidth={2.35}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DecisionBlockView({
  decision,
  index,
  tone,
}: {
  decision: DecisionBlock;
  index: number;
  tone: ProjectToneStyle;
}) {
  return (
    <article className={`${caseCardChrome} overflow-hidden`}>
      <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
        <div className={`border-b ${caseFineRule} bg-[linear-gradient(180deg,var(--case-surface-muted),var(--case-surface))] p-6 lg:border-b-0 lg:border-r lg:p-7`}>
          <div>
            <span
              className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-medium ${tone.softFill} ${tone.accentText} ${tone.border}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className={`mt-7 ${caseEyebrow}`}>
              Decision
            </p>
            <h3 className="mt-4 max-w-sm text-2xl font-medium leading-tight tracking-normal text-[var(--case-ink)] sm:text-3xl">
              {decision.title}
            </h3>
          </div>
        </div>

        <div className="grid gap-0 divide-y divide-[var(--case-line-soft)]">
          <DecisionField label="problem" value={decision.problem} />
          <DecisionField label="design_choice" value={decision.designChoice} />
          <DecisionField label="why_it_worked" value={decision.whyItWorked} />
          <DecisionField label="result_tradeoff" value={decision.resultTradeoff} />
        </div>
      </div>
    </article>
  );
}

function DecisionField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 sm:p-6">
      <p className={caseEyebrow}>
        <FieldName value={label} />
      </p>
      <p className="mt-3 text-sm font-light leading-7 text-[var(--case-ink-soft)]">
        {value}
      </p>
    </div>
  );
}

function SolutionScreenCard({
  index,
  screen,
  tone,
}: {
  index: number;
  screen: SolutionScreen;
  tone: ProjectToneStyle;
}) {
  return (
    <article className={`${caseCardChrome} flex flex-col overflow-hidden`}>
      <div className="flex items-center justify-between gap-4 border-b border-[var(--case-line)] px-5 py-5 sm:px-6">
        <div>
          <p className={caseEyebrow}>
            Solution {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-lg font-medium tracking-normal text-[var(--case-ink)] sm:text-xl">
            {screen.screenName}
          </h3>
        </div>
        <span
          className={`grid h-10 w-10 flex-none place-items-center rounded-[7px] border ${tone.softFill} ${tone.accentText} ${tone.border}`}
        >
          <Layers3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
        </span>
      </div>

      {screen.media.length > 0 ? (
        <SolutionMediaGallery media={screen.media} tone={tone} />
      ) : (
        <div className="relative min-h-72 flex-1 overflow-hidden bg-[var(--case-surface-muted)] p-5 sm:p-6">
          <div className="relative rounded-[8px] border border-[var(--case-line)] bg-[var(--case-surface)] p-5">
          <div className="mt-5 grid grid-cols-[0.72fr_1.28fr] gap-3">
            <div className="grid gap-2">
              {[0, 1, 2, 3].map((item) => (
                <span
                  aria-hidden="true"
                  className="h-8 rounded-[6px] bg-[var(--case-surface-muted)]"
                  key={item}
                />
              ))}
            </div>
            <div className="grid gap-2">
              <span className="h-3 rounded-full bg-[var(--case-line)]" />
              <span className="h-24 rounded-[6px] bg-[var(--case-surface-muted)]" />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((item) => (
                  <span
                    aria-hidden="true"
                    className="h-12 rounded-[6px] bg-[rgb(251_252_254_/_0.9)]"
                    key={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      <div className="border-t border-[var(--case-line)] p-5 sm:p-6">
        <p className={caseEyebrow}>
          <FieldName value="annotations" />
        </p>
        <ul
          className={`mt-5 grid gap-4 ${
            screen.media.length > 0 ? "sm:grid-cols-2" : ""
          }`}
        >
          {screen.annotations.map((annotation) => (
            <li
              className={`${caseInsetChrome} p-4`}
              key={`${annotation.type}-${annotation.text}`}
            >
              <p className={`text-[0.68rem] font-medium uppercase tracking-normal ${tone.accentText}`}>
                <FieldName value={annotation.type} />
              </p>
              <p className="mt-3 text-sm font-light leading-6 text-[var(--case-ink)]">
                {annotation.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function SolutionMediaGallery({
  media,
  tone,
}: {
  media: CaseStudyMedia[];
  tone: ProjectToneStyle;
}) {
  const isPair = media.length > 1;

  return (
    <div className={`p-3 sm:p-5 ${tone.canvas}`}>
      <div
        className={`grid items-start gap-4 ${
          isPair
            ? "lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.82fr)]"
            : ""
        }`}
      >
        {media.map((item) => {
          const isPortrait = item.height > item.width;

          return (
            <figure
              className={
                !isPair && isPortrait
                  ? "mx-auto w-full max-w-[48rem]"
                  : "min-w-0"
              }
              key={item.src}
            >
              <div className="overflow-hidden rounded-[7px] border border-[rgb(255_255_255_/_0.82)] bg-[var(--case-surface)] shadow-[0_18px_44px_rgb(24_32_43_/_0.13)]">
                <a
                  aria-label={`Open ${item.label ?? "product screen"} at full size`}
                  className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2"
                  href={item.src}
                  rel="noreferrer"
                  target="_blank"
                  title="Open full-size screen"
                >
                  <Image
                    alt={item.alt}
                    className="block h-auto w-full"
                    height={item.height}
                    loading="lazy"
                    sizes={
                      isPair
                        ? "(min-width: 1280px) 520px, (min-width: 768px) 86vw, 94vw"
                        : "(min-width: 1280px) 980px, (min-width: 768px) 86vw, 94vw"
                    }
                    src={item.src}
                    width={item.width}
                  />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[7px] border border-[rgb(223_227_232_/_0.9)] bg-[rgb(253_253_255_/_0.9)] text-[var(--case-ink)] opacity-100 shadow-[0_10px_26px_rgb(24_32_43_/_0.12)] backdrop-blur-sm transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                    <Maximize2
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={2.2}
                    />
                  </span>
                </a>
              </div>
              {item.label ? (
                <figcaption className="mt-2 px-1 text-xs font-light text-[var(--case-muted)]">
                  {item.label}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function ImpactMetricView({ metric }: { metric: ImpactMetricCard }) {
  return (
    <article className={`${caseCardChrome} p-6`}>
      <p className="text-5xl font-medium leading-none tracking-normal text-[var(--case-ink)] sm:text-6xl">
        {metric.value}
      </p>
      <p className="mt-4 text-base font-light leading-7 text-[var(--case-ink-soft)]">
        {metric.label}
      </p>
      <p className="mt-6 text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
        {metric.category}
      </p>
    </article>
  );
}

function ReflectionCard({
  label,
  tone,
  value,
}: {
  label: string;
  tone: ProjectToneStyle;
  value: string;
}) {
  return (
    <article className={`${caseCardChrome} p-6`}>
      <p className={`text-[0.68rem] font-medium uppercase tracking-normal ${tone.accentText}`}>
        <FieldName value={label} />
      </p>
      <p className="mt-4 text-base font-light leading-8 text-[var(--case-ink-soft)]">
        <OptionalValue value={value} />
      </p>
    </article>
  );
}

function CaseStudyClose() {
  return (
    <section className="border-t border-[var(--case-line)] pt-12">
      <div className={`${caseCardChrome} flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8`}>
        <div>
          <p className={caseEyebrow}>
            End of case study
          </p>
          <p className="mt-3 max-w-2xl text-base font-light leading-7 text-[var(--case-ink-soft)]">
            Structured for a quick first skim, then a deeper product walkthrough.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--case-ink)] bg-[var(--case-ink)] px-6 text-sm font-medium text-[#fdfdff] transition duration-300 hover:-translate-y-0.5 hover:bg-[#242424] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)]"
            href="/#work"
          >
            More work
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--case-line)] bg-[var(--case-surface-muted)] px-6 text-sm font-medium text-[var(--case-ink)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--case-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)]"
            href="#hero"
          >
            Back to top
          </Link>
        </div>
      </div>
    </section>
  );
}

function PersonaTypeBadge({ type }: { type: PersonaType }) {
  return (
    <span className="rounded-full border border-[var(--case-line)] bg-[var(--case-surface-muted)] px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
      {type}
    </span>
  );
}

function FieldName({ value }: { value: string }) {
  return <>{fieldLabelText[value] ?? value.replaceAll("_", " ")}</>;
}

function OptionalValue({ value }: { value: string }) {
  if (!value.trim()) {
    return <EmptyInline />;
  }

  return <>{value}</>;
}

function EmptyInline() {
  return (
    <span className="inline-flex rounded-full border border-dashed border-[var(--case-line)] bg-[var(--case-surface-muted)] px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
      Not supplied yet
    </span>
  );
}

function EmptyPanel({ label }: { label: string }) {
  return (
    <div className="rounded-[8px] border border-dashed border-[var(--case-line)] bg-[var(--case-surface-muted)] p-6 text-sm font-light leading-7 text-[var(--case-muted)]">
      {label}. Add real source data before publishing this field.
    </div>
  );
}
