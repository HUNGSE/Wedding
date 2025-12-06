import { motion } from "framer-motion";

const ACTION_ITEMS = [
  { id: "guestbook", label: "Gửi lời chúc", icon: "💌", bgColor: "bg-[#f9c9d4] hover:bg-[#f7b7c5]" },
  { id: "events", label: "Xác nhận tham dự", icon: "🎉", bgColor: "bg-[#d9c8f3] hover:bg-[#c5b3ea]" },
  { id: "wedding-gift", label: "Mừng cưới", icon: "💖", bgColor: "bg-[#f2d3e4] hover:bg-[#eac0d8]" },
];

function ActionButton({ id, label, icon, bgColor, delay }) {
  return (
    <motion.a
      href={`#${id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`flex items-center justify-center gap-2 ${bgColor} text-[#5a4585] font-[Poppins,sans-serif] rounded-full px-8 py-3 shadow-md transition-all`}
    >
      {icon} {label}
    </motion.a>
  );
}

export default function ActionButtons() {
  return (
    <section id="action-buttons" className="py-16 bg-[#fcf7fa] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-[Playfair Display,serif] text-[#5a4585] italic mb-8"
        >
          Hãy cùng chung vui với chúng tôi 💞
        </motion.h3>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {ACTION_ITEMS.map((item, idx) => (
            <ActionButton
              key={item.id}
              {...item}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
