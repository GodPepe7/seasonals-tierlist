import { AnimeWithPlacement } from "../types";

type AnimeWidgetProps = {
  animeWithPlacement: AnimeWithPlacement;
};

function AnimeWidget({ animeWithPlacement }: AnimeWidgetProps) {
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
      onDragStart={(e) => handleOnDrag(e)}
    />
  );
}

export default AnimeWidget;
