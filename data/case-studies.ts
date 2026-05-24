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
};

type BeforeAfter = {
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
};

type FinalMoment = StoryCard & {
  tags: string[];
};

type ImpactPoint = {
  label: string;
  value: string;
};

export type CaseStudy = {
  project: SelectedProject;
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
      "Making high-trust government service journeys easier to understand and complete.",
    deck:
      "The experience needed to support people through important decisions without making the service feel cold, dense, or bureaucratic.",
    problem:
      "The service flow asked users to provide information, understand eligibility, and make decisions in moments where clarity mattered. The challenge was to reduce uncertainty without oversimplifying the policy and accessibility requirements behind the service.",
    outcome:
      "A structured service journey with clearer language, stronger hierarchy, accessible interaction patterns, and decision support that helped users move forward with more confidence.",
    storyIntro:
      "This case study is about trust. The users were not failing because they were careless. They were hesitating because the interface asked them to interpret too much at once. I focused on making each step feel more answerable.",
    snapshot: [
      {
        label: "Core challenge",
        value: "Reduce hesitation in a high-trust public service flow.",
      },
      {
        label: "Primary shift",
        value: "From dense task screens to guided decision moments.",
      },
      {
        label: "NDA-safe outcome",
        value: "More scannable forms, clearer guidance, and better accessibility coverage.",
      },
    ],
    frictions: [
      {
        title: "Users had to decode policy language",
        description:
          "Important guidance was accurate, but it often read like internal language rather than user-facing help.",
      },
      {
        title: "Decision points were buried",
        description:
          "People could complete fields, but it was not always clear why a question mattered or what would happen next.",
      },
      {
        title: "Accessibility needed to be native",
        description:
          "The flow had to work cleanly for keyboard, screen reader, and low-vision users from the start.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Map the service moments",
        description:
          "Separated eligibility, evidence, review, and submission moments so each step had a clear job.",
      },
      {
        phase: "02",
        title: "Rewrite for action",
        description:
          "Turned dense instructions into plain-language prompts, labels, and confirmation states.",
      },
      {
        phase: "03",
        title: "Design accessible patterns",
        description:
          "Built repeatable form, summary, error, and support patterns with visible keyboard and reading order in mind.",
      },
      {
        phase: "04",
        title: "Test the hierarchy",
        description:
          "Reviewed each screen by asking whether the next action, reason, and consequence were visible without extra explanation.",
      },
    ],
    decisions: [
      {
        issue: "The service asked for information before earning confidence.",
        decision:
          "Added short context blocks before complex questions and kept help close to the field it explained.",
        result:
          "Users could understand why information was needed without leaving the step.",
      },
      {
        issue: "Long forms felt like one continuous obligation.",
        decision:
          "Grouped inputs into smaller service moments with progress, review, and save-state cues.",
        result:
          "The flow felt more manageable and easier to resume.",
      },
      {
        issue: "Errors risked sounding punitive.",
        decision:
          "Used specific, human error messages that described the fix instead of only naming the mistake.",
        result:
          "Recovery became part of the journey rather than a dead end.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: accurate but effortful",
      beforeItems: [
        "Instructions competed with form fields.",
        "Next steps were not always obvious.",
        "Support content felt separate from the task.",
      ],
      afterTitle: "After: guided and answerable",
      afterItems: [
        "Each step had one clear purpose.",
        "Help appeared near the moment of need.",
        "Review states made submission feel safer.",
      ],
    },
    finalMoments: [
      {
        title: "Guided eligibility step",
        description:
          "A clearer opening sequence that helped users understand whether they were in the right service path.",
        tags: ["Eligibility", "Plain language"],
      },
      {
        title: "Accessible form system",
        description:
          "Input, error, helper, review, and confirmation patterns designed as one connected service grammar.",
        tags: ["Forms", "WCAG-aware"],
      },
      {
        title: "Review before submit",
        description:
          "A calm summary screen that made submission feel deliberate, reversible, and trustworthy.",
        tags: ["Review", "Trust"],
      },
      {
        title: "Decision support copy",
        description:
          "Short contextual messages that explained consequences without overwhelming the main task.",
        tags: ["Content UX", "Confidence"],
      },
    ],
    impact: [
      {
        label: "Usability",
        value: "Reduced the number of moments where users had to guess what a question meant.",
      },
      {
        label: "Accessibility",
        value: "Kept keyboard, reading order, focus, and error recovery visible in the design system.",
      },
      {
        label: "Trust",
        value: "Made the service feel more supportive without hiding necessary detail.",
      },
    ],
    reflection:
      "Good public service UX is often quiet. The strongest work was in making the service feel less like a document and more like a steady conversation.",
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
