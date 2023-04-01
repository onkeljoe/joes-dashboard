/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "ethers";
import type { BigNumber } from "ethers";
// import { getAddress } from "ethers/lib/utils";
import { RELIC_ABI } from "../abi/relicAbi";
// import { keccak256 } from "ethers/lib/utils";

interface Position {
  amount: BigNumber;
  rewardDebt: BigNumber;
  rewardCredit: BigNumber;
  entry: BigNumber;
  poolId: BigNumber;
  level: BigNumber;
}

interface LevelInfo {
  requiredMaturities: BigNumber[];
  multipliers: BigNumber[];
  balance: BigNumber[];
}

interface PendingReward {
  relicId: BigNumber;
  poolId: BigNumber;
  pendingReward: BigNumber;
}

type Address = string;

const RELIC_CONTRACT = "0x1ed6411670c709F4e163854654BD52c74E66D7eC";
const providerUrl = "https://rpc.ftm.tools";

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const contract = new ethers.Contract(RELIC_CONTRACT, RELIC_ABI, provider);

export async function balanceOf(address: Address): Promise<number> {
  const resultobj = (await contract.balanceOf(address)) as BigNumber;
  return resultobj.toNumber() || 0;
}

export async function emissionCurve(): Promise<Address> {
  const address = (await contract.emissionCurve()) as Address;
  return address || "";
}

export async function getApproved(relicId: number): Promise<Address> {
  const address = (await contract.getApproved(relicId)) as Address;
  return address || "";
}

export async function getLevelInfo(poolId: number) {
  const levelInfo = (await contract.getLevelInfo(poolId)) as LevelInfo;
  const result = {
    requiredMaturities: levelInfo.requiredMaturities.map((x) => x.toNumber()),
    multipliers: levelInfo.multipliers.map((x) => x.toNumber()),
    balance: levelInfo.balance.map((x) =>
      parseFloat(ethers.utils.formatEther(x))
    ),
  };
  // console.log(result);
  return result;
}

export async function getPoolInfo(poolId: number) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const poolInfo = await contract.getPoolInfo(poolId);
  console.log(poolInfo);
  return null;
}

export async function getPositionForId(relicId: number) {
  const position = (await contract.getPositionForId(relicId)) as Position;
  const result = {
    amount: ethers.utils.formatEther(position.amount),
    rewardDebt: ethers.utils.formatEther(position.rewardDebt),
    rewardCredit: ethers.utils.formatEther(position.rewardCredit),
    entry: position.entry.toNumber(),
    poolId: position.poolId.toNumber(),
    level: position.level.toNumber(),
  };
  // console.log(result);
  return result;
}

// bytes32 private constant OPERATOR = keccak256("OPERATOR");
// bytes32 private constant EMISSION_CURVE = keccak256("EMISSION_CURVE");
// const OPERATOR = keccak256("OPERATOR");
// console.log(OPERATOR);
export async function getRoleAdmin() {
  return null;
}

export async function getRoleMember() {
  return null;
}

export async function getRoleMemberCount() {
  return null;
}

export async function hasRole() {
  return null;
}

export async function isApprovedForAll(
  owner: Address,
  operator: Address
): Promise<boolean> {
  const result = (await contract.isApprovedForAll(owner, operator)) as boolean;
  return result;
}

export async function isApprovedOrOwner(
  spender: Address,
  relicId: number
): Promise<boolean> {
  const result = (await contract.isApprovedOrOwner(
    spender,
    relicId
  )) as boolean;
  return result;
}

export async function levelOnUpdate(relicId: number): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const level = (await contract.levelOnUpdate(relicId)) as ethers.BigNumber;
  return level.toNumber();
}

// not implemented: name => always "Reliquary Deposit"

// nftDescriptor:
// 0: Address 0xa899df10eBeB8056bd7Af1AcF1f5f5C8d97e8D64 => contract
// 1: Address 0x00000..
// 2: Address 0xb7E67101565783895Efba5AB6DECf2312610ef89 => contract
export async function nftDescriptor(input: number): Promise<Address> {
  const address = (await contract.nftDescriptor(input)) as Address;
  return address || "";
}

export async function ownerOf(relicId: number): Promise<Address> {
  const address = (await contract.ownerOf(relicId)) as Address;
  return address || "";
}

export async function pendingReward(relicId: number): Promise<number> {
  const result = (await contract.pendingReward(relicId)) as BigNumber;
  const amount = parseFloat(ethers.utils.formatEther(result));
  return amount;
}

export async function pendingRewardsOfOwner(owner: Address) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = (await contract.pendingRewardsOfOwner(
    owner
  )) as PendingReward[];
  const rewards = result.map((x) => {
    return {
      relicId: x.relicId.toNumber(),
      poolId: x.poolId.toNumber(),
      pendingReward: parseFloat(ethers.utils.formatEther(x.pendingReward)),
    };
  });
  // console.log(rewards);
  return rewards;
}

export async function poolLength(): Promise<number> {
  const result = (await contract.poolLength()) as BigNumber;
  return result.toNumber();
}

export async function poolToken(poolId: number): Promise<Address> {
  const address = (await contract.poolToken(poolId)) as Address;
  return address || "";
}

export async function relicPositionsOfOwner(owner: Address) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = (await contract.relicPositionsOfOwner(owner)) as {
    relicIds: BigNumber[];
    positionInfos: Position[];
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const ids = result.relicIds.map((x) => x.toNumber());
  const positions = result.positionInfos.map((position) => {
    const pos = {
      amount: parseFloat(ethers.utils.formatEther(position.amount)),
      rewardDebt: parseFloat(ethers.utils.formatEther(position.rewardDebt)),
      rewardCredit: parseFloat(ethers.utils.formatEther(position.rewardCredit)),
      entry: position.entry.toNumber(),
      poolId: position.poolId.toNumber(),
      level: position.level.toNumber(),
    };
    return pos;
  });
  // console.log("relicPositionsOfOwner ", result);
  // console.log("ids: ", ids);
  // console.log("pos: ", positions);
  return { ids, positions };
}

// not implemented: rewardToken (immutable):
// 0xf24bcf4d1e507740041c9cfd2dddb29585adce1e

export async function rewarder(whatever: number): Promise<Address> {
  const address = (await contract.rewarder(whatever)) as Address;
  return address || "";
}

export async function supportsInterface() {
  return null;
}

// not implemented: symbol => RELIC

export async function tokenByIndex() {
  return null;
}

export async function tokenOfOwnerByIndex(
  owner: Address,
  relicIndex: number
): Promise<number> {
  const tokenId = (await contract.tokenOfOwnerByIndex(
    owner,
    relicIndex
  )) as BigNumber;
  return tokenId.toNumber();
}

export async function tokenURI(tokenId: number): Promise<string> {
  const url = (await contract.tokenURI(tokenId)) as string;
  return url || "";
}

export async function totalAllocPoint(): Promise<number> {
  const allocPoint = (await contract.totalAllocPoint()) as BigNumber;
  return allocPoint.toNumber();
}

export async function totalSupply(): Promise<number> {
  const supply = (await contract.totalSupply()) as BigNumber;
  return supply.toNumber();
}
