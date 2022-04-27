// sync-ed from root via `tr sync-refs`
import { ConnectedWallet } from "@terra-dev/use-wallet";
  // @ts-ignore
import config from "../refs.terrain.json";
export const contractAdress = (wallet: ConnectedWallet) => {
  // Make sure the contract has actually been deployed to selected network.
  // @ts-ignore
  if (config[wallet.network.name]?.counter.contractAddresses?.default) {
    // @ts-ignore
    return config[wallet.network.name]?.counter?.contractAddresses?.default;
  }

  alert(`Contract not deployed on currently selected network: ${wallet.network.name}\n\nSelect the correct network in your wallet!`);
}
