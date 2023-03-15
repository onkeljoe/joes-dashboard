import { relicPositionsOfOwner } from "~/utils/smartContracts/read_contract";

type Address = string;

export async function fbeetsPerOwner(owner: Address): Promise<number> {
  const userPos = await relicPositionsOfOwner(owner);
  if (!userPos) return 0;
  const sum = userPos.positions.reduce((sum, x) => sum + x.amount, 0);
  return sum;
}
