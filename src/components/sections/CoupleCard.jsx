import { memo } from "react";
import { motion } from "framer-motion";
import { COUPLE_INFO, TEXT_CONTENT } from "../../data/weddingData";

const CoupleCardItem = memo(({ person, isGroom, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isGroom ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay }}
      className="bg-white border border-[#e8d9d0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
    >
      {/* Image - Left for groom, Right for bride */}
      <div className={`w-full md:w-1/2 overflow-hidden ${!isGroom && "md:order-2"}`}>
        <img
          src={person.image}
          alt={person.name}
          className="w-full sm:h-[320px] md:h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Info - Right for groom, Left for bride */}
      <div className={`w-full md:w-1/2 text-left p-6 md:p-8 mt-4 md:mt-0 flex flex-col justify-center bg-white relative z-10 ${isGroom ? "" : "md:order-1"}`}>
        <h3 className="text-2xl font-[Playfair Display,serif] text-[#5a4585] mb-3 italic">
          {person.name}
        </h3>
        <p className="text-sm text-[#555] mb-1">
          Con ông: <span className="font-semibold text-[#b588a1]">{person.father}</span>
        </p>
        <p className="text-sm text-[#555] mb-4">
          Con bà: <span className="font-semibold text-[#b588a1]">{person.mother}</span>
        </p>
        <p className="text-[#6d6d6d] leading-relaxed text-[15px]">
          {isGroom ? (
            <>
              Hiện là kỹ sư phần mềm tại <strong className="text-[#5a4585]">{person.company}</strong>.
              {person.description}
            </>
          ) : (
            <>
              Là một cô gái xinh đẹp, giỏi giang và hiện đang là kỹ sư lập trình nhúng
              tại <strong className="text-[#5a4585]">{person.company}</strong>.
              {person.description}
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
});

CoupleCardItem.displayName = "CoupleCardItem";

export default function CoupleCard() {
  return (
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
          {TEXT_CONTENT.couple.title}
        </h2>
        <p className="text-[#6d6d6d] text-base max-w-2xl mx-auto leading-relaxed">
          {TEXT_CONTENT.couple.description}
        </p>
      </motion.div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
        <CoupleCardItem person={COUPLE_INFO.groom} isGroom={true} delay={0} />
        <CoupleCardItem person={COUPLE_INFO.bride} isGroom={false} delay={0.2} />
      </div>
    </section>
  );
}
