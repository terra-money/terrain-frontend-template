import './App.css'

import { useEffect, useState } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'

import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import Card from '@mui/material/Card/Card';
import { Divider } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { List, ListItem } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Link } from '@mui/material';

function App() {
  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)
  const { status } = useWallet()

  const connectedWallet = useConnectedWallet()

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        setCount((await query.getCount(connectedWallet)).count)
      }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const onClickIncrement = async () => {
    setUpdating(true)
    await execute.increment(connectedWallet)
    setCount((await query.getCount(connectedWallet)).count)
    setUpdating(false)
  }

  const onClickReset = async () => {
    setUpdating(true)
    console.log(resetValue)
    await execute.reset(connectedWallet, resetValue)
    setCount((await query.getCount(connectedWallet)).count)
    setUpdating(false)
  }

  return (
    <Grid container xs={16} justifyContent='center'>


      <Grid item style={{ minHeight: '100vh' }}
        container xs={6} direction='column' >

        <Grid item xs={2}></Grid>
        <Grid item style={{ paddingBottom: "20px" }} >

          <Paper style={{
            border: "1px solid black",
            height: 'min-content',
            padding: "10px"

          }}>

            <Typography variant="h6" style={{ fontStyle: "italic", fontWeight: "800" }} >
              Terrain: Counter Contract  Template
            </Typography>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>

              <Typography style={{ marginRight: "5px" }} variant="body1">Current Count: </Typography>
              {count === null ? <Typography style={{ color: "gray" }} variant='caption' >Connect To contract to see count.</Typography> : count} {updating ? <CircularProgress /> : null}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>

              <Typography>Increment Counter: </Typography>
              <Button >
                <AddBoxIcon />

              </Button>
            </div>

            <Divider />
            {status === WalletStatus.WALLET_CONNECTED && (
          <div style={{ display: 'inline' }}>
            <input
              type="number"
              onChange={(e) => setResetValue(+e.target.value)}
              value={resetValue}
            />
            <button onClick={onClickReset} type="button">
              {' '}
              reset{' '}
            </button>
          </div>
        )}
            <ConnectWallet />
          </Paper>

        </Grid>

        <Grid item >
          <Paper style={{
            border: "1px solid black",
            height: 'min-content',
            padding: "10px"

          }}>
            <Grid container xs={10}>
              <Grid item xs={4}>
                <img src='/terra-logo.svg'
                  alt={"Terra Logo"}
                  width="200px"
                  height="200px"
                  loading="lazy" />

              </Grid>
              <Grid item xs={6}>

                <Typography variant="h6" style={{ fontStyle: "italic", fontWeight: '800', width: 'max' }} >
                  Learning Resources
                </Typography>
                <List dense style={{ width: "max-content" }}>

                  <ListItem><Link href='https://docs.terra.money'>The official Terra documentation. </Link></ListItem>
                  <ListItem><Link href='https://github.com/terra-money/terrain'>Terrain</Link>: the smart contract toolchain.</ListItem>
                  <ListItem><Link href='https://academy.terra.money/courses/cosmwasm-smart-contracts-i'>Terra Academy</Link>: learn to write and deploy smart contracts. </ListItem>
                  <ListItem><Link href='https://terra.getlaika.app'>Laika</Link>: Postman for blockchain.</ListItem>
                  <ListItem><Link href='https://docs.cosmwasm.com/docs/1.0/'>What the hell is CosmWasm?</Link></ListItem>
                  <ListItem> Minimal {" "} <Link href='https://github.com/InterWasm/cw-template'> CosmWasm template.</Link></ListItem>
                  <ListItem><Link href='https://terra-money.github.io/terra.js'>Terra.js</Link></ListItem>
                  <ListItem><Link href='https://terra-money.github.io/terra.js'>Terra.py</Link></ListItem>

                </List>

              </Grid>

            </Grid>




          </Paper>
        </Grid>



      </Grid>

    </Grid>
  )
}


const docs = () => {

  <Paper variant="outlined" style={{ "padding": "20px" }}>

    Where to go next
    <div>- Terrain Capabilities</div>
    <div>- Wallet Integrations</div>
    <div>- Docs</div>
    <div>- Try Other templates</div>
    <div>- Faucet & other fiddles</div>
    <img src='/terra-logo.svg'
      alt={"Terra Logo"}
      width="200px"
      height="200px"
      loading="lazy" />
  </Paper>

}

export default App
