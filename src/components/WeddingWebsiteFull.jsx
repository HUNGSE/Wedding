import BackgroundMusic from "./BackgroundMusic";
import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import CountdownSection from "./sections/CountdownSection";
import CoupleCard from "./sections/CoupleCard";
import ActionButtons from "./sections/ActionButtons";
import WeddingVideo from "./sections/WeddingVideo";
import LoveStory from "./sections/LoveStory";
import WeddingEvents from "./sections/WeddingEvents";
import Gallery from "./sections/Gallery";
import Guestbook from "./sections/Guestbook";
import Gift from "./sections/Gift";
import ThankYou from "./sections/ThankYou";
import Footer from "./sections/Footer";
import FloatingButtons from "./sections/FloatingButtons";
import { COLORS, FONTS } from "../config/theme";

export default function WeddingWebsiteFull() {
  return (
    <div className="font-[Poppins,sans-serif] text-[#2e2b45] bg-gradient-to-b from-[#fffafc] to-[#fdf9ff] overflow-x-hidden scroll-smooth" style={{ "--primary-main": COLORS.primary.main }}>
      <Navbar />
      <HeroSection />
      <CountdownSection />
      <CoupleCard />
      <ActionButtons />
      <WeddingVideo />
      <LoveStory />
      <WeddingEvents />
      <Gallery />
      <Guestbook />
      <Gift />
      <ThankYou />
      <Footer />
      <FloatingButtons />
      <BackgroundMusic />
    </div>
  );
}
