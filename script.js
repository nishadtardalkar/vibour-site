(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveals = document.querySelectorAll(".reveal");
  if (reduced) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  requestAnimationFrame(() => {
    document.querySelectorAll(".hero .reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
  });

  const parallax = document.querySelector("[data-parallax]");
  if (!reduced && parallax) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = parallax.getBoundingClientRect();
        const view = window.innerHeight;
        const progress = (view - rect.top) / (view + rect.height);
        const offset = (progress - 0.5) * 36;
        parallax.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const flash = document.querySelector("[data-flash]");
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      btn.classList.remove("is-pulse");
      void btn.offsetWidth;
      btn.classList.add("is-pulse");

      if (flash) {
        flash.classList.remove("is-like", "is-pass");
        void flash.offsetWidth;
        flash.classList.add(action === "like" ? "is-like" : "is-pass");
        window.setTimeout(() => {
          flash.classList.remove("is-like", "is-pass");
        }, 420);
      }
    });
  });
})();
