import { selectedProjects, type SelectedProject } from "@/data/projects";

type StoryCard = {
  title: string;
  description: string;
};

type ProcessStep = StoryCard & {
  phase: string;
};

type Decision = {
  issue: string;
  decision: string;
  result: string;
  tradeoff?: string;
};

type BeforeAfter = {
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
};

export type CaseStudyMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
};

type FinalMoment = StoryCard & {
  tags: string[];
  media?: CaseStudyMedia[];
};

type ImpactPoint = {
  label: string;
  value: string;
};

export type CaseStudy = {
  project: SelectedProject;
  heroMedia?: CaseStudyMedia;
  headline: string;
  deck: string;
  problem: string;
  outcome: string;
  storyIntro: string;
  snapshot: ImpactPoint[];
  frictions: StoryCard[];
  process: ProcessStep[];
  decisions: Decision[];
  beforeAfter: BeforeAfter;
  finalMoments: FinalMoment[];
  impact: ImpactPoint[];
  reflection: string;
};

type CaseStudyDraft = Omit<CaseStudy, "project"> & {
  projectId: SelectedProject["id"];
};

const projectsById = new Map(
  selectedProjects.map((project) => [project.id, project]),
);

function bindProject({ projectId, ...story }: CaseStudyDraft): CaseStudy {
  const project = projectsById.get(projectId);

  if (!project) {
    throw new Error(`Missing selected project for case study ${projectId}`);
  }

  return {
    project,
    ...story,
  };
}

export const caseStudies: CaseStudy[] = [
  bindProject({
    projectId: "strategy-dot-zero-change-impact",
    heroMedia: {
      src: "/case-studies/strategy-dot-zero-change-impact/project-plan-change-impact.webp",
      alt: "Strategy Dot Zero project plan showing the Change impact module",
      width: 2048,
      height: 1304,
      label: "Project plan entry point",
    },
    headline:
      "Turning a forgotten register into an active workflow for organisational change.",
    deck:
      "The module sits inside Strategy Dot Zero's project planning workflow. It helps project and program managers describe the change created by a project, while PMO teams can see readiness and overlapping impact across the organisation.",
    problem:
      "The previous feature was little more than a standalone table. A project manager could record a change, but there was no useful relationship between that change, the people affected, preparation actions, reporting periods, or the wider portfolio. Records were easy to create and just as easy to forget.",
    outcome:
      "An approved end-to-end model connecting project planning with stakeholder readiness, action reporting, and organisation-wide PMO oversight.",
    storyIntro:
      "The brief looked small, but the model touched two very different levels of the product. Project teams needed a practical way to define and manage one change. PMO teams needed those records to combine into a trustworthy view of pressure across the portfolio. I treated the work as a relationship-design problem, not a screen refresh.",
    snapshot: [
      {
        label: "Delivery",
        value: "One week from first draft through iteration and final approval.",
      },
      {
        label: "Core model",
        value: "The change itself became the organising object.",
      },
      {
        label: "Connected flow",
        value: "Assessment, timing, actions, reporting, and PMO visibility.",
      },
      {
        label: "Enterprise view",
        value: "A cross-project map of impact by business unit and month.",
      },
    ],
    frictions: [
      {
        title: "The old feature stopped at data entry",
        description:
          "A static row could describe an impact, but it did not help teams prepare for it, report against it, or use it in later planning decisions.",
      },
      {
        title: "A business-unit-first model told the wrong story",
        description:
          "Business pressure pushed the design toward selecting an affected unit first. In testing, that framing felt administrative and hid the actual change people needed to understand.",
      },
      {
        title: "Timing lacked readiness and accountability",
        description:
          "Knowing when a group might be affected was not enough. Teams also needed actions, owners, dates, and a simple reporting rhythm to keep preparation moving.",
      },
      {
        title: "PMO could not see cumulative impact",
        description:
          "One project record provided limited value on its own. Portfolio teams needed to compare where several projects were affecting the same groups at the same time.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Place the feature inside project planning",
        description:
          "Mapped where change impact belongs in the draft-to-baseline project plan and how it relates to deliverables, benefits, risks, and governance review.",
      },
      {
        phase: "02",
        title: "Reconstruct the end-to-end workflow",
        description:
          "Reduced the PRD to four questions: what is changing, who is affected and when, what will we do, and where are impacts overlapping across the organisation.",
      },
      {
        phase: "03",
        title: "Make the change the core object",
        description:
          "Structured each record around a named organisational change, then linked deliverables, categories, impact level, stakeholders, timing, and actions to it.",
      },
      {
        phase: "04",
        title: "Prototype the project-team workflow",
        description:
          "Designed the profile, stakeholder timing, change actions, and tracking states as a compact sequence that project and program managers could maintain.",
      },
      {
        phase: "05",
        title: "Validate the framing with users",
        description:
          "Compared the change-centred model with the proposed business-unit-first approach. Users related more easily to the change and could explain its impact with less prompting.",
      },
      {
        phase: "06",
        title: "Extend the same model to PMO",
        description:
          "Rolled project records into a register and timeline so portfolio teams could scan severity, overlap, action health, and the detail behind each signal.",
      },
    ],
    decisions: [
      {
        issue: "The model needed a meaningful starting point.",
        decision:
          "Anchored the experience on the actual organisational change, then captured affected business units and stakeholders inside that change profile.",
        result:
          "Users could describe cause and consequence as one story, instead of starting with an administrative unit and reconstructing the meaning later.",
        tradeoff:
          "Business-unit data still remained essential, but it became a relationship to the change rather than the identity of the record.",
      },
      {
        issue: "One large form would make a small feature feel heavy.",
        decision:
          "Separated the workflow into Impact Profile, Stakeholders and Timing, and Change Actions, with a distinct tracking mode after setup.",
        result:
          "Each view answered one plain question and gave project managers a clear next step without hiding the overall relationship.",
        tradeoff:
          "The workflow added navigation, so the section labels and progression had to stay simple and predictable.",
      },
      {
        issue: "A plan without reporting would become another static record.",
        decision:
          "Kept recurring reporting in scope and tied the overall change status to action-level updates using On track, Alert, and Off track states.",
        result:
          "Change impact became something teams could monitor over time, not a form completed only for project approval.",
        tradeoff:
          "Reporting adds a recurring responsibility, so the interaction was intentionally short and focused on status plus a concise comment.",
      },
      {
        issue: "PMO needed more than another enterprise register.",
        decision:
          "Paired the register with an Impact Timeline and an Action Timeline, organised by stakeholder or business unit across months.",
        result:
          "Portfolio teams could spot where multiple projects were creating pressure, then open the change or action behind the signal.",
        tradeoff:
          "The map depends on consistent project-level reporting, so the register remained available for verification and follow-up.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: a record people could forget",
      beforeItems: [
        "Change impact existed as an isolated table.",
        "Business units were captured without a clear change narrative.",
        "No preparation actions or reporting rhythm followed the assessment.",
        "PMO had no useful view of overlapping organisational pressure.",
      ],
      afterTitle: "After: a connected operating workflow",
      afterItems: [
        "Every record starts with a named organisational change.",
        "Stakeholders, business units, impact level, and timing stay connected.",
        "Actions, owners, dates, and reporting states turn assessment into follow-through.",
        "PMO can compare impact and planned actions across projects and months.",
      ],
    },
    finalMoments: [
      {
        title: "Define the change profile",
        description:
          "A focused assessment captures the named change, linked deliverables, category, impact level, and expected period before deeper planning begins.",
        tags: ["Project manager", "Assessment"],
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/change-profile-form.webp",
            alt: "Change impact form for naming and assessing an organisational change",
            width: 1600,
            height: 1736,
            label: "Impact profile",
          },
        ],
      },
      {
        title: "Map stakeholders and timing",
        description:
          "Project teams connect each change to affected business units, explain the impact, and define when the effect starts, peaks, and ends.",
        tags: ["Stakeholders", "Timing"],
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/stakeholder-timing.webp",
            alt: "Stakeholders and timing screen listing impacted business units and impact levels",
            width: 1440,
            height: 900,
            label: "Stakeholders and timing",
          },
        ],
      },
      {
        title: "Plan preparedness actions",
        description:
          "Actions turn a high-level impact into practical preparation, with target groups, owners, dates, and status kept close to the change profile.",
        tags: ["Readiness", "Ownership"],
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/change-actions.webp",
            alt: "Change actions screen showing preparedness actions and their status",
            width: 1440,
            height: 900,
            label: "Change actions",
          },
        ],
      },
      {
        title: "Track and report change health",
        description:
          "The tracking view combines action-level health into a readable overall state, while short reporting-period updates preserve accountability without creating another long form.",
        tags: ["Reporting", "Status model"],
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/action-tracking.webp",
            alt: "Change impact tracking screen with On track, Alert, and Off track action states",
            width: 1440,
            height: 900,
            label: "Tracking overview",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/action-reporting.webp",
            alt: "Reporting modal for updating change action status by reporting period",
            width: 1600,
            height: 1736,
            label: "Reporting-period update",
          },
        ],
      },
      {
        title: "See cumulative organisational impact",
        description:
          "The PMO view shifts from individual project records to a month-by-month impact map, making concurrent pressure on business units visible and explorable.",
        tags: ["PMO", "Portfolio view"],
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/impact-map.webp",
            alt: "Organisation-wide change impact map by business unit and month",
            width: 1440,
            height: 900,
            label: "Impact timeline",
          },
        ],
      },
      {
        title: "Keep the portfolio auditable",
        description:
          "A companion register preserves the complete record for filtering and review, while the map remains the faster surface for pattern recognition.",
        tags: ["Register", "Governance"],
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/change-register.webp",
            alt: "PMO change impact register with project, business unit, timing, impact, and status fields",
            width: 1440,
            height: 900,
            label: "Change impact register",
          },
        ],
      },
    ],
    impact: [
      {
        label: "Operational value",
        value:
          "The feature moved from a static record to a workflow teams could assess, prepare for, and report against.",
      },
      {
        label: "User clarity",
        value:
          "The change-centred structure tested more clearly than the proposed business-unit-first model.",
      },
      {
        label: "PMO visibility",
        value:
          "Project-level assessments now roll into a view of overlapping impact across groups and months.",
      },
      {
        label: "Accountability",
        value:
          "Actions and reporting states connect anticipated impact to the work required to manage it.",
      },
    ],
    reflection:
      "The most important design move was choosing the right unit of thought. Change impact is not a list of business units; it is a story about what is changing, who will feel it, when it will happen, and what the organisation will do in response.",
  }),
  bindProject({
    projectId: "dubai-holding-destination-system",
    headline:
      "Turning a complex destination operation into a calmer experience system.",
    deck:
      "The work focused on reducing the gap between what teams knew, what guests needed, and what leaders could act on.",
    problem:
      "The destination experience had many moving parts: guest journeys, operational signals, partner handoffs, and priority decisions. The problem was not a lack of information. It was that the information lived in too many shapes, which made simple decisions feel slow.",
    outcome:
      "A clearer operating layer that helped teams see journey health, ownership, and next actions without turning the interface into another report.",
    storyIntro:
      "I treated the project like a clarity problem first. Before designing screens, I mapped where people paused: moments where a team had the right intent but not the right signal, owner, or next step. The final system was built around removing those pauses one by one.",
    snapshot: [
      {
        label: "Core challenge",
        value: "Make journey operations easier to scan across teams.",
      },
      {
        label: "Primary shift",
        value: "From scattered signals to a shared decision surface.",
      },
      {
        label: "NDA-safe outcome",
        value: "Clearer prioritization, escalation, and handoff visibility.",
      },
    ],
    frictions: [
      {
        title: "Signals were visible but not comparable",
        description:
          "Teams could see individual updates, but comparing journey moments across areas required too much interpretation.",
      },
      {
        title: "Ownership was easy to lose",
        description:
          "A guest issue could move across service, operations, and partner teams without a clear sense of who owned the next action.",
      },
      {
        title: "Leadership needed less noise",
        description:
          "Executives needed a composed view of risk and opportunity, not a dense wall of operational detail.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Audit the journey model",
        description:
          "Grouped touchpoints, teams, and signals into a shared model that could support both daily operations and executive review.",
      },
      {
        phase: "02",
        title: "Define decision levels",
        description:
          "Separated what each audience needed: issue discovery, ownership, escalation, and strategic pattern recognition.",
      },
      {
        phase: "03",
        title: "Prototype the operating surface",
        description:
          "Designed views around journey health, priority queues, and contextual drill-downs instead of disconnected dashboards.",
      },
      {
        phase: "04",
        title: "Systemize reusable states",
        description:
          "Created repeatable treatments for risk, attention, handoffs, empty states, and calmer status language.",
      },
    ],
    decisions: [
      {
        issue: "People needed to compare moments quickly.",
        decision:
          "Used a journey-band structure with consistent signal density, so each stage could be read side by side.",
        result:
          "The interface made patterns easier to spot without forcing users into deep drill-downs first.",
      },
      {
        issue: "Escalations felt disconnected from ownership.",
        decision:
          "Paired status cues with owner, next step, and timeframe in the same visual unit.",
        result:
          "A concern could move from observation to action with less back-and-forth.",
      },
      {
        issue: "The system needed to feel premium, not busy.",
        decision:
          "Used restrained color, clear hierarchy, and generous whitespace around decision-critical data.",
        result:
          "The experience stayed calm while still carrying operational depth.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: fragmented visibility",
      beforeItems: [
        "Signals lived in separate views.",
        "Status needed verbal explanation.",
        "Priority was inferred instead of explicit.",
      ],
      afterTitle: "After: one readable operating layer",
      afterItems: [
        "Journey stages shared the same grammar.",
        "Ownership and next actions were visible.",
        "Escalation cues were easier to compare.",
      ],
    },
    finalMoments: [
      {
        title: "Journey health view",
        description:
          "A top-level scan of destination moments, risk areas, and emerging guest experience patterns.",
        tags: ["Signals", "Journey stages"],
      },
      {
        title: "Priority queue",
        description:
          "A composed list of items needing attention, sorted by urgency, owner, and business context.",
        tags: ["Ownership", "Escalation"],
      },
      {
        title: "Decision detail",
        description:
          "A drill-down pattern that keeps the why, owner, evidence, and next step together.",
        tags: ["Context", "Next action"],
      },
      {
        title: "Reusable status language",
        description:
          "A small status model that reduced one-off labels and helped teams speak the same language.",
        tags: ["System", "Consistency"],
      },
    ],
    impact: [
      {
        label: "Clarity",
        value: "Reduced the effort needed to understand where attention was needed.",
      },
      {
        label: "Alignment",
        value: "Gave product, operations, and leadership a shared view of the journey.",
      },
      {
        label: "Scalability",
        value: "Created patterns that could extend across new destination moments.",
      },
    ],
    reflection:
      "The useful design move was resisting the urge to show everything equally. Once the system had a clear point of view about what mattered first, the screens became much easier to understand.",
  }),
  bindProject({
    projectId: "dhda-service-journeys",
    headline:
      "Designing a living map of health policy, with a governed workspace behind it.",
    deck:
      "The platform helped policy teams explore relationships across health domains, population cohorts, pressures, social determinants, and operating models, while PMO teams could safely create, verify, approve, and publish the data behind the visual landscape.",
    problem:
      "Health policy information was not missing. It was fragmented across frameworks, reports, datasets, cohorts, and teams. Senior stakeholders needed to see how pressures, domains, services, and population groups connected, but the existing mental model was built for documentation rather than exploration. AI could help surface patterns, but only if provenance, human control, and review were visible from the start.",
    outcome:
      "A two-sided product model: an Explore experience for understanding the health landscape, and a PMO-facing management hub for maintaining the content lifecycle behind it. The MVP translated a complex ontology into a navigable interface, introduced visible AI trust cues, and was demonstrated to senior government executives as the foundation for phased expansion.",
    storyIntro:
      "The project became a systems navigation problem. I had to make a national health ecosystem feel explorable without flattening its complexity, and then design the operational layer that kept the visible experience accurate, governed, and publication-ready.",
    snapshot: [
      {
        label: "3 sections",
        value:
          "Explore, AI insight, and management flows scoped and designed end-to-end.",
      },
      {
        label: "4 systems",
        value:
          "Operating environment, operating model, core health system, and cohort/domain layers connected into one product model.",
      },
      {
        label: "9+ cohorts",
        value:
          "Population cohorts and social determinants mapped across the landscape.",
      },
      {
        label: "MVP",
        value:
          "Demonstrated to senior government executives with a phased roadmap for expansion.",
      },
    ],
    frictions: [
      {
        title: "The system was too large to hold in one view",
        description:
          "Health policy decisions touched children, First Nations communities, aged populations, disability, service tiers, determinants, and global benchmarks. Each area had its own language and data shape.",
      },
      {
        title: "People asked for better reports, but needed better navigation",
        description:
          "Stakeholders rarely struggled because information was unavailable. They struggled because relationships were invisible, context was hard to maintain, and the system was not designed for exploration.",
      },
      {
        title: "AI had to earn confidence in a high-consequence domain",
        description:
          "Generative AI could support insight generation, but senior users needed to know what was verified, what was generated, and where each piece of information came from.",
      },
      {
        title: "The visual front end needed operational control behind it",
        description:
          "The Explore experience could stay simple only if PMO teams had a governed way to populate domains, invite collaborators, preview changes, approve content, and publish safely.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Frame the concept and trust philosophy",
        description:
          "Shaped the initial value proposition, executive story, AI trust principles, and high-level interaction model so three entities could align around the same product direction.",
      },
      {
        phase: "02",
        title: "Run stakeholder and story workshops",
        description:
          "Facilitated workshops with policy teams, analysts, domain specialists, and executive stakeholders, translating latent needs into user stories, PRDs, and prioritized features.",
      },
      {
        phase: "03",
        title: "Translate ontology into product structure",
        description:
          "Worked with ontology architects to turn the four-system health model, domain tiers, cohorts, and STEEPLEO pressure framework into navigation users could reason through.",
      },
      {
        phase: "04",
        title: "Design the Explore interaction model",
        description:
          "Designed the exploratory flow across system, cohort, domain, and pressure, including the AI trust layer, life-course toggles, domain drill-downs, and scenario simulation concepts.",
      },
      {
        phase: "05",
        title: "Build the management hub workflow",
        description:
          "Designed and integrated the PMO hub with a small team, covering domain data entry, upload/manual/AI methods, preview, approval, and publishing into Explore.",
      },
    ],
    decisions: [
      {
        issue: "The product needed two mental models, not one.",
        decision:
          "Separated the public Explore experience from the PMO management experience. End users see approved landscape insight; PMO teams manage the lifecycle behind it.",
        result:
          "Explore stayed calm and visual, while the operational complexity of data entry, assignments, approvals, and publishing lived where it belonged.",
      },
      {
        issue: "The ontology could not stay hidden in a backend model.",
        decision:
          "Used the system architecture itself as the interaction model: system of systems, cohort, domain, pressure, threat or opportunity, and impact.",
        result:
          "The interface helped users feel the structure of the landscape instead of forcing them to read a taxonomy before they could explore.",
      },
      {
        issue: "AI needed to feel useful without becoming the authority.",
        decision:
          "Placed AI beside upload and manual entry as one content method, and paired generated outputs with visible source, confidence, and human review cues.",
        result:
          "Generated content became a draft source to inspect, not an unexplained answer the organisation had to trust blindly.",
      },
      {
        issue: "Back-office editing had to connect to the public view.",
        decision:
          "Made Preview Explore View a core step before approval, so PMO teams could see how domain content would appear in the visual landscape.",
        result:
          "The workflow closed the gap between content operations and user experience, making publication feel deliberate and reviewable.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: fragmented policy visibility",
      beforeItems: [
        "Reports, frameworks, datasets, and domain knowledge lived in separate places.",
        "Relationships between cohorts, pressures, services, and outcomes were hard to see.",
        "AI-generated insight risked feeling opaque without visible provenance.",
        "Updating the landscape depended on manual handoffs and unclear governance.",
      ],
      afterTitle: "After: explorable and governable",
      afterItems: [
        "A visual Explore layer made the health system easier to navigate.",
        "The ontology became a product model users could move through.",
        "Verified information and AI-generated content had separate trust cues.",
        "The PMO hub gave teams a clear path to edit, preview, approve, and publish.",
      ],
    },
    finalMoments: [
      {
        title: "Landscape visualization",
        description:
          "A visual front door that showed the health ecosystem as a connected landscape rather than another report.",
        tags: ["Explore", "System view"],
      },
      {
        title: "Cohort and domain drill-down",
        description:
          "A navigable path from system overview into cohorts, health domains, pressures, and domain-level context.",
        tags: ["Cohorts", "Domains"],
      },
      {
        title: "AI trust layer",
        description:
          "A visible grammar for separating verified source material from generated insight, with AI treated as a reviewed draft source.",
        tags: ["Provenance", "Human review"],
      },
      {
        title: "PMO management hub",
        description:
          "A management-only workspace with dashboard, configuration, AI settings, landscape management, content management, and reports library.",
        tags: ["Manage", "Governance"],
      },
      {
        title: "Domain workspace template",
        description:
          "A structured editor mirroring the public domain detail view, with tabs for vision, profile, policies, budget, stakeholders, research, pressures, source notes, and AI drafts.",
        tags: ["Content model", "Templates"],
      },
      {
        title: "Approval and publishing lifecycle",
        description:
          "A governed flow from selecting a domain to choosing an entry method, editing, collaborating, previewing Explore, approving, and publishing approved data.",
        tags: ["Workflow", "Publishing"],
      },
    ],
    impact: [
      {
        label: "Strategic clarity",
        value:
          "Shifted the work from a data display problem into a systems navigation problem that senior stakeholders could understand quickly.",
      },
      {
        label: "Trust",
        value:
          "Made verified information, AI-generated content, source context, and human review visible in the interface instead of hiding trust in documentation.",
      },
      {
        label: "Governance",
        value:
          "Gave PMO teams a structured operating layer for domain ownership, content entry, preview, approval, and publication.",
      },
      {
        label: "Scalability",
        value:
          "Created a product model that could expand into natural-language policy exploration, cross-cohort navigation, scenario forecasting, and global benchmarking.",
      },
    ],
    reflection:
      "The biggest lesson was that complex systems become easier to use when the structure is not hidden. Once the ontology became the interaction model, the product stopped feeling like a dashboard and started feeling like a map.",
  }),
  bindProject({
    projectId: "national-projects-command-view",
    headline:
      "Creating an executive command view for national initiatives without turning it into dashboard noise.",
    deck:
      "The page had to help leaders understand progress, risk, and ownership quickly while preserving enough detail for meaningful follow-up.",
    problem:
      "Initiative tracking involved many programs, owners, statuses, dependencies, and escalations. The existing mental model was too fragmented for fast executive review, especially when progress and risk needed to be discussed in the same room.",
    outcome:
      "A composed command view that organized initiatives by status, momentum, ownership, and next action, giving leaders a clearer way to scan and discuss what needed attention.",
    storyIntro:
      "The central question was: what does a leader need to see before asking the first good question? I shaped the interface around that moment, then added depth only where it helped the conversation.",
    snapshot: [
      {
        label: "Core challenge",
        value: "Make initiative progress readable at executive speed.",
      },
      {
        label: "Primary shift",
        value: "From status reporting to decision-oriented visibility.",
      },
      {
        label: "NDA-safe outcome",
        value: "Clearer status models, escalation paths, and follow-up context.",
      },
    ],
    frictions: [
      {
        title: "Status did not explain momentum",
        description:
          "A project could look fine on paper while still carrying unresolved blockers or slow movement.",
      },
      {
        title: "Ownership was visible too late",
        description:
          "Leaders needed to know who could act without opening multiple layers of supporting material.",
      },
      {
        title: "Every metric wanted attention",
        description:
          "The interface had to be selective so the most important signals did not disappear into decoration.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Define the review questions",
        description:
          "Started from the questions leaders would ask in a review: what changed, what is stuck, who owns it, and what happens next.",
      },
      {
        phase: "02",
        title: "Shape the status model",
        description:
          "Separated progress, risk, urgency, and confidence so one label did not carry too much meaning.",
      },
      {
        phase: "03",
        title: "Design the command surface",
        description:
          "Built a scannable interface with portfolio overview, exception handling, and initiative-level context.",
      },
      {
        phase: "04",
        title: "Refine the discussion flow",
        description:
          "Adjusted hierarchy so the page could support both silent scanning and live executive discussion.",
      },
    ],
    decisions: [
      {
        issue: "Progress alone was not enough.",
        decision:
          "Introduced a momentum layer that separated planned status from actual movement.",
        result:
          "Leaders could distinguish stable work from work that needed intervention.",
      },
      {
        issue: "Escalations lacked context.",
        decision:
          "Grouped blockers with owner, dependency, and recommended next action.",
        result:
          "Follow-up became more concrete and less dependent on memory.",
      },
      {
        issue: "The page needed authority without heaviness.",
        decision:
          "Used a quiet visual system with restrained contrast, clear typographic tiers, and deliberate spacing.",
        result:
          "The interface felt executive and calm while still supporting dense information.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: reporting view",
      beforeItems: [
        "Status and risk were blended together.",
        "Exceptions were hard to prioritize.",
        "Follow-up context lived elsewhere.",
      ],
      afterTitle: "After: decision view",
      afterItems: [
        "Momentum and risk were separated.",
        "Exceptions had clear owner context.",
        "Next actions were visible in the review flow.",
      ],
    },
    finalMoments: [
      {
        title: "Portfolio scan",
        description:
          "A top-level view that showed initiative health, movement, and areas requiring leadership attention.",
        tags: ["Portfolio", "Momentum"],
      },
      {
        title: "Exception rail",
        description:
          "A focused lane for blockers, delayed decisions, dependencies, and items needing escalation.",
        tags: ["Risk", "Escalation"],
      },
      {
        title: "Owner context",
        description:
          "A compact pattern that linked every concern to accountable ownership and a practical next step.",
        tags: ["Ownership", "Action"],
      },
      {
        title: "Review-ready details",
        description:
          "Structured drill-downs that supported discussion without overwhelming the first screen.",
        tags: ["Detail", "Executive UX"],
      },
    ],
    impact: [
      {
        label: "Focus",
        value: "Helped important exceptions stand apart from ordinary status updates.",
      },
      {
        label: "Discussion",
        value: "Made review conversations easier to anchor around ownership and next action.",
      },
      {
        label: "System",
        value: "Created status and escalation patterns that could repeat across initiatives.",
      },
    ],
    reflection:
      "Executive interfaces are not about showing less. They are about showing the right thing first, then making the second question easy to answer.",
  }),
  bindProject({
    projectId: "tasama-workflow-suite",
    headline:
      "Designing a workflow suite that made service work feel organized instead of crowded.",
    deck:
      "The product needed to support repeatable operational tasks, dense information, and multiple user roles without becoming tiring to use every day.",
    problem:
      "Service teams were moving through recurring tasks, handoffs, requests, and exceptions. The interface needed to carry operational density while still helping people understand what to do next.",
    outcome:
      "A modular workflow experience with reusable patterns for queues, task details, service status, and interaction states, designed for repeated daily use.",
    storyIntro:
      "This was a practical product design problem: the work was already complex, so the interface had to be calm. I focused on making routine actions fast and exceptions visible without letting either dominate the whole product.",
    snapshot: [
      {
        label: "Core challenge",
        value: "Balance operational density with low-friction daily use.",
      },
      {
        label: "Primary shift",
        value: "From isolated task screens to reusable workflow patterns.",
      },
      {
        label: "NDA-safe outcome",
        value: "More consistent queues, clearer task states, and reusable components.",
      },
    ],
    frictions: [
      {
        title: "Queues needed sharper hierarchy",
        description:
          "Users had many items to process, but the page did not always make urgency and next action easy to identify.",
      },
      {
        title: "Task details were too one-off",
        description:
          "Similar work appeared in different layouts, which made the product harder to learn and maintain.",
      },
      {
        title: "States needed more polish",
        description:
          "Loading, empty, disabled, hover, focus, and completed states needed to feel like part of the same system.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Map recurring work",
        description:
          "Identified the task patterns that repeated across services: queue, assign, review, act, pause, and resolve.",
      },
      {
        phase: "02",
        title: "Design the core loop",
        description:
          "Built the main workflow around scanning, opening, deciding, and returning to the queue with minimal friction.",
      },
      {
        phase: "03",
        title: "Create component patterns",
        description:
          "Standardized controls, status chips, detail panels, action bars, and empty states across the suite.",
      },
      {
        phase: "04",
        title: "Polish interaction states",
        description:
          "Added motion and state feedback where it made the product feel more responsive and less brittle.",
      },
    ],
    decisions: [
      {
        issue: "Users needed to process work quickly.",
        decision:
          "Gave queue rows stable structure with priority, status, owner, and action cues in predictable positions.",
        result:
          "Scanning became faster because each row answered the same questions in the same order.",
      },
      {
        issue: "Details could become overwhelming.",
        decision:
          "Used a split structure that kept the active task visible while supporting contextual detail.",
        result:
          "Users could act without losing their place in the workflow.",
      },
      {
        issue: "The product needed to scale across services.",
        decision:
          "Turned repeated interface decisions into component patterns instead of one-off screens.",
        result:
          "The suite became easier to extend while staying visually consistent.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: task-by-task screens",
      beforeItems: [
        "Similar actions looked different.",
        "Queue priority needed interpretation.",
        "State feedback was inconsistent.",
      ],
      afterTitle: "After: workflow system",
      afterItems: [
        "Queues used predictable structure.",
        "Task detail supported quick action.",
        "Components carried consistent states.",
      ],
    },
    finalMoments: [
      {
        title: "Work queue",
        description:
          "A dense but structured queue designed for quick scanning, filtering, and repeated action.",
        tags: ["Queue", "Priority"],
      },
      {
        title: "Task detail panel",
        description:
          "A focused task surface that kept context, action, notes, and handoff information close together.",
        tags: ["Task flow", "Context"],
      },
      {
        title: "Component library",
        description:
          "Reusable controls and status patterns that kept the workflow suite consistent as it expanded.",
        tags: ["System", "Components"],
      },
      {
        title: "Motion polish",
        description:
          "Small transitions for opening, resolving, loading, and returning to the queue without layout shift.",
        tags: ["Motion", "Feedback"],
      },
    ],
    impact: [
      {
        label: "Efficiency",
        value: "Made repeated service tasks easier to scan, start, and complete.",
      },
      {
        label: "Consistency",
        value: "Reduced one-off interaction patterns across related workflows.",
      },
      {
        label: "Maintainability",
        value: "Created a component approach that could support new service modules.",
      },
    ],
    reflection:
      "The best workflow products are not loud. They make the next right action feel obvious, then get out of the way quickly.",
  }),
];

export function getCaseStudyById(id: string) {
  return caseStudies.find((caseStudy) => caseStudy.project.id === id) ?? null;
}
