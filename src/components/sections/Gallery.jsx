import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GALLERY_IMAGES, TEXT_CONTENT } from "../../data/weddingData";

// Extract as utility
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

const GallerySlider = memo(({ fitMap }) => (
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
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 1, centerMode: false } },
    ]}
  >
    {GALLERY_IMAGES.map((img, i) => (
      <div key={i} className="px-1 sm:px-2 md:px-3 w-full">
        <motion.img
          src={img}
          alt={`Ảnh cưới ${i + 1}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl shadow-md w-full h-[320px] sm:h-[380px] lg:h-[460px] object-${
            fitMap[img] || "cover"
          } bg-white`}
        />
      </div>
    ))}
  </Slider>
));

GallerySlider.displayName = "GallerySlider";

export default function Gallery() {
  const [fitMap, setFitMap] = useState({});

  useEffect(() => {
    Promise.all(GALLERY_IMAGES.map(async (src) => [src, await getObjectFit(src)])).then(
      (entries) => setFitMap(Object.fromEntries(entries))
    );
  }, []);

  return (
    <section id="gallery" className="py-24 bg-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-12"
      >
        {TEXT_CONTENT.gallery.title}
      </motion.h2>

      <div className="max-w-5xl mx-auto px-4">
        <GallerySlider fitMap={fitMap} />
      </div>
    </section>
  );
}
