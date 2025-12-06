import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { TEXT_CONTENT } from "../../data/weddingData";

export default function ThankYou() {
  return (
    <section className="py-20 bg-[#fcf7fa] text-center relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Heart className="w-12 h-12 mx-auto text-[#b588a1] mb-5 animate-pulse" />
          <h2 className="text-3xl font-[Playfair Display,serif] italic text-[#5a4585] mb-3">
            {TEXT_CONTENT.thankYou.title}
          </h2>
          <p className="text-[#6d6d6d] max-w-3xl mx-auto font-[Poppins,sans-serif] leading-relaxed whitespace-pre-line">
            {TEXT_CONTENT.thankYou.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
