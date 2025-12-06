import { motion } from "framer-motion";

const FOOTER_CONFIG = {
  year: 2025,
  couple: "Văn Hùng & Huyền Trang",
  message: "Made with 💜 & Love",
};

export default function Footer() {
  return (
    <footer className="py-6 text-center bg-[#f3effb] text-[#5a4585] text-sm font-[Poppins,sans-serif] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        © {FOOTER_CONFIG.year} {FOOTER_CONFIG.couple} · Thiệp cưới hiện đại · {FOOTER_CONFIG.message}
      </motion.div>
    </footer>
  );
}
