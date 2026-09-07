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
  Lock,
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
import { CaseStudyLock } from "./case-study-lock";
import { CaseStudyChapters } from "./case-study-chapters";
import { ExpandableMedia } from "./case-study-lightbox";
import {
  caseCardChrome,
  caseEyebrow,
  caseInsetChrome,
} from "./case-study-chrome";

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
  locked?: boolean;
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
    name: "Overview",
    intent: "The project in ten seconds.",
    weight: "high",
  },
  {
    id: "context",
    name: "What it is",
    intent: "The product, and where this work sits inside it.",
    weight: "medium",
  },
  {
    id: "problem",
    name: "The problem",
    intent: "What was actually broken, underneath the interface.",
    weight: "high",
  },
  {
    id: "users",
    name: "Who it's for",
    intent: "The people involved, and what each of them needs.",
    weight: "medium",
  },
  {
    id: "approach",
    name: "How I worked",
    intent: "Role, constraints, and the path through the problem.",
    weight: "low",
  },
  {
    id: "research",
    name: "Understanding it",
    intent: "How the domain and the workflow were learned.",
    weight: "medium",
  },
  {
    id: "ia",
    name: "How it's structured",
    intent: "The model underneath the screens.",
    weight: "medium",
  },
  {
    id: "decisions",
    name: "Key decisions",
    intent: "The calls that shaped the product, and what each one cost.",
    weight: "high",
  },
  {
    id: "solution",
    name: "The work",
    intent: "The moments that carry the experience.",
    weight: "high",
  },
  {
    id: "impact",
    name: "What changed",
    intent: "Where the design made a measurable difference.",
    weight: "high",
  },
  {
    id: "reflection",
    name: "Looking back",
    intent: "What I would keep, and what I would change.",
    weight: "low",
  },
];

const collaborationByProject: Record<string, string[]> = {
  "strategy-dot-zero-kpi-management-module": [
    "Product and commercial alignment on the PMO-only licence",
    "PMO validation of the reporting interval and its prompts",
    "Business analysis on the KPI and measure model",
  ],
  "strategy-dot-zero-change-impact": [
    "Product and business stakeholder alignment",
    "Design manager review and iteration",
    "Project manager and PMO workflow validation",
  ],
  "strategy-dot-zero-ai-project-extraction": [
    "AI and platform engineering on extraction limits",
    "PMO and implementation teams on onboarding reality",
    "Product and commercial alignment on the seat model",
  ],
  "strategy-dot-zero-dependency-module": [
    "Project and program manager workflow validation",
    "Business analysis on the dependency model",
    "Status reporting and PSR alignment",
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
  "strategy-dot-zero-kpi-management-module": [
    "Module licensed to the PMO persona only",
    "KPI taxonomy differs with every organisation",
    "One measure per KPI in the baseline scope",
    "Portfolio managers reachable only outside the product",
  ],
  "strategy-dot-zero-change-impact": [
    "One-week delivery window",
    "Legacy MVC product constraints",
    "Multi-persona permissions and views",
    "Business pressure for a business-unit-first model",
  ],
  "strategy-dot-zero-ai-project-extraction": [
    "Client documents in any format or template",
    "A live register of record, so no destructive automation",
    "Multi-persona permissions across PMO and project managers",
    "AI access licensed per seat",
  ],
  "strategy-dot-zero-dependency-module": [
    "Two project managers with separate ownership",
    "Status must come from existing reporting, not a second update",
    "Legacy register behaviour already in daily use",
    "Approval crossing project boundaries",
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
  "strategy-dot-zero-kpi-management-module":
    "Web, enterprise performance management and PMO reporting",
  "strategy-dot-zero-change-impact":
    "Web, enterprise planning and PMO oversight",
  "strategy-dot-zero-ai-project-extraction":
    "Web, enterprise onboarding and portfolio migration",
  "strategy-dot-zero-dependency-module":
    "Web, enterprise project planning and portfolio delivery",
  "dubai-holding-destination-system": "Web, destination operations",
  "dhda-service-journeys": "Web, Explore and PMO management hub",
  "national-projects-command-view": "Web, executive command view",
  "tasama-workflow-suite": "Web, enterprise workflow",
};

const domainByProject: Record<string, string> = {
  "strategy-dot-zero-kpi-management-module":
    "Portfolio governance, performance management, strategic alignment",
  "strategy-dot-zero-change-impact":
    "Portfolio governance, organisational change, enterprise planning",
  "dhda-service-journeys": "Healthcare, policy systems, enterprise AI",
  "strategy-dot-zero-ai-project-extraction":
    "Portfolio governance, enterprise onboarding, applied AI",
  "strategy-dot-zero-dependency-module":
    "Portfolio governance, delivery planning, cross-project dependencies",
};

/**
 * A duration, not a stage. Anything phrased as "concept through approved X"
 * was describing where the work stopped, which belongs in the outcome, so
 * those fall back to the project year until a real duration is known.
 */
const timelineByProject: Record<string, string> = {
  "strategy-dot-zero-change-impact": "One-week design sprint",
};

const visualRoleByProject: Record<string, string> = {
  "strategy-dot-zero-kpi-management-module":
    "Product Designer for the KPI model, profile workflow, and interval tracking",
  "strategy-dot-zero-change-impact":
    "Product Designer for PMO and executive product experiences",
  "dhda-service-journeys":
    "Lead design strategy, product UX, information architecture, UX/UI",
  "strategy-dot-zero-ai-project-extraction":
    "Product Designer for the agent workflow, review experience, and information architecture",
  "strategy-dot-zero-dependency-module":
    "Product Designer for the dependency model, registers, and approval workflow",
};

const visualPlatformByProject: Record<string, string> = {
  "strategy-dot-zero-kpi-management-module":
    "Web, PMO KPI registers and interval reporting",
  "strategy-dot-zero-change-impact":
    "Web, project planning and organisation-wide impact oversight",
  "dhda-service-journeys": "Web, visual exploration layer and management hub",
  "strategy-dot-zero-ai-project-extraction":
    "Web, PMO bulk migration and project-manager refinement",
  "strategy-dot-zero-dependency-module":
    "Web, project plan and portfolio dependency registers",
};

const heroImpactByProject: Record<string, string> = {
  "strategy-dot-zero-kpi-management-module":
    "KPI definition, computed status, and interval reporting owned end to end by one persona, with alignment linking each KPI to the work behind it.",
  "strategy-dot-zero-change-impact":
    "An approved model that moves change impact out of a document nobody reopens, and gives its status somewhere real to come from.",
  "dhda-service-journeys": "MVP demonstrated to senior government executives",
  "strategy-dot-zero-ai-project-extraction":
    "Manual back-end migration became a reviewed product flow, with nothing reaching the register unverified.",
  "strategy-dot-zero-dependency-module":
    "An approved model that gives a dependency a second author, and a status that comes from work the provider is already doing.",
};

const productModelDescriptionsByProject: Record<string, string[]> = {
  "strategy-dot-zero-kpi-management-module": [
    "Four baselined registers: strategic, delivery assurance, client and commercial, portfolio.",
    "Context, alignment, measure, and evidence, completed against a live pending-field count.",
    "Each interval arrives as an action: actual, computed status, comment, and evidence.",
  ],
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
  "strategy-dot-zero-ai-project-extraction": [
    "Upload documents in any format; the agent parses and asks only what it needs.",
    "Readiness scoring, field confidence, and duplicate checks aim the review.",
    "Verified projects commit into the live plan, charter, and registers.",
  ],
  "strategy-dot-zero-dependency-module": [
    "Two registers: what a project needs, and what it owes to others.",
    "Request, review, accept, reject, or revoke across project boundaries.",
    "Progress that follows the provider's status report, with override.",
  ],
};

const researchMethodsByProject: Record<string, string[]> = {
  "strategy-dot-zero-kpi-management-module": [
    "KPI practice audit",
    "Taxonomy baselining",
    "Persona and licence mapping",
    "Measure and threshold modelling",
    "Reporting cycle mapping",
    "Interaction prototyping",
  ],
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
  "strategy-dot-zero-ai-project-extraction": [
    "Onboarding journey audit",
    "Client document sampling",
    "Target-model mapping",
    "Persona and permission mapping",
    "Agent conversation prototyping",
    "Review-flow validation",
  ],
  "strategy-dot-zero-dependency-module": [
    "Existing register audit",
    "Dependency scenario mapping",
    "Cross-persona workflow modelling",
    "Status reporting alignment",
    "Approval state modelling",
    "Interaction prototyping",
  ],
};

const iaModelByProject: Record<string, string[]> = {
  "strategy-dot-zero-kpi-management-module": [
    "KPI registers (four baselined types)",
    "KPI profile — Context",
    "Alignment to projects, programs, portfolios, and objectives",
    "Measure definition and thresholds",
    "Related links and evidence",
    "Interval tracking and performance breakdown",
    "Portfolio manager email bridge",
  ],
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
  "strategy-dot-zero-ai-project-extraction": [
    "Project register (entry point)",
    "Extraction workspace",
    "Clarifying questions",
    "Extracted projects and proposals",
    "Project detail and verification",
    "Duplicate resolution",
    "Commit to register",
  ],
  "strategy-dot-zero-dependency-module": [
    "Project plan (dependency entry point)",
    "Get register — what this project needs",
    "Give register — what this project owes",
    "Request drawer",
    "Approval, rejection, and revoke",
    "Live status from project status report",
    "Portfolio dependency view",
  ],
};

/**
 * Only projects with numbers that were actually measured appear here. A design
 * sprint that ended at an approved model has none, and inventing them to fill
 * the hero tiles is worse than leaving the row out.
 */
const impactMetricsByProject: Record<string, ImpactMetricCard[]> = {
  "strategy-dot-zero-kpi-management-module": [
    {
      value: "4",
      label:
        "baselined KPI registers covering strategic, delivery, commercial, and portfolio performance",
      category: "business",
    },
    {
      value: "0",
      label:
        "approval round trips — the persona who defines a KPI is the persona who reports it",
      category: "team",
    },
    {
      value: "1 measure",
      label:
        "per KPI, so on track carries the same meaning across the whole register",
      category: "user",
    },
    {
      value: "3 surfaces",
      label:
        "notification, my actions, and calendar carry every reporting interval",
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
  "strategy-dot-zero-ai-project-extraction": [
    {
      value: "Any format",
      label:
        "plans, spreadsheets, and status reports mapped onto one project model",
      category: "user",
    },
    {
      value: "2",
      label:
        "operating altitudes served by one engine: PMO migration and PM refinement",
      category: "business",
    },
    {
      value: "0",
      label:
        "projects reach the live register without an explicit human save",
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
  "strategy-dot-zero-kpi-management-module": {
    whatIdImprove:
      "I would test the four baselined registers against organisations whose KPI language does not map neatly onto them. Four types is a bet on how most organisations think, and when the bet is wrong the translation cost lands on whoever configures the platform rather than on us.",
    howApproachChanged:
      "I now treat licensing and permissions as material rather than a setting applied once the flow is drawn. Knowing which personas would never hold this module changed the state model, removed an approval cycle, and reshaped the entire portfolio path — all of which was far better to know first than to discover at handoff.",
  },
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
  "strategy-dot-zero-ai-project-extraction": {
    whatIdImprove:
      "I would test the review queue against a real migration batch: a hundred or more projects with genuine duplicates and inconsistent stage names. Triage, filtering, and bulk action are where this design will come under the most pressure, and a clean demo batch flatters it.",
    howApproachChanged:
      "I now design the disagreement path before the happy path on anything generative. Deciding where a person overrides the model shaped the readiness score, the duplicate banner, and the commit step far more than the extraction itself did.",
  },
  "strategy-dot-zero-dependency-module": {
    whatIdImprove:
      "I would pressure-test the registers against a portfolio carrying hundreds of live dependencies. Filtering, bulk triage, and chains where one dependency sits behind another are where this design will strain, and a short demo register flatters it.",
    howApproachChanged:
      "I now ask who else is implied by a record before designing the screen for it. This looked like a table problem until I asked who the second author was, and that one question reshaped the entire module.",
  },
};

const personasByProject: Record<string, PersonaCard[]> = {
  "strategy-dot-zero-kpi-management-module": [
    {
      personaName: "PMO leads and performance teams",
      type: "primary",
      goals: [
        "Define KPIs that hold up under executive scrutiny",
        "Report every interval without letting the series break",
      ],
      painPoints: [
        "A long definition form is easy to start and easy to abandon",
        "A recurring obligation is forgotten unless something prompts it",
      ],
      designImplication:
        "The profile had to be a completable sequence with a visible pending count, and each interval had to arrive as a prompted action rather than a date to remember.",
    },
    {
      personaName: "Portfolio managers outside the licence",
      type: "secondary",
      goals: [
        "Get portfolio KPIs defined by the person closest to the numbers",
        "See how their own performance is trending",
      ],
      painPoints: [
        "No seat in the module that holds their KPIs",
        "Reporting arrives as a request rather than a workflow they control",
      ],
      designImplication:
        "The email bridge had to carry enough context to complete a profile and an update unaided, with trend and status readable in their own application afterwards.",
    },
    {
      personaName: "Executive and strategy owners",
      type: "executive",
      goals: [
        "See whether strategic objectives are actually moving",
        "Trace a number back to the delivery behind it",
      ],
      painPoints: [
        "Statuses that mean different things on different KPIs cannot be compared",
        "Performance reporting disconnected from the projects driving it",
      ],
      designImplication:
        "Status had to be computed from a defined measure, and alignment had to link each KPI to the projects, programs, and portfolios beneath it.",
    },
  ],
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
  "strategy-dot-zero-dependency-module": [
    {
      personaName: "Requesting project managers",
      type: "primary",
      goals: [
        "Record what the project is genuinely waiting on",
        "See whether the work they depend on is actually on track",
      ],
      painPoints: [
        "The dependency lived only on their own screen",
        "No status, so a slip stayed invisible until it caused damage",
      ],
      designImplication:
        "The Get register had to carry status, stage, and business impact in the row itself, so risk is visible without opening anything.",
    },
    {
      personaName: "Providing project managers",
      type: "secondary",
      goals: [
        "Know what other projects are counting on them for",
        "Accept, reject, or update commitments deliberately",
      ],
      painPoints: [
        "Commitments were recorded about their project without their knowledge",
        "No surface existed for reviewing or responding to a request",
      ],
      designImplication:
        "The Give register and approval drawer had to make an incoming request reviewable in one place, with the reason for a rejection captured rather than assumed.",
    },
    {
      personaName: "PMO and portfolio teams",
      type: "admin",
      goals: [
        "See where delivery risk is concentrated across dependencies",
        "Trace a delayed project back to its actual cause",
      ],
      painPoints: [
        "Cross-project relationships were invisible at portfolio level",
        "Off-track work could not be linked to the dependency behind it",
      ],
      designImplication:
        "Dependency records had to stay consistent and queryable across projects rather than living inside a single plan.",
    },
  ],
  "strategy-dot-zero-ai-project-extraction": [
    {
      personaName: "PMO leads running the migration",
      type: "admin",
      goals: [
        "Move an existing portfolio into the platform without manual re-keying",
        "Hand project managers a usable starting point they will accept",
      ],
      painPoints: [
        "Back-end migration by the delivery team did not scale past the first client",
        "No way to tell a near-complete extraction from a shell record",
      ],
      designImplication:
        "The PMO surface had to behave like a queue: readiness on the card, accept and reject in place, and assignment without opening every project.",
    },
    {
      personaName: "Project managers receiving the work",
      type: "primary",
      goals: [
        "Confirm an assigned plan matches how the project actually runs",
        "Start executing without rebuilding the plan from scratch",
      ],
      painPoints: [
        "Bulk-imported projects arrived without their input",
        "Corrections meant editing a record someone else generated",
      ],
      designImplication:
        "Verification had to happen inside the same structure the work continues in — charter, plan, and registers — rather than in a separate import screen.",
    },
    {
      personaName: "Implementation and onboarding consultants",
      type: "secondary",
      goals: [
        "Shorten the gap between a signed client and a working portfolio",
        "Stop absorbing data entry as an unbilled service cost",
      ],
      painPoints: [
        "Migration fell to the delivery team by default",
        "Every client's document set needed bespoke handling",
      ],
      designImplication:
        "The flow had to absorb format variation on the client's side, so onboarding effort could move from re-keying to configuration.",
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
  annotations: "Why this matters",
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

export function CaseStudyPage({ caseStudy, locked = false }: CaseStudyPageProps) {
  const structured = buildStructuredCaseStudy(caseStudy);
  const { chapters, project } = caseStudy;
  const tone = projectToneStyles[project.tone];

  // A chapter-based case study keeps the hero and context blocks, then replaces
  // the templated sections with its own written beats.
  const navSections = chapters
    ? [
        ...sectionSpecs
          .slice(0, 2)
          .map((spec) => ({ id: spec.id, name: spec.name })),
        ...chapters.map((chapter) => ({
          id: chapter.id,
          name: chapter.name,
        })),
      ]
    : sectionSpecs.map((spec) => ({ id: spec.id, name: spec.name }));

  const gatedSectionNames = chapters
    ? chapters.map((chapter) => chapter.name)
    : sectionSpecs.slice(2).map((spec) => spec.name);

  return (
    <main className="case-study-scroll-experience bg-[var(--case-paper)] text-[var(--case-ink)]">
      <CaseStudyHeader />
      <HeroSection caseStudy={caseStudy} structured={structured} tone={tone} />

      <div className="px-5 pb-16 sm:px-8 sm:pb-20 xl:px-8 2xl:px-10">
        <div className="mx-auto grid max-w-[92rem] gap-10 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-0 2xl:grid-cols-[15rem_minmax(0,1fr)]">
          <CaseStudyNavigator
            sectionSpecs={locked ? navSections.slice(0, 2) : navSections}
          />

          <div className="min-w-0 xl:px-8 2xl:px-10">
            <ContextSection structured={structured} />

            {locked ? (
              <CaseStudyLock
                hasScreens={Boolean(caseStudy.heroMedia)}
                sections={gatedSectionNames}
                tone={tone}
              />
            ) : (
              <>
                {chapters ? (
                  <CaseStudyChapters chapters={chapters} tone={tone} />
                ) : (
                  <>
                    {caseStudy.heroMedia ? (
                      <GatedProductScreen
                        caseStudy={caseStudy}
                        media={caseStudy.heroMedia}
                        structured={structured}
                        tone={tone}
                      />
                    ) : null}
                    <ProblemSection structured={structured} tone={tone} />
                    <UsersSection structured={structured} tone={tone} />
                    <ApproachSection structured={structured} tone={tone} />
                    <ResearchSection structured={structured} tone={tone} />
                    <InformationArchitectureSection structured={structured} tone={tone} />
                    <DecisionSection structured={structured} tone={tone} />
                    <SolutionSection structured={structured} tone={tone} />
                    <ImpactSection structured={structured} tone={tone} />
                    <ReflectionSection structured={structured} tone={tone} />
                  </>
                )}
                <CaseStudyClose />
              </>
            )}
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
      owned: project.scope.slice(0, 6),
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
    decisions: caseStudy.decisions.slice(0, 6).map((decision) => ({
      title: decision.issue,
      problem: decision.issue,
      designChoice: decision.decision,
      whyItWorked: decision.result,
      resultTradeoff:
        decision.tradeoff ??
        "The first read stayed focused, while deeper context remained available for review.",
    })),
    solution: {
      screens: caseStudy.finalMoments.slice(0, 8).map((moment) => ({
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
        <Link
          className="group mb-10 inline-flex h-10 items-center gap-2 rounded-full bg-[var(--case-surface-muted)] pl-3 pr-4 text-sm font-medium leading-none text-[var(--case-ink)] transition duration-300 hover:bg-[var(--case-line-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)]"
          href="/#work"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition duration-300 group-hover:-translate-x-0.5"
            strokeWidth={2.3}
          />
          All work
        </Link>

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

            {structured.impact.metrics.length > 0 ? (
              <dl className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
                  {structured.impact.metrics.slice(0, 3).map((metric) => (
                    <div
                      className={`${caseCardChrome} relative isolate overflow-hidden p-5`}
                      key={`${metric.value}-${metric.label}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 top-0 h-1 ${tone.softFill}`}
                      />
                      <dt className="text-2xl font-medium leading-none tracking-normal text-[var(--case-ink)] sm:text-[1.75rem]">
                        {metric.value}
                      </dt>
                      <dd className="mt-3 text-xs font-light leading-5 text-[var(--case-ink-soft)]">
                        {metric.label}
                      </dd>
                    </div>
                  ))}
              </dl>
            ) : null}
          </div>

          <aside className={`${caseCardChrome} relative isolate overflow-hidden p-0`}>
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-1 ${tone.softFill}`}
            />
            <div className="flex items-start justify-between gap-5 bg-[var(--case-surface-muted)] p-5 sm:p-6">
              <div>
                <p className={caseEyebrow}>Project brief</p>
                <p className="mt-2 text-sm font-light leading-6 text-[var(--case-ink-soft)]">
                  A compact read for role, scope, and context.
                </p>
              </div>
              <div className="grid h-16 w-44 max-w-[42vw] shrink-0 place-items-center overflow-hidden rounded-[8px] bg-[var(--case-surface)] px-3 py-2 shadow-[0_1px_2px_rgb(24_32_43_/_0.05)]">
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

            <div className="grid gap-3 px-5 py-5 sm:px-6">
              <HeroBriefRow label="Role" value={structured.hero.role} />
              <HeroBriefRow label="Timeline" value={structured.hero.timeline} />
              <HeroBriefRow label="Platform" value={structured.hero.platform} />
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
    <div className="grid gap-1 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-2">
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

  return (
    <div className={`${caseCardChrome} relative isolate overflow-hidden`}>
      <div className="grid gap-0 lg:grid-cols-[0.35fr_0.65fr]">
        <aside className="bg-[var(--case-surface-muted)] p-6">
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

          <div className="mt-4 grid gap-3">
            {structured.hero.impactMetrics.map((metric, index) => (
              <div
                className="grid grid-cols-[2rem_1fr] gap-3 rounded-[8px] bg-[var(--case-surface)] px-3 py-3"
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
          <div className="flex items-center justify-between gap-4">
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

          <div className="mt-6 grid gap-3">
            {structured.context.modules.map((module, index) => (
              <div
                className="grid gap-4 rounded-[8px] bg-[var(--case-surface-muted)] p-4 sm:grid-cols-[2.75rem_minmax(0,1fr)]"
                key={module}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full text-xs font-medium ${
                    index === 1
                      ? `${tone.softFill} ${tone.accentText}`
                      : "bg-[var(--case-surface)] text-[var(--case-muted)]"
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

function GatedProductScreen({
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
    <section
      className="case-study-snap-section scroll-mt-24 pt-12 sm:pt-14"
      id="product-screen"
    >
      <div className="grid gap-6">
        <header>
          <span
            aria-hidden="true"
            className="mb-5 block h-[3px] w-10 rounded-full bg-[var(--case-line)]"
          />
          <div className="grid gap-3 lg:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.28fr)] lg:items-end">
            <h2 className="max-w-2xl text-2xl font-medium leading-[1.2] tracking-normal text-[var(--case-ink)] sm:text-3xl">
              The approved product screen
            </h2>
            <p className="max-w-md text-sm font-light leading-7 text-[var(--case-ink-soft)]">
              The direction that shipped inside the project plan. It sits behind
              the password because the workspace is under NDA.
            </p>
          </div>
        </header>

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
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--case-surface-muted)] px-2.5 py-1 text-[0.7rem] font-medium leading-5 text-[var(--case-ink-soft)]">
                <Lock aria-hidden="true" className="h-3 w-3" strokeWidth={2.35} />
                Shared under NDA
              </span>
              <p className="text-xs font-light text-[var(--case-muted)]">
                Final approved direction
              </p>
            </div>
          </div>

          <div className={`border-y border-[var(--case-line)] p-2 sm:p-4 ${tone.canvas}`}>
            <ExpandableMedia
              frameClassName="overflow-hidden rounded-[7px] border border-[rgb(255_255_255_/_0.78)] bg-[var(--case-surface)] shadow-[0_20px_50px_rgb(24_32_43_/_0.14)]"
              item={media}
              sizes="(min-width: 1440px) 1240px, (min-width: 768px) 92vw, 96vw"
            />
          </div>

          {structured.hero.impact ? (
            <div className="bg-[var(--case-surface-muted)] p-5 sm:p-6">
              <p
                className={`text-[0.68rem] font-medium uppercase tracking-normal ${tone.accentText}`}
              >
                What changed
              </p>
              <p className="mt-3 max-w-3xl text-sm font-light leading-7 text-[var(--case-ink-soft)]">
                {structured.hero.impact}
              </p>
            </div>
          ) : null}
        </article>
      </div>
    </section>
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

      <div className={`${caseCardChrome} mt-8 p-5 sm:p-6`}>
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
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {structured.context.modules.map((module, index) => (
            <li
              className="rounded-[8px] bg-[var(--case-surface-muted)] px-4 py-4 text-sm font-medium leading-6 text-[var(--case-ink)]"
              key={module}
            >
              <span className="mb-2 block text-[0.65rem] font-medium text-[var(--case-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
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

      <div className="mt-12">
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
              className="rounded-full bg-[var(--case-surface-muted)] px-4 py-2 text-xs font-medium text-[var(--case-ink-soft)]"
              key={method}
            >
              {method}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-3">
        <div className="hidden grid-cols-3 gap-6 px-5 text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)] md:grid">
          <span>
            <FieldName value="need" />
          </span>
          <span>
            <FieldName value="pain_point" />
          </span>
          <span>
            <FieldName value="design_opportunity" />
          </span>
        </div>

        {structured.research.synthesis.map((row) => (
          <article
            className={`${caseCardChrome} grid gap-3 p-5 md:grid-cols-3 md:gap-6`}
            key={row.need}
          >
            <SynthesisCell label="need" value={row.need} />
            <SynthesisCell label="pain_point" value={row.painPoint} />
            <SynthesisCell label="design_opportunity" value={row.designOpportunity} />
          </article>
        ))}
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
            <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
              {structured.ia.sitemapOrModel.map((node, index) => (
                <div
                  className="flex items-center gap-3 rounded-[8px] bg-[var(--case-surface-muted)] px-4 py-3"
                  key={node}
                >
                  <span
                    className={`text-[0.65rem] font-medium ${index === 0 ? tone.accentText : "text-[var(--case-muted)]"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
          <div className="mt-4 grid gap-2.5">
            {structured.ia.rolePermissionMap.map((persona) => (
              <div
                className="rounded-[8px] bg-[var(--case-surface-muted)] px-4 py-3.5"
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
      className={`case-study-snap-section scroll-mt-24 ${padding}`}
      id={spec.id}
    >
      <div className="grid gap-8">
        <header>
          <span
            aria-hidden="true"
            className="mb-6 block h-[3px] w-10 rounded-full bg-[var(--case-line)]"
          />
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
    <article className={`${caseCardChrome} p-5 sm:p-6`}>
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
      <div className="flex items-center gap-3">
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
    <article className={`${caseInsetChrome} p-5 sm:p-6`}>
      <span
        aria-hidden="true"
        className={`mb-5 block h-[3px] w-10 rounded-full ${
          isAfter
            ? "bg-[rgb(51_109_72_/_0.45)]"
            : "bg-[rgb(155_71_114_/_0.45)]"
        }`}
      />
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
        <div className="bg-[var(--case-surface-muted)] p-6 lg:p-7">
          <div>
            <span
              className={`grid h-10 w-10 place-items-center rounded-full text-sm font-medium ${tone.softFill} ${tone.accentText}`}
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

        <div className="grid gap-px bg-[var(--case-surface-muted)] sm:grid-cols-2">
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
    <div className="bg-[var(--case-surface)] p-5 sm:p-6">
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
      <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
        <div>
          <p className={caseEyebrow}>
            Solution {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-lg font-medium tracking-normal text-[var(--case-ink)] sm:text-xl">
            {screen.screenName}
          </h3>
        </div>
        <span
          className={`grid h-10 w-10 flex-none place-items-center rounded-[7px] ${tone.softFill} ${tone.accentText}`}
        >
          <Layers3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
        </span>
      </div>

      {screen.media.length > 0 ? (
        <SolutionMediaGallery media={screen.media} tone={tone} />
      ) : (
        <div className="relative min-h-72 flex-1 overflow-hidden bg-[var(--case-surface-muted)] p-5 sm:p-6">
          <div className="relative rounded-[8px] bg-[var(--case-surface)] p-5 shadow-[0_1px_2px_rgb(24_32_43_/_0.05)]">
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

      <div className="p-5 sm:p-6">
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
              <ExpandableMedia
                item={item}
                sizes={
                  isPair
                    ? "(min-width: 1280px) 520px, (min-width: 768px) 86vw, 94vw"
                    : "(min-width: 1280px) 980px, (min-width: 768px) 86vw, 94vw"
                }
              />
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
    <section className="pt-14">
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
