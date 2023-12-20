import { useState } from "react";
import AnimeSelection from "./components/AnimeSelection";
import TierList from "./components/TierList";
import { Tier } from "./types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AnimeWidget from "./components/AnimeWidget";
import useFetchAnime from "./hooks/useFetchAnime";
import SeasonSelect from "./components/SeasonSelect";
import YearSelect from "./components/YearSelect";

const initialTiers: Tier[] = [
  { id: "s", name: "S", color: "red" },
  { id: "a", name: "A", color: "orange" },
  { id: "b", name: "B", color: "yellow" },
  { id: "c", name: "C", color: "green" },
  { id: "d", name: "D", color: "blue" },
];

function App() {
  const [tiers] = useState(initialTiers);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [season, setSeason] = useState("FALL");
  const [year, setYear] = useState("2023");
  const { anime, setAnime } = useFetchAnime(season, year);

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
      <div className="mx-8 xl:mx-auto max-w-[1213px] grid gap-6">
        <DndContext
          collisionDetection={rectIntersection}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <TierList tiers={tiers} anime={anime} />
          <div className="flex gap-6">
            <SeasonSelect setSeason={setSeason} />
            <YearSelect setYear={setYear} />
          </div>
          <AnimeSelection
            anime={anime.filter((anime) => anime.tierId === "selection")}
          />
          <DragOverlay>
            {draggedAnime ? (
              <AnimeWidget title={draggedAnime.title} url={draggedAnime.url} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
