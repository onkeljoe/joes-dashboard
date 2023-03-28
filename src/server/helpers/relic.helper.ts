import { ZodError } from "zod";
import {
  getLevelInfo,
  levelOnUpdate,
  pendingReward,
  relicPositionsOfOwner,
  tokenURI,
} from "~/utils/smartContracts/read_contract";
import { Address } from "~/utils/types/contractTypes";
import { type Relicinfo } from "~/utils/types/relicinfo";

const poolId = 2;

export async function getRelicsByAddress(
  address: string
): Promise<Relicinfo[]> {
  try {
    const myAddress = Address.parse(address);
    const relics = await relicPositionsOfOwner(myAddress);
    const result = Promise.all(
      relics.positions.map(async (relic, index) => {
        const relicId = relics.ids[index] || 0;
        const nextLevel = await levelOnUpdate(relicId);
        const rewardPending = await pendingReward(relicId);
        const imageUrl = await tokenURI(relicId);
        const multipliers = (await getLevelInfo(poolId)).multipliers;
        const maBeetsVP =
          (relic.amount * (multipliers[relic.level] || 0)) / 100;
        return {
          relicId,
          level: relic.level,
          nextLevel,
          isUpgradeable: relic.level !== nextLevel,
          amountFbeets: relic.amount,
          rewardPending,
          rewardPayed: relic.rewardDebt,
          maBeetsVP,
          imageUrl,
        } as Relicinfo;
      })
    );
    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("invalid address ", error);
    } else {
      console.error("general error ", error);
    }
    return [];
  }
}
