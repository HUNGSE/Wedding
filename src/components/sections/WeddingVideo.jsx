import { useState } from "react";
import { motion } from "framer-motion";
import { BG_IMAGES, VIDEO_FILES } from "../../data/weddingData";

export default function WeddingVideo() {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlay = () => {
    setShowVideo(true);
    setTimeout(() => {
      const vid = document.getElementById("wedding-inline-video");
      if (vid) vid.play();
    }, 200);
  };

  const handleClose = () => {
    const vid = document.getElementById("wedding-inline-video");
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    setShowVideo(false);
  };

  return (
    <section
      id="wedding-video"
      className="relative py-28 sm:py-32 overflow-hidden text-center"
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out
        ${showVideo ? "opacity-20 scale-110 blur-[2px]" : "opacity-90"}`}
        style={{
          backgroundImage: `url(${BG_IMAGES.weddingVideo})`,
        }}
      ></div>

      {/* Light floral overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-[url('src/assets/flower-overlay.png')] bg-center bg-cover pointer-events-none"
      ></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-5 flex flex-col items-center"
      >
        {/* ===== BEFORE PLAY ===== */}
        {!showVideo && (
          <>
            <h2 className="text-3xl sm:text-4xl font-[Playfair Display,serif] font-semibold text-white mb-3 drop-shadow-xl">
              Xem video cưới của chúng tôi
            </h2>

            <p className="text-white/90 max-w-xl mx-auto mb-10 text-sm sm:text-base font-[Poppins,sans-serif] drop-shadow">
              Những khoảnh khắc đẹp nhất đã được lưu giữ tại đây ✨
            </p>

            {/* Play Button */}
            <button
              onClick={handlePlay}
              className="
                group relative w-24 h-24 rounded-full 
                bg-gradient-to-br from-pink-300 to-purple-300
                flex items-center justify-center shadow-xl 
                hover:scale-110 transition-all duration-500
              "
            >
              <span className="absolute inset-0 bg-pink-300 opacity-40 blur-2xl rounded-full group-hover:blur-3xl transition"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-12 h-12 ml-1 drop-shadow-lg"
              >
                <path d="M5.25 5.25v13.5l13.5-6.75L5.25 5.25z" />
              </svg>
            </button>
          </>
        )}

        {/* ===== VIDEO PLAYER ===== */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-4xl mt-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="
                absolute -top-5 -right-5 w-10 h-10 rounded-full 
                bg-white text-[#5a4585] shadow-xl 
                flex items-center justify-center 
                hover:bg-pink-100 hover:scale-110 transition-all duration-300
                z-20
              "
            >
              ✕
            </button>

            <video
              id="wedding-inline-video"
              src={VIDEO_FILES.wedding}
              controls
              playsInline
              className="
                w-full rounded-2xl shadow-2xl 
                border-4 border-white/70
                bg-black
              "
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
