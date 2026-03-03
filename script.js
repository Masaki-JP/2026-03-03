const clockElement = document.getElementById("clock");
const messageElement = document.getElementById("message");
const messageButton = document.getElementById("messageButton");
const dateText = document.getElementById("dateText");
const dailyTip = document.getElementById("dailyTip");
const greeting = document.getElementById("greeting");
const themeToggle = document.getElementById("themeToggle");

const messages = [
  "小さく作って、早く試すのがいちばんです。",
  "うまくいかない日は、1つだけ進めば十分です。",
  "コードは短く、意図ははっきり書くと読みやすくなります。",
];

const tips = [
  "10分だけでも触れば前に進めます。",
  "迷ったら、まず画面に出してみましょう。",
  "リファクタは“小さく・安全に”がコツです。",
  "変更したら、すぐ動かして確かめるのが近道です。",
];

let messageIndex = 0;

function updateClock() {
  const now = new Date();
  const timeText = now.toLocaleTimeString("ja-JP", { hour12: false });
  clockElement.textContent = timeText;

  const hour = now.getHours();
  if (hour < 12) {
    greeting.textContent = "おはようございます、Webページ";
  } else if (hour < 18) {
    greeting.textContent = "こんにちは、Webページ";
  } else {
    greeting.textContent = "こんばんは、Webページ";
  }
}

function updateDateAndTip() {
  const now = new Date();
  dateText.textContent = now.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const daySeed = now.getDate() % tips.length;
  dailyTip.textContent = tips[daySeed];
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️ ライト" : "🌙 ダーク";
}

messageButton.addEventListener("click", () => {
  messageElement.hidden = false;
  messageElement.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

updateClock();
updateDateAndTip();
setInterval(updateClock, 1000);
