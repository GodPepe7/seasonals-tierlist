import { Anime } from "../types";
import AnimeWidget from "./AnimeWidget";

type AnimeSelectionProps = {
  anime: Anime[];
  setAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
};

function AnimeSelection({ anime, setAnime }: AnimeSelectionProps) {
  return (
    <div className="flex flex-wrap bg-slate-900 p-4 gap-2">
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
