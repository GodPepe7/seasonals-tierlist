export type Tier = {
  name: string;
  color: string;
  anime: Anime[];
};

export type Anime = {
  title: string;
  url: string;
};

export type Placement = {
  currentPlacement: "animeselection" | number;
};

export type AnimeWithPlacement = Anime & Placement;
