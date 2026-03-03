const clockElement = document.getElementById("clock");
const messageElement = document.getElementById("message");
const messageButton = document.getElementById("messageButton");

const messages = [
  "小さく作って、早く試すのがいちばんです。",
  "うまくいかない日は、1つだけ進めば十分です。",
  "コードは短く、意図ははっきり書くと読みやすくなります。",
];

let messageIndex = 0;

function updateClock() {
  const now = new Date();
  const timeText = now.toLocaleTimeString("ja-JP", { hour12: false });
  clockElement.textContent = timeText;
}

messageButton.addEventListener("click", () => {
  messageElement.hidden = false;
  messageElement.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
});

updateClock();
setInterval(updateClock, 1000);
