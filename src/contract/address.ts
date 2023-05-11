// sync-ed from root via `tr sync-refs`

import { ConnectedWallet } from "@terra-money/wallet-provider";
import config from "../refs.terrain.json";
import { getNetworkName } from "./utils";

export const getContractAddress = (wallet: ConnectedWallet, chainID: string) => {
  const network = getNetworkName(wallet)
  const contractAddress = (config as any)[network]?.[chainID]?.["{{project-name}}"].contractAddresses?.default
  if (contractAddress) {
    return contractAddress
  }
}


