const result = document.getElementById("quizResult");
const choices = document.querySelectorAll(".choice");

choices.forEach((button) => {
  button.addEventListener("click", () => {
    const isCorrect = button.dataset.correct === "true";
    result.textContent = isCorrect
      ? "正解です！ Textビューで文字を表示します。"
      : "不正解です。ヒント: 文字を表示するビュー名です。";
  });
});
