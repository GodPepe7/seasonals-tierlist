import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Anime } from "../types";
import AnimeWidget from "./AnimeWidget";

function SortableAnimeWidget({ id, url, title, tierId }: Anime) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "anime", anime: { id, url, title, tierId } },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <AnimeWidget
      ref={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      style={style}
      url={url}
      title={title}
    />
  );
}

export default SortableAnimeWidget;
