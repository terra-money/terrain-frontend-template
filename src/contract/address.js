import config from "../config.terrain.json"
export const contractAdress = (wallet) => config[wallet.network.name].counter.contractAddresses.default
