(() => {
  const sharedFooter = document.querySelector("[data-shared-footer]");
  if (sharedFooter) {
    const isPagesPath = window.location.pathname.includes("/pages/");
    const prefix = isPagesPath ? "" : "pages/";
    sharedFooter.innerHTML = `
      <div class="container flow">
        <ul class="footer-links">
          <li><a href="${prefix}roadmap.html">学習ロードマップ</a></li>
          <li><a href="${prefix}roadmap.html#lesson-list">レッスン一覧</a></li>
          <li><a href="${prefix}contact.html">問い合わせ</a></li>
          <li><a href="${prefix}text.html">学習を始める</a></li>
        </ul>
        <small>© Code EJ</small>
      </div>
    `;
  }

  const body = document.body;
  body.classList.add("js-enabled");
  const currentPage = body.dataset.page;
  const lessonPages = new Set([
    "text",
    "image",
    "padding",
    "overlay",
    "vstack",
    "stacks",
    "spacer-frame",
    "button"
  ]);
  const activeNavKey = lessonPages.has(currentPage) ? "lessons" : currentPage;

  const navLinks = document.querySelectorAll("[data-nav-link]");
  navLinks.forEach((link) => {
    const isCurrent = link.dataset.navLink === activeNavKey;
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuPanel = document.querySelector("[data-menu-panel]");
  if (menuToggle && menuPanel) {
    const desktopMediaQuery = window.matchMedia("(min-width: 48rem)");

    const closeMenu = () => {
      body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menuPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    const syncMenuState = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };

    syncMenuState(desktopMediaQuery);

    if (typeof desktopMediaQuery.addEventListener === "function") {
      desktopMediaQuery.addEventListener("change", syncMenuState);
    } else {
      desktopMediaQuery.addListener(syncMenuState);
    }
  }

  const tocLinks = [...document.querySelectorAll("[data-toc-link]")];
  const tocPairs = tocLinks
    .map((link) => {
      const id = link.getAttribute("href")?.replace("#", "");
      if (!id) {
        return null;
      }
      const section = document.getElementById(id);
      if (!section) {
        return null;
      }
      return { id, link, section };
    })
    .filter(Boolean);

  if (tocPairs.length > 0) {
    const setCurrentToc = (id) => {
      tocPairs.forEach((pair) => {
        pair.link.classList.toggle("is-current", pair.id === id);
      });
    };

    setCurrentToc(tocPairs[0].id);

    if ("IntersectionObserver" in window) {
      let activeId = tocPairs[0].id;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeId = entry.target.id;
            }
          });
          setCurrentToc(activeId);
        },
        {
          rootMargin: "-42% 0px -46% 0px",
          threshold: [0, 0.25, 0.5, 1]
        }
      );

      tocPairs.forEach((pair) => observer.observe(pair.section));
    }
  }

  const result = document.querySelector("[data-quiz-result]");
  const quizChoices = document.querySelectorAll("[data-quiz-choice]");
  if (result && quizChoices.length > 0) {
    quizChoices.forEach((button) => {
      button.addEventListener("click", () => {
        const isCorrect = button.dataset.correct === "true";
        result.textContent = isCorrect
          ? "正解です。overlayはベース上に別ビューを重ねるときに使います。"
          : "不正解です。重ね合わせにはoverlayを使います。";
      });
    });
  }
})();
