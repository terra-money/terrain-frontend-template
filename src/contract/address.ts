// sync-ed from root via `tr sync-refs`
  // @ts-ignore
import { ConnectedWallet } from "@terra-money/wallet-provider";
import config from "../refs.terrain.json";
export const contractAddress = (name: string, wallet: ConnectedWallet) => {
  // Make sure the contract has actually been deployed to selected network.
  // @ts-ignore
  if (config[wallet.network.name]?.[name].contractAddresses?.default) {
    // @ts-ignore
    return config[wallet.network.name]?.[name]?.contractAddresses?.default;
  }

  alert(`Contract not deployed on currently selected network: ${wallet.network.name}\n\nSelect the correct network in your wallet!`);
}
