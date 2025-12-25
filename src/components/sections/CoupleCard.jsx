import { memo } from "react";
import { COUPLE_INFO, TEXT_CONTENT } from "../../data/weddingData";

const CoupleCardItem = memo(({ person, isGroom }) => {
  return (
    <div className="bg-white border border-[#e8d9d0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
      {/* Image */}
      <div className={`w-full md:w-1/2 overflow-hidden ${!isGroom && "md:order-2"}`}>
        <img
          src={person.image}
          alt={person.name}
          className="w-full sm:h-[320px] md:h-full object-cover"
        />
      </div>

      {/* Info */}
      <div
        className={`w-full md:w-1/2 text-left p-6 md:p-8 flex flex-col justify-center bg-white ${isGroom ? "" : "md:order-1"
          }`}
      >
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
          {isGroom
            ? <>Hiện là Kỹ sư Phần mềm tại một công ty công nghệ tại Việt Nam.{person.description}</>
            : <>Là một cô gái xinh đẹp, giỏi giang và hiện đang là Kỹ sư lập trình Nhúng.{person.description}</>
          }
        </p>
      </div>
    </div>
  );
});

CoupleCardItem.displayName = "CoupleCardItem";

export default function CoupleCard() {
  return (
    <section
      id="couple"
      className="py-20 bg-[#fcf7fa] text-center overflow-hidden font-[Poppins,sans-serif]"
    >
      <div className="mb-10">
        <h2 className="text-4xl font-[Playfair Display,serif] text-[#5a4585] italic mb-3">
          {TEXT_CONTENT.couple.title}
        </h2>
        <p className="text-[#6d6d6d] text-base max-w-[43rem] mx-auto leading-relaxed">
          {TEXT_CONTENT.couple.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
        <CoupleCardItem person={COUPLE_INFO.groom} isGroom />
        <CoupleCardItem person={COUPLE_INFO.bride} />
      </div>
    </section>
  );
}
