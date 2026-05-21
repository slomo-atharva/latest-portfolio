"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const projects = [
  {
    index: "01",
    name: "Atlas AI Workspace",
    description:
      "A system for analysts to transform scattered inputs into explainable decisions.",
    tone: "from-[#f0f2f1] to-[#fbfbfa]",
    tags: ["AI UX", "Workflow", "Systems"],
  },
  {
    index: "02",
    name: "Northstar Design OS",
    description:
      "A token-led design system for scaling interface quality across product teams.",
    tone: "from-[#ededec] to-[#fbfbfa]",
    tags: ["Design System", "Platform", "Governance"],
  },
  {
    index: "03",
    name: "Signal Care Console",
    description:
      "A calm operational surface for triage, escalation, and service confidence.",
    tone: "from-[#eef1f2] to-[#fbfbfa]",
    tags: ["SaaS", "Ops", "Product"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
      </main>
      <Footer />
    </>
  );
}

function Navigation() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="nav-shell fixed left-0 right-0 top-0 z-50 mx-auto flex h-20 items-center justify-between border-b border-transparent text-sm font-semibold text-[var(--muted)] backdrop-blur-sm"
    >
      <a href="#top" className="group flex items-center gap-3 text-[var(--ink)]">
        <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line-strong)] bg-white/45 text-xs text-[var(--steel)] transition-transform duration-300 group-hover:scale-95">
          AS
        </span>
        <span>Aarav Sen</span>
      </a>
      <nav className="flex items-center gap-1" aria-label="Primary navigation">
        {["Work", "Contact"].map((item) => (
          <a
            key={item}
            href={
              item === "Contact"
                ? "mailto:hello@aaravsen.design"
                : `#${item.toLowerCase()}`
            }
            className="rounded-full px-3 py-2 transition-colors duration-300 hover:bg-black/[0.04] hover:text-[var(--ink)]"
          >
            {item}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="page-shell grid min-h-screen grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)] items-center gap-16 pb-20 pt-28 max-lg:grid-cols-1 max-lg:gap-12 max-md:pt-24"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-[650px]"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--quiet)]"
        >
          Senior Product Designer
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold leading-[1.02] tracking-normal text-[var(--ink)] md:text-6xl lg:text-7xl"
        >
          Designing calm systems for complex digital work.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-[560px] text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8"
        >
          Focused on AI-assisted workflows, internal tools, product systems, and
          scalable user experiences for teams building modern digital products.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
          <MagneticButton href="#work" variant="primary">
            Selected work
          </MagneticButton>
          <MagneticButton href="mailto:hello@aaravsen.design" variant="secondary">
            Start a conversation
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <DesignScene />
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, variant, children }) {
  const buttonRef = useRef(null);
  const isPrimary = variant === "primary";

  const onMove = (event) => {
    const node = buttonRef.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.setProperty("--tx", `${x * 0.12}px`);
    node.style.setProperty("--ty", `${y * 0.18}px`);
  };

  const onLeave = () => {
    const node = buttonRef.current;
    if (!node) return;
    node.style.setProperty("--tx", "0px");
    node.style.setProperty("--ty", "0px");
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic-button inline-flex h-12 items-center justify-center rounded-full border px-5 text-sm font-bold ${
        isPrimary
          ? "border-[#151513] bg-[#151513] text-[#fffdf8] shadow-[0_18px_48px_rgba(21,21,19,0.18)] hover:bg-[#24231f]"
          : "border-[var(--line-strong)] bg-white/35 text-[var(--ink)] hover:border-[rgba(26,25,22,0.28)] hover:bg-white/55"
      }`}
    >
      {children}
      {isPrimary && (
        <span className="ml-3 h-3 w-3 border-b border-r border-current opacity-70" />
      )}
    </a>
  );
}

function DesignScene() {
  const sceneRef = useRef(null);
  const cardPathRef = useRef(null);
  const cardHaloRef = useRef(null);
  const activeAnchorRef = useRef(null);
  const cornerAnchorRef = useRef(null);
  const guideRef = useRef(null);
  const measureRef = useRef(null);
  const selectionRef = useRef(null);
  const pressRingRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const componentRef = useRef(null);
  const anchorRef = useRef(null);
  const cursorRef = useRef(null);
  const handleARef = useRef(null);
  const handleBRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.7 });
  const rotate = useTransform(springX, [-30, 30], [-1.6, 1.6]);

  useEffect(() => {
    const shapeA =
      "M118 96 H374 C398 96 416 114 416 138 V292 C416 316 398 334 374 334 H118 C94 334 76 316 76 292 V138 C76 114 94 96 118 96 Z";
    const shapeB =
      "M118 96 H382 C405 96 424 116 424 141 V292 C424 316 398 334 374 334 H118 C94 334 76 316 76 292 V138 C76 114 94 96 118 96 Z";
    const shapeC =
      "M118 96 H369 C392 96 411 112 416 134 V292 C416 316 398 334 374 334 H118 C94 334 76 316 76 292 V138 C76 114 94 96 118 96 Z";

    const context = gsap.context(() => {
      gsap
        .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
        .to([cardPathRef.current, cardHaloRef.current], {
          attr: { d: shapeB },
          duration: 4.8,
        })
        .to([cardPathRef.current, cardHaloRef.current], {
          attr: { d: shapeC },
          duration: 5.2,
        })
        .to([cardPathRef.current, cardHaloRef.current], {
          attr: { d: shapeA },
          duration: 5,
        });

      gsap
        .timeline({ repeat: -1, yoyo: true, defaults: { ease: "power2.inOut" } })
        .to(activeAnchorRef.current, { attr: { cx: 424, cy: 141 }, duration: 4.8 }, 0)
        .to(cornerAnchorRef.current, { attr: { cx: 382, cy: 96 }, duration: 4.8 }, 0)
        .to(anchorRef.current, { attr: { cx: 386, cy: 112 }, duration: 4.8 }, 0)
        .to(cursorRef.current, { attr: { transform: "translate(421 136)" }, duration: 4.8 }, 0)
        .to(cursorTrailRef.current, { attr: { x1: 386, y1: 112, x2: 424, y2: 141 }, duration: 4.8 }, 0)
        .to(
          handleARef.current,
          { attr: { d: "M382 98 C399 100 415 113 430 132" }, duration: 4.8 },
          0,
        )
        .to(
          handleBRef.current,
          { attr: { d: "M424 141 C433 160 434 184 424 207" }, duration: 4.8 },
          0,
        );

      gsap
        .timeline({ repeat: -1 })
        .to(guideRef.current, {
          opacity: 0.78,
          duration: 1.1,
          ease: "sine.out",
        })
        .to(guideRef.current, {
          opacity: 0.12,
          duration: 1.6,
          delay: 1.1,
          ease: "sine.inOut",
        })
        .to(measureRef.current, {
          opacity: 0.92,
          y: -3,
          duration: 1,
          ease: "sine.out",
        }, 0.15)
        .to(measureRef.current, {
          opacity: 0.3,
          y: 0,
          duration: 1.5,
          delay: 1.1,
          ease: "sine.inOut",
        }, 1.1);

      gsap.fromTo(
        selectionRef.current,
        { attr: { "stroke-dashoffset": 34 }, opacity: 0.28 },
        {
          attr: { "stroke-dashoffset": 0 },
          opacity: 0.62,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );

      gsap.fromTo(
        pressRingRef.current,
        { scale: 0.45, opacity: 0.5, transformOrigin: "center center" },
        {
          scale: 1.85,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          ease: "power2.out",
        },
      );

      gsap.to(componentRef.current, {
        opacity: 0.82,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".label-float", {
        y: -6,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sceneRef);

    return () => context.revert();
  }, []);

  const onMove = (event) => {
    const node = sceneRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(dx * 42);
    y.set(dy * 34);
    node.style.setProperty("--mx", `${dx * 34}px`);
    node.style.setProperty("--my", `${dy * 28}px`);
    node.style.setProperty("--grid-x", `${dx * 10}px`);
    node.style.setProperty("--grid-y", `${dy * 10}px`);
  };

  const onLeave = () => {
    const node = sceneRef.current;
    if (!node) return;
    x.set(0);
    y.set(0);
    node.style.setProperty("--mx", "0px");
    node.style.setProperty("--my", "0px");
    node.style.setProperty("--grid-x", "0px");
    node.style.setProperty("--grid-y", "0px");
  };

  return (
    <motion.div
      ref={sceneRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springY, rotateY: rotate }}
      className="grid-scene h-[540px] w-full max-w-[520px] place-items-center p-8 max-lg:max-w-none max-md:h-[430px] max-md:p-4"
      aria-label="Focused product-design interaction scene"
    >
      <motion.div style={{ x: springX, y: springY }} className="relative z-10 w-full">
        <div className="label-float vector-label absolute left-8 top-7 z-20 rounded-full border border-[var(--line)] bg-white/70 px-3 py-1.5 text-xs font-bold text-[var(--muted)] backdrop-blur-md">
          Designing
        </div>
        <svg
          viewBox="0 0 520 420"
          className="relative z-10 h-full w-full overflow-visible"
          role="img"
          aria-label="A workflow card being edited with vector anchors and Bezier handles"
        >
          <defs>
            <linearGradient id="shapeFill" x1="76" y1="96" x2="424" y2="334">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.94" />
              <stop offset="58%" stopColor="#f4f4f2" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#e7ebea" stopOpacity="0.86" />
            </linearGradient>
            <filter id="cursorShadow" x="-30%" y="-24%" width="170%" height="170%">
              <feDropShadow
                dx="0"
                dy="1.4"
                stdDeviation="1.1"
                floodColor="#000000"
                floodOpacity="0.2"
              />
            </filter>
          </defs>
          <g ref={guideRef} opacity="0.14">
            <line x1="76" y1="96" x2="448" y2="96" stroke="#18a0fb" strokeWidth="1" />
            <line x1="424" y1="76" x2="424" y2="348" stroke="#18a0fb" strokeWidth="1" />
            <line
              x1="76"
              y1="334"
              x2="424"
              y2="334"
              stroke="#18a0fb"
              strokeWidth="1"
              strokeDasharray="5 8"
            />
          </g>
          <path
            ref={cardHaloRef}
            className="blob-glow"
            d="M118 96 H374 C398 96 416 114 416 138 V292 C416 316 398 334 374 334 H118 C94 334 76 316 76 292 V138 C76 114 94 96 118 96 Z"
            fill="rgba(63,98,104,0.16)"
          />
          <path
            ref={cardPathRef}
            d="M118 96 H374 C398 96 416 114 416 138 V292 C416 316 398 334 374 334 H118 C94 334 76 316 76 292 V138 C76 114 94 96 118 96 Z"
            fill="url(#shapeFill)"
            stroke="rgba(21,21,19,0.22)"
            strokeWidth="1"
          />
          <g ref={componentRef} opacity="0.92">
            <rect x="112" y="132" width="124" height="10" rx="5" fill="#151513" opacity="0.16" />
            <rect x="112" y="158" width="258" height="1" fill="#151513" opacity="0.09" />
            <rect x="112" y="184" width="116" height="62" rx="8" fill="#ffffff" stroke="rgba(21,21,19,0.1)" />
            <rect x="244" y="184" width="128" height="62" rx="8" fill="#f6f7f6" stroke="rgba(21,21,19,0.1)" />
            <rect x="112" y="266" width="260" height="18" rx="9" fill="#151513" opacity="0.08" />
            <rect x="112" y="296" width="172" height="8" rx="4" fill="#151513" opacity="0.12" />
            <rect x="298" y="294" width="74" height="12" rx="6" fill="#3f6268" opacity="0.18" />
            <path
              d="M148 217 C180 193 208 227 244 207 C270 192 292 196 326 222"
              fill="none"
              stroke="#3f6268"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.48"
            />
          </g>
          <rect
            ref={selectionRef}
            x="69"
            y="89"
            width="362"
            height="252"
            rx="8"
            fill="none"
            stroke="#18a0fb"
            strokeOpacity="0.72"
            strokeDasharray="6 7"
          />
          <rect x="69" y="64" width="96" height="20" rx="5" fill="#18a0fb" opacity="0.88" />
          <text x="117" y="78" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
            Workflow card
          </text>
          <path
            ref={handleARef}
            d="M374 96 C392 98 407 109 422 128"
            fill="none"
            stroke="rgba(24,160,251,0.5)"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <path
            ref={handleBRef}
            d="M416 138 C425 157 426 181 416 204"
            fill="none"
            stroke="rgba(24,160,251,0.42)"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <circle cx="118" cy="96" r="5.5" fill="#fbfbfa" stroke="#18a0fb" strokeWidth="1.2" />
          <circle ref={cornerAnchorRef} cx="374" cy="96" r="5.5" fill="#fbfbfa" stroke="#18a0fb" strokeWidth="1.2" />
          <circle cx="416" cy="292" r="5.5" fill="#fbfbfa" stroke="#18a0fb" strokeWidth="1.2" />
          <circle cx="76" cy="292" r="5.5" fill="#fbfbfa" stroke="#18a0fb" strokeWidth="1.2" />
          <line
            ref={cursorTrailRef}
            x1="378"
            y1="112"
            x2="416"
            y2="138"
            stroke="#18a0fb"
            strokeOpacity="0.36"
            strokeWidth="1"
          />
          <circle
            ref={pressRingRef}
            cx="416"
            cy="138"
            r="7"
            fill="#18a0fb"
            fillOpacity="0.08"
            stroke="#18a0fb"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle
            ref={activeAnchorRef}
            cx="416"
            cy="138"
            r="6.3"
            fill="#ffffff"
            stroke="#18a0fb"
            strokeWidth="2"
          />
          <circle ref={anchorRef} cx="378" cy="112" r="3.5" fill="#18a0fb" opacity="0.72" />
          <circle cx="422" cy="128" r="3" fill="#18a0fb" opacity="0.52" />
          <circle cx="416" cy="204" r="3" fill="#18a0fb" opacity="0.42" />
          <g ref={measureRef} opacity="0.3">
            <rect x="360" y="60" width="82" height="26" rx="13" fill="#ffffff" stroke="rgba(21,21,19,0.1)" />
            <text x="401" y="77" textAnchor="middle" fill="#706d66" fontSize="11" fontWeight="700">
              Snap 8px
            </text>
          </g>
          <g ref={cursorRef} filter="url(#cursorShadow)" transform="translate(416 138)">
            <path
              d="M0.65 0.65 L0.65 27.8 L7.75 20.95 L12.85 33.25 L18.15 31 L13.15 19.25 L23.45 19.25 Z"
              fill="none"
              stroke="#ffffff"
              strokeLinejoin="round"
              strokeWidth="3.1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0.65 0.65 L0.65 27.8 L7.75 20.95 L12.85 33.25 L18.15 31 L13.15 19.25 L23.45 19.25 Z"
              fill="#111111"
              opacity="0.96"
            />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="page-shell pb-28 pt-10 max-md:pb-20">
      <div className="hairline mb-24 max-md:mb-16" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        className="mb-12 max-w-[720px]"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--quiet)]"
        >
          Selected Work
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold leading-[1.04] tracking-normal md:text-5xl lg:text-6xl"
        >
          Thoughtful systems with a quiet operational edge.
        </motion.h2>
      </motion.div>

      <div className="grid gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      className="group grid min-h-[430px] grid-cols-[0.75fr_1.25fr] gap-10 overflow-hidden rounded-lg border border-[var(--line)] bg-white/35 p-8 shadow-fine transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(63,98,104,0.22)] hover:bg-white/45 hover:shadow-calm max-lg:grid-cols-1 max-md:p-5"
    >
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold text-[var(--quiet)]">{project.index}</p>
          <h3 className="mt-12 max-w-[360px] text-3xl font-bold leading-[1.04] md:text-4xl max-md:mt-8">
            {project.name}
          </h3>
          <p className="mt-5 max-w-[360px] text-base leading-7 text-[var(--muted)]">
            {project.description}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] bg-white/45 px-3 py-1.5 text-xs font-bold text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`work-preview-grid grid min-h-[320px] place-items-center overflow-hidden rounded-lg border border-[var(--line)] bg-gradient-to-br ${project.tone} p-8 transition-transform duration-500 group-hover:scale-[1.01] max-md:min-h-[270px] max-md:p-4`}
      >
        <ProjectPreview index={project.index} />
      </div>
    </motion.article>
  );
}

function ProjectPreview({ index }) {
  return (
    <div className="relative w-full max-w-[560px] rounded-lg border border-[var(--line)] bg-[#fbfbfa]/80 p-4 shadow-[0_24px_70px_rgba(26,25,22,0.08)]">
      <div className="mb-5 flex items-center justify-between">
        <span className="h-3 w-24 rounded-full bg-black/10" />
        <span className="text-xs font-bold text-[var(--quiet)]">{index}</span>
      </div>
      <div className="grid gap-3 max-md:gap-2">
        <div className="h-20 rounded-lg border border-[var(--line)] bg-white/60" />
        <div className="grid grid-cols-3 gap-3 max-md:gap-2">
          <div className="h-28 rounded-lg border border-[var(--line)] bg-white/55" />
          <div className="h-28 rounded-lg border border-[var(--line)] bg-[rgba(63,98,104,0.10)]" />
          <div className="h-28 rounded-lg border border-[var(--line)] bg-white/55" />
        </div>
        <div className="grid grid-cols-[1.4fr_0.8fr] gap-3 max-md:gap-2">
          <div className="h-14 rounded-lg border border-[var(--line)] bg-white/55" />
          <div className="h-14 rounded-lg border border-[var(--line)] bg-[rgba(63,98,104,0.09)]" />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="page-shell pb-10">
      <div className="hairline mb-8" />
      <div className="flex items-center justify-between gap-6 text-sm text-[var(--muted)] max-md:flex-col max-md:items-start">
        <p>Available for product strategy, systems, and interface design.</p>
        <div className="flex flex-wrap gap-5 font-bold">
          <a className="transition-colors hover:text-[var(--ink)]" href="mailto:hello@aaravsen.design">
            hello@aaravsen.design
          </a>
          <a className="transition-colors hover:text-[var(--ink)]" href="https://www.linkedin.com">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-[var(--ink)]" href="https://read.cv">
            Read.cv
          </a>
        </div>
      </div>
    </footer>
  );
}
