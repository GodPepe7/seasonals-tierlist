import { useState } from "react";
import AnimeSelection from "./components/AnimeSelection";
import TierList from "./components/TierList";
import { Anime, Tier } from "./types";

function App() {
  const initialTiers: Tier[] = [
    { name: "S", color: "red", anime: [] },
    { name: "A", color: "orange", anime: [] },
    { name: "B", color: "yellow", anime: [] },
    { name: "C", color: "green", anime: [] },
    { name: "D", color: "blue", anime: [] },
  ];
  const [tiers, setTiers] = useState(initialTiers);

  const initialAnime: Anime[] = [
    {
      title: "Frieren",
      url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n1fmjRv4JQUd.jpg",
    },
    {
      title: "Shangri La",
      url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx151970-qFKtRhOaSqa0.jpg",
    },
  ];
  const [anime, setAnime] = useState(initialAnime);

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-8 xl:mx-auto max-w-[1200px] grid gap-6">
        <TierList tiers={tiers} setTiers={setTiers} setAnime={setAnime} />
        <AnimeSelection anime={anime} setAnime={setAnime} />
      </div>
    </div>
  );
}

export default App;
