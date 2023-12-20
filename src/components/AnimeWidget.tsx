import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { forwardRef } from "react";

type Style = {
  transform: string | undefined;
  transition: string | undefined;
  opacity?: number;
};

type AnimeWidgetProps = {
  url: string;
  title: string;
  style?: Style;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
};

const AnimeWidget = forwardRef<HTMLImageElement, AnimeWidgetProps>(
  ({ url, title, style, attributes, listeners }, ref) => {
    return (
      <img
        src={url}
        alt={title}
        className="aspect-[3/4] max-h-[150px]"
        ref={ref}
        {...attributes}
        {...listeners}
        style={style}
      />
    );
  }
);

export default AnimeWidget;
