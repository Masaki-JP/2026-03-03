(() => {
  const searchInput = document.querySelector("[data-swiftui-search-input]");
  if (!searchInput) {
    return;
  }

  const viewsGrid = document.querySelector('[data-swiftui-grid="views"]');
  const modifiersGrid = document.querySelector('[data-swiftui-grid="modifiers"]');
  if (!viewsGrid || !modifiersGrid) {
    return;
  }

  const emptyState = document.querySelector("[data-swiftui-empty]");
  const status = document.querySelector("[data-swiftui-search-status]");

  const viewsCards = [...viewsGrid.querySelectorAll(".card-link")];
  const modifierCards = [...modifiersGrid.querySelectorAll(".card-link")];

  const createSearchableItems = (cards) =>
    cards.map((card) => {
      const title = card.querySelector("h3")?.textContent ?? "";
      const description = card.querySelector("p")?.textContent ?? "";
      const slug = card.getAttribute("href") ?? "";
      const text = `${title} ${description} ${slug}`.toLowerCase();
      return { card, text };
    });

  const searchableViews = createSearchableItems(viewsCards);
  const searchableModifiers = createSearchableItems(modifierCards);

  const findMatches = (items, query) => {
    if (!query) {
      return items;
    }
    return items.filter((item) => item.text.includes(query));
  };

  const renderCards = (grid, items) => {
    const nextCards = items.map((item) => item.card.cloneNode(true));
    grid.replaceChildren(...nextCards);
  };

  const update = () => {
    const query = searchInput.value.trim().toLowerCase();

    const matchedViews = findMatches(searchableViews, query);
    const matchedModifiers = findMatches(searchableModifiers, query);

    renderCards(viewsGrid, matchedViews);
    renderCards(modifiersGrid, matchedModifiers);

    const visibleCount = matchedViews.length + matchedModifiers.length;

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    if (status) {
      status.textContent = `Basic Views: ${matchedViews.length}件 / Basic Modifiers: ${matchedModifiers.length}件`;
    }
  };

  searchInput.addEventListener("input", update);
  update();
})();
