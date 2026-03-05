(() => {
  const searchInput = document.querySelector("[data-swiftui-search-input]");
  if (!searchInput) {
    return;
  }

  const sections = [...document.querySelectorAll("[data-swiftui-section]")];
  const cards = [...document.querySelectorAll("[data-swiftui-section] .card-link")];
  const emptyState = document.querySelector("[data-swiftui-empty]");
  const status = document.querySelector("[data-swiftui-search-status]");

  const searchable = cards.map((card) => {
    const title = card.querySelector("h3")?.textContent ?? "";
    const description = card.querySelector("p")?.textContent ?? "";
    const slug = card.getAttribute("href") ?? "";
    const text = `${title} ${description} ${slug}`.toLowerCase();
    return { card, text };
  });

  const update = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    searchable.forEach((item) => {
      const isMatch = query.length === 0 || item.text.includes(query);
      item.card.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    sections.forEach((section) => {
      const visibleCards = section.querySelectorAll(".card-link:not([hidden])");
      section.hidden = visibleCards.length === 0;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    if (status) {
      status.textContent = `${visibleCount}件を表示中です。`;
    }
  };

  searchInput.addEventListener("input", update);
  update();
})();
