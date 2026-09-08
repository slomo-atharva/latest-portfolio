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
  /** One sentence shown under the image in a gallery chapter. */
  caption?: string;
  /** True while the artefact is still to be exported. Renders a slot, not a broken image. */
  pending?: boolean;
};

/**
 * A chapter is one beat of the story. Unlike the templated sections, chapters
 * differ per project: the headings, the order, and the number of them are all
 * written for the case study they belong to.
 */
export type CaseStudyChapter = {
  id: string;
  /** Short label for the side navigator. */
  name: string;
  title: string;
  body?: string[];
  pull?: string;
  media?: CaseStudyMedia[];
  /** "figure" is one artefact under the copy; "gallery" is captioned screens. */
  layout?: "figure" | "gallery";
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
  /**
   * When present, the case study renders as a written narrative instead of the
   * templated section engine. The fields below stay populated because the hero
   * and context blocks still read from them.
   */
  chapters?: CaseStudyChapter[];
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
    chapters: [
      {
        id: "where-it-lived",
        name: "Where it lived",
        title: "It lived in a document people stop opening",
        body: [
          "Change Impact was the eighth item in the project plan's left nav, sitting between Issues and Related Links. To reach it you opened a project, opened its plan, and scrolled.",
          "That placement was the whole problem, and it took listening to project managers to understand why. They draft the plan, get it baselined, and then largely stop opening it. After baseline the work moves to the registers, the WBS, and the status report. So change impact was a thing you filled in once, inside a document you were about to stop using.",
          "The form itself was competent. Category, stakeholder impacted, level of impact, a thousand characters of comment, and change strategies underneath it with a review date and a responsible person. So it was never that people couldn't describe a change. It was that nothing ever asked about it again. No status on a strategy. No reporting period. No register listing changes across projects.",
        ],
        pull: "Easy to fill. Easy to forget.",
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/process-current-state.webp",
            alt: "Current state audit board: the legacy change impact screens, the current flow, and the reported user issues",
            width: 2800,
            height: 2366,
            label: "The current-state audit: screens, flow, and everything users had reported",
          },
        ],
      },
      {
        id: "the-only-view",
        name: "The only view",
        title: "The only way to see any of it was Power BI",
        body: [
          "PMO and executives did have a view. Twenty-one projects with impacts, broken down by stakeholder and by category, plotted across nearly two years. It just wasn't in the product. It was a Power BI dashboard sitting alongside it.",
          "That is a reasonable thing to build when a feature has no register of its own. It is a bad thing to leave standing, because the people who most needed to act on organisational change were reading about it somewhere they could not act.",
        ],
      },
      {
        id: "the-anchor",
        name: "The anchor",
        title: "The one question the design turned on: what is a change impact anchored to?",
        body: [
          "The business had a suggestion: anchor it to the business unit. Pick who is affected, then describe what is happening to them. It is a defensible idea. It matches how the Power BI dashboard already sliced the data, and business unit is genuinely how PMO thinks.",
          "I wasn't sure it would survive contact with a real project, so before drawing a single screen I wrote out both journeys against the same scenario: one project manager, one change called “ways of working changes”, affecting five business units.",
          "Anchored to the business unit, he opens the drawer, picks Finance, and describes the change. Then he does it again for HR. Then Operations, IT, Procurement. One record per unit. At the end he is looking at a register showing a row for each one, and no way to track them as the single change they actually are.",
          "Anchored to the change, he names it once, links every affected unit, sets the impact dates, and adds the change strategy in the same drawer. One record. One status.",
          "Both journeys are identical until the drawer opens. Everything after that point is a consequence of what the drawer asks for first.",
          "We anchored it to the change.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/process-approach.webp",
            alt: "Approach board: the anchor question, both written journeys, the journey map, and the two data models",
            width: 1882,
            height: 2800,
            label: "Both journeys, written out before anything was drawn",
          },
        ],
      },
      {
        id: "the-model",
        name: "The model",
        title: "The picture I worked from",
        body: [
          "Once the change is the object, everything else has somewhere to attach: the impact profile, the affected stakeholders and their timing, the change actions, the reporting. And because there is now one record per change rather than one per business unit, those records roll up into a PMO view without anyone reconciling anything first.",
          "The other move is placement. Change impact still lives in the project plan, because that is where a change gets identified. But it also lives in a register of its own, which is where a project manager actually works once the plan is baselined.",
          "Status had the same problem as placement: it needed to come from somewhere real. Rather than ask a project manager to set an overall status by feel, the change's status is derived by business rule from the status of its actions. What the person writes each reporting period is the overall comment, the one part a rule cannot compute.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/process-entire-picture.webp",
            alt: "The object model showing what attaches to the change and rolls up to PMO, with the status tracking model underneath",
            width: 2199,
            height: 2800,
            label: "What hangs off the change, and where its status comes from",
          },
        ],
      },
      {
        id: "what-changes",
        name: "What changes",
        title: "What changes",
        body: [
          "Before: business unit, description, impact level. Change strategies and owners did exist. Status, reporting and any view outside the plan did not.",
          "After: plan or register, then the change, then stakeholders, actions and reporting hanging off it, all of it rolling into the PMO impact map.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/process-what-changes.webp",
            alt: "Handwritten before and after pages comparing the old table with the new model",
            width: 2800,
            height: 2309,
            label: "The before and after, worked out on paper",
          },
        ],
      },
      {
        id: "the-work",
        name: "The work",
        title: "The screens",
        layout: "gallery",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-change-impact/change-profile-form.png",
            alt: "Change impact form for naming and assessing an organisational change",
            width: 1600,
            height: 1736,
            label: "Impact profile",
            caption:
              "The change gets named first. Category, impact level, linked deliverables, and the period it is expected to run.",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/stakeholder-timing.webp",
            alt: "Stakeholders and timing screen listing impacted business units and impact levels",
            width: 1440,
            height: 900,
            label: "Stakeholders and timing",
            caption:
              "Every affected business unit on one record, each with its own impact description and its own start, peak and end.",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/change-actions.webp",
            alt: "Change actions screen showing preparedness actions and their status",
            width: 1440,
            height: 900,
            label: "Change strategy",
            caption:
              "Change strategy kept next to the change it belongs to, with a target group, an owner and a date.",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/action-tracking.png",
            alt: "Change impact tracking screen with On track, Alert, and Off track action states",
            width: 2880,
            height: 1800,
            label: "Tracking",
            caption:
              "Action states roll into the change's overall status by rule, so nobody sets it by feel.",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/action-reporting.png",
            alt: "Reporting modal for updating change action status by reporting period",
            width: 1600,
            height: 1736,
            label: "Reporting period",
            caption:
              "Each reporting period asks for the one thing a rule cannot compute: the overall comment.",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/impact-map.png",
            alt: "Organisation-wide change impact map by business unit and month",
            width: 2880,
            height: 1800,
            label: "PMO impact map",
            caption:
              "The view that replaces the Power BI tab. Business unit down, month across, projects stacked where they overlap.",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/change-register.png",
            alt: "PMO change impact register with project, business unit, timing, impact, and status fields",
            width: 2880,
            height: 1800,
            label: "Change register",
            caption:
              "And the register underneath it, for when someone needs the row rather than the pattern.",
          },
        ],
      },
      {
        id: "looking-back",
        name: "Looking back",
        title: "What I'd change",
        body: [
          "The business-unit anchor was not a bad idea, it was a bad anchor, and the only reason I could say so was that I wrote the journey out before I drew a screen. Taste would not have won that argument. Two journeys did.",
          "The thing I would genuinely test properly is the impact map with a real portfolio behind it. Twenty-one projects looked fine in Power BI. I have no idea what two hundred looks like in mine.",
        ],
      },
    ],
    headline:
      "It lived in the project plan, and project managers stop opening the project plan.",
    deck:
      "Change impact is where a project records who in the organisation the work will actually land on. It sat as one tab inside the project plan. It now also has a register of its own, and rolls up into a view PMO can act on without leaving the product.",
    problem:
      "The previous feature was little more than a standalone table. A project manager could record a change, but there was no useful relationship between that change, the people affected, preparation actions, reporting periods, or the wider portfolio. Records were easy to create and just as easy to forget.",
    outcome:
      "An approved end-to-end model connecting project planning with stakeholder readiness, action reporting, and organisation-wide PMO oversight.",
    storyIntro:
      "The brief looked small, but the model touched two very different levels of the product. Project teams needed a practical way to define and manage one change. PMO teams needed those records to combine into a trustworthy view of pressure across the portfolio. I treated the work as a relationship-design problem, not a screen refresh.",
    snapshot: [
      {
        label: "Placement",
        value:
          "Out of a single tab in the project plan, into a register of its own.",
      },
      {
        label: "Anchor",
        value: "The change became the record, not the business unit.",
      },
      {
        label: "Status",
        value:
          "Change health is derived from action status by business rule, not set by feel.",
      },
      {
        label: "Visibility",
        value:
          "The PMO view moved out of a Power BI dashboard and into the product.",
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
            src: "/case-studies/strategy-dot-zero-change-impact/change-profile-form.png",
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
            src: "/case-studies/strategy-dot-zero-change-impact/action-tracking.png",
            alt: "Change impact tracking screen with On track, Alert, and Off track action states",
            width: 2880,
            height: 1800,
            label: "Tracking overview",
          },
          {
            src: "/case-studies/strategy-dot-zero-change-impact/action-reporting.png",
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
            src: "/case-studies/strategy-dot-zero-change-impact/impact-map.png",
            alt: "Organisation-wide change impact map by business unit and month",
            width: 2880,
            height: 1800,
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
            src: "/case-studies/strategy-dot-zero-change-impact/change-register.png",
            alt: "PMO change impact register with project, business unit, timing, impact, and status fields",
            width: 2880,
            height: 1800,
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
    projectId: "strategy-dot-zero-ai-project-extraction",
    chapters: [
      {
        id: "no-surface",
        name: "No surface",
        title: "Migration had no product surface at all",
        body: [
          "Strategy Dot Zero can only align work to strategy once the work is actually inside it. A new government client arrives with hundreds of projects already running across divisions, branches and units, tracked in plans, spreadsheets and status decks that follow no shared template.",
          "Onboarding already ran for months of consulting to model how the organisation works. The backlog they arrived with was treated as data entry afterwards, which meant it fell to our own delivery team or quietly never happened.",
          "There were two options and neither held. Ask the client to skip migration and start fresh, which no project manager accepts because it means running their work in two places. Or have our team key every project in from the back end, which works exactly once and does not survive the second client.",
        ],
      },
      {
        id: "how-it-gets-in",
        name: "How it gets in",
        title: "How a portfolio gets in today, and how it could",
        body: [
          "Before drawing anything I wrote out both routes for the same client: a PMO lead with hundreds of live projects and no way to bring them.",
          "Today he hands the documents over, our delivery team types every project in from the back end, and the projects appear in the register keyed by someone who has never run any of them. He has no way to tell a complete record from a thin one, so he checks all of them by hand or checks none. And none of the effort repeats. The next client starts the same process from zero.",
          "With the agent he uploads the documents exactly as he keeps them. The agent pauses to ask a short numbered set of questions and he skips the ones he does not care about. A draft batch comes back, each project scored for readiness, weak fields marked, and anything resembling a project already in the register flagged. He spends his review time on the thin ones and saves only what he has verified.",
          "The failure in the first route is not that it is slow. It is that it does not repeat, which is the difference between a service and a product.",
        ],
        pull: "Extraction is easy to demo and hard to trust.",
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/process-approach.webp",
            alt: "Approach board with both written journeys and a journey map comparing the manual back-end migration against the client extracting their own portfolio",
            width: 3502,
            height: 3600,
            label: "Both routes, written out before anything was drawn",
          },
        ],
      },
      {
        id: "the-line",
        name: "The line",
        title: "The line between the draft and the register",
        body: [
          "This data was going to become the operating record for a government portfolio, so the rule came before the interface. Everything the agent produces lives in a draft that sits outside the register and can be thrown away without consequence. Nothing crosses into the live plan, charter and registers except by an explicit human save.",
          "Not a high readiness score, not a confident field, not a batch action. On the draft side a person can reject, edit and verify at field level, and that is the whole point of keeping the draft reversible.",
          "This is the decision that made the feature approvable. Everything after it exists to make crossing that line a judgement rather than a formality.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/process-draft-line.webp",
            alt: "Diagram showing client documents feeding the agent into a reversible draft holding extracted projects, readiness scores, duplicate flags and proposals, separated from the live register by an explicit human save",
            width: 3600,
            height: 1867,
            label: "One hard boundary, crossed only on purpose",
          },
        ],
      },
      {
        id: "admits-doubt",
        name: "Where it doubts",
        title: "The four places it admits doubt",
        body: [
          "An extraction agent always returns something. The design problem is not what it can pull out of a document, it is where it tells you not to trust what it pulled.",
          "There are four such places. While parsing, it raises a short numbered set of clarifying questions, every one skippable. On each project card, a data readiness score. Inside the detail view, confidence per field. And against the live register, a suspected duplicate stated with its match strength, linked to the existing record, and never merged on your behalf.",
          "The readiness score is built on the preset mandatory fields the agent managed to extract. Each entity carries its own required fields, and identifying those correctly is the most important part of the job. Optional fields count for less because they only add information.",
          "Together they do one thing: send review effort to the projects that actually need it, instead of spreading it evenly across a batch of two hundred.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/process-admits-doubt.webp",
            alt: "Four surfaces where the agent admits uncertainty: clarifying questions while parsing, a data readiness score on the card, per-field confidence in the detail view, and a duplicate flagged with match strength",
            width: 3600,
            height: 2133,
            label: "Four surfaces, each answering a different question",
          },
        ],
      },
      {
        id: "two-altitudes",
        name: "Two altitudes",
        title: "One engine, two altitudes",
        body: [
          "A PMO lead can migrate a hundred projects and vouch for none of them. The project manager who could vouch for one was standing outside the flow entirely.",
          "So the same engine runs at two altitudes. The PMO extracts a whole portfolio in one pass and assigns each project to an owner. The project manager then refines the two or three they actually run, correcting what a bulk pass could never get right.",
          "AI access is licensed per seat, so most clients begin with PMO-only extraction. That turned out to be useful rather than limiting: the visible quality gap between a bulk import and a plan a project manager has been through became the clearest argument for extending seats.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/process-two-altitudes.webp",
            alt: "One extraction engine serving a PMO lead doing bulk migration and a project manager refining the projects they own, with the per-seat licensing constraint noted underneath",
            width: 3600,
            height: 1480,
            label: "The same flow, run by two different people for two different reasons",
          },
        ],
      },
      {
        id: "what-changes",
        name: "What changes",
        title: "What changes",
        body: [
          "Before: nothing inside the product. The client abandoned their history or our team keyed it in by hand, and neither route repeated.",
          "After: upload in any format, the agent asks and then parses, a scored draft comes back, a person verifies and commits, and only then does anything reach the live register.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/process-what-changes.webp",
            alt: "Before and after comparison of migration happening outside the product against the reviewed extraction flow inside the project register",
            width: 3600,
            height: 1898,
            label: "The before and after",
          },
        ],
      },
      {
        id: "the-work",
        name: "The work",
        title: "The screens",
        layout: "gallery",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/register-entry.png",
            alt: "The project register with the extraction entry point",
            width: 1440,
            height: 900,
            label: "Entry point",
            caption:
              "The flow starts inside the project register, so migration reads as a register action rather than a separate tool.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/upload.png",
            alt: "Upload surface accepting documents in any format with an optional prompt",
            width: 1440,
            height: 900,
            label: "Upload",
            caption:
              "Documents in whatever shape the client keeps them, with an optional prompt for narrowing what to look for.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/clarifying-questions.png",
            alt: "The agent asking a short numbered set of clarifying questions mid-extraction",
            width: 1440,
            height: 900,
            label: "Clarifying questions",
            caption:
              "The agent asks before it guesses. Short, numbered, and every one of them skippable.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/review-queue.png",
            alt: "Extracted projects as cards carrying readiness, ownership and stage",
            width: 1440,
            height: 900,
            label: "The review queue",
            caption:
              "Cards carry readiness, owner and stage, so a batch can be triaged before anyone opens a detail view.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/duplicate-resolution.png",
            alt: "A suspected duplicate stated with match strength and linked to the existing record",
            width: 1440,
            height: 900,
            label: "Duplicates",
            caption:
              "The match strength is stated and the existing record is one click away. The judgement stays with the person.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/project-detail.png",
            alt: "Project detail view mirroring the charter, plan, manage, report and govern structure",
            width: 1440,
            height: 900,
            label: "Verification",
            caption:
              "The detail view mirrors the real structure, so verification happens in the same shape the work continues in.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/extraction-summary.png",
            alt: "Extraction summary separating mandatory from optional fields with section coverage and average confidence",
            width: 1440,
            height: 900,
            label: "What was found",
            caption:
              "Mandatory separated from optional, with section coverage and average confidence, before anything is committed.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-ai-project-extraction/proposals.png",
            alt: "Suggested proposals held in their own tab, separate from the migration",
            width: 1440,
            height: 900,
            label: "Proposals",
            caption:
              "Suggestions sit in their own tab, so an expansion idea never quietly contaminates the migration the client asked for.",
            pending: true,
          },
        ],
      },
      {
        id: "looking-back",
        name: "Looking back",
        title: "What I'd change",
        body: [
          "The instinct with an extraction agent is to make it look certain. The more useful move was designing where it admits doubt: the questions it asks, the fields it marks low confidence, the duplicate it refuses to merge on your behalf. Certainty is cheap to render and expensive to be wrong about. Visible doubt is what let a government client point this at their own register.",
          "What I would test properly is the review queue against a real migration batch, a hundred or more projects with genuine duplicates and inconsistent stage names. Triage, filtering and bulk action are where this design will come under the most pressure, and a clean demo batch flatters it.",
        ],
      },
    ],
    headline:
      "Extraction is easy to demo and hard to trust, and this was going to become a government register.",
    deck:
      "The module sits at the first mile of Strategy Dot Zero onboarding. A new client's existing portfolio arrives as plans, spreadsheets and status decks that follow no template. The agent reads them. The design decides where a person gets to disagree with it before anything reaches the live register.",
    problem:
      "Strategy Dot Zero can only align work to strategy once the work is actually in it. But a new government client arrives with hundreds of projects already running across divisions, branches, and units, tracked in plans, spreadsheets, and status decks that follow no shared template. Until now there were two options and neither held. Ask the client to skip migration and start fresh, which no project manager accepts because it means running their work in two places. Or have our own team key every project in from the back end, which does not survive the second client.",
    outcome:
      "An approved end-to-end agent flow that reads unstructured client documents, maps them onto the real Strategy Dot Zero project model, checks them against the live register for duplicates, scores how ready each plan is, and commits only what a person has verified.",
    storyIntro:
      "The brief sounded like a parsing problem. It was a trust problem. Extraction is easy to demo and hard to trust, and this data was going to become the operating record for a government portfolio. So most of the design work was not about what the agent could pull out of a document. It was about where a person gets to disagree with it, and how quickly they can.",
    snapshot: [
      {
        label: "Where it sits",
        value:
          "The first mile of onboarding, before a single project exists in the platform.",
      },
      {
        label: "Core rule",
        value:
          "Extraction produces a draft. Only an explicit human save reaches the register.",
      },
      {
        label: "Doubt",
        value:
          "Four surfaces where the agent says it is not sure, so review effort can be aimed.",
      },
      {
        label: "Altitudes",
        value:
          "One engine serving PMO bulk migration and project-manager refinement.",
      },
    ],
    frictions: [
      {
        title: "Migration was the hidden blocker in every onboarding",
        description:
          "Onboarding already ran for months of consulting to model how a client organisation works. The existing project backlog was treated as data entry afterwards, so it fell to our own delivery team or quietly never happened at all.",
      },
      {
        title: "Every client's documents looked different",
        description:
          "A plan could arrive as a PDF, a spreadsheet export, or a status deck, with column names and stage labels that only made sense inside that organisation. No fixed import template could be assumed.",
      },
      {
        title: "A confident extraction is not a correct one",
        description:
          "The agent would always return something. Without a visible measure of how much of the model it actually filled, a PMO had no way to separate a near-complete plan from a shell with a title on it.",
      },
      {
        title: "Bulk migration invites duplicates",
        description:
          "Large portfolios repeat themselves across divisions and delivery partners. Importing at volume risked quietly creating a second copy of a project the register already held.",
      },
      {
        title: "The person importing is not the person who knows",
        description:
          "A PMO lead can migrate a hundred projects but cannot vouch for any single one. The project manager who could was standing outside the flow entirely.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Map the gap in onboarding",
        description:
          "Traced the client journey from signed contract to first usable portfolio and found the migration step had no product surface at all, only a services workaround.",
      },
      {
        phase: "02",
        title: "Model the target, not the source",
        description:
          "Started from the Strategy Dot Zero plan, charter, and registers, then worked backwards to define what any document would have to yield in order to fill them.",
      },
      {
        phase: "03",
        title: "Design the agent as a colleague",
        description:
          "Shaped the flow as a short exchange: parse first, then ask only the questions that genuinely change the output, and let the user skip every one of them.",
      },
      {
        phase: "04",
        title: "Make completeness visible",
        description:
          "Introduced data readiness and field-level confidence so review effort could be aimed at the weakest projects instead of spread evenly across the batch.",
      },
      {
        phase: "05",
        title: "Design the disagreement",
        description:
          "Built the review surface around reject, edit, and verify at field level, with an explicit commit step standing between the draft and the live register.",
      },
      {
        phase: "06",
        title: "Extend the engine to two altitudes",
        description:
          "Adapted the same flow for PMO bulk migration and for a project manager refining the two or three projects they actually own.",
      },
    ],
    decisions: [
      {
        issue:
          "Generated data could not be allowed to become the record of truth by default.",
        decision:
          "Made extraction produce a draft that lives outside the register until a person explicitly saves it, with reject and edit available at field level.",
        result:
          "Nothing enters a government portfolio that a human has not looked at, which is what made the feature approvable in the first place.",
        tradeoff:
          "It adds a review step to every project, so the rest of the design had to make that review fast rather than exhaustive.",
      },
      {
        issue:
          "Users needed to know how far to trust an extracted project before opening it.",
        decision:
          "Scored data readiness on mandatory-field coverage, surfaced it on the project card, and kept per-field confidence inside the detail view.",
        result:
          "A PMO can triage a batch at a glance and spend review time on the projects that are genuinely thin.",
        tradeoff:
          "The score is only as meaningful as the client's mandatory-field configuration, so it reads as readiness to baseline rather than as accuracy.",
      },
      {
        issue: "A confident wrong answer was worse than a question.",
        decision:
          "Let the agent pause mid-extraction and ask a short, numbered set of clarifying questions, each one skippable.",
        result:
          "The agent could improve its own input instead of guessing, and the user stayed in control of how much effort to spend on a given batch.",
        tradeoff:
          "Questions interrupt an otherwise hands-off flow, so they were capped and made skippable rather than blocking.",
      },
      {
        issue: "Bulk import into a live register risked silent duplication.",
        decision:
          "Flagged likely duplicates with a match strength and linked straight through to the existing record, opened alongside the queue rather than in place of it.",
        result:
          "The system raises the suspicion and the person makes the call, without losing their position in the review.",
        tradeoff:
          "It refuses to merge automatically, so near-identical projects still cost a human decision. For a register of record that is the safer failure.",
      },
      {
        issue:
          "The people best placed to verify a plan were not the people running the import.",
        decision:
          "Designed one engine at two altitudes: PMO bulk extraction and assignment, and project-manager refinement of an assigned project.",
        result:
          "Migration can begin immediately at the PMO level while accuracy improves later, in the hands of whoever actually owns the project.",
        tradeoff:
          "Because AI access is licensed per seat, most clients start with PMO-only extraction. The quality gap between a bulk import and a PM-refined plan became the clearest argument for extending seats.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: migration happened outside the product",
      beforeItems: [
        "New clients either abandoned their history or ran projects in two places.",
        "Existing portfolios were keyed in by hand by the implementation team.",
        "Document formats varied per client, so nothing could be repeated.",
        "Thin records and duplicates were discovered after they reached the register.",
      ],
      afterTitle: "After: migration is a reviewed product flow",
      afterItems: [
        "Clients upload the documents they already keep, in whatever shape they exist.",
        "The agent maps them onto the real project plan, charter, and registers.",
        "Readiness and confidence show where review effort is needed.",
        "Only human-verified projects are committed to the live register.",
      ],
    },
    finalMoments: [
      {
        title: "Start where the portfolio already lives",
        description:
          "The flow begins inside the project register itself, so migration reads as a normal register action rather than a separate tool bolted on beside the product.",
        tags: ["Entry point", "PMO"],
      },
      {
        title: "Say what to extract",
        description:
          "One surface accepts documents in whatever shape the client keeps them, with an optional prompt for when the user wants to narrow what the agent should look for.",
        tags: ["Upload", "Any format"],
      },
      {
        title: "Let the agent ask before it guesses",
        description:
          "While parsing, the agent raises a short numbered set of questions and makes each one skippable, so a thin source can be improved without blocking the run.",
        tags: ["Clarification", "Skippable"],
      },
      {
        title: "Review the batch, not the paperwork",
        description:
          "Extracted projects arrive as cards carrying readiness, ownership, and stage, with accept and reject moving work out of the queue before anyone opens a detail view.",
        tags: ["Data readiness", "Triage"],
      },
      {
        title: "Resolve duplicates against the live register",
        description:
          "A suspected duplicate is stated with its match strength and a link into the existing record, leaving the judgement with the person who can actually make it.",
        tags: ["Duplicates", "Human decision"],
      },
      {
        title: "Open the plan and disagree with it",
        description:
          "The detail view mirrors the real structure across charter, plan, manage, report, and govern, so verification happens in the same shape the work will continue in.",
        tags: ["Human in the loop", "Field level"],
      },
      {
        title: "See exactly what was and was not found",
        description:
          "An extraction summary separates mandatory from optional fields and reports section coverage and average confidence before anything is committed to the register.",
        tags: ["Coverage", "Confidence"],
      },
      {
        title: "Take the proposals, or leave them",
        description:
          "Suggested proposals sit in their own tab, so an expansion idea never quietly contaminates the migration the client actually asked for.",
        tags: ["Proposals", "Optional"],
      },
    ],
    impact: [
      {
        label: "Onboarding",
        value:
          "Removed the manual back-end migration standing between a signed client and a usable portfolio.",
      },
      {
        label: "Trust",
        value:
          "Made readiness, confidence, and duplicates visible so review effort could be aimed rather than spread.",
      },
      {
        label: "Governance",
        value:
          "Kept an explicit human commit step between generated content and the register of record.",
      },
      {
        label: "Commercial",
        value:
          "Created a concrete reason to extend AI access to project managers instead of stopping at the PMO.",
      },
    ],
    reflection:
      "The instinct with an extraction agent is to make it look certain. The more useful move was designing where it admits doubt: the questions it asks, the fields it marks low confidence, the duplicate it refuses to merge on your behalf. Certainty is cheap to render and expensive to be wrong about. Visible doubt is what let a government client point this at their own register.",
  }),
  bindProject({
    projectId: "strategy-dot-zero-dependency-module",
    chapters: [
      {
        id: "where-it-lived",
        name: "Where it lived",
        title: "Detailed record, nowhere to go",
        body: [
          "Dependency was the eleventh item in the project plan's left nav, sitting between Resource and Miscellaneous. The same place change impact sat, with the same consequence: project managers draft the plan, get it baselined, and from then on work out of the registers and the status report.",
          "There was no dependency register anywhere else in the product. Every dependency in the portfolio lived inside the individual plan of the project that had recorded it.",
          "Inside were two tables. Predecessor Project, for what this project is waiting on. Successor Project, for what is waiting on it. The form behind both was thorough: the other project, baseline start and end, its project manager, the impact of the dependency, the dependent product, and free text for the nature of it.",
          "So the record was never thin. It just had nowhere to go and nobody else to reach.",
        ],
        pull: "Once PMs are done with the project plan, the chances of coming back here are very rare.",
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-current-state.webp",
            alt: "Current state board showing the legacy dependency screens inside the project plan, the predecessor and successor forms, the current flow, and the reported user issues",
            width: 3600,
            height: 2419,
            label: "The current-state audit: the screens, the flow, and what users reported",
          },
        ],
      },
      {
        id: "note-or-agreement",
        name: "Note or agreement",
        title: "The question I had to settle first: is a dependency a note, or an agreement?",
        body: [
          "Today it is a note. A project manager opens the register, picks the other project as a predecessor, fills in the impact and the nature of it, and saves. That is the entire interaction, and nothing leaves his own plan.",
          "Before drawing anything I wrote out both journeys against the same scenario: Project A needs an end product from Project B before its own milestone can start.",
          "Recorded the way it works today, he adds Project B as a predecessor and the entry sits in his plan. Project B's manager is never told, never asked, and never agrees. Weeks pass and nothing in the record changes, because nothing in it was ever capable of changing. He finds out Project B has slipped when the delivery does not arrive.",
          "Requested and accepted, he names the end product he needs, the date he needs it by, and what happens to his project if he does not get it. The request lands in Project B's Give register and their manager accepts it, or rejects it with a reason. Both sides end up looking at the same record.",
          "The interesting part is the shape of the first journey. It does not get gradually worse. He feels fine the whole way through, because nothing ever contradicts him, and then it collapses at the end. That is why this was never reported as a usability problem. It does not annoy anyone. It just quietly stops being true.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-approach.webp",
            alt: "Approach board with both written journeys and a journey map comparing the private ledger against the two-sided agreement",
            width: 3152,
            height: 3600,
            label: "Both journeys, written out before anything was drawn",
          },
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-one-author.webp",
            alt: "Diagram comparing a dependency record with one author against one record with a Get register and a Give register either side of it",
            width: 3600,
            height: 1867,
            label: "The same argument as a model: one author, or two",
          },
        ],
      },
      {
        id: "the-states",
        name: "The states",
        title: "The states, and who owns each move",
        body: [
          "Once a dependency is a request rather than a note it needs states, and every move has to belong to somebody.",
          "The provider accepts, which makes it active, and delivers, which completes it. The provider also rejects, and a rejection carries a reason that stays on the record so the requester knows what to change rather than resubmitting the same ask. The requester revokes, but only while the request is still pending.",
          "That leaves two ways to end a pending request, owned by opposite sides. Keeping them visually separate mattered more than it sounds. A revoke that looks like a reject reads as the other project turning you down.",
          "Once a dependency is active it follows the progress of the provider's project, and when that work completes the dependency is marked delivered.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-states.webp",
            alt: "State diagram showing requested moving to active and complete via the provider, to rejected via the provider with a required reason, and to revoked via the requester while pending",
            width: 3600,
            height: 2133,
            label: "Five states, and the side that owns each transition",
          },
        ],
      },
      {
        id: "status-source",
        name: "Where status comes from",
        title: "Status nobody has to maintain",
        body: [
          "A status that has to be kept up separately does not get kept up. So once a dependency is accepted, its status comes from the provider's project status report, which they are already filing every period. The requester watches it from his own register because his project is waiting on it, and nobody updates a second place.",
          "Where the report lags reality, the provider can set the status by hand from the dependency register and leave a comment with it. The requester sees both, so an override never arrives without an explanation.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-status-source.webp",
            alt: "Diagram showing the provider's project status report feeding the dependency status in the requester's register, with a manual override and comment beneath it",
            width: 3600,
            height: 2343,
            label: "One source, plus an override that has to explain itself",
          },
        ],
      },
      {
        id: "what-it-points-at",
        name: "What it points at",
        title: "What a dependency actually points at",
        body: [
          "A whole project is rarely the thing anyone is waiting on. They are waiting on one deliverable inside it.",
          "A request can target either. The whole project stays available because sometimes that genuinely is the dependency. But the end product is the level teams reach for most of the time, so the design treats it as the expected target rather than as an optional field on a project-shaped form.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-what-it-points-at.webp",
            alt: "Diagram showing a request able to target either the whole of a project or one specific end product inside it",
            width: 3600,
            height: 2343,
            label: "Two levels, with the end product as the one teams actually use",
          },
        ],
      },
      {
        id: "what-changes",
        name: "What changes",
        title: "What changes",
        body: [
          "Before: a predecessor table and a successor table inside one project's plan. Detailed fields, no agreement, no status, and nobody outside that plan able to see any of it.",
          "After: a Get register and a Give register that are two views of one accepted dependency, status flowing from the provider's own report, and a combined dependency register so the portfolio can finally see what is blocking what.",
        ],
        layout: "figure",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/process-what-changes.webp",
            alt: "Before and after comparison of the legacy predecessor and successor table against the two-sided register model feeding a combined dependency register",
            width: 3600,
            height: 2343,
            label: "The before and after",
          },
        ],
      },
      {
        id: "the-work",
        name: "The work",
        title: "The screens",
        layout: "gallery",
        media: [
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/get-register.webp",
            alt: "Get register listing everything this project is waiting on from other projects",
            width: 1440,
            height: 900,
            label: "Get register",
            caption:
              "Everything this project is waiting on, with provider, owner, required date and current status in the row itself.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/give-register.webp",
            alt: "Give register listing every commitment other projects are counting on from this one",
            width: 1440,
            height: 900,
            label: "Give register",
            caption:
              "The same records from the other side, so a manager can see what other projects are counting on them for.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/request-drawer.webp",
            alt: "Request drawer for creating a dependency request",
            width: 1440,
            height: 900,
            label: "The request",
            caption:
              "The end product being waited on, the date it is needed, and what happens to the project if it does not arrive.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/approval-drawer.webp",
            alt: "Approval drawer showing both projects and the detail behind the request",
            width: 1440,
            height: 900,
            label: "The decision",
            caption:
              "Both projects, the direction of the ask, and the detail behind it, so accepting is a judgement rather than a guess.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/rejection-reason.webp",
            alt: "Rejection flow capturing the reason and keeping it on the record",
            width: 1440,
            height: 900,
            label: "Saying why, not just no",
            caption:
              "A rejection keeps its reason on the record, so the requester knows what to change instead of resubmitting.",
            pending: true,
          },
          {
            src: "/case-studies/strategy-dot-zero-dependency-module/revoke.webp",
            alt: "Revoke action available to the requester while a request is still pending",
            width: 1440,
            height: 900,
            label: "Withdrawing cleanly",
            caption:
              "Revoke sits only on the requester's view and stays visually apart from reject, so the two are never confused.",
            pending: true,
          },
        ],
      },
      {
        id: "looking-back",
        name: "Looking back",
        title: "What I'd change",
        body: [
          "The register was not failing because it looked dated. It was failing because it only ever had one author. Once the same record had two sides, an explicit acceptance, and a status drawn from work someone was already doing, most of the confusion went away without much new interface.",
          "The harder discipline was resisting the urge to model every possible predecessor and successor relationship, and instead making one relationship genuinely trustworthy.",
          "What I would test properly is a portfolio carrying hundreds of live dependencies. Filtering, bulk triage, and chains where one dependency sits behind another are where this design will strain, and a short demo register flatters it.",
        ],
      },
    ],
    headline:
      "One project wrote the dependency down. The other one was never told it existed.",
    deck:
      "A dependency is where a project records what it is waiting on from somewhere else. It sat as two tables inside one project's plan, visible to nobody but the person who typed it. It is now a request the other project has to accept, with a status that comes from reporting they already do.",
    problem:
      "Dependencies were recorded, not managed. A project manager could open a register and note that their work depended on another project, but the entry never left their own screen. The manager who owned that other project was never told, never asked, and never agreed. There was no status, no stage, no progress, so there was no way to see whether the thing being waited on was on track or already slipping. A dependency could also only point at an entire project, even when what was actually needed was a single deliverable inside it. When the record drifted from reality, a delay could be traced everywhere except back to the dependency that caused it.",
    outcome:
      "A two-sided dependency workflow: a Get register for what a project needs, a Give register for what it owes, an approval step between them, and live status that flows from the provider's project status report into the dependent project's view.",
    storyIntro:
      "The existing feature looked like a table problem. It was a relationship problem. One side had written something down and the other side had never been asked, so the register quietly aged into a list of assumptions. Most of the design work went into turning a note into an agreement, and then keeping that agreement honest as plans moved.",
    snapshot: [
      {
        label: "Authorship",
        value:
          "A dependency stopped being a note one person wrote and became an agreement two projects hold.",
      },
      {
        label: "Placement",
        value:
          "Out of a single tab in one project's plan, into a combined register the portfolio can read.",
      },
      {
        label: "Status",
        value:
          "It follows the provider's own status report, so nobody updates a second place.",
      },
      {
        label: "Granularity",
        value:
          "A request points at the end product being waited on, not just the project around it.",
      },
    ],
    frictions: [
      {
        title: "The other side never knew",
        description:
          "A dependency was logged for the requesting manager's own visibility. The project being depended on held no record of it, so nobody could confirm it, plan around it, or push back on it.",
      },
      {
        title: "A ledger cannot tell you something is wrong",
        description:
          "The register listed predecessors and successors as static text. It could not show whether the work being waited on was on track, under strain, or already late.",
      },
      {
        title: "Whole projects were too coarse a unit",
        description:
          "Teams rarely wait on an entire project. They wait on one deliverable inside it, but the model only allowed the project as a whole to be named.",
      },
      {
        title: "The digital status drifted from the real one",
        description:
          "Because nothing refreshed, the register described the plan as it was written rather than as it stood. A slipped dependency stayed invisible until it had already done damage.",
      },
      {
        title: "Delays could not be traced back",
        description:
          "When a project went off track, the dependency behind it was rarely identifiable in the record, so the same failure was free to repeat itself next quarter.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Separate the two sides of a dependency",
        description:
          "Split one shared ledger into what a project needs and what it owes, so each manager works from a register that matches their own responsibility.",
      },
      {
        phase: "02",
        title: "Model the request as a conversation",
        description:
          "Defined the states a dependency moves through: requested, approved or rejected, active, complete, and revoked, with each state owned by a specific side.",
      },
      {
        phase: "03",
        title: "Choose the unit of dependency",
        description:
          "Allowed a request to point at a whole project or a single end product, so the record matches what teams are genuinely waiting on.",
      },
      {
        phase: "04",
        title: "Connect status to existing reporting",
        description:
          "Tied the dependent view to the provider's project status report, so keeping it current is a by-product of reporting the provider already does.",
      },
      {
        phase: "05",
        title: "Design the decision surface",
        description:
          "Built one drawer carrying the request, both projects, the direction of the ask, and the decision, so accepting or rejecting is a judgement rather than a guess.",
      },
      {
        phase: "06",
        title: "Handle the awkward states",
        description:
          "Worked through rejection, revocation, and manual override, so the workflow stays honest when plans change after a request has been sent.",
      },
    ],
    decisions: [
      {
        issue: "A dependency recorded by one side is only ever an assumption.",
        decision:
          "Made every dependency a request the providing project must explicitly accept, with Get and Give registers giving each side its own view of the same record.",
        result:
          "Both managers work from one agreement, and the project being depended on can plan for the commitment instead of discovering it late.",
        tradeoff:
          "It introduces an approval step where there was none, so the request form stayed short and the whole decision was kept to a single drawer.",
      },
      {
        issue: "Status that has to be maintained separately will not be maintained.",
        decision:
          "Fed the dependent view from the provider's existing project status report rather than asking anyone to update a second place.",
        result:
          "The dependency stays current as a by-product of reporting the provider already does, which is what keeps the digital record close to the real one.",
        tradeoff:
          "It ties dependency accuracy to reporting discipline, so a manual override with a comment was added for the cases where the report lags reality.",
      },
      {
        issue: "Teams rarely wait on an entire project.",
        decision:
          "Let a request target either the whole project or a specific end product inside it.",
        result:
          "The record names what is actually being waited on, which makes both the commitment and any delay far easier to reason about.",
        tradeoff:
          "It adds a selection step to the request, so the dependent item sits directly beside the dependency name rather than buried deeper in the form.",
      },
      {
        issue: "A rejection with no reason only moves the confusion.",
        decision:
          "Required a reason on rejection and kept it visible on the record afterwards.",
        result:
          "The requesting manager learns what to change instead of resubmitting the same request, and the history explains itself months later.",
        tradeoff:
          "It slows the reject path slightly, which is the right trade when the alternative is an unexplained blocker.",
      },
      {
        issue: "Plans change after a request has been sent.",
        decision:
          "Gave the requester a revoke path while approval is still pending, kept visually separate from the provider's reject.",
        result:
          "A dependency that is no longer needed can be withdrawn cleanly instead of sitting pending or being silently ignored.",
        tradeoff:
          "Two ways to end a pending request needed obvious separation, so revoke lives in its own bordered panel and only on the requester's view.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: a private ledger",
      beforeItems: [
        "A dependency existed only on the requesting manager's screen.",
        "The project being depended on was never notified or asked to agree.",
        "Entries were static text with no status, stage, or progress.",
        "A dependency could only point at a whole project.",
      ],
      afterTitle: "After: a two-sided agreement",
      afterItems: [
        "Every dependency is requested, reviewed, and explicitly accepted.",
        "Get and Give registers give each side the view matching their responsibility.",
        "Status flows from the provider's reporting, with override and comment.",
        "A request can target a whole project or one end product inside it.",
      ],
    },
    finalMoments: [
      {
        title: "See what the project is waiting on",
        description:
          "The Get register lists everything this project needs from elsewhere, carrying provider, type, owner, required date, business impact, and current status in the row itself.",
        tags: ["Get register", "Requesting side"],
      },
      {
        title: "See what the project owes",
        description:
          "The Give register mirrors it from the other side, so a manager can see every commitment other projects are counting on and act on the ones still awaiting a decision.",
        tags: ["Give register", "Providing side"],
      },
      {
        title: "Request only what is actually needed",
        description:
          "A compact drawer captures the dependency, the specific item it points at, the provider, what is needed, the required date, and the business impact of not getting it.",
        tags: ["Request", "End product"],
      },
      {
        title: "Decide with the context attached",
        description:
          "The approval drawer shows both projects, the direction of the request, and the detail behind it, so accepting or rejecting is a judgement rather than a guess.",
        tags: ["Approval", "Two-sided"],
      },
      {
        title: "Say why, not just no",
        description:
          "A rejection captures its reason and keeps it on the record, so the requesting manager knows what to change rather than resubmitting the same ask.",
        tags: ["Rejection", "Reasoning"],
      },
      {
        title: "Withdraw cleanly when plans change",
        description:
          "While a request is still pending, the requester can revoke it from their own view, kept deliberately separate from the provider's reject so the two are never confused.",
        tags: ["Revoke", "Requester"],
      },
    ],
    impact: [
      {
        label: "Visibility",
        value:
          "The project being depended on now knows the commitment exists and can plan around it.",
      },
      {
        label: "Accuracy",
        value:
          "Dependency status follows the provider's real reporting instead of a note written once and left alone.",
      },
      {
        label: "Precision",
        value:
          "Dependencies point at the deliverable actually being waited on, not just the project surrounding it.",
      },
      {
        label: "Traceability",
        value:
          "A delayed project can be traced back to the dependency that caused it, so the same failure is less likely to repeat.",
      },
    ],
    reflection:
      "The old register was not failing because it looked dated. It was failing because it only ever had one author. Once the same record had two sides, an explicit acceptance, and a status drawn from work someone was already doing, most of the confusion disappeared without much new interface. The harder discipline was resisting the urge to model every possible predecessor and successor relationship, and instead making one relationship genuinely trustworthy.",
  }),
  bindProject({
    projectId: "strategy-dot-zero-kpi-management-module",
    headline:
      "Designing the module that measures the whole organisation, for the one persona licensed to use it.",
    deck:
      "KPI management runs across the Strategy Dot Zero platform: four baselined registers, a profile that defines the measure behind each KPI, and a reporting loop that returns every interval. The business scoped the module to the PMO, so the design had to decide how much of an organisation-wide capability could live behind a single persona, and how the rest of the organisation would still be reached.",
    problem:
      "KPI management is the module almost every organisation asks for, and it is priced accordingly. That made the first decision commercial rather than editorial: the module would be licensed to the PMO and to nobody else. The difficulty is that a KPI is only meaningful against work someone else owns. Portfolio managers run the portfolios being measured. Project and program managers deliver the work the numbers come from. None of them would hold the module. Underneath that sat the ordinary problems of the domain: KPI vocabulary changes with every organisation, so any fixed taxonomy fits nobody; a KPI definition carries enough fields to become a form people abandon; a status typed into a box is an opinion rather than a measurement, and opinions do not aggregate; and an obligation that returns every reporting interval is forgotten unless the product goes looking for the person.",
    outcome:
      "A PMO-owned KPI module: four baselined registers, a four-step profile ending in a defined measure, status computed against interim targets each interval, and an alignment layer linking every KPI to the projects, programs, and portfolios behind it — plus an email bridge that lets an unlicensed portfolio manager still be profiled and still report.",
    storyIntro:
      "Most of the design work came down to one question: what happens to the people who are not allowed in? The licence boundary was fixed before design started, so there was no arguing it away. What design could decide was exactly how much of the workflow each persona genuinely needed, where the boundary should fall, and how honest to be about the place where it cuts — a portfolio manager who gets an email instead of a seat.",
    snapshot: [
      {
        label: "Ownership",
        value:
          "One persona defines the KPI and reports it, so no approval cycle was needed.",
      },
      {
        label: "Baselined types",
        value:
          "Strategic, delivery assurance, client and commercial, and portfolio KPIs.",
      },
      {
        label: "One measure",
        value:
          "A single measure per KPI, so status follows from one unambiguous definition.",
      },
      {
        label: "The trade-off",
        value:
          "Portfolio managers report by email rather than a seat — a constraint made visible.",
      },
    ],
    frictions: [
      {
        title: "The module measures everyone, but one persona holds it",
        description:
          "The commercial decision to license KPI management to the PMO alone meant the people who own the underlying work — portfolio, program, and project managers — would never open the module that judges it.",
      },
      {
        title: "Every organisation names its KPIs differently",
        description:
          "KPI taxonomy is not standard across sectors or even across entities in the same group. Hard-coding one organisation's language would fit nobody, and shipping no structure at all would leave customers with a blank list and nothing to report against.",
      },
      {
        title: "A KPI definition is long enough to abandon",
        description:
          "Dimension, owner, description, dates, alignment, unit, type, polarity, baseline, target, thresholds, aggregation, reporting frequency. Presented as one form, it is the kind of profile that gets started and left at nine percent.",
      },
      {
        title: "A status someone types is an opinion",
        description:
          "Without a measure that computes it, on track means whatever the person writing the update believes it means, which makes any roll-up across a register misleading rather than useful.",
      },
      {
        title: "A recurring obligation is forgotten by design",
        description:
          "Reporting returns every interval, indefinitely. Relying on someone to remember the cycle guarantees gaps, and a gap in a KPI series is worse than a bad number because nobody can tell what happened.",
      },
      {
        title: "The portfolio manager was the blocker",
        description:
          "External portfolios still need their KPIs defined and reported, and the person closest to those numbers is the portfolio manager — the persona the licence explicitly excludes.",
      },
    ],
    process: [
      {
        phase: "01",
        title: "Take the licence boundary as a given",
        description:
          "Started from the commercial constraint rather than around it, mapping every persona who touches a KPI and marking which of them would never hold the module.",
      },
      {
        phase: "02",
        title: "Baseline a KPI taxonomy",
        description:
          "Reduced an unbounded space of KPI types to four registers — strategic, delivery assurance, client and commercial, and portfolio — that most organisations can map their own language onto.",
      },
      {
        phase: "03",
        title: "Separate what a KPI is from how it is measured",
        description:
          "Split the definition into context and alignment on one side, and the measure — unit, type, polarity, baseline, target, thresholds, frequency — on the other.",
      },
      {
        phase: "04",
        title: "Make the profile completable",
        description:
          "Designed it as four steps with a progress meter and an explicit count of pending fields, so an unfinished KPI says how unfinished it is instead of failing at submission.",
      },
      {
        phase: "05",
        title: "Make the interval the unit of work",
        description:
          "Built tracking around one reporting interval at a time: due date, actual, interim target, computed status, comment, and evidence, with overdue visible on the record.",
      },
      {
        phase: "06",
        title: "Design the compromise deliberately",
        description:
          "Worked out precisely how much of the workflow a portfolio manager could be given without a licence, what they would lose, and which part of it was worth fighting to keep.",
      },
    ],
    decisions: [
      {
        issue:
          "The business licensed the module to the PMO alone, and design could not argue that away.",
        decision:
          "Treated the PMO as both the author and the reporter of every KPI, and removed the approval cycle the workflow would otherwise have carried.",
        result:
          "A KPI profile moves from draft to active without waiting on a third party, because the party who would have approved it is the one who wrote it. The state model carries draft, active, and closed rather than a review round trip nobody needed.",
        tradeoff:
          "The module can no longer collect anything from the people who own the underlying work, so every outward connection had to become either an alignment link or an email.",
      },
      {
        issue:
          "KPI vocabulary changes with every organisation, so any fixed taxonomy fits nobody.",
        decision:
          "Baselined four KPI registers — strategic, delivery assurance, client and commercial, and portfolio — as the shipped structure, and treated anything beyond them as configuration rather than product.",
        result:
          "Customers get a shared structure to report against on day one instead of a blank list, and the four cover the questions most organisations are actually asking of a portfolio.",
        tradeoff:
          "An organisation whose language does not map cleanly onto the four has to translate, so the registers stayed sibling tabs over one model rather than four separately designed pages.",
      },
      {
        issue: "A KPI definition carries enough fields to become a form nobody finishes.",
        decision:
          "Split the profile into Context, Alignment, Measure, and Related Links, with a completion percentage and an explicit pending-field count visible from every step.",
        result:
          "Each step answers a single question — what is this, what does it touch, how is it measured, what backs it up — and an incomplete KPI announces exactly what it is missing rather than failing on submit.",
        tradeoff:
          "It adds navigation to what could have been one long page, so the step names stayed plain nouns and the pending count stayed on screen throughout.",
      },
      {
        issue: "A status someone types is an opinion, and opinions do not aggregate.",
        decision:
          "Put the definition in the measure — unit, type, polarity, baseline, target, interim targets, thresholds, aggregation, and reporting frequency — so status follows from the numbers, and held the baseline to one measure per KPI.",
        result:
          "On track means the same thing on every KPI in the register, which is what makes a portfolio-level roll-up worth reading at all.",
        tradeoff:
          "Genuinely multi-measure KPIs are not served by the baseline. That is a deliberate scope call: they are rare enough in practice to be an added feature rather than a cost every customer pays.",
      },
      {
        issue:
          "An obligation that returns every interval is forgotten unless something goes looking for the person.",
        decision:
          "Pushed each reporting interval to the PMO in three places — a notification, an entry in My Actions, and the calendar view — and kept the update itself to a single drawer.",
        result:
          "Reporting becomes a short prompted task rather than something remembered, and an interval that has slipped is marked overdue on the record itself rather than only in someone's inbox.",
        tradeoff:
          "It adds to the notification load of a persona who already receives plenty, so the drawer was held to actual, status, comment, and evidence, with the rest read-only.",
      },
      {
        issue:
          "External portfolios need KPIs reported by a portfolio manager who does not hold the module.",
        decision:
          "Built an email bridge instead of a seat. The PMO enables tracking, which enables profiling; the portfolio manager receives an email to complete the portfolio profile, and another each reporting cycle to submit the update. Trend and status stay readable as an overview inside their own application.",
        result:
          "The portfolio KPI still gets defined by the person closest to it and still gets reported on time, and that manager can see how their own numbers are moving without holding a licence.",
        tradeoff:
          "It is plainly a lesser experience than the PMO's — no register, no My Actions, no calendar, no tracking surface. That gap is a commercial constraint rather than a design preference, and keeping the read-only trend inside their own application was the part worth fighting for.",
      },
    ],
    beforeAfter: {
      beforeTitle: "Before: KPIs sat outside the work they judged",
      beforeItems: [
        "KPI definitions lived in decks and spreadsheets, apart from the projects and portfolios they measured.",
        "Every organisation used its own KPI vocabulary, so there was no shared structure to report against.",
        "Status was written by whoever prepared the update, against whatever rule they had in mind.",
        "Reporting depended on someone remembering the cycle had come round again.",
      ],
      afterTitle: "After: one governed spine for performance",
      afterItems: [
        "Four baselined registers give structure without hard-coding one organisation's language.",
        "Every KPI carries a defined measure, so status is computed rather than argued.",
        "Alignment links each KPI to the projects, programs, and portfolios that move it.",
        "Each interval arrives as a notification, an action, and a calendar entry.",
      ],
    },
    finalMoments: [
      {
        title: "Find the KPI in a register that matches the question",
        description:
          "Four registers sit side by side — strategic, delivery assurance, client and commercial, and portfolio — with state, computed status, dimension, owner, and last updated carried in the row, so the register reads as a health check rather than an index.",
        tags: ["Registers", "PMO"],
      },
      {
        title: "Define what the KPI actually is",
        description:
          "Context captures the name, dimension, owner, description, period, and whether this is a priority KPI. It is deliberately the shortest step, because it is the one that decides whether the rest of the profile is worth filling in.",
        tags: ["Profile", "Context"],
      },
      {
        title: "Link it to the work that moves it",
        description:
          "Alignment connects the KPI to the entities it depends on, so a strategic objective can be traced down to the projects and portfolios acting on it, and a project profile can point back up at the KPIs it serves.",
        tags: ["Alignment", "Strategic objectives"],
      },
      {
        title: "Baseline the measure that computes the status",
        description:
          "Unit, type, polarity, baseline, target, aggregation, reporting frequency, and thresholds are set once. From then on, status is derived from the numbers instead of chosen from a list by whoever is reporting.",
        tags: ["Measure", "Thresholds"],
      },
      {
        title: "Attach what backs the definition up",
        description:
          "Related links hold the evidence behind the KPI itself — the policy, the contract, the source system — so a definition can be defended months later without reconstructing where the target came from.",
        tags: ["Evidence", "Governance"],
      },
      {
        title: "Report the interval, not the year",
        description:
          "The tracking view breaks performance into intervals with due dates, actuals against interim targets, status, comment, and state, so a KPI is a series of small honest updates rather than one retrospective number.",
        tags: ["Tracking", "Intervals"],
      },
      {
        title: "Update in one drawer, with evidence",
        description:
          "The review drawer carries the actual, the interim target, year-to-date figures, status, a comment, and the links that support the number — short enough to be completed in the moment the notification arrives.",
        tags: ["Review", "Reporting"],
      },
      {
        title: "Reach the portfolio manager without a seat",
        description:
          "The PMO enables tracking for an external portfolio, which triggers an emailed profile request and then an emailed update request each cycle. The manager submits their number and can read the resulting trend in their own application, though not the tracking workflow itself.",
        tags: ["Portfolio managers", "Trade-off"],
      },
    ],
    impact: [
      {
        label: "Ownership",
        value:
          "One persona defines and reports every KPI, which removed an approval round trip rather than automating one that was never needed.",
      },
      {
        label: "Structure",
        value:
          "Four baselined registers give organisations something to report against immediately, without committing the product to one customer's vocabulary.",
      },
      {
        label: "Comparability",
        value:
          "Status is computed from a defined measure, so on track carries the same meaning across a register and can be rolled up honestly.",
      },
      {
        label: "Alignment",
        value:
          "A KPI can be linked from a project up to a portfolio, so strategic objectives connect to the delivery that actually moves them.",
      },
      {
        label: "Reach",
        value:
          "A portfolio manager outside the licence can still be profiled and can still report, through an email route rather than a seat.",
      },
    ],
    reflection:
      "The interesting constraint here was not technical. It was commercial: the module that measures the whole organisation was licensed to one part of it. I could not design that away, and pretending otherwise would have produced a workflow quietly assuming permissions nobody had. What worked was drawing the boundary explicitly — deciding what the PMO owns end to end, then designing the smallest honest bridge to the people outside it. The email route for portfolio managers is not the experience I would choose. It is the experience that lets a portfolio KPI exist at all under the licence we were given, and naming it as a trade-off rather than dressing it up as a feature is what kept the rest of the model coherent.",
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
