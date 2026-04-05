// chatbot.js
let currentLang = "fr"; // 默认法语

// 同步网站语言切换
function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-fr]").forEach(el => {
    if (lang === "fr") {
      el.textContent = el.getAttribute("data-fr");
    } else if (lang === "en") {
      el.textContent = el.getAttribute("data-en");
    } else if (lang === "zh") {
      el.textContent = el.getAttribute("data-zh");
    }
  });
}

// 调用Netlify Function
async function askChatbot(message) {
  const response = await fetch("/.netlify/functions/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are an insurance assistant for insuranceqc.ca. Always reply in ${
            currentLang === "fr" ? "French" : currentLang === "en" ? "English" : "Chinese"
          }. Provide advice about car, home, travel, and student insurance in Quebec.`
        },
        { role: "user", content: message }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

// UI 控制
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const windowEl = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chatbot-close");
  const sendBtn = document.getElementById("chatbot-send");
  const inputEl = document.getElementById("chatbot-input");
  const messagesDiv = document.getElementById("chatbot-messages");

  if (toggleBtn && windowEl && closeBtn && sendBtn && inputEl && messagesDiv) {
    toggleBtn.onclick = () => { windowEl.style.display = "flex"; };
    closeBtn.onclick = () => { windowEl.style.display = "none"; };

    sendBtn.onclick = async () => {
      const input = inputEl.value.trim();
      if (!input) return;
      messagesDiv.innerHTML += `<div><b>Vous:</b> ${input}</div>`;
      inputEl.value = "";
      const reply = await askChatbot(input);
      messagesDiv.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
  } else {
    console.error("Chatbot elements not found in HTML");
  }
});