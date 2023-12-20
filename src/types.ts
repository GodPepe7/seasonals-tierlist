export type Tier = {
  id: string;
  name: string;
  color: string;
};

export type Anime = {
  id: string;
  title: string;
  url: string;
  tierId: string;
};

export type Placement = {
  currentPlacement: "animeselection" | number;
};

export type AnimeWithPlacement = Anime & Placement;
