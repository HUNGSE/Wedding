import { memo } from "react";
import { motion } from "framer-motion";
import { WEDDING_EVENTS, TEXT_CONTENT, BG_IMAGES } from "../../data/weddingData";

const EventCard = memo(({ event }) => (
  <div className="bg-white border border-[#e8d9d0] rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden">
    { }
    <div className="w-full h-[280px] sm:h-[320px] lg:h-[380px] overflow-hidden rounded-t-2xl">
      <img
        src={event.img}
        alt={event.title}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Info */}
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
  </div>
));

EventCard.displayName = "EventCard";

export default function WeddingEvents() {
  return (
    <section
      id="wedding-events"
      className="relative py-24 text-center bg-[#fcf7fa] overflow-hidden"
    >
      { }
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: `url(${BG_IMAGES.events})` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        { }
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-[Playfair Display,serif] italic text-[#5a4585] mb-3">
            {TEXT_CONTENT.weddingEvents.title}
          </h2>
          <p className="text-[#6d6d6d] font-[Poppins,sans-serif]">
            {TEXT_CONTENT.weddingEvents.description}
          </p>
        </motion.div>

        { }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {WEDDING_EVENTS.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
