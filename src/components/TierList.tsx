import { Fragment, useRef } from "react";
import { Tier, Anime, AnimeWithPlacement } from "../types";
import AnimeWidget from "./AnimeWidget";

type TierListProps = {
  tiers: Tier[];
  setTiers: React.Dispatch<React.SetStateAction<Tier[]>>;
  setAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
};

function TierList({ tiers, setTiers, setAnime }: TierListProps) {
  const draggedOverIndex = useRef<number>(0);

  const handleDrag = (e: React.DragEvent) => {
    const animeJson = e.dataTransfer.getData("animeWithPlacement") as string;
    const animeWidget = JSON.parse(animeJson) as AnimeWithPlacement;
    if (animeWidget.currentPlacement === "animeselection") {
      setAnime((prevState) =>
        prevState.filter(({ title }) => title !== animeWidget.title)
      );
    } else {
      setTiers((prevState) => {
        const index = animeWidget.currentPlacement as number;
        const updatedAnimeList = prevState[index].anime.filter(
          ({ title }) => title !== animeWidget.title
        );
        const newState = [...prevState];
        newState[index].anime = updatedAnimeList;
        return newState;
      });
    }
  };

  const handleOnDrop = (e: React.DragEvent, indexInTierList: number) => {
    const animeJson = e.dataTransfer.getData("animeWithPlacement") as string;
    const animeWidget = JSON.parse(animeJson) as AnimeWithPlacement;
    setTiers((prevState) => {
      if (prevState[indexInTierList].anime.includes(animeWidget))
        return prevState;
      const copy = [...prevState];
      const animeList = copy[indexInTierList].anime;
      animeList.splice(draggedOverIndex.current, 0, animeWidget);
      return copy;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-[100px_auto] gap-y-1">
      {tiers.map(({ name, color, anime }, index) => (
        <Fragment key={index}>
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
            onDrag={handleDrag}
          >
            {anime.map((anime, inTierIndex) => (
              <AnimeWidget
                animeWithPlacement={{ ...anime, currentPlacement: index }}
                index={inTierIndex}
                draggedOverRef={draggedOverIndex}
                key={inTierIndex}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default TierList;
