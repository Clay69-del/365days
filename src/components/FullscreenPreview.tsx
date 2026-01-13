import { useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import type { MediaItem } from "../data/media";

type Props = {
  item: MediaItem;
  open: boolean;
  onClose: () => void;
  volume: number;
};

export default function FullscreenPreview({ item, open, onClose, volume }: Props) {
  const escRef = useRef<(e: KeyboardEvent) => void>(null);
  useEffect(() => {
    escRef.current = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handler = (e: KeyboardEvent) => escRef.current?.(e);
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="fullscreenMedia" onClick={() => onClose()}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 1400, maxHeight: "92vh" }}
      >
        {item.type === "photo" ? (
          <img src={item.src} alt={item.title} />
        ) : (
          <VideoPlayer src={item.src} poster={item.poster} volume={volume} autoplay />
        )}
      </div>

      <button
        onClick={() => onClose()}
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 80,
          padding: "8px 10px",
          borderRadius: 8,
          border: "none",
          background: "rgba(0,0,0,0.6)",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  );
}