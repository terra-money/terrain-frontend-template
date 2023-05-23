import { useWallet, WalletStatus } from "@terra-money/wallet-kit";

export const ConnectWallet = ({ chainID }: { chainID: string }) => {
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
        <pre>
          {JSON.stringify(
            {
              status,
              network: network[chainID],
              availableWallets,
            },
            null,
            2
          )}
        </pre>
      </section>

      <footer>
        {status === WalletStatus.NOT_CONNECTED && (
          <>
            {availableWallets.map(({id}) => (
              <button
                key={"connect-" + id}
                onClick={() => connect(id)}
              >
                Connect {id}
              </button>
            ))}
            <br />
            {availableWallets.map(
              ({ name, icon, id }) => (
                <button
                  key={"connection-"  + id}
                  onClick={() => connect(id)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: "1em", height: "1em" }}
                  />
                  {name} [{id}]
                </button>
              )
            )}
          </>
        )}
        {status === WalletStatus.CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </footer>
    </div>
  );
};
