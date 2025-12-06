import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { WEDDING_EVENTS, TEXT_CONTENT, BG_IMAGES } from "../../data/weddingData";

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

const EventCard = memo(({ event, fitMap, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1 }}
    className="bg-white border border-[#e8d9d0] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full"
  >
    {/* Image container - Fixed height */}
    <div className="w-full h-[280px] sm:h-[320px] lg:h-[380px] overflow-hidden rounded-t-2xl">
      <img
        src={event.img}
        alt={event.title}
        className={`w-full h-full object-${
          fitMap[event.img] || "cover"
        } transition-transform duration-700 hover:scale-105`}
      />
    </div>

    {/* Info section - Fixed height */}
    <div className="p-6 text-left flex flex-col justify-between flex-grow min-h-[160px]">
      <div>
        <h3 className="text-lg font-[Playfair Display,serif] text-[#5a4585] mb-3 uppercase font-semibold">
          {event.title}
        </h3>
        <p className="text-sm text-[#b588a1] mb-2 flex items-center gap-2">
          <span>🕒</span> {event.time}
        </p>
        <p className="text-sm text-[#6d6d6d] flex items-center gap-2">
          <span>📍</span> {event.address}
        </p>
      </div>
    </div>
  </motion.div>
));

EventCard.displayName = "EventCard";

export default function WeddingEvents() {
  const [fitMap, setFitMap] = useState({});

  useEffect(() => {
    const images = WEDDING_EVENTS.map((event) => event.img);
    Promise.all(images.map(async (src) => [src, await getObjectFit(src)])).then(
      (entries) => setFitMap(Object.fromEntries(entries))
    );
  }, []);

  return (
    <section
      id="wedding-events"
      className="relative py-24 text-center bg-[#fcf7fa] overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: `url(${BG_IMAGES.events})` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-3"
        >
          {TEXT_CONTENT.weddingEvents.title}
        </motion.h2>
        <p className="text-[#6d6d6d] font-[Poppins,sans-serif] mb-12">
          {TEXT_CONTENT.weddingEvents.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {WEDDING_EVENTS.map((event, i) => (
            <EventCard key={i} event={event} fitMap={fitMap} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
