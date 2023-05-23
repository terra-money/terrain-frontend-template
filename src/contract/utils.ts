import { ConnectResponse } from "@terra-money/wallet-interface";
import config from "../refs.terrain.json";

export const getContractChains = (connect: ConnectResponse) => {
  if (!connect?.name) return []
  const contractChains = (config as any)[connect.name];
  if (contractChains) {
    return Object.keys(contractChains);
  } else {
    alert(
      `No contracts found on ${connect.name}, change your network on the Station extension or deploy`
    );
  }
  return [];
};
