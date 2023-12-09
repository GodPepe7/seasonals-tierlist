type AnimeWidgetProps = {
  url: string;
  title: string;
};

function AnimeWidget({ url, title }: AnimeWidgetProps) {
  const handleOnDrag = (e: React.DragEvent, url: string) => {
    e.dataTransfer.setData("imgUrl", url);
  };

  return (
    <img
      src={url}
      alt={title}
      className="aspect-[3/4] h-[200px]"
      draggable
      onDragStart={(e) => handleOnDrag(e, url)}
    />
  );
}

export default AnimeWidget;
