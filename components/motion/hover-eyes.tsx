"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useCallback, useState } from "react";
import type {
  FocusEvent as ReactFocusEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

type HoverEyesProps = {
  children: ReactNode;
  className?: string;
  eyeClassName?: string;
  eyeSizeClassName?: string;
  "data-eye-target"?: string;
};

const springConfig = {
  damping: 23,
  mass: 0.34,
  stiffness: 310,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HoverEyes({
  children,
  className = "",
  eyeClassName = "top-[-0.6em]",
  eyeSizeClassName = "",
  "data-eye-target": dataEyeTarget,
}: HoverEyesProps) {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pupilXValue = useMotionValue(0);
  const pupilYValue = useMotionValue(0);
  const pupilX = useSpring(pupilXValue, springConfig);
  const pupilY = useSpring(pupilYValue, springConfig);

  const resetPupils = useCallback(() => {
    setIsActive(false);
    pupilXValue.set(0);
    pupilYValue.set(0);
  }, [pupilXValue, pupilYValue]);

  const trackPointer = useCallback(
    (event: ReactPointerEvent<HTMLSpanElement>) => {
      setIsActive(true);

      if (prefersReducedMotion) {
        return;
      }

      const bounds = event.currentTarget.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const offsetX = (event.clientX - centerX) / (bounds.width / 2);
      const offsetY = (event.clientY - centerY) / (bounds.height / 2);

      pupilXValue.set(clamp(offsetX, -1, 1) * 10);
      pupilYValue.set(clamp(offsetY, -1, 1) * 6);
    },
    [prefersReducedMotion, pupilXValue, pupilYValue],
  );

  const handleFocus = useCallback(
    (event: ReactFocusEvent<HTMLSpanElement>) => {
      if (event.currentTarget.contains(event.target)) {
        setIsActive(true);
      }
    },
    [],
  );

  const handleBlur = useCallback(
    (event: ReactFocusEvent<HTMLSpanElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        resetPupils();
      }
    },
    [resetPupils],
  );

  const eyeMotion = prefersReducedMotion
    ? { opacity: isActive ? 1 : 0 }
    : {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.86,
        y: isActive ? 0 : 8,
      };

  return (
    <span
      className={className}
      data-eye-target={dataEyeTarget}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={resetPupils}
      onPointerMove={trackPointer}
    >
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 ${eyeClassName} ${eyeSizeClassName}`}
      >
        <motion.span
          animate={eyeMotion}
          className="flex items-center gap-[0.08em] drop-shadow-[0_14px_20px_rgba(15,23,42,0.14)]"
          initial={false}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {[0, 1].map((eyeIndex) => (
            <motion.span
              animate={
                isActive && !prefersReducedMotion
                  ? { scaleY: [0.22, 1.08, 1, 0.18, 1] }
                  : { scaleY: 1 }
              }
              className="relative grid h-[0.64em] w-[0.47em] origin-center place-items-center overflow-hidden rounded-[50%] border-[0.045em] border-[var(--ink)] bg-[var(--paper-bright)]"
              key={eyeIndex}
              transition={{
                delay: eyeIndex * 0.03,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="relative h-[52%] w-[54%] rounded-full bg-[var(--ink)]"
                style={{ x: pupilX, y: pupilY }}
              >
                <span className="absolute left-[22%] top-[16%] h-[22%] w-[22%] rounded-full bg-[var(--paper-bright)]" />
              </motion.span>
            </motion.span>
          ))}
        </motion.span>
      </span>
    </span>
  );
}
