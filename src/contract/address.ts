// sync-ed from root via `tr sync-refs`

import config from "../refs.terrain.json";

export const getContractAddress = (
  network = 'testnet',
  chainID: string
) => {
  try {
    const contractAddress = (config as any)[network]?.[chainID]?.[
      "{{project-name}}"
    ].contractAddresses?.default;
    if (contractAddress) return contractAddress;
  } catch {}
};
