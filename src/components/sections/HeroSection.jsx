import { motion } from "framer-motion";
import { BG_IMAGES, TEXT_CONTENT } from "../../data/weddingData";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center overflow-hidden w-full h-screen bg-[#fff9fb]"
    >
      {/* Ảnh hero với parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 overflow-hidden"
      >
        <img
          src={BG_IMAGES.hero}
          alt={TEXT_CONTENT.hero.title}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay - tối hơn để text nổi hơn */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>

      {/* Text container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-white drop-shadow-lg px-4 max-w-4xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-[Dancing Script,cursive] mb-4 font-light tracking-wide"
        >
          {TEXT_CONTENT.hero.title}
        </motion.h2>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-base sm:text-xl italic font-light tracking-widest text-white/90"
        >
          {TEXT_CONTENT.hero.date}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="h-px bg-white/60 mx-auto mt-8"
        ></motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
      </motion.div>
    </section>
  );
}
