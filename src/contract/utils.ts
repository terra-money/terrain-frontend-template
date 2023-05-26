import { ConnectResponse } from "@terra-money/wallet-kit";
import config from "../refs.terrain.json";

export const getContractChains = (connect: ConnectResponse) => {
  if (!connect?.network) return []
  const contractChains = (config as any)[connect.network];
  if (contractChains) {
    return Object.keys(contractChains);
  } else {
    alert(
      `No contracts found on ${connect.network}, change your network on the Station extension or deploy`
    );
  }
};
