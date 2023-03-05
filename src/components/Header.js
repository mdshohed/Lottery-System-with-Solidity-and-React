
import WalletConnectBtn from './WalletConnectBtn';
import UserCard from './UserCard'; 
import { useContext, useState } from 'react';
import Web3 from 'web3';
import style from '../styles/Header.module.css';
import { appContext } from '../context/context';

const Header = () =>{
  const {address, connectWallet} = useContext(appContext); 
  return(
    <div className={style.wrapper}>
      <div className={style.title}>Lottery DAPP</div>
      {!address ? (<WalletConnectBtn connectWallet={connectWallet}></WalletConnectBtn>):
      (<UserCard address={address}></UserCard>)}
    </div>
  )
}

export default Header;