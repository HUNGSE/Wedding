import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { BG_IMAGES, TEXT_CONTENT } from "../../data/weddingData";

/* ===== Detect mobile ===== */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function HeroSection() {
  const isMobile = useIsMobile();

  /* ===== Split title from data ===== */
  const { left, heart, right } = useMemo(() => {
    const title = TEXT_CONTENT.hero.title || "";
    const parts = title.split("♡");
    return {
      left: parts[0]?.trim() || "",
      heart: "♡",
      right: parts[1]?.trim() || "",
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#fff9fb]"
    >
      {/* Hero image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={BG_IMAGES.hero}
          alt={TEXT_CONTENT.hero.title}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/35" />

      {/* TEXT – CENTER + RESPONSIVE OFFSET */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? -40 : -80 }}
        animate={{ opacity: 1, y: isMobile ? -80 : -140 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center text-white drop-shadow-lg px-4 max-w-4xl"
      >
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="
            font-[Dancing Script,cursive]
            font-light tracking-wide mb-4
            leading-tight
            text-4xl sm:text-6xl lg:text-7xl
          "
        >
          {/* LEFT NAME */}
          <span className="block sm:inline">
            {left}
          </span>

          {/* HEART */}
          <span
            className="
              block sm:inline
              text-2xl sm:text-4xl
              my-1 sm:my-0
              sm:mx-3
              opacity-90
            "
          >
            {heart}
          </span>

          {/* RIGHT NAME */}
          <span className="block sm:inline">
            {right}
          </span>
        </motion.h2>

        {/* DATE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-sm sm:text-xl italic font-light tracking-widest text-white/90"
        >
          {TEXT_CONTENT.hero.date}
        </motion.p>

        {/* DECORATIVE LINE */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="h-px bg-white/60 mx-auto mt-8"
        />
      </motion.div>
    </section>
  );
}
