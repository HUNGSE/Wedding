import { useEffect } from "react";

export default function HeartsEffect({ isActive }) {
  useEffect(() => {
    if (!isActive) return;

    const container = document.createElement("div");
    container.className = "hearts-container";
    document.body.appendChild(container);

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 3 + Math.random() * 3 + "s";
      heart.style.fontSize = 16 + Math.random() * 10 + "px";
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    };

    const interval = setInterval(createHeart, 250);
    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, [isActive]);

  return null;
}
