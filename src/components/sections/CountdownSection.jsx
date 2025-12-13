import { useEffect, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { TEXT_CONTENT } from "../../data/weddingData";
import saveBg from "../../assets/nen2.jpg";
import saveBG1 from "../../assets/nen1.jpg";

const SaveTheDateBox = memo(({ delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
        style={{
      backgroundImage: `url(${saveBG1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    className="flex-1 bg-white border border-[#e8d9d0] rounded-2xl shadow-md p-8 md:p-10 flex flex-col justify-between hover:shadow-lg transition-shadow"
  >
    <div>
      <h3 className="font-[Dancing Script,cursive] text-3xl text-[#5a4585] mb-2 text-center">
        {TEXT_CONTENT.saveTheDate.title}
      </h3>
      <p className="text-sm text-gray-500 text-center mb-4">
        {TEXT_CONTENT.saveTheDate.subtitle}
      </p>
      <div className="text-center mb-6">
        <p className="text-xl font-semibold text-[#5a4585] font-[Playfair Display,serif]">
            Văn Hùng
        </p>
        <p className="text-xl font-semibold text-[#b588a1] font-[Playfair Display,serif]">
            Huyền Trang
        </p>
      </div>
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        {TEXT_CONTENT.saveTheDate.message}
      </p>
    </div>
    <div className="text-center">
      <button 
        onClick={() => {
          const guestbookSection = document.getElementById('guestbook');
          if (guestbookSection) {
            guestbookSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="bg-[#5a4585] hover:bg-[#4a3575] text-white px-6 py-2 rounded-full text-sm transition"
      >
        {TEXT_CONTENT.saveTheDate.buttonText}
      </button>
    </div>
  </motion.div>
));

SaveTheDateBox.displayName = "SaveTheDateBox";

const CountdownBox = memo(({ timeLeft, title, date, dayOfMonth, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
        style={{
      backgroundImage: `url(${saveBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    className="flex-1 bg-white border border-[#e8d9d0] rounded-2xl shadow-md p-8 md:p-10 flex flex-col justify-between hover:shadow-lg transition-shadow" 
  >
    <div className="text-[#5a4585]  font-semibold mb-4 text-lg text-center font-[Playfair Display,serif]">
      {title}
    </div>

    <div className="text-sm text-gray-600 text-center mb-4">
      {date}
    </div>

    {/* Calendar */}
    <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm mb-6 text-center">
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

    {/* Countdown */}
    <div className="flex p-[10px] justify-center gap-4 sm:gap-6 text-[#b588a1] font-[Playfair Display,serif]">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#5a4585]">{String(value).padStart(2, "0")}</div>
          <div className="text-xs uppercase text-gray-600 font-semibold">{label === "days" ? "Ngày" : label === "hours" ? "Giờ" : label === "minutes" ? "Phút" : "Giây"}</div>
        </div>
      ))}
    </div>
  </motion.div>
));

CountdownBox.displayName = "CountdownBox";

function CountdownSection() {
  const [brideDateCountdown, setBrideDateCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [groomDateCountdown, setGroomDateCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer for both dates
  useEffect(() => {
    const brideDate = new Date("2026-02-08T10:30:00").getTime(); // 8/2 - Nhà gái
    const groomDate = new Date("2026-02-12T10:30:00").getTime(); // 12/2 - Nhà trai

    const timer = setInterval(() => {
      const now = new Date().getTime();

      // Bride countdown (8/2)
      const brideDist = brideDate - now;
      if (brideDist > 0) {
        setBrideDateCountdown({
          days: Math.floor(brideDist / (1000 * 60 * 60 * 24)),
          hours: Math.floor((brideDist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((brideDist % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((brideDist % (1000 * 60)) / 1000),
        });
      }

      // Groom countdown (12/2)
      const groomDist = groomDate - now;
      if (groomDist > 0) {
        setGroomDateCountdown({
          days: Math.floor(groomDist / (1000 * 60 * 60 * 24)),
          hours: Math.floor((groomDist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((groomDist % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((groomDist % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="save-the-date"
      className="py-20 sm:py-28 relative flex justify-center px-4 bg-[#fcf7fa]"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-10 max-w-5xl w-full relative z-10">
        <SaveTheDateBox delay={0} />
        <CountdownBox timeLeft={brideDateCountdown} title="💕 Nhà Gái" date="8 Tháng 2, 2026" dayOfMonth={8} delay={0.2} />
        <CountdownBox timeLeft={groomDateCountdown} title="💍 Nhà Trai" date="12 Tháng 2, 2026" dayOfMonth={12} delay={0.4} />
      </div>
    </section>
  );
}

export default CountdownSection;
