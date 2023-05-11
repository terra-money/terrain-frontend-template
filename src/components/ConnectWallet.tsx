import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

export const ConnectWallet = ({chainID} : {chainID: string}) => {
  const {
    status,
    wallets,
    availableConnectTypes,
    availableConnections,
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
              wallets,
              availableConnectTypes,
            },
            null,
            2,
          )}
        </pre>
      </section>

      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            {availableConnectTypes.map((connectType) => (
              <button
                key={'connect-' + connectType}
                onClick={() => connect(connectType)}
              >
                Connect {connectType}
              </button>
            ))}
            <br />
            {availableConnections.map(
              ({ type, name, icon, identifier = '' }) => (
                <button
                  key={'connection-' + type + identifier}
                  onClick={() => connect(type, identifier)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: '1em', height: '1em' }}
                  />
                  {name} [{identifier}]
                </button>
              ),
            )}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </footer>
    </div>
  );
}
