import { SortableContext } from "@dnd-kit/sortable";
import { Tier, Anime } from "../types";
import { useMemo } from "react";
import SortableAnimeWidget from "./SortableAnimeWidget";
import { useDroppable } from "@dnd-kit/core";

type TierRowProps = {
  tier: Tier;
  anime: Anime[];
};

function TierRow({ tier, anime }: TierRowProps) {
  const { id, name, color } = tier;
  const animeId = useMemo(() => anime.map((anime) => anime.id), [anime]);
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "tier",
      data: { id, name, color },
    },
  });

  return (
    <>
      <SortableContext items={animeId}>
        <div
          className={`font-bold text-center text-3xl p-4`}
          style={{ backgroundColor: color }}
        >
          {name}
        </div>
        <div
          className="bg-slate-900 flex flex-wrap p-2 gap-2 min-h-[166px]"
          ref={setNodeRef}
        >
          {anime.map((anime) => (
            <SortableAnimeWidget {...anime} key={anime.id} />
          ))}
        </div>
      </SortableContext>
    </>
  );
}

export default TierRow;
