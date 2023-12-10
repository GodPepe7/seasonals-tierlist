import { Tier, Anime, AnimeWithPlacement } from "../types";
import AnimeWidget from "./AnimeWidget";

type TierListProps = {
  tiers: Tier[];
  setTiers: React.Dispatch<React.SetStateAction<Tier[]>>;
  setAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
};

function TierList({ tiers, setTiers, setAnime }: TierListProps) {
  const handleOnDrop = (e: React.DragEvent, indexInTierList: number) => {
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
    setTiers((prevState) => {
      return prevState.map((tier, index) =>
        index === indexInTierList
          ? { ...tier, anime: [...tier.anime, animeWidget] }
          : tier
      );
    });

    // from tier to another tier: delete from original tier and put it into other tier
    // from tier to selection: delete from original tier and put it back into selection
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
            {anime.map((anime) => (
              <AnimeWidget
                animeWithPlacement={{ ...anime, currentPlacement: index }}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
}

export default TierList;
