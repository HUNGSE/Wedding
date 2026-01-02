import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { TEXT_CONTENT } from "../../data/weddingData";
import saveBg from "../../assets/nen2.jpg";
import saveBG1 from "../../assets/nen1.jpg";

/* ================= SAVE THE DATE ================= */
const SaveTheDateBox = memo(({ delay, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    style={{
      backgroundImage: `url(${saveBG1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    className={`
      bg-white border border-[#e8d9d0] rounded-2xl shadow-md
      p-8 md:p-10 flex flex-col justify-between
      hover:shadow-lg transition-shadow
      ${className}
    `}
  >
    <div>
      <h3 className="font-[Dancing Script,cursive] text-3xl text-[#5a4585] mb-2 text-center">
        {TEXT_CONTENT.saveTheDate.title}
      </h3>

      <p className="text-sm text-gray-500 text-center mb-4">
        {TEXT_CONTENT.saveTheDate.subtitle}
      </p>

      <div className="text-center mb-6">
        <p className="text-xl font-semibold text-[#b588a1] font-[Playfair Display,serif]">
          Huyền Trang
        </p>
        <p className="text-xl font-semibold text-[#5a4585] font-[Playfair Display,serif]">
          Văn Hùng
        </p>
      </div>

      <p className="text-gray-600 text-center leading-relaxed">
        {TEXT_CONTENT.saveTheDate.message}
      </p>
    </div>

    <div className="text-center mt-6">
      <button
        onClick={() => {
          const guestbook = document.getElementById("guestbook");
          guestbook?.scrollIntoView({ behavior: "smooth" });
        }}
        className="bg-[#5a4585] hover:bg-[#4a3575] text-white px-6 py-2 rounded-full text-sm transition"
      >
        {TEXT_CONTENT.saveTheDate.buttonText}
      </button>
    </div>
  </motion.div>
));

SaveTheDateBox.displayName = "SaveTheDateBox";

/* ================= COUNTDOWN BOX ================= */
const CountdownBox = memo(({ timeLeft, title, date, dayOfMonth, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    style={{
      backgroundImage: `url(${saveBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    className="
      bg-white border border-[#e8d9d0] rounded-2xl shadow-md
      p-8 md:p-10 flex flex-col justify-between
      hover:shadow-lg transition-shadow
    "
  >
    {/* TITLE */}
    <div>
      <div className="text-[#5a4585] font-semibold text-lg text-center font-[Playfair Display,serif]">
        {title}
      </div>

      <div className="text-sm text-gray-600 text-center mt-1 mb-4">
        {date}
      </div>

      {/* CALENDAR */}
      <div className="grid grid-cols-7 gap-1 text-[11px] sm:text-sm mb-6 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-gray-500 font-semibold py-1">
            {d}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => (
          <div
            key={i}
            className={`py-1 rounded-md font-semibold ${
              i + 1 === dayOfMonth
                ? "bg-[#b588a1] text-white"
                : "text-gray-700"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>

    {/* COUNTDOWN – FIX ĐÈ VIỀN */}
    <div
      className="
        flex justify-center gap-3 sm:gap-6
        text-[#b588a1] font-[Playfair Display,serif]
        pb-4 sm:pb-6
      "
    >
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#5a4585]">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase text-gray-600 font-semibold">
            {label === "days"
              ? "Ngày"
              : label === "hours"
              ? "Giờ"
              : label === "minutes"
              ? "Phút"
              : "Giây"}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
));

CountdownBox.displayName = "CountdownBox";

/* ================= MAIN SECTION ================= */
export default function CountdownSection() {
  const [bride, setBride] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [groom, setGroom] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const brideDate = new Date("2026-02-08T10:30:00").getTime();
    const groomDate = new Date("2026-02-12T10:30:00").getTime();

    const calc = (target) => {
      const diff = target - Date.now();
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    };

    const timer = setInterval(() => {
      setBride(calc(brideDate));
      setGroom(calc(groomDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="save-the-date"
      className="py-20 sm:py-28 bg-[#fcf7fa] px-4 flex justify-center"
    >
      <div
        className="
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          max-w-6xl
          w-full
        "
      >
        <SaveTheDateBox
          delay={0}
          className="md:col-span-2 lg:col-span-1"
        />

        <CountdownBox
          timeLeft={bride}
          title="💕 Nhà Gái"
          date="08 Tháng 02, 2026"
          dayOfMonth={8}
          delay={0.2}
        />

        <CountdownBox
          timeLeft={groom}
          title="💍 Nhà Trai"
          date="12 Tháng 02, 2026"
          dayOfMonth={12}
          delay={0.4}
        />
      </div>
    </section>
  );
}
