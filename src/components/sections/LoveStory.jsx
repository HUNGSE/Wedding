import { memo } from "react";
import { motion } from "framer-motion";
import { LOVE_STORY_ITEMS, TEXT_CONTENT } from "../../data/weddingData";

const TimelineItem = memo(({ item, idx }) => {
  const isReverse = item.reverse;

  return (
    <motion.div
      initial={{ opacity: 0, x: isReverse ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col md:flex-row items-center mb-20 relative ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Text */}
      <div
        className={`w-full md:w-1/2 px-6 md:px-10 text-center md:text-left ${
          isReverse ? "md:text-left" : "md:text-right"
        }`}
      >
        <h3 className="text-2xl font-[Playfair Display,serif] text-[#5a4585] mb-1 italic">
          {item.title}
        </h3>
        <p className="text-sm text-[#b588a1] mb-3 font-medium">
          {item.year}
        </p>
        <p className="text-[#6d6d6d] font-[Poppins,sans-serif] leading-relaxed text-[15px]">
          {item.text}
        </p>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <div className="relative group w-full max-w-md overflow-hidden rounded-2xl shadow-lg">
          <motion.img
            src={item.image}
            alt={item.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-md w-full h-[360px] sm:h-[400px] md:h-[480px] lg:h-[520px] object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-500"></div>
        </div>
      </div>

      {/* Dot timeline — chỉ hiện trên desktop */}
      <span className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#b588a1] rounded-full border-4 border-[#fcf7fa] shadow-md"></span>
    </motion.div>
  );
});

TimelineItem.displayName = "TimelineItem";

export default function LoveStory() {
  return (
    <section
      id="love-story"
      className="py-24 bg-[#fcf7fa] relative overflow-hidden"
    >
      {/* --- Tiêu đề --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-3">
          {TEXT_CONTENT.loveStory.title}
        </h2>
        <p className="text-[#6d6d6d] font-[Poppins,sans-serif] max-w-2xl mx-auto leading-relaxed">
          {TEXT_CONTENT.loveStory.description}
        </p>
      </motion.div>

      {/* --- Timeline --- */}
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Thanh timeline — chỉ hiện trên desktop */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#d9c7f0] to-[#f0d4d8] h-full rounded-full opacity-70"></div>

        {LOVE_STORY_ITEMS.map((item, idx) => (
          <TimelineItem key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  );
}
