import { useWallet, WalletStatus } from '@terra-dev/use-wallet'
import Typography from '@mui/material/Typography';
import { ReactComponent as WalletConnectIcon } from './../assets/wallet-connect.svg'
import { SvgIcon } from '@mui/material';

export const ConnectWallet = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect,
  } = useWallet()

  return (

    <div>

        <Typography variant="h6" component={'div'} 
        style={{
          display       : 'flex',
          alignItems    : 'space-between',
          // justifyContent: 'center',
          flexWrap      : 'wrap',
        }}>
          <p style={{margin:"0px", marginRight:"10px"}}>Wallet Options</p>

        <SvgIcon style={{display:'flex', justifySelf:'center', alignSelf:'center'}} component={WalletConnectIcon} inheritViewBox/>
        </Typography>
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <>
          {availableInstallTypes.map((connectType) => (
            <button
              key={`install-${connectType}`}
              onClick={() => install(connectType)}
              type="button"
            >
              Install {connectType}
            </button>
          ))}
          {availableConnectTypes.map((connectType) => (
            <button
              key     = {`connect-${connectType}`}
              onClick = {() => connect(connectType)}
              type    = "button"
            >
              Connect {connectType}
            </button>
          ))}
        </>
      )}
      {status === WalletStatus.WALLET_CONNECTED && (
        <button onClick={() => disconnect()} type="button">
          Disconnect
        </button>
      )}
    </div>
  )
}
