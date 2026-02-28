import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BG_IMAGES } from "../../data/weddingData";

export default function WeddingVideo() {
  const VIDEOS = useMemo(
    () => [
      {
        id: "prewedding",
        label: "Ảnh cưới",
        youtubeId: "SjNz3eALilI",
        desc: "Những khoảnh khắc ảnh cưới ngọt ngào của chúng con.",
      },
      {
        id: "vuquy",
        label: "Vu Quy",
        youtubeId: "hGLm3a2u2nE",
        desc: "Tổng hợp những khoảnh khắc trong lễ Vu Quy.",
      },
      {
        id: "thanhton",
        label: "Thành Hôn",
        youtubeId: "H5h1fVGg7AM",
        desc: "Tổng hợp những khoảnh khắc trong lễ Thành Hôn.",
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const [showVideo, setShowVideo] = useState(false);

  const activeVideo = VIDEOS.find((v) => v.id === activeId);

  return (
    <section
      id="wedding-video"
      className="relative py-24 bg-[#fff7fa] text-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGES.weddingVideo})` }}
      />

      {/* Overlay nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/45" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center justify-center px-4"
      >
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-[Cormorant Garamond,serif] text-white font-semibold mb-3 drop-shadow">
          Xem video cưới của chúng con
        </h2>

        <p className="text-white/85 font-[DM Sans,sans-serif] max-w-2xl mx-auto mb-8 text-sm sm:text-base">
          Tình yêu không làm cho thế giới quay tròn. Tình yêu là những gì làm cho chuyến đi đáng giá.
        </p>

        {/* Tabs */}
        <div className="inline-flex flex-wrap justify-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-1.5 mb-6">
          {VIDEOS.map((v) => {
            const isActive = v.id === activeId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                className={[
                  "px-4 sm:px-5 py-2 rounded-full text-sm sm:text-[15px] font-medium transition",
                  isActive
                    ? "bg-white text-[#5a4585]"
                    : "text-white hover:bg-white/10",
                ].join(" ")}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-white/85 font-[DM Sans,sans-serif] mb-10 text-sm sm:text-base">
          {activeVideo.desc}
        </p>

        {/* ===== NÚT PLAY GỐC CÓ NHÁY ===== */}
        {!showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="relative flex items-center justify-center
                       w-20 h-20 sm:w-24 sm:h-24
                       rounded-full
                       bg-white/15
                       border-4 border-pink-300
                       hover:scale-110
                       transition-transform duration-500"
            aria-label={`Phát video: ${activeVideo.label}`}
          >
            {/* vòng lan nháy */}
            <span className="absolute inset-0 rounded-full bg-pink-300/40 animate-ping" />

            {/* lớp nền trong */}
            <span className="absolute inset-[6px] rounded-full bg-white/10 backdrop-blur-sm" />

            {/* icon play */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              className="w-10 h-10 z-10 ml-1 drop-shadow"
            >
              <path d="M5.25 5.25v13.5l13.5-6.75L5.25 5.25z" />
            </svg>
          </button>
        )}

        {/* ===== MODAL VIDEO ===== */}
        {showVideo && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Close */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 z-20 text-white bg-black/40 
                           w-10 h-10 flex items-center justify-center rounded-full 
                           hover:bg-black/60 transition"
              >
                ✕
              </button>

              <iframe
                key={activeVideo.youtubeId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={`Wedding Video - ${activeVideo.label}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}