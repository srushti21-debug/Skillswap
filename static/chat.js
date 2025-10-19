// Handle sending messages
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;
  const msg = document.createElement("div");
  msg.classList.add("message", "outgoing");
  msg.textContent = text;
  chatMessages.appendChild(msg);
  input.value = "";

  // Auto scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulated response
  setTimeout(() => {
    const reply = document.createElement("div");
    reply.classList.add("message", "incoming");
    reply.textContent = "Got it! 👍";
    chatMessages.appendChild(reply);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
}

// Handle video call
document.getElementById("videoCallBtn").addEventListener("click", () => {
  alert("📹 Starting a video call... (demo simulation)");
});

// Handle emoji and file upload buttons
document.getElementById("emojiBtn").addEventListener("click", () => {
  input.value += "😊";
  input.focus();
});

document.getElementById("fileBtn").addEventListener("click", () => {
  alert("📎 File sharing feature coming soon!");
});
