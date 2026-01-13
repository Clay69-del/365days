import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  title?: string;
  volume: number; // 0..1
  autoplay?: boolean;
};

export default function VideoPlayer({
  src,
  poster,
  volume,
  autoplay = true
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [needsClick, setNeedsClick] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.pause();
    v.src = src;
    if (poster) v.poster = poster;
    v.volume = volume;
    v.muted = volume === 0;
    v.playsInline = true;
    const onPlaying = () => setNeedsClick(false);
    v.addEventListener("playing", onPlaying);

    v.load();
    if (autoplay) {
      const p = v.play();
      if (p) {
        p.then(() => setNeedsClick(false)).catch(() => setNeedsClick(true));
      }
    }

    return () => v.removeEventListener("playing", onPlaying);
  }, [src, poster, volume, autoplay]);

  return (
    <div className="mainPanel" style={{ minHeight: 320 }}>
      <video
        ref={ref}
        controls
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {needsClick && (
        <div className="playOverlay">
          <button
            className="btn btnPrimary"
            onClick={() => {
              const v = ref.current;
              if (!v) return;
              v.play().then(() => setNeedsClick(false)).catch(() => {});
            }}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}