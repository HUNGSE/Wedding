import { useEffect } from "react";

export default function SnowEffect({ isActive }) {
  useEffect(() => {
    if (!isActive) return;

    const container = document.createElement("div");
    container.className = "snow-container";
    document.body.appendChild(container);

    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄";
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDuration = 5 + Math.random() * 5 + "s";
      snowflake.style.fontSize = 10 + Math.random() * 14 + "px";
      container.appendChild(snowflake);

      setTimeout(() => snowflake.remove(), 10000);
    };

    const interval = setInterval(createSnowflake, 150);
    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, [isActive]);

  return null;
}
