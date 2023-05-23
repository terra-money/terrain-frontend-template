// sync-ed from root via `tr sync-refs`

import config from "../refs.terrain.json";

export const getContractAddress = (
  network: string | undefined,
  chainID: string
) => {
  const contractAddress = (config as any)[network ?? '']?.[chainID]?.[
    "{{project-name}}"
  ].contractAddresses?.default;
  if (contractAddress) {
    return contractAddress;
  }
};
