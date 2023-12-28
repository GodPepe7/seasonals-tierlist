import { Tier, Anime } from "../types";
import TierRow from "./TierRow";

type TierListProps = {
  tiers: Tier[];
  anime: Anime[];
};

function TierList({ tiers, anime }: TierListProps) {
  return (
    <div className="grid grid-cols-[100px_auto] gap-y-1">
      {tiers.map((tier) => (
        <TierRow
          tier={tier}
          anime={anime.filter((anime) => anime.tierId === tier.id)}
          key={tier.id}
        />
      ))}
    </div>
  );
}

export default TierList;
