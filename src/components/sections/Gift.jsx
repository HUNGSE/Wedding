import { memo } from "react";
import { motion } from "framer-motion";
import { GIFT_INFO, TEXT_CONTENT, BG_IMAGES } from "../../data/weddingData";

const GiftCard = memo(({ item, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: i * 0.2 }}
    className="bg-white/90 backdrop-blur-sm border border-[#e8d9d0] rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col items-center"
  >
    <h3 className="text-xl font-[Playfair Display,serif] text-[#5a4585] mb-4 italic">
      {item.title}
    </h3>

    {/* QR code */}
    <div className="relative group">
      <img
        src={item.qr}
        alt="QR code"
        className="w-36 sm:w-40 md:w-44 h-36 sm:h-40 md:h-44 object-contain border border-gray-200 rounded-xl p-3 mb-5 shadow-sm group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition"></div>
    </div>

    {/* Bank Info */}
    <div className="font-[Poppins,sans-serif] text-sm text-[#4a4a4a] leading-relaxed space-y-1">
      <p>
        💳 <strong>Ngân hàng:</strong> {item.bank}
      </p>
      <p>
        🧾 <strong>Số tài khoản:</strong> {item.accNo}
      </p>
      <p>
        👤 <strong>Tên tài khoản:</strong> {item.name}
      </p>
    </div>

    <hr className="w-2/3 my-6 border-[#e8d9d0]" />
  </motion.div>
));

GiftCard.displayName = "GiftCard";

export default function Gift() {
  return (
    <section
      id="wedding-gift"
      className="py-24 bg-[#fcf7fa] text-center relative overflow-hidden"
    >
      {/* Nền hoa chìm mờ */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm"
        style={{ backgroundImage: `url(${BG_IMAGES.gift})` }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Tiêu đề */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-8"
        >
          {TEXT_CONTENT.gift.title}
        </motion.h2>

        {/* Hai hộp mừng cưới */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          {GIFT_INFO.map((item, i) => (
            <GiftCard key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
