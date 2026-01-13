import type { MediaCategory, MediaItem } from "../data/media";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import React from "react";

type Props = {
  unlocked: boolean;
  categories: MediaCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  selectedItem: MediaItem | null;
  onSelectItem: (it: MediaItem) => void;
  onPeek: () => void;
  onVoice: () => void;
  voiceButtonVisible: boolean;
  volume: number;
  onVolume: (v: number) => void;
};

export default function Gallery(props: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const cat = props.categories.find((c) => c.id === props.activeCategoryId) ??
    props.categories[0];

  const totalPages = Math.ceil((cat?.items.length || 0) / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cat?.items.slice(startIndex, endIndex) || [];

  // Reset page when category changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [props.activeCategoryId]);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="card galleryShell" data-reveal>
      {!props.unlocked ? (
        <div className="lockedOverlay">
          <h3>Memories Locked</h3>
          <p>
            Answer a small personal question to open categorized memories.
            Lavender + Blue, just like us.
          </p>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={props.onPeek}>
              Peek
            </button>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
            Hint: What I call you everyday now and then?
          </div>
        </div>
      ) : (
        <>
          <div className="controlsRow">
            <div className="tabsRow">
              {props.categories.map((c) => {
                const active = c.id === props.activeCategoryId;
                return (
                  <button
                    key={c.id}
                    className={`tabBtn ${active ? "tabBtnActive" : ""}`}
                    onClick={() => props.onSelectCategory(c.id)}
                  >
                    {c.title}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div className="mono" style={{ fontSize: 12, opacity: 0.9 }}>
                Volume
              </div>
              <input
                className="range"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={props.volume}
                onChange={(e) => props.onVolume(Number(e.target.value))}
              />
              {props.voiceButtonVisible && (
                <button className="btn" onClick={props.onVoice}>
                  Play Voice Note
                </button>
              )}
            </div>
          </div>

          <div className="playerGrid">
            <div>
              <div className="mainPanel">
                {props.selectedItem ? (
                  props.selectedItem.type === "photo" ? (
                    <img
                      src={props.selectedItem.src}
                      alt={props.selectedItem.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onClick={() => props.selectedItem && props.onSelectItem(props.selectedItem)}
                    />
                  ) : (
                    <VideoPlayer
                      src={props.selectedItem.src}
                      poster={props.selectedItem.poster}
                      volume={props.volume}
                    />
                  )
                ) : (
                  <div
                    style={{
                      display: "grid",
                      placeItems: "center",
                      color: "rgba(255,255,255,0.75)",
                      minHeight: 260
                    }}
                  >
                    Select a memory…
                  </div>
                )}
              </div>
              <div className="mainCaption mono">{props.selectedItem?.title ?? "—"}</div>
            </div>

            <div>
              <div className="mono" style={{ opacity: 0.9, fontSize: 12, color: 'rgba(255, 255, 255, 0.85)' }}>
                {cat?.title}
              </div>
              <div style={{ height: 10 }} />
              <div className="thumbsRow">
                {currentItems.map((it) => (
                  <button
                    key={`${it.type}:${it.title}`}
                    className="thumbCard"
                    onClick={() => props.onSelectItem(it)}
                    title={it.title}
                    style={{ padding: 0 }}
                  >
                    {it.type === "photo" ? (
                      <img src={it.src} alt={it.title} />
                    ) : (
                      <video src={it.src} muted playsInline preload="metadata" />
                    )}
                    <div className="thumbLabel">{it.title}</div>
                  </button>
                ))}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  gap: 10, 
                  marginTop: 12 
                }}>
                  <button
                    className="btn"
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    style={{ 
                      opacity: currentPage === 0 ? 0.5 : 1,
                      cursor: currentPage === 0 ? "not-allowed" : "pointer"
                    }}
                  >
                    ← Previous
                  </button>
                  <span className="mono" style={{ fontSize: 12, opacity: 0.7 }}>
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    className="btn"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                    style={{ 
                      opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                      cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}