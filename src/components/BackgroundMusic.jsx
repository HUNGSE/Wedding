import { useState } from "react";
import { Music2, PauseCircle } from "lucide-react";
import HeartsEffect from "./HeartsEffect";
import SnowEffect from "./SnowEffect";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMusic = () => {
    const iframe = document.getElementById("yt-music");
    if (!iframe) return;

    if (isPlaying) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
      setIsPlaying(false);
    } else {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
      setIsPlaying(true);
    }
  };

  return (
    <>
      {!isPlaying && <SnowEffect isActive={!isPlaying} />}
      {isPlaying && <HeartsEffect isActive={isPlaying} />}

      <div className="fixed bottom-6 right-6 z-[10000]">
        <button
          onClick={handlePlayMusic}
          className={`px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition text-white ${
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

      <iframe
        id="yt-music"
        width="0"
        height="0"
        src="https://www.youtube.com/embed/videoseries?list=PLanG2GTpYKRaRjsyTqbuu78gzJZOphi_t&enablejsapi=1&autoplay=0&loop=1&controls=0"
        frameBorder="0"
        allow="autoplay"
        title="Liên khúc nhạc đám cưới remix 2025"
        style={{ display: "none" }}
      ></iframe>
    </>
  );
}
