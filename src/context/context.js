import { createContext, useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import createLotteryContract from '../lottery'
export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState('')
  const [lotteryContract, setLotteryContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [lotteryPlayers, setPlayers] = useState([])
  const [lastWinner, setLastWinner] = useState([])
  const [lotteryId, setLotteryId] = useState()
  const [etherscanUrl, setEtherscanUrl] = useState()

  useEffect(() => {
    updateLottery()
  }, [lotteryContract])

  const updateLottery = async () => {
    if (lotteryContract) {
      try {
        const pot = await lotteryContract.methods.getBalance().call()

        setLotteryPot(web3.utils.fromWei(pot, 'ether'))

        setPlayers(await lotteryContract.methods.getPlayers().call())

        // setLotteryId(await lotteryContract.methods.lotteryId().call())

        setLastWinner(await lotteryContract.methods.getWinners().call())
        console.log([...lastWinner], 'Last Winners')
      } catch (error) {
        console.log(error, 'updateLottery')
      }
    }
  }

  const enterLottery = async () => {
    try {
      console.log('entering lottery')
      await lotteryContract.methods.enter().send({
        from: address,
        // 0.011 ETH in Wei
        value: '110000000000000000',
        // 0.0003 ETH in Gwei
        gas: 300000,
        gasPrice: null,
      })
      updateLottery()
    } catch (err) {
      console.log(err, 'enter')
    }
  }

  const pickWinner = async () => {
    try {
      let tx = await lotteryContract.methods.pickWinner().send({
        from: address,
        gas: 300000,
        gasPrice: null,
      })

      console.log(tx)
      // setEtherscanUrl('https://goerli.etherscan.io/tx/' + tx.transactionHash)
      updateLottery()
    } catch (err) {
      console.log(err, 'pick Winner')
    }
  }

  const connectWallet = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])
        setLotteryContract(createLotteryContract(web3))
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          setAddress(accounts[0])
        })
      } catch (err) {
        console.log(err, 'connect Wallet')
      }
    } else {
      console.log('Please install MetaMask')
    }
  }

  return (
    <appContext.Provider
      value={{
        connectWallet,
        address,
        lotteryPot,
        lotteryPlayers,
        enterLottery,
        pickWinner,
        lotteryId,
        lastWinner,
        etherscanUrl,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

