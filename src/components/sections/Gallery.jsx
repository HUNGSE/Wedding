import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_SLIDES, TEXT_CONTENT } from "../../data/weddingData";

const CHUNK_SIZE = 8;

/* ================= UTILS ================= */
const chunkArray = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

/* ================= MAIN ================= */
export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [activeIndex, setActiveIndex] = useState(null); // index trong GALLERY_SLIDES

  const visibleImages = GALLERY_SLIDES.slice(0, visibleCount);
  const rows = chunkArray(visibleImages, 3);

  /* ===== LIGHTBOX CONTROLS (FULL GALLERY) ===== */
  const next = useCallback(() => {
    setActiveIndex((i) => {
      const nextIndex = i + 1;
      if (
        nextIndex >= visibleCount &&
        visibleCount < GALLERY_SLIDES.length
      ) {
        setVisibleCount((v) =>
          Math.min(v + CHUNK_SIZE, GALLERY_SLIDES.length)
        );
      }

      return nextIndex % GALLERY_SLIDES.length;
    });
  }, [visibleCount]);

  const prev = useCallback(() => {
    setActiveIndex(
      (i) => (i - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length
    );
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, next, prev]);

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-white to-[#fcf7fa]"
    >
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          text-center text-4xl sm:text-5xl
          font-[Playfair Display,serif] italic
          text-[#5a4585] mb-16
        "
      >
        {TEXT_CONTENT.gallery.title}
      </motion.h2>

      {/* ===== MOBILE MASONRY ===== */}
      <div className="block md:hidden px-4">
        <div className="columns-2 gap-4 space-y-4">
          {visibleImages.map((img) => (
            <MasonryImage
              key={img}
              src={img}
              onClick={() =>
                setActiveIndex(GALLERY_SLIDES.indexOf(img))
              }
            />
          ))}
        </div>
      </div>

      {/* ===== DESKTOP MAGAZINE ===== */}
      <div className="hidden md:block">
        {rows.map((group, rowIndex) => {
          const even = rowIndex % 2 === 0;
          const rowKey = group.join("-");

          return (
            <motion.div
              key={rowKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                grid grid-cols-4 gap-6
                max-w-5xl mx-auto px-6 mb-12
              "
            >
              {even ? (
                <>
                  <div className="col-span-3">
                    <ImageCard
                      src={group[0]}
                      big
                      onClick={() =>
                        setActiveIndex(
                          GALLERY_SLIDES.indexOf(group[0])
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    {group[1] && (
                      <ImageCard
                        src={group[1]}
                        onClick={() =>
                          setActiveIndex(
                            GALLERY_SLIDES.indexOf(group[1])
                          )
                        }
                      />
                    )}
                    {group[2] && (
                      <ImageCard
                        src={group[2]}
                        onClick={() =>
                          setActiveIndex(
                            GALLERY_SLIDES.indexOf(group[2])
                          )
                        }
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-6">
                    {group[0] && (
                      <ImageCard
                        src={group[0]}
                        onClick={() =>
                          setActiveIndex(
                            GALLERY_SLIDES.indexOf(group[0])
                          )
                        }
                      />
                    )}
                    {group[1] && (
                      <ImageCard
                        src={group[1]}
                        onClick={() =>
                          setActiveIndex(
                            GALLERY_SLIDES.indexOf(group[1])
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="col-span-3">
                    <ImageCard
                      src={group[2]}
                      big
                      onClick={() =>
                        setActiveIndex(
                          GALLERY_SLIDES.indexOf(group[2])
                        )
                      }
                    />
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* LOAD MORE (GRID ONLY) */}
      {visibleCount < GALLERY_SLIDES.length && (
        <div className="text-center mt-20">
          <button
            onClick={() =>
              setVisibleCount((v) =>
                Math.min(v + CHUNK_SIZE, GALLERY_SLIDES.length)
              )
            }
            className="
              px-10 py-3 rounded-full
              bg-[#5a4585] text-white
              hover:bg-[#4a3575] transition
            "
          >
            Xem thêm ảnh
          </button>
        </div>
      )}

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="
              fixed inset-0 z-50 bg-black/85
              flex items-center justify-center
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={GALLERY_SLIDES[activeIndex]}
                src={GALLERY_SLIDES[activeIndex]}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-h-[85vh] max-w-[90vw] rounded-2xl"
              />

              {/* CLOSE */}
              <button
                onClick={() => setActiveIndex(null)}
                className="
                  absolute -top-4 -right-4
                  w-10 h-10 rounded-full
                  bg-black/70 text-white
                  flex items-center justify-center
                  hover:bg-black transition
                "
              >
                ✕
              </button>

              {/* PREV */}
              <button
                onClick={prev}
                className="
                  absolute left-2 md:left-[-56px]
                  top-1/2 -translate-y-1/2
                  w-10 h-10 rounded-full
                  bg-black/40 text-white text-3xl
                  flex items-center justify-center
                  hover:bg-black/60 transition
                "
              >
                ‹
              </button>

              {/* NEXT */}
              <button
                onClick={next}
                className="
                  absolute right-2 md:right-[-56px]
                  top-1/2 -translate-y-1/2
                  w-10 h-10 rounded-full
                  bg-black/40 text-white text-3xl
                  flex items-center justify-center
                  hover:bg-black/60 transition
                "
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= COMPONENTS ================= */

const ImageCard = memo(({ src, big = false, onClick }) => (
  <div
    onClick={onClick}
    className="rounded-[28px] overflow-hidden shadow-xl cursor-zoom-in"
  >
    <img
      src={src}
      loading="lazy"
      className={`
        w-full
        ${big ? "h-[520px]" : "h-[250px]"}
        object-cover
        object-[50%_20%]
        ${big ? "md:object-center" : ""}
        hover:scale-105 transition-transform duration-500
      `}
    />
  </div>
));

const MasonryImage = memo(({ src, onClick }) => (
  <img
    src={src}
    loading="lazy"
    onClick={onClick}
    className="
      w-full mb-4 rounded-2xl
      object-cover cursor-zoom-in
      hover:opacity-90 transition
    "
  />
));
