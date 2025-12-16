import { useRef, useState } from "react";
import { Music2, PauseCircle } from "lucide-react";
import HeartsEffect from "./HeartsEffect";
import SnowEffect from "./SnowEffect";

// 👉 import nhạc local
import nhac from "../assets/Nhac.mp4";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play(); // mobile iOS OK
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  return (
    <>
      {/* EFFECT */}
      {!isPlaying && <SnowEffect isActive />}
      {isPlaying && <HeartsEffect isActive />}

      {/* AUDIO LOCAL */}
      <audio
        ref={audioRef}
        src={nhac}
        loop
        preload="metadata"
      />

      {/* BUTTON */}
      <div className="fixed bottom-6 right-6 z-[10000]">
        <button
          onClick={handlePlayMusic}
          className={`px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition text-white
            ${
              isPlaying
                ? "bg-[#b1887f] hover:bg-[#9c726d]"
                : "bg-[#7b68c5] hover:bg-[#6a58b3]"
            }`}
        >
          {isPlaying ? (
            <PauseCircle className="w-5 h-5" />
          ) : (
            <Music2 className="w-5 h-5" />
          )}
          {isPlaying ? "Tạm dừng" : "Phát nhạc"}
        </button>
      </div>
    </>
  );
}
