import { useState } from "react";
import { motion } from "framer-motion";
import { BG_IMAGES } from "../../data/weddingData";

export default function WeddingVideo() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      id="wedding-video"
      className="relative py-24 bg-[#fff7fa] text-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.55]"
        style={{ backgroundImage: `url(${BG_IMAGES.weddingVideo})` }}
      ></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center justify-center px-4"
      >
        <h2 className="text-3xl sm:text-4xl font-[Cormorant Garamond,serif] text-white font-semibold mb-3 drop-shadow-md">
          Xem video cưới của chúng con
        </h2>

        <p className="text-white/90 font-[DM Sans,sans-serif] max-w-xl mx-auto mb-8 text-sm sm:text-base drop-shadow">
          Tình yêu không làm cho thế giới quay tròn. Tình yêu là những gì làm cho chuyến đi đáng giá.
        </p>

        {}
        {!showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="relative flex items-center justify-center w-20 h-20 bg-white/20 rounded-full border-4 border-pink-300 hover:scale-110 hover:bg-white/30 transition-transform duration-500"
          >
            <span className="absolute inset-0 animate-ping bg-pink-300/40 rounded-full"></span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" className="w-10 h-10 z-10 ml-1">
              <path d="M5.25 5.25v13.5l13.5-6.75L5.25 5.25z" />
            </svg>
          </button>
        )}

        {}
        {showVideo && (
          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-xl mt-2">

            {}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 z-20 text-white bg-black/40 backdrop-blur-sm 
                 w-9 h-9 flex items-center justify-center rounded-full 
                 hover:bg-black/60 transition"
            >
              ✕
            </button>

            {/* Video YouTube */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/SjNz3eALilI?autoplay=1&rel=0&controls=1"
              title="Wedding Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

      </motion.div>
    </section>
  );
}
