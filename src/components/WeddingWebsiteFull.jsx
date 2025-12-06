import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Heart } from "lucide-react";
import img1 from "../assets/KIM03123.jpg";
import img2 from "../assets/KIM03126.jpg";
import img3 from "../assets/KIM03588.jpg";
import img4 from "../assets/KIM03588.jpg";
import img5 from "../assets/KIM03239.jpg";
import img6 from "../assets/KIM03587.jpg";
import img7 from "../assets/KIM03040.jpg";
import heroImg from "../assets/KIM03040.jpg";
import nenImg from "../assets/nen.jpg";
import groomImg from "../assets/KIM03283.jpg";
import brideImg from "../assets/KIM03784.jpg";
import weddingVideoBg from "../assets/KIM03123.jpg";
import ls1 from "../assets/KIM03784.jpg";
import ls2 from "../assets/Cauhon.jpg";
import ls3 from "../assets/Damngo.jpg";
import ls4 from "../assets/KIM03634.jpg";
import ls5 from "../assets/KIM03587.jpg";
import eventsBg from "../assets/hinhnen.jpg";
import ev1 from "../assets/KIM03123.jpg";
import ev2 from "../assets/KIM03126.jpg";
import ev3 from "../assets/KIM03587.jpg";
import ev4 from "../assets/KIM03584.jpg";
import giftBg from "../assets/hoanen.jpg";
import qrImg from "../assets/qr.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const slides = [img1, img2, img3, img4, img5, img6, img7];
import BackgroundMusic from "./BackgroundMusic";
import { Menu, X } from "lucide-react";
const getObjectFit = (img) => {
  const image = new Image();
  image.src = img;
  return new Promise((resolve) => {
    image.onload = () => {
      const ratio = image.width / image.height;
      resolve(ratio < 1 ? "contain" : "cover");
    };
  });
};

export default function WeddingWebsiteFull() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };
  const [fitMap, setFitMap] = useState({});

  const images = [img1, img2, img3, img4, img5, img6];


  useEffect(() => {
    Promise.all(images.map(async (src) => [src, await getObjectFit(src)])).then(
      (entries) => setFitMap(Object.fromEntries(entries))
    );
  }, []);

  const menuItems = [
    ["#hero", "Cặp đôi"],
    ["#love-story", "Chuyện tình yêu"],
    ["#wedding-events", "Sự kiện cưới"],
    ["#gallery", "Album ảnh"],
    ["#guestbook", "Sổ lưu bút"],
    ["#wedding-gift", "Mừng cưới"],
  ];


  // Hero slideshow images (your uploads)

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("2026-02-12T10:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play slideshow
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  return (
    <div className="font-[DM_Sans] text-[#2e2b45] bg-gradient-to-b from-[#fffafc] to-[#fdf9ff] overflow-x-hidden scroll-smooth">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Tiêu đề */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[Great_Vibes] text-2xl sm:text-3xl text-[#c589b7] tracking-wide cursor-pointer"
            onClick={() => handleScroll("#hero")}
          >
            VH ♡ HT
          </motion.h1>

          {/* Nút menu cho mobile */}
          <button
            className="md:hidden text-[#c589b7] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Menu ngang cho desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:flex flex-wrap justify-center gap-6 text-sm sm:text-base font-medium text-[#a87ca0]"
          >
            {menuItems.map(([href, label]) => (
              <button
                key={href}
                onClick={() => handleScroll(href)}
                className="hover:text-[#c589b7] transition-colors duration-300"
              >
                {label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Menu dọc khi mobile mở */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="
                        md:hidden 
                        fixed top-[70px] right-3 
                        w-[220px] 
                        bg-white/95 
                        border border-[#e7d5df] 
                        shadow-xl rounded-2xl 
                        text-[#a87ca0] 
                        py-4 flex flex-col gap-3 items-center
                        backdrop-blur-md
                      "
          >
            {menuItems.map(([href, label]) => (
              <button
                key={href}
                onClick={() => handleScroll(href)}
                className="w-full text-center py-2 hover:text-[#c589b7] transition-colors duration-300"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}

      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="hero"
        className="relative flex items-center justify-center text-center overflow-hidden w-full h-screen bg-[#fff9fb]"
      >
        {/* Ảnh hero full màn hình */}
        <img
          src={heroImg}
          alt="Văn Hùng ♡ Huyền Trang"
          className="
      absolute inset-0
      w-full h-full
      object-cover
      object-center
      transition-transform duration-[6000ms] ease-out
      scale-100 hover:scale-[1.02]
    "
        />

        {/* Overlay nhẹ để chữ nổi hơn */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        {/* Text trung tâm */}
        <div className="relative z-10 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] px-4">
          <h2 className="text-3xl sm:text-5xl font-[Dancing Script,cursive] mb-3">
            Văn Hùng ♡ Huyền Trang
          </h2>
          <p className="text-base sm:text-lg italic">12 Tháng 2, 2026</p>
        </div>
      </section>


      {/* --- SAVE THE DATE --- */}
      <section
        id="save-the-date"
        className="py-20 sm:py-28 relative flex justify-center px-4 bg-[#faf8f7]"
        style={{
          backgroundImage: `url(${giftBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col md:flex-row items-stretch gap-10 max-w-5xl w-full relative z-10">
          {/* Left Box */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 bg-white border border-[#d6b1b8] rounded-md shadow-md p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-[Dancing Script,cursive] text-3xl text-[#2e2b45] mb-2 text-center">
                Save the Date
              </h3>
              <p className="text-sm text-gray-500 text-center mb-2">
                For the wedding of
              </p>
              <h2 className="text-2xl font-semibold text-[#a25a7a] text-center mb-4 font-[Cormorant_Garamond]">
                Văn Hùng & Huyền Trang
              </h2>
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng tôi thêm phần trọn vẹn!
              </p>
            </div>
            <div className="text-center">
              <button className="bg-[#c589b7] hover:bg-[#b07aa5] text-white px-6 py-2 rounded-full text-sm transition">
                Gửi lời chúc →
              </button>
            </div>
          </motion.div>

          {/* Right Box */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 bg-white border border-[#d6b1b8] rounded-md shadow-md p-8 md:p-10 flex flex-col justify-between"
          >
            <div className="text-[#2e2b45] font-semibold mb-4 text-lg text-center font-[Cormorant_Garamond]">
              FEBRUARY / 2026
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-2 text-xs sm:text-sm mb-8 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-gray-500">{d}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`py-1 rounded-md ${i + 1 === 12
                    ? "bg-[#c589b7] text-white font-semibold"
                    : "text-gray-700"
                    }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Countdown */}
            <div className="flex justify-center gap-8 sm:gap-10 text-[#a25a7a] font-[Cormorant_Garamond]">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="text-center">
                  <p className="text-4xl leading-tight">{value}</p>
                  <p className="text-xs sm:text-sm capitalize text-gray-500 mt-1">
                    {label === "days"
                      ? "Ngày"
                      : label === "hours"
                        ? "Giờ"
                        : label === "minutes"
                          ? "Phút"
                          : "Giây"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      { }
      <section
        id="couple"
        className="py-20 bg-[#fcf7fa] text-center overflow-hidden font-[Poppins,sans-serif]"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-4xl font-[Playfair Display,serif] text-[#5a4585] italic mb-3">
            Cô Dâu & Chú Rể
          </h2>
          <p className="text-[#6d6d6d] text-base max-w-2xl mx-auto leading-relaxed">
            Tình yêu là khi hạnh phúc của người khác trở thành điều quý giá nhất trong cuộc sống của bạn.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white border border-[#e5dcd4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
          >
            {/* Image */}
            <div className="w-full md:w-1/2 overflow-hidden">
              <img
                src={groomImg}
                alt="Chú rể Văn Hùng"
                className="w-full h-auto md:h-full object-contain md:object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 text-left p-6 md:p-8 mt-4 md:mt-0 flex flex-col justify-center bg-white relative z-10">
              <h3 className="text-2xl font-[Playfair Display,serif] text-[#5a4585] mb-3 italic">
                Đoàn Văn Hùng
              </h3>
              <p className="text-sm text-[#555] mb-1">
                Con ông: <span className="font-semibold text-[#b588a1]">Đoàn Văn Đức</span>
              </p>
              <p className="text-sm text-[#555] mb-4">
                Con bà: <span className="font-semibold text-[#b588a1]">Trần Thị Thủy</span>
              </p>
              <p className="text-[#6d6d6d] leading-relaxed text-[15px]">
                Hiện là kỹ sư phần mềm tại <strong className="text-[#5a4585]">FPT Software</strong>.
                Một người hiền lành, điềm đạm, luôn dành tình yêu thương và sự trân trọng
                cho gia đình cùng mọi người xung quanh.
              </p>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white border border-[#e5dcd4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
          >
            {/* Info */}
            <div className="w-full md:w-1/2 text-left p-6 md:p-8 mt-4 md:mt-0 flex flex-col justify-center bg-white relative z-10">
              <h3 className="text-2xl font-[Playfair Display,serif] text-[#5a4585] mb-3 italic">
                Nguyễn Thị Huyền Trang
              </h3>
              <p className="text-sm text-[#555] mb-1">
                Con ông: <span className="font-semibold text-[#b588a1]">Nguyễn Quốc Lập</span>
              </p>
              <p className="text-[#6d6d6d] leading-relaxed text-[15px]">
                Là một cô gái xinh đẹp, giỏi giang và hiện đang là kỹ sư lập trình nhúng
                tại <strong className="text-[#5a4585]">FPT Software</strong>.
                Luôn vui vẻ, năng động và mang đến năng lượng tích cực cho mọi người xung quanh.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 overflow-hidden">
              <img
                src={brideImg}
                alt="Cô dâu Huyền Trang"
                className="w-full h-auto md:h-full object-contain md:object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ACTION BUTTON SECTION (ở giữa Couple và Love Story) --- */}
      <section
        id="action-buttons"
        className="py-16 bg-gradient-to-b from-[#fceef6] to-[#fcf7fa] text-center relative"
      >
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="text-2xl font-[Playfair Display,serif] text-[#5a4585] italic mb-8">
            Hãy cùng chung vui với chúng tôi 💞
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="#guestbook"
              className="flex items-center justify-center gap-2 bg-[#f9c9d4] hover:bg-[#f7b7c5] text-[#5a4585] font-[Poppins,sans-serif] rounded-full px-8 py-3 shadow-md transition-all"
            >
              💌 Gửi lời chúc
            </a>

            <a
              href="#events"
              className="flex items-center justify-center gap-2 bg-[#d9c8f3] hover:bg-[#c5b3ea] text-[#5a4585] font-[Poppins,sans-serif] rounded-full px-8 py-3 shadow-md transition-all"
            >
              🎉 Xác nhận tham dự
            </a>

            <a
              href="#wedding-gift"
              className="flex items-center justify-center gap-2 bg-[#f2d3e4] hover:bg-[#eac0d8] text-[#5a4585] font-[Poppins,sans-serif] rounded-full px-8 py-3 shadow-md transition-all"
            >
              💖 Mừng cưới
            </a>
          </div>
        </div>
      </section>


      {/* --- WEDDING VIDEO SECTION --- */}
      <section
        id="wedding-video"
        className="relative py-24 bg-[#fff7fa] text-center overflow-hidden"
      >
        {/* Background image (ảnh video hoặc ảnh nền lãng mạn) */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.55]"
          style={{
            backgroundImage: `url(${weddingVideoBg})`,
          }}
        ></div>


        {/* Overlay content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center justify-center px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-[Cormorant Garamond,serif] text-white font-semibold mb-3 drop-shadow-md">
            Xem video cưới của chúng tôi
          </h2>
          <p className="text-white/90 font-[DM Sans,sans-serif] max-w-xl mx-auto mb-8 text-sm sm:text-base drop-shadow">
            Tình yêu không làm cho thế giới quay tròn.
            Tình yêu là những gì làm cho chuyến đi đáng giá.
          </p>

          {/* Play Button */}
          <button
            onClick={() =>
              window.open("https://www.youtube.com/watch?v=bRXi5KnveXE", "_blank")
            }
            className="relative flex items-center justify-center w-20 h-20 bg-white/20 rounded-full border-4 border-pink-300 hover:scale-110 hover:bg-white/30 transition-transform duration-500"
          >
            <span className="absolute inset-0 animate-ping bg-pink-300/40 rounded-full"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="none"
              className="w-10 h-10 z-10 ml-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5l13.5-6.75L5.25 5.25z" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* --- LOVE STORY (timeline + ảnh xen kẽ) --- */}
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
            Chuyện Tình Yêu
          </h2>
          <p className="text-[#6d6d6d] font-[Poppins,sans-serif] max-w-2xl mx-auto leading-relaxed">
            Tình yêu không chỉ là một danh từ – nó là một động từ.
            Nó là sự quan tâm, chia sẻ, giúp đỡ và hy sinh mỗi ngày.
          </p>
        </motion.div>

        {/* --- Timeline --- */}
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Thanh timeline — chỉ hiện trên desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#d9c7f0] to-[#f0d4d8] h-full rounded-full opacity-70"></div>

          {[
            {
              title: "Tỏ tình",
              year: "2022",
              text: "Ngày ấy, một tách cà phê, một nụ cười và những cuộc trò chuyện không dứt đã mở đầu cho câu chuyện tình đầy ấm áp.",
              image: ls1,
              reverse: false,
            },
            {
              title: "Cầu hôn",
              year: "Tháng 4 / 2025",
              text: "Sau hơn 3 năm bên nhau, anh chuẩn bị một buổi tối giản dị nhưng đầy cảm xúc và quỳ xuống nói: 'Làm vợ anh nhé?'. Một khoảnh khắc không thể nào quên.",
              image: ls2,
              reverse: true,
            },
            {
              title: "Lễ dạm ngõ",
              year: "Tháng 5 / 2025",
              text: "Hai gia đình gặp mặt trong không khí ấm cúng, trao nhau lời chúc phúc và ấn định ngày trọng đại. Từ đây, hai tiếng 'thông gia' chính thức bắt đầu.",
              image: ls3,
              reverse: false,
            },
            {
              title: "Lễ Vu Quy",
              year: "08 / 02 / 2026",
              text: "Trong tiếng nhạc nhẹ, cô dâu Huyền Trang rạng rỡ bước ra, đôi mắt long lanh. Khoảnh khắc ấy ghi dấu một chặng hành trình mới – chính thức rời nhà cha mẹ để cùng anh xây dựng tổ ấm.",
              image: ls4,
              reverse: true,
            },
            {
              title: "Thành Hôn",
              year: "12 / 02 / 2026",
              text: "Giây phút thiêng liêng ấy – khi hai người trao nhau lời thề nguyện. Từ đây, họ chính thức trở thành vợ chồng, cùng nhau đi tiếp chặng đường đời hạnh phúc.",
              image: ls5,
              reverse: false,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: item.reverse ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center mb-20 relative ${item.reverse ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Text */}
              <div
                className={`w-full md:w-1/2 px-6 md:px-10 text-center md:text-left ${item.reverse ? "md:text-left" : "md:text-right"
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
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-2xl shadow-md w-full h-[320px] sm:h-[360px] lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-500"></div>
                </div>
              </div>

              {/* Dot timeline — chỉ hiện trên desktop */}
              <span className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#b588a1] rounded-full border-4 border-[#fcf7fa] shadow-md"></span>
            </motion.div>
          ))}
        </div>
      </section>



      {/* --- WEDDING EVENTS --- */}
      <section
        id="wedding-events"
        className="relative py-24 text-center bg-[#fcf7fa] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${eventsBg})` }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-3"
          >
            Sự Kiện Cưới
          </motion.h2>
          <p className="text-[#6d6d6d] font-[Poppins,sans-serif] mb-12">
            ...Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhìn về một hướng...
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Lễ Nạp Tài",
                time: "09:00 - 08/02/2026",
                address: "Tư Gia Nhà Nữ - Sơn Tiến, Hà Tĩnh",
                img: ev1
              },
              {
                title: "Lễ Vu Quy",
                time: "11:30 - 08/02/2026",
                address: "Sơn Tiến, Hà Tĩnh",
                img: ev2
              },
              {
                title: "Lễ Cưới Nhà Nam",
                time: "09:00 - 12/02/2026",
                address: "Tư Gia Nhà Nam - Vân Bắc - Ba Đồn - Quảng Trị",
                img: ev3
              },
              {
                title: "Tiệc Cưới Nhà Nam",
                time: "12:00 - 12/02/2026",
                address: "Vân Bắc - Ba Đồn - Quảng Trị",
                img: ev4
              },
            ].map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/90 backdrop-blur-sm border border-[#e8d9d0] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className={`w-full h-[300px] sm:h-[360px] lg:h-[420px] object-${fitMap[event.img] || "cover"} rounded-2xl transition-transform duration-700 hover:scale-105`}
                />
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-lg font-[Playfair Display,serif] text-[#5a4585] mb-2 uppercase">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#b588a1] mb-1">🕒 {event.time}</p>
                  <p className="text-sm text-[#6d6d6d] mb-4">📍 {event.address}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section id="gallery" className="py-24 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-12"
        >
          Album Ảnh Cưới
        </motion.h2>

        <div className="max-w-5xl mx-auto px-4">
          <Slider
            dots={true}
            infinite={true}
            speed={800}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2500}
            pauseOnHover={true}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 768, settings: { slidesToShow: 1 } },
            ]}
          >
            {images.map((img, i) => (
              <div key={i} className="px-3">
                <img
                  src={img}
                  alt={`Ảnh cưới ${i + 1}`}
                  className={`rounded-2xl shadow-md w-full h-[300px] sm:h-[360px] lg:h-[420px] object-${fitMap[img] || "cover"} bg-white hover:scale-105 transition-transform duration-700`}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>


      {/* --- GUESTBOOK --- */}
      <section
        id="guestbook"
        className="relative py-24 bg-[#fcf7fa] text-center overflow-hidden"
      >
        {/* Nền hoa văn nhẹ */}
        <div className="absolute inset-0 bg-[url('src/assets/flower-pattern.png')] bg-repeat bg-center opacity-10"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-2">
            Sổ Lưu Bút
          </h2>
          <p className="text-[#6d6d6d] font-[Poppins,sans-serif] mb-12">
            Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến đám cưới của chúng tôi!
          </p>

          {/* 2 khối song song */}
          <div className="grid md:grid-cols-2 gap-10 justify-center">
            {/* Form nhập lời chúc */}
            <div className="bg-white border border-[#e8d9d0] rounded-2xl p-8 shadow-md text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nhập họ tên*"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm"
                />
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm"
                />
              </div>
              <textarea
                placeholder="Nhập lời chúc của bạn*"
                rows="5"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#b588a1] text-sm mb-4"
              ></textarea>
              <button className="bg-[#b588a1] text-white px-6 py-2 rounded-md hover:bg-[#9c726d] transition w-full">
                Gửi lời chúc →
              </button>
            </div>

            {/* Danh sách lời chúc */}
            <div className="bg-white border border-[#e8d9d0] rounded-2xl p-8 shadow-md text-left max-h-[420px] overflow-y-auto">
              <div className="mb-6">
                <h4 className="font-semibold text-[#5a4585]">Thanh Hoài</h4>
                <p className="text-gray-700 text-sm">Chúc mừng hạnh phúc 💖</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-[#5a4585]">CEO Lân Nguyễn</h4>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  “Một cuộc hôn nhân thành công đòi hỏi phải yêu nhiều lần — và luôn cùng một người.”
                  Chúc hai bạn trăm năm hạnh phúc!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* --- GIFT --- */}
      <section
        id="wedding-gift"
        className="py-24 bg-[#fcf7fa] text-center relative overflow-hidden"
      >
        {/* Nền hoa chìm mờ */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm"
          style={{ backgroundImage: `url(${giftBg})`, }}
        ></div>


        <div className="max-w-5xl mx-auto px-4 relative z-10">
          {/* Tiêu đề */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-8"
          >
            Hộp Mừng Cưới
          </motion.h2>

          {/* Hai hộp mừng cưới */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
            {[
              {
                title: "Mừng cưới đến Chú Rể",
                qr: qrImg,
                bank: "VPBank",
                accNo: "12345678910",
                name: "Đoàn Văn Hùng",
                branch: "TPHCM",
              },
              {
                title: "Mừng cưới đến Cô Dâu",
                qr: qrImg,
                bank: "VPBank",
                accNo: "12345678910",
                name: "Nguyễn Thị Huyền Trang",
                branch: "TPHCM",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
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
                    className="w-44 h-44 object-contain border border-gray-200 rounded-xl p-2 mb-5 shadow-sm group-hover:scale-105 transition-transform duration-500"
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
                  <p>
                    📍 <strong>Chi nhánh:</strong> {item.branch}
                  </p>
                </div>

                <hr className="w-2/3 my-6 border-[#e8d9d0]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* --- THANK YOU SECTION --- */}
      <section className="py-20 bg-[#f8f5ff] text-center relative overflow-hidden">
        {/* Nền hoa mờ pastel */}
        {/* <div className="absolute inset-0 bg-[url('src/assets/flower-pattern.png')] bg-repeat opacity-10"></div> */}

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Heart className="w-12 h-12 mx-auto text-[#b588a1] mb-5 animate-pulse" />
            <h2 className="text-3xl font-[Playfair Display,serif] italic text-[#5a4585] mb-3">
              Lời Cảm Ơn
            </h2>
            <p className="text-[#6d6d6d] max-w-3xl mx-auto font-[Poppins,sans-serif] leading-relaxed">
              Chúng tôi xin gửi lời cảm ơn chân thành đến gia đình, bạn bè và tất cả
              những người thân yêu đã luôn đồng hành, sẻ chia và gửi đến chúng tôi
              những lời chúc phúc tốt đẹp nhất trong ngày trọng đại này.
              <br />
              <br />
              💞 “Tình yêu khiến mọi khoảnh khắc trở nên đáng nhớ hơn.”
            </p>
          </motion.div>
        </div>
      </section>


      {/* --- FOOTER --- */}
      <footer className="py-6 text-center bg-[#f3effb] text-[#5a4585] text-sm font-[Poppins,sans-serif]">
        © 2025 Văn Hùng & Huyền Trang · Thiệp cưới hiện đại · Made with 💜 & Love
      </footer>
      {/* --- FLOATING ICON BUTTONS --- */}
      <div className="fixed right-5 bottom-24 flex flex-col gap-4 z-50">
        {/* Gửi lời chúc */}
        <a
          href="#guestbook"
          className="bg-[#f7c6d6] hover:bg-[#f3b4c6] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all"
          title="Gửi lời chúc"
        >
          💬
        </a>

        {/* Xác nhận tham dự */}
        <a
          href="#events"
          className="bg-[#d6c5f8] hover:bg-[#c2b0f0] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all"
          title="Xác nhận tham dự"
        >
          ✉️
        </a>

        {/* Mừng cưới */}
        <a
          href="#wedding-gift"
          className="bg-[#e8c8e3] hover:bg-[#dfb4d9] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all"
          title="Mừng cưới"
        >
          💰
        </a>

        {/* Đóng tất cả */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#b588a1] hover:bg-[#9e7690] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all"
          title="Lên đầu trang"
        >
          ❌
        </button>
      </div>

      {/* --- BACKGROUND MUSIC --- */}
      <BackgroundMusic />

    </div>
  );
}
