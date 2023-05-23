import { useWallet, WalletStatus } from "@terra-money/wallet-kit";

export const ConnectWallet = () => {
  const {
    status,
    availableWallets,
    connect,
    network,
    disconnect,
  } = useWallet();

  return (
    <div>
      <section>
      {status === WalletStatus.NOT_CONNECTED && (
          <>
            {availableWallets.map(({id, name, icon}) => (
              <button
                key={"connect-" + id}
                onClick={() => connect(id)}
              >
                <img
                    src={icon}
                    alt={name}
                    style={{ width: "1em", height: "1em" }}
                  />
                Connect {name}
              </button>
            ))}
          </>
        )}
        {status === WalletStatus.CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </section>
      <footer>
      <pre>
          {JSON.stringify(
            {
              status,
              network,
              availableWallets,
            },
            null,
            2
          )}
        </pre>
      </footer>
    </div>
  );
};
