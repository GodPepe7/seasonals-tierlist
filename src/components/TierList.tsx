import { useState } from "react";
import { Tier, Anime } from "../types";

const initialTiers: Tier[] = [
  { name: "S", color: "red", anime: [] },
  { name: "A", color: "orange", anime: [] },
  { name: "B", color: "yellow", anime: [] },
  { name: "C", color: "green", anime: [] },
  { name: "D", color: "blue", anime: [] },
];

function TierList() {
  const [tiers, setTiers] = useState(initialTiers);
  return (
    <div className="grid grid-cols-[100px_auto] gap-y-1">
      {tiers.map(({ name, color, anime }, index) => (
        <>
          <div
            className={`font-bold text-center text-3xl p-4`}
            style={{ backgroundColor: color }}
          >
            {name}
          </div>
          <div
            className="bg-slate-900 flex flex-wrap"
            key={index}
          >
            {anime.map(({ url, title }) => (
              <img alt={title} src={url} className="aspect-[3/4] h-[200px]" />
            ))}
          </div>
        </>
      ))}
    </div>
  );
}

export default TierList;
