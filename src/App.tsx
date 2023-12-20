import { useState } from "react";
import AnimeSelection from "./components/AnimeSelection";
import TierList from "./components/TierList";
import { Anime, Tier } from "./types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AnimeWidget from "./components/AnimeWidget";

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

function App() {
  const [tiers] = useState(initialTiers);
  const [anime, setAnime] = useState(initialAnime);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const onDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { over } = e;
    const dragging = anime.findIndex(
      (anime) => anime.id === activeId?.toString()
    );
    const hoveringOver = anime.findIndex(
      (anime) => anime.id === over?.id.toString()
    );
    if (
      hoveringOver === undefined ||
      dragging === undefined ||
      dragging === hoveringOver
    )
      return;
    setAnime((prevAnime) => {
      const reordered = arrayMove(prevAnime, dragging, hoveringOver);
      return reordered;
    });
    setActiveId(null);
  };

  const onDragOver = (e: DragOverEvent) => {
    const { over } = e;
    const overId = over?.id;
    console.log(`${over?.data.current?.type}: ${overId}`);

    if (activeId === overId || !overId) return;

    const hoveringOverTierId =
      over.data.current?.type === "tier"
        ? over.id.toString()
        : over.data.current?.anime.tierId;
    const draggedTierId = anime.find((anime) => anime.id === activeId)?.tierId;
    if (hoveringOverTierId === draggedTierId || !draggedTierId) return;
    setAnime((prevAnime) => {
      return prevAnime.map((anime) =>
        anime.id === activeId ? { ...anime, tierId: hoveringOverTierId } : anime
      );
    });
  };

  const draggedAnime = anime.find((anime) => anime.id === activeId);

  return (
    <div className="min-h-screen bg-slate-800">
      <DndContext
        collisionDetection={rectIntersection}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="mx-8 xl:mx-auto max-w-[1200px] grid gap-6">
          <TierList tiers={tiers} anime={anime} />
          <AnimeSelection
            anime={anime.filter((anime) => anime.tierId === "selection")}
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;
