import { useState } from "react";
import AnimeSelection from "./components/AnimeSelection";
import TierList from "./components/TierList";
import { Anime, Tier } from "./types";
const initialTiers: Tier[] = [
  { id: "s", name: "S", color: "red" },
  { id: "a", name: "A", color: "orange" },
  { id: "b", name: "B", color: "yellow" },
  { id: "c", name: "C", color: "green" },
  { id: "d", name: "D", color: "blue" },
];

const initialAnime: Anime[] = [
  {
    id: "1",
    title: "Frieren",
    url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n1fmjRv4JQUd.jpg",
    tierId: "s",
  },
  {
    id: "2",
    title: "Shangri La",
    url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx151970-qFKtRhOaSqa0.jpg",
    tierId: "s",
  },
  {
    id: "3",
    title: "The Eminence in Shadow Season 2",
    url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx161964-JpkEbHI8ivaP.jpg",
    tierId: "selection",
  },
  {
    id: "4",
    title: "Tokyo Revengers",
    url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163329-lGJRnYV9dcjc.jpg",
    tierId: "selection",
  },
  {
    id: "5",
    title: "The Apothecary Diaries",
    url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx161645-7I8Cip7XRDhV.jpg",
    tierId: "selection",
  },
];
  const [anime, setAnime] = useState(initialAnime);

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="mx-8 xl:mx-auto max-w-[1200px] grid gap-6">
        <TierList tiers={tiers} setTiers={setTiers} setAnime={setAnime} />
        <AnimeSelection anime={anime} setAnime={setAnime} setTiers={setTiers} />
      </div>
    </div>
  );
}

export default App;
