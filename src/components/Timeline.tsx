import type { TimelineItem } from "../data/timeline";

const dotBorder = (c: TimelineItem["dotColor"]) => {
  if (c === "lavender") return "var(--lavender)";
  if (c === "pink") return "#fb7185";
  return "var(--clay-blue)";
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((it, index) => {
        const isEven = index % 2 === 0;
        const itemClass = isEven ? "tItem left" : "tItem right";
        
        return (
          <div className={itemClass} key={it.id}>
            <div 
              className="tDot" 
              style={{ 
                borderColor: dotBorder(it.dotColor)
              }} 
            />
            <div className="tBadge mono">{it.badge}</div>
            <div className="tTitle">{it.title}</div>
            <div className="tDesc">{it.description}</div>
            
            {it.image && (
              <div className="tMedia tMedia--fixed">
                <img
                  src={it.image}
                  alt={it.title}
                  className="tMedia__img"
                  loading="lazy"
                />
              </div>
            )}
            
            {it.secondImage && (
              <div className="tMedia tMedia--fixed" style={{ marginTop: '20px' }}>
                <img
                  src={it.secondImage}
                  alt={`${it.title} - 2`}
                  className="tMedia__img"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}