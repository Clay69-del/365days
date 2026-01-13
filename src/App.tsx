import { useMemo, useState } from "react";
import RomanticBackground from "./components/RomanticBackground";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Terminal from "./components/Terminal";
import Modal from "./components/Modal";
import VideoPlayer from "./components/VideoPlayer";
import { CATEGORIES, type MediaItem } from "./data/media";
import { TIMELINE } from "./data/timeline";

type TermLine = { text: string; tone?: "white" | "lav" | "blue" };

export default function App() {
  const [galleryUnlocked, setGalleryUnlocked] = useState(false);
  const [voiceUnlocked, setVoiceUnlocked] = useState(false);

  const [peekOpen, setPeekOpen] = useState(false);
  const [peekAnswer, setPeekAnswer] = useState("");
  const [peekError, setPeekError] = useState<string | null>(null);

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceChoice, setVoiceChoice] = useState<string>("");
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const [volume, setVolume] = useState(0);
  const [showAnniversaryMessage, setShowAnniversaryMessage] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const [terminalLines, setTerminalLines] = useState<TermLine[]>([
    { text: "Welcome to Year One my love<3.", tone: "white" },
    { text: "Mode: Anniversary Ninja", tone: "blue" },
    {
      text: "Hint: What we should have said to each other on our first anniversary?",
      tone: "lav"
    }
  ]);

  const nowDays = useMemo(() => {
    // Set start date to January 7, 2025
    const start = new Date(2025, 0, 7); // Month is 0-indexed (0 = January)
    const diff = Date.now() - start.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }, []);

  // // Calculate the number of days until the first anniversary (January 7, 2026)
  // const _daysUntilAnniversary = useMemo(() => {
  //   const now = new Date();
  //   const currentYear = now.getFullYear();
  //   const nextAnniversary = new Date(currentYear, 0, 7); // January 7 of current year
    
  //   // If the anniversary has already passed this year, set it to next year
  //   if (now > nextAnniversary) {
  //     nextAnniversary.setFullYear(currentYear + 1);
  //   }
    
  //   const diff = nextAnniversary.getTime() - now.getTime();
  //   return Math.ceil(diff / (1000 * 60 * 60 * 24));
  // }, []);

  const counterText = `${nowDays} Days`;

  const handleTerminalUnlock = (flag: string) => {
    if (flag.toLowerCase() === "i love you" || flag.toLowerCase() === "iloveyou") {
      setShowAnniversaryMessage(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowAnniversaryMessage(false), 5000);
    }
  };

  const unlockGallery = () => {
    setGalleryUnlocked(true);
    setPeekOpen(false);
    setPeekAnswer("");
    setPeekError(null);

    setTerminalLines((prev) => [
      ...prev,
      { text: "[root@love]: System Decrypted — Memories Unlocked", tone: "lav" }
    ]);

    // auto-select first item of active category
    const firstCat = CATEGORIES.find((c) => c.id === activeCategoryId) ??
      CATEGORIES[0];
    setSelectedItem(firstCat.items[0] ?? null);
  };

  const onPeekSubmit = () => {
    const a = peekAnswer.trim().toLowerCase();
    if (!a) {
      setPeekError("Please type an answer.");
      return;
    }
    if (a === "maya" || a === "kiddo") {
      unlockGallery();
      return;
    }
    setPeekError("Not quite — try again.");
  };

  const onVoiceSubmit = async () => {
    if (!voiceChoice) {
      setVoiceError("Please select an option.");
      return;
    }
    if (voiceChoice !== "3000") {
      setVoiceError("Wrong answer. Try again.");
      return;
    }

    setVoiceError(null);
    setVoiceOpen(false);
    setVoiceUnlocked(true);

    setTerminalLines((prev) => [
      ...prev,
      { text: "[root@love]: Voice Note Permission Granted", tone: "blue" }
    ]);

    // Voice note: no file included by default; use TTS fallback.
    try {
      const msg = new SpeechSynthesisUtterance(
        "Khushi, happy first anniversary. I love you."
      );
      window.speechSynthesis.speak(msg);
    } catch (e) {
      // ignore
    }
  };

  return (
    <>
      <RomanticBackground />

      <header className="hero">
        <div className="heroWatermark mono">
          <div className="wmA">01</div>
          <div className="wmB">07</div>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <h1 className="mono" style={{ fontSize: 34, margin: 0 }}>
              <span style={{ color: "var(--clay-blue)" }}>&lt;System&gt;</span>{" "}
              Connection Established
            </h1>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.75)" }}>
              Time elapsed:{" "}
              <span className="mono" style={{ color: "var(--lavender)" }}>
                {counterText}
              </span>
            </div>
          </div>

          <div className="dmCard">
            <div className="dmTop mono">Direct Messages / LavenderBliss🪻</div>
            <div className="dmBody">
              <div className="msgRow">
                <div className="avatar avatarLav">🪻</div>
                <div>
                  <div className="msgMeta">
                    <div className="msgName">LavenderBliss🪻</div>
                    <div className="msgTime">01/07/2025 16:34</div>
                  </div>
                  <div className="msgText">Oe suna na</div>
                  <div className="msgText">Tyo coursework gareu?</div>
                </div>
              </div>

              <div className="msgRow">
                <div className="avatar avatarBlue">C69</div>
                <div>
                  <div className="msgMeta">
                    <div className="msgName">Clay69</div>
                    <div className="msgTime">01/07/2025 16:34</div>
                  </div>
                  <div className="msgText">Hajur</div>
                  <div className="msgText">Partial vayo</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, textAlign: "center", opacity: 0.7 }}>
            Scroll ↓
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h2
            className="mono"
            style={{
              margin: "0 0 18px",
              fontSize: 22,
              background:
                "linear-gradient(90deg,var(--clay-blue),var(--lavender))",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            ./Traceroute_Love.sh
          </h2>
          <Timeline items={TIMELINE} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mono" style={{ margin: "0 0 18px", fontSize: 20 }}>
            /var/www/html/memories
          </h2>

          <Gallery
            unlocked={galleryUnlocked}
            categories={CATEGORIES}
            activeCategoryId={activeCategoryId}
            onSelectCategory={(id) => {
              setActiveCategoryId(id);
              const cat = CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
              setSelectedItem(cat.items[0] ?? null);
            }}
            selectedItem={selectedItem}
            onSelectItem={(it) => {
              setSelectedItem(it);
              setShowImagePreview(true);
            }}
            onPeek={() => setPeekOpen(true)}
            onVoice={() => setVoiceOpen(true)}
            voiceButtonVisible={galleryUnlocked}
            volume={volume}
            onVolume={setVolume}
          />

          <div style={{ height: 18 }} />

          <Terminal 
            initialLines={terminalLines} 
            onUnlock={handleTerminalUnlock}
          />
        </div>
      </section>

      <footer
        className="mono"
        style={{
          padding: "22px 0",
          textAlign: "center",
          color: "rgba(255,255,255,0.45)",
          fontSize: 12
        }}
      >
        Built by Clay69 for LavenderBliss🪻 | Year 1
      </footer>

      {/* Peek Modal */}
      <Modal
        open={peekOpen}
        title="Quick Question"
        onClose={() => {
          setPeekOpen(false);
          setPeekError(null);
        }}
      >
        <p className="modalText">
          What I call you everyday now and then?
        </p>
        <input
          className="input"
          value={peekAnswer}
          onChange={(e) => setPeekAnswer(e.target.value)}
          placeholder="Type answer…"
        />
        {peekError && <div className="errorText">{peekError}</div>}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
          <button
            className="btn"
            onClick={() => {
              setPeekOpen(false);
              setPeekError(null);
            }}
          >
            Cancel
          </button>
          <button className="btn btnPrimary" onClick={onPeekSubmit}>
            Submit
          </button>
        </div>
      </Modal>

      {/* Voice Modal */}
      <Modal
        open={voiceOpen}
        title="MCQ — Quick Check"
        onClose={() => {
          setVoiceOpen(false);
          setVoiceError(null);
        }}
      >
        <p className="modalText">How much do I love you?</p>

        <div style={{ display: "grid", gap: 10 }}>
          {["1228", "1334", "3000", "2999"].map((opt) => (
            <label key={opt} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="radio"
                name="love"
                value={opt}
                checked={voiceChoice === opt}
                onChange={() => setVoiceChoice(opt)}
              />
              <span className="mono">{opt}</span>
            </label>
          ))}
        </div>

        {voiceError && <div className="errorText">{voiceError}</div>}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
          <button
            className="btn"
            onClick={() => {
              setVoiceOpen(false);
              setVoiceError(null);
            }}
          >
            Cancel
          </button>
          <button className="btn btnPrimary" onClick={onVoiceSubmit}>
            Submit
          </button>
        </div>

        {voiceUnlocked && (
          <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
            Voice unlocked.
          </div>
        )}
      </Modal>

      {showAnniversaryMessage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            margin: '10%',
            borderRadius: '20px'
          }}
        >
          <div 
            style={{
              fontSize: 'clamp(2rem, 8vw, 6rem)',
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              animation: 'pulse 2s infinite',
              fontFamily: 'monospace'
            }}
          >
            Happy Anniversary<br />Meri Khushi
          </div>
        </div>
      )}

      {showImagePreview && selectedItem && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            margin: '10%',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setShowImagePreview(false)}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === 'photo' ? (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '16px'
                }}
              />
            ) : (
              <VideoPlayer 
                src={selectedItem.src} 
                poster={selectedItem.poster} 
                volume={volume} 
                autoplay 
              />
            )}
          </div>
          
          <button
            onClick={() => setShowImagePreview(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)'
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}