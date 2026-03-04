(() => {
  const labs = document.querySelectorAll(".code-lab");
  if (labs.length === 0) {
    return;
  }

  labs.forEach((lab) => {
    const buttons = [...lab.querySelectorAll("[data-code-switch]")];
    const panels = [...lab.querySelectorAll("[data-code-level]")];

    if (buttons.length === 0 || panels.length === 0) {
      return;
    }

    const defaultButton = buttons.find((button) => button.dataset.codeSwitch === "basic") || buttons[0];

    const setLevel = (level) => {
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.codeLevel !== level;
      });

      buttons.forEach((button) => {
        const isActive = button.dataset.codeSwitch === level;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    };

    setLevel(defaultButton.dataset.codeSwitch || "basic");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setLevel(button.dataset.codeSwitch || "basic");
      });
    });
  });
})();
