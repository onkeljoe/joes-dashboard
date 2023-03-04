import { ethers } from "ethers";
import { relicAbi } from "../abi/relicAbi";

const contractAdress = "0x1ed6411670c709F4e163854654BD52c74E66D7eC";
const providerUrl = "https://rpc.rtm.tools";

export async function balanceOf(address: number) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(contractAdress, relicAbi, provider);
  const resultobj = await contract.balanceOf(address);
  console.log(resultobj);
  return null;
}
