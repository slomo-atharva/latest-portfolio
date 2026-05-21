const header = document.querySelector("#siteHeader");
const cursorLight = document.querySelector("#cursorLight");
const ambientCanvas = document.querySelector("#ambientCanvas");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  requestAnimationFrame(() => document.body.classList.remove("is-loading"));
});

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

const revealItems = [...document.querySelectorAll(".reveal")];
revealItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 55, 260)}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  let lightX = window.innerWidth / 2;
  let lightY = window.innerHeight / 2;
  let targetX = lightX;
  let targetY = lightY;

  const renderCursorLight = () => {
    lightX += (targetX - lightX) * 0.16;
    lightY += (targetY - lightY) * 0.16;
    cursorLight.style.transform = `translate3d(${lightX}px, ${lightY}px, 0) translate3d(-50%, -50%, 0)`;
    requestAnimationFrame(renderCursorLight);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursorLight.style.opacity = "1";
    },
    { passive: true }
  );

  document.documentElement.addEventListener("pointerleave", () => {
    cursorLight.style.opacity = "0";
  });

  renderCursorLight();

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate3d(${x * 0.12}px, ${y * 0.18}px, 0)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "translate3d(0, 0, 0)";
    });
  });

  document.querySelectorAll("[data-project-card]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -2.4;
      const rotateY = ((x / rect.width) - 0.5) * 2.4;

      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.setProperty("--x", "50%");
      card.style.setProperty("--y", "50%");
    });
  });

  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      parallaxItems.forEach((item) => {
        const depth = Number(item.dataset.parallax);
        item.style.transform = `translate3d(${x * depth * 90}px, ${y * depth * 90}px, 0)`;
      });
    },
    { passive: true }
  );
}

const setupAmbientCanvas = () => {
  if (!ambientCanvas) return;

  const context = ambientCanvas.getContext("2d", { alpha: true });
  const pointer = { x: 0.5, y: 0.5 };
  const dots = Array.from({ length: 42 }, (_, index) => ({
    x: (Math.sin(index * 12.989) * 43758.5453) % 1,
    y: (Math.sin(index * 78.233) * 24634.6345) % 1,
    r: 1.2 + (index % 5) * 0.36,
    speed: 0.00016 + (index % 6) * 0.000025,
  })).map((dot) => ({
    ...dot,
    x: Math.abs(dot.x),
    y: Math.abs(dot.y),
  }));

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let frame = 0;

  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    ambientCanvas.width = Math.floor(width * pixelRatio);
    ambientCanvas.height = Math.floor(height * pixelRatio);
    ambientCanvas.style.width = `${width}px`;
    ambientCanvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const drawBlob = (x, y, radius, color) => {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  };

  const render = () => {
    frame += 1;
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgba(247,245,241,0.06)";
    context.fillRect(0, 0, width, height);

    const driftX = (pointer.x - 0.5) * 90;
    const driftY = (pointer.y - 0.5) * 70;

    drawBlob(width * 0.14 + driftX, height * 0.18 + driftY, width * 0.34, "rgba(132,124,108,0.16)");
    drawBlob(width * 0.84 - driftX * 0.7, height * 0.18 + driftY * 0.4, width * 0.28, "rgba(57,92,99,0.13)");
    drawBlob(width * 0.68 + driftX * 0.4, height * 0.78 - driftY * 0.6, width * 0.32, "rgba(117,95,67,0.10)");

    context.globalCompositeOperation = "multiply";
    dots.forEach((dot, index) => {
      const wave = Math.sin(frame * dot.speed + index) * 18;
      const x = dot.x * width + driftX * (index % 3) * 0.05 + wave;
      const y = dot.y * height + driftY * (index % 4) * 0.04;

      context.fillStyle = index % 4 === 0 ? "rgba(57,92,99,0.16)" : "rgba(21,21,19,0.08)";
      context.beginPath();
      context.arc(x, y, dot.r, 0, Math.PI * 2);
      context.fill();
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(render);
    }
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    },
    { passive: true }
  );

  resize();
  render();
};

setupAmbientCanvas();
