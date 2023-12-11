import { Anime, AnimeWithPlacement, Tier } from "../types";
import AnimeWidget from "./AnimeWidget";
import { useRef } from "react";

type AnimeSelectionProps = {
  anime: Anime[];
  setAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
  setTiers: React.Dispatch<React.SetStateAction<Tier[]>>;
};

function AnimeSelection({ anime, setAnime, setTiers }: AnimeSelectionProps) {
  const draggedOverRef = useRef<number>(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

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

  const handleOnDrop = (e: React.DragEvent) => {
    const animeJson = e.dataTransfer.getData("animeWithPlacement") as string;
    const animeWidget = JSON.parse(animeJson) as AnimeWithPlacement;
    setAnime((prevState) => {
      const copy = [...prevState];
      copy.splice(draggedOverRef.current, 0, animeWidget);
      return copy;
    });
  };

  return (
    <div
      className="flex flex-wrap bg-slate-900 gap-2 min-h-[150px]"
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
    >
      {anime.map((anime, index) => (
        <AnimeWidget
          animeWithPlacement={{ ...anime, currentPlacement: "animeselection" }}
          index={index}
          key={index}
          draggedOverRef={draggedOverRef}
        />
      ))}
    </div>
  );
}

export default AnimeSelection;
