type AnimeWidgetProps = {
  url: string;
  title: string;
};

function AnimeWidget({ url, title }: AnimeWidgetProps) {

  return (
    <img
      src={url}
      alt={title}
      className="aspect-[3/4] h-[200px]"
    />
  );
}

export default AnimeWidget;
