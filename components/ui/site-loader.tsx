"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const logoMaskStyle = {
  WebkitMaskImage: "url('/aa-logo.svg')",
  maskImage: "url('/aa-logo.svg')",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} satisfies CSSProperties;

export function SiteLoader() {
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const fillHeight = useTransform(progress, (latest) => `${latest}%`);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    let animationFrame: number | undefined;
    let hideTimer: number | undefined;
    const duration = prefersReducedMotion ? 800 : 3450;
    const hideDelay = prefersReducedMotion ? 120 : 360;
    const startedAt = window.performance.now();

    const updateProgress = (latest: number) => {
      progress.set(latest);
      const nextProgress = Math.min(100, Math.round(latest));
      setDisplayedProgress((currentProgress) =>
        currentProgress === nextProgress ? currentProgress : nextProgress,
      );
    };

    const tick = (now: number) => {
      const elapsed = Math.min(now - startedAt, duration);
      const latest = (elapsed / duration) * 100;

      updateProgress(latest);

      if (elapsed >= duration) {
        hideTimer = window.setTimeout(() => setIsVisible(false), hideDelay);
        return;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, [prefersReducedMotion, progress]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[var(--paper)] px-6 text-[var(--ink)]"
          exit={{
            filter: prefersReducedMotion ? "none" : "blur(10px)",
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.015,
          }}
          initial={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.16 : 0.46,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,var(--paper-bright),var(--paper)_58%,#f8fafc)]"
          />
          <div
            aria-hidden="true"
            className="hero-dot-grid absolute inset-0 opacity-45"
          />

          <div className="relative z-10 flex w-full max-w-[16rem] flex-col items-center">
            <div className="relative aspect-[682/490] w-[min(36vw,7.25rem)] sm:w-[10rem]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[rgb(68_67_63_/_0.16)]"
                style={logoMaskStyle}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(145deg,rgb(255_255_255_/_0.28),transparent_54%)] opacity-80"
                style={logoMaskStyle}
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
                style={logoMaskStyle}
              >
                <motion.div
                  className="absolute inset-x-0 bottom-0 overflow-hidden"
                  style={{ height: fillHeight }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#56534d,#44433f)]" />
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            rotate: [-1.5, 1.5, -1.5],
                            x: ["-54%", "-46%", "-54%"],
                          }
                    }
                    className="absolute left-1/2 top-0 h-6 w-[142%] -translate-y-1/2 rounded-[48%] bg-[rgb(255_255_255_/_0.28)] blur-[0.5px]"
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            rotate: [1.5, -1.5, 1.5],
                            x: ["-47%", "-53%", "-47%"],
                          }
                    }
                    className="absolute left-1/2 top-1.5 h-4 w-[128%] -translate-y-1/2 rounded-[48%] bg-[rgb(255_255_255_/_0.18)]"
                    transition={{
                      duration: 1.45,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col items-center gap-2.5">
              <div
                aria-label="Portfolio loading progress"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={displayedProgress}
                className="sr-only"
                role="progressbar"
              />
              <div className="h-1.5 w-full max-w-[7.5rem] overflow-hidden rounded-[6px] bg-[rgb(68_67_63_/_0.14)] sm:max-w-[8.5rem]">
                <motion.div
                  className="h-full rounded-[6px] bg-[#44433f]"
                  style={{ width: fillHeight }}
                />
              </div>
              <p className="font-mono text-xs font-medium tracking-normal text-[var(--muted)]">
                {displayedProgress.toString().padStart(2, "0")}%
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
