// sync-ed from root via `terrain sync-refs`
import { ConnectedWallet } from "@terra-dev/use-wallet"
import config from "../refs.terrain.json"
export const contractAdress = (wallet: ConnectedWallet) => config[wallet.network.name].counter.contractAddresses.default
