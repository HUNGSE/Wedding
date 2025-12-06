import { memo, useCallback } from "react";

const FLOATING_ITEMS = [
  { id: "guestbook", emoji: "💬", title: "Gửi lời chúc", bgColor: "bg-[#f7c6d6] hover:bg-[#f3b4c6]" },
  { id: "events", emoji: "✉️", title: "Xác nhận tham dự", bgColor: "bg-[#d6c5f8] hover:bg-[#c2b0f0]" },
  { id: "wedding-gift", emoji: "💰", title: "Mừng cưới", bgColor: "bg-[#e8c8e3] hover:bg-[#dfb4d9]" },
];

const FloatingButton = memo(({ href, emoji, title, bgColor }) => (
  <a
    href={href}
    className={`${bgColor} text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110`}
    title={title}
  >
    {emoji}
  </a>
));

FloatingButton.displayName = "FloatingButton";

export default function FloatingButtons() {
  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed right-5 bottom-24 flex flex-col gap-4 z-50">
      {FLOATING_ITEMS.map((item) => (
        <FloatingButton
          key={item.id}
          href={`#${item.id}`}
          emoji={item.emoji}
          title={item.title}
          bgColor={item.bgColor}
        />
      ))}

      {/* Lên đầu trang */}
      <button
        onClick={handleScrollTop}
        className="bg-[#b588a1] hover:bg-[#9e7690] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
        title="Lên đầu trang"
      >
        ⬆️
      </button>
    </div>
  );
}
