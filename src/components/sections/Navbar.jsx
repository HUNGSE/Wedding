import { useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { MENU_ITEMS } from "../../data/weddingData";

const MenuButton = memo(({ href, label, onClick }) => (
  <button
    onClick={() => onClick(href)}
    className="hover:text-[#c589b7] transition-colors duration-300"
  >
    {label}
  </button>
));

MenuButton.displayName = "MenuButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback((id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  // Memoize menu items
  const memoizedMenuItems = useMemo(() => MENU_ITEMS, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Tiêu đề */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[Great_Vibes] text-2xl sm:text-3xl text-[#c589b7] tracking-wide cursor-pointer"
          onClick={() => handleScroll("#hero")}
        >
          VH ♡ HT
        </motion.h1>

        {/* Nút menu cho mobile */}
        <button
          className="md:hidden text-[#c589b7] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menu ngang cho desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden md:flex flex-wrap justify-center gap-6 text-sm sm:text-base font-medium text-[#a87ca0]"
        >
          {memoizedMenuItems.map(([href, label]) => (
            <MenuButton key={href} href={href} label={label} onClick={handleScroll} />
          ))}
        </motion.div>
      </div>

      {/* Menu dọc khi mobile mở */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed top-[70px] right-3 w-[220px] bg-white/95 border border-[#e7d5df] shadow-xl rounded-2xl text-[#a87ca0] py-4 flex flex-col gap-3 items-center backdrop-blur-md"
        >
          {memoizedMenuItems.map(([href, label]) => (
            <MenuButton key={href} href={href} label={label} onClick={handleScroll} />
          ))}
        </motion.div>
      )}
    </nav>
  );
}
