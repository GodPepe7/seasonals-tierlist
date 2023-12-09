import { Anime } from "../types";
import AnimeWidget from "./AnimeWidget";

function AnimeSelection() {
  const imgs: Anime[] = [
    {
      title: "Frieren",
      url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n1fmjRv4JQUd.jpg",
    },
    {
      title: "Shangri La",
      url: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx151970-qFKtRhOaSqa0.jpg",
    },
  ];
  return (
    <div className="flex flex-wrap bg-slate-900 p-4 gap-2">
      {imgs.map((img, index) => (
        <AnimeWidget title={img.title} url={img.url} key={index} />
      ))}
    </div>
  );
}

export default AnimeSelection;
