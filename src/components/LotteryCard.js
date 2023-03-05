import style from '../styles/LotteryCard.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import createLotteryContract from '../lottery'; 
import { appContext } from '../context/context';

const LotteryCard = () => {
  const {enterLottery, lotteryPot, lastWinner, pickWinner} = useContext(appContext);
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Lottery{' '}
        {/* <span className={style.textAccent}>#{lotteryId ? lotteryId : '1'}</span> */}
      </div>
      <div className={style.pot}>
        Ether 🍯: <span className={style.goldAccent}>{lotteryPot} ETH</span>
      </div>

      <div className={style.recentWinnerTitle}>🏆Last Winners🏆</div>
      {!lastWinner.length ? (
        <div className={style.winner}>No winner yet</div>
      ) : (
        lastWinner.length > 0 && (
          <div className={style.winner}>
            {truncateEthAddress(lastWinner[lastWinner.length - 1])}
          </div>
        )
      )}

      <div className={style.btn} onClick={enterLottery}>
        Enter
      </div>
      <div className={style.btn} onClick={pickWinner}>
        Pick Winner!
      </div>
    </div>
  )
}
export default LotteryCard
