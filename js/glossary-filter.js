(() => {
  const input = document.querySelector("[data-filter-input]");
  const terms = [...document.querySelectorAll("[data-term]")];
  const emptyState = document.querySelector("[data-filter-empty]");

  if (!input || terms.length === 0) {
    return;
  }

  const normalize = (text) => text.toLowerCase().replace(/\s+/g, "").trim();

  const applyFilter = () => {
    const keyword = normalize(input.value);
    let visibleCount = 0;

    terms.forEach((term) => {
      const source = normalize(term.dataset.term || term.textContent || "");
      const isMatch = keyword.length === 0 || source.includes(keyword);
      term.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  input.addEventListener("input", applyFilter);
  applyFilter();
})();
