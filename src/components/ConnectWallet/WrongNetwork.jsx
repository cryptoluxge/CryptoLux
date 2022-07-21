import React from 'react'
import { AiFillWarning } from "react-icons/ai"
import { AvalancheChain, BNBChain, ETHChain } from "../../utils/Networks"

const WrongNetwork = ({ changeTo, text }) => {

  const changeNetwork = (changeTo) => {
    // eslint-disable-next-line
    switch (changeTo) {
      case "BSC":
        BNBChain()
        break;
      case "ETH":
        ETHChain()
        break;
      case "AVAX":
        AvalancheChain()
        break;
    }
  }

  return (
    <div>
      <button onClick={() => changeNetwork(changeTo)} className='bg-red-600 shadow-lg shadow-red-800 text-white text-sm font-semibold px-2 py-2 rounded-lg flex items-center gap-1 duration-150 hover:scale-95'><AiFillWarning className='text-lg' />{text}</button>
    </div>
  )
}

export default WrongNetwork