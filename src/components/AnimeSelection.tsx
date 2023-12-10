import { Anime, AnimeWithPlacement, Tier } from "../types";
import AnimeWidget from "./AnimeWidget";

type AnimeSelectionProps = {
  anime: Anime[];
  setAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
  setTiers: React.Dispatch<React.SetStateAction<Tier[]>>;
};

function AnimeSelection({ anime, setAnime, setTiers }: AnimeSelectionProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const animeJson = e.dataTransfer.getData("animeWithPlacement") as string;
    const animeWidget = JSON.parse(animeJson) as AnimeWithPlacement;
    // from animeselection to tierlist: delete from selection and put it into tier
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
    setAnime((prevState) => [...prevState, animeWidget]);
  };

  return (
    <div
      className="flex flex-wrap bg-slate-900 gap-2 min-h-[150px]"
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
    >
      {anime.map((anime, index) => (
        <AnimeWidget
          animeWithPlacement={{ ...anime, currentPlacement: "animeselection" }}
          key={index}
        />
      ))}
    </div>
  );
}

export default AnimeSelection;
