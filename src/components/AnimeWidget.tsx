import { AnimeWithPlacement } from "../types";

type AnimeWidgetProps = {
  animeWithPlacement: AnimeWithPlacement;
  index: number;
  draggedOverRef: React.MutableRefObject<number>;
};

function AnimeWidget({
  animeWithPlacement,
  index,
  draggedOverRef,
}: AnimeWidgetProps) {
  const { url, title, currentPlacement } = animeWithPlacement;

  const handleOnDrag = (e: React.DragEvent) => {
    const animeToJson = JSON.stringify({ url, title, currentPlacement });
    e.dataTransfer.setData("animeWithPlacement", animeToJson);
  };

  return (
    <img
      src={url}
      alt={title}
      className="aspect-[3/4] h-[150px]"
      draggable
      onDragStart={handleOnDrag}
      onDragEnter={() => (draggedOverRef.current = index)}
    />
  );
}

export default AnimeWidget;
