/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";
import { type Address } from "../types/contractTypes";
import { RELIC_ABI } from "../abi/relicAbi";

const RELIC_CONTRACT = "0x1ed6411670c709F4e163854654BD52c74E66D7eC";
const providerUrl = "https://rpc.ftm.tools";

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const contract = new ethers.Contract(RELIC_CONTRACT, RELIC_ABI, provider);

// eslint-disable-next-line @typescript-eslint/require-await
export async function transferRelic(toAddress: Address, relicId: number) {
  return null;
}

//// give up on that approach, better moving that to a hook in the frontend code.
