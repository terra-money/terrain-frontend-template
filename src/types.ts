import { WalletStatus } from "@terra-money/wallet-kit";
import { InfoResponse } from "@terra-money/wallet-interface"; 
import { CreateTxOptions } from "@terra-money/feather.js"

export interface WalletResponse {
    status: WalletStatus.CONNECTED | WalletStatus.INITIALIZING | WalletStatus.NOT_CONNECTED;
    network: InfoResponse;
    connect: (id?: string) => Promise<void>;
    disconnect: () => void;
    availableWallets: {
        id: string;
        isInstalled: boolean | undefined;
        name: string;
        icon: string;
        website?: string | undefined;
    }[];
    post: (tx: CreateTxOptions) => Promise<{
        height: string;
        txhash: string;
        raw_log: string;
        code: string | number;
        codespace: string;
    } | undefined>;
    sign: (tx: CreateTxOptions) => Promise<{
        height: string;
        txhash: string;
        raw_log: string;
        code: string | number;
        codespace: string;
    } | undefined>;
}