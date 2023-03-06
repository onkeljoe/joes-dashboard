/* eslint-disable @typescript-eslint/require-await */
import { ethers } from "ethers";
import { relicAbi } from "../abi/relicAbi";

const contractAdress = "0x1ed6411670c709F4e163854654BD52c74E66D7eC";
const providerUrl = "https://rpc.ftm.tools";

export async function balanceOf(address: string): Promise<number> {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(contractAdress, relicAbi, provider);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const resultobj = (await contract.balanceOf(address)) as ethers.BigNumber;
  return resultobj.toNumber() || 0;
}

export async function emissionCurve() {
  return null;
}

export async function getApproved() {
  return null;
}

export async function getLevelInfo() {
  return null;
}

export async function getPoolInfo() {
  return null;
}

export async function getPositionForId() {
  return null;
}

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

export async function isApprovedForAll() {
  return null;
}

export async function isApprovedOrOwner() {
  return null;
}

export async function levelOnUpdate() {
  return null;
}

// not implemented: name

export async function nftDescriptor() {
  return null;
}

export async function ownerOf() {
  return null;
}

export async function pendingReward() {
  return null;
}

export async function pendingRewardsOfOwner() {
  return null;
}

export async function poolLength() {
  return null;
}

export async function poolToken() {
  return null;
}

export async function relicPositionsOfOwner() {
  return null;
}

// not implemented: rewardToken (immutable):
// 0xf24bcf4d1e507740041c9cfd2dddb29585adce1e

export async function rewarder() {
  return null;
}

export async function supportsInterface() {
  return null;
}

// not implemented: symbol => RELIC

export async function tokenByIndex() {
  return null;
}

export async function tokenOfOwnerByIndex() {
  return null;
}

export async function tokenURI() {
  return null;
}

export async function totalAllocPoint() {
  return null;
}

export async function totalSupply() {
  return null;
}