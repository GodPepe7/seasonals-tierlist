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

  const handleOnDrop = (e: React.DragEvent, indexInTiers: number) => {
    const animeWidget = e.dataTransfer.getData("imgUrl") as string;
    const toBeAddedWidget: Anime = { url: animeWidget, title: "test" };
    setTiers((prevState) => {
      return prevState.map((tier, index) =>
        index === indexInTiers
          ? { ...tier, anime: [...tier.anime, toBeAddedWidget] }
          : tier
      );
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

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
            onDrop={(e) => handleOnDrop(e, index)}
            onDragOver={handleDragOver}
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
