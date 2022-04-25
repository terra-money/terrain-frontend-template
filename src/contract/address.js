// sync-ed from root via `tr sync-refs`
import config from "../refs.terrain.json";
export const contractAdress = (wallet) => {
  // Make sure the contract has actually been deployed.
  if (config[wallet.network.name]?.counter?.contractAddresses?.default) {
    return config[wallet.network.name]?.counter?.contractAddresses?.default;
  }

  alert(`Contract not deployed on currently selected network: ${wallet.network.name}\n\nSelect the correct network in your wallet!`);
}
