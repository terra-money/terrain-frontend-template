import "./App.css";
import {
  useConnectedWallet,
} from "@terra-money/wallet-kit";

import { ConnectWallet } from "./components/ConnectWallet";
import { Contract } from "./components/Contract";
const App = () => {
  const connected = useConnectedWallet();

  return (
    <div className="App">
      <header className="App-header">
        {connected ? <Contract connected={connected}/> : 'Connect your wallet'}
      </header>
      <ConnectWallet />
    </div>
  );
};

export default App;
