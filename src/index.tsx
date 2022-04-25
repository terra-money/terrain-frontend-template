import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
