import { useEffect, useRef, useState } from "react";
import { fireConfetti } from "../lib/confetti";

type Line = { text: string; tone?: "white" | "lav" | "blue"; __temp?: boolean };

type Props = {
  initialLines?: Line[];
  validFlags?: string[];
  onUnlock?: (flag: string) => void;
  decryptSoundPath?: string;
};

export default function Terminal({
  initialLines = [
    { text: "Welcome to Year One CTF Challenge.", tone: "white" },
    { text: "Objective: Capture the Heart.", tone: "white" },
    { text: 'Hint: "The word I made you say to manipulate you :")', tone: "lav" }
  ],
  validFlags = [
    "khushi{1st_anniversary_success}",
    "khushi",
    "i love you",
    "iloveyou",
    "love",
    "clay69"
  ],
  onUnlock,
  decryptSoundPath
}: Props) {
  const [displayLines, setDisplayLines] = useState<Line[]>([]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Typing helper
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    let cancelled = false;
    async function typeLines() {
      for (const ln of initialLines) {
        if (cancelled) return;
        let out = "";
        for (let i = 0; i < ln.text.length; i++) {
          out += ln.text[i];
          setDisplayLines((prev) => {
            const copy = prev.slice();
            if (copy.length && copy[copy.length - 1].__temp) {
              copy[copy.length - 1] = { text: out, tone: ln.tone, __temp: true } as any;
            } else {
              copy.push({ text: out, tone: ln.tone, __temp: true } as any);
            }
            return copy;
          });
          await sleep(18 + Math.random() * 20);
        }
        // finalize the line (remove __temp)
        setDisplayLines((prev) => {
          const copy = prev.slice();
          if (copy.length) {
            copy[copy.length - 1] = { text: out, tone: ln.tone };
          }
          return copy;
        });
        await sleep(220);
      }
    }
    typeLines();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // play decrypt sound (if provided)
  const playDecrypt = async () => {
    if (!decryptSoundPath) return;
    try {
      const audio = new Audio(decryptSoundPath);
      audio.volume = 0.9;
      await audio.play();
    } catch {
      // ignore
    }
  };

  const append = (text: string, tone?: Line["tone"]) => {
    setDisplayLines((p) => [...p, { text, tone }]);
  };

  const handleSubmitFlag = async (raw: string) => {
    const v = (raw || "").toLowerCase().trim();
    append(`<span class="terminalLineBlue">root@anniversary:~$</span> ${raw}`);
    if (validFlags.some((f) => f.toLowerCase() === v)) {
      append("> Access Granted. Decrypting heart...", "lav");
      setInputVal("");
      await sleep(700);
      append("[root@love]: System Decrypted — Memories Unlocked", "white");
      // play decrypt and confetti
      try { await playDecrypt(); } catch {}
      try { fireConfetti(); } catch {}
      onUnlock && onUnlock(v);
    } else {
      append("> Access Denied. Try again. (Hint: The words I manipulated you to say)", "white");
      setInputVal("");
    }
  };

  return (
    <div className="terminal" data-reveal>
      <div className="terminalTop">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminalTitle mono">root@love:~</span>
      </div>

      <div className="terminalBody">
        {displayLines.map((l, i) => {
          const cls = l.tone === "lav" ? "terminalLineLav" : l.tone === "blue" ? "terminalLineBlue" : "";
          return (
            <div key={i} className={cls} dangerouslySetInnerHTML={{ __html: l.text }} />
          );
        })}
        {/* input row */}
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ color: "var(--clay-blue)" }} className="mono">root@anniversary:~$</div>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && inputVal.trim()) {
                handleSubmitFlag(inputVal);
              }
            }}
            className="input"
            placeholder="Enter Flag..."
            style={{ background: "transparent", border: "none", color: "#fff", outline: "none", flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
}