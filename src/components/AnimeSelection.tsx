import { SortableContext } from "@dnd-kit/sortable";
import { Anime } from "../types";
import { useMemo } from "react";
import SortableAnimeWidget from "./SortableAnimeWidget";
import { useDroppable } from "@dnd-kit/core";

type AnimeSelectionProps = {
  anime: Anime[];
};

function AnimeSelection({ anime }: AnimeSelectionProps) {
  const animeId = useMemo(() => anime.map((anime) => anime.id), [anime]);
  const { setNodeRef, isOver } = useDroppable({
    id: "selection",
    data: { type: "tier" },
  });

  return (
    <>
      <SortableContext items={animeId}>
        <div
          className="flex flex-wrap bg-slate-900 gap-2 min-h-[166px] p-2"
          ref={setNodeRef}
          style={isOver ? { border: "1px solid green" } : undefined}
        >
          {anime.map((anime) => (
            <SortableAnimeWidget {...anime} key={anime.id} />
          ))}
        </div>
      </SortableContext>
    </>
  );
}

export default AnimeSelection;
