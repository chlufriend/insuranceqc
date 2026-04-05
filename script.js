// script.js

function setLanguage(lang) {
  document.querySelectorAll("[data-fr]").forEach(el => {
    if (lang === "fr") {
      el.textContent = el.getAttribute("data-fr");
      if (el.tagName === "IMG" && el.hasAttribute("data-fr-alt")) el.alt = el.getAttribute("data-fr-alt");
    } else if (lang === "en") {
      el.textContent = el.getAttribute("data-en");
      if (el.tagName === "IMG" && el.hasAttribute("data-en-alt")) el.alt = el.getAttribute("data-en-alt");
    } else if (lang === "zh") {
      el.textContent = el.getAttribute("data-zh");
      if (el.tagName === "IMG" && el.hasAttribute("data-zh-alt")) el.alt = el.getAttribute("data-zh-alt");
    }
  });

  // 隐藏/显示文章内容
  document.querySelectorAll(".post-content").forEach(pc => {
    if (pc.hasAttribute("data-fr")) pc.hidden = lang !== "fr";
    if (pc.hasAttribute("data-en")) pc.hidden = lang !== "en";
    if (pc.hasAttribute("data-zh")) pc.hidden = lang !== "zh";
  });
}

function handleContact(event) {
  event.preventDefault();
  const name = document.getElementById("c-name").value;
  const email = document.getElementById("c-email").value;
  const phone = document.getElementById("c-phone").value;
  const message = document.getElementById("c-message").value;
  alert(`Message envoyé !\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`);
  event.target.reset();
}

// 默认语言
document.addEventListener("DOMContentLoaded", () => {
  setLanguage("fr");
});
