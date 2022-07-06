import React from 'react'
import Card from "../../../../Cards/Card"
import { ifo } from '../../../../../config/PancakeSwap/constants/ifo'
/* import DepositCAKE from '../Buttons/DepositCAKE'
import ApproveIFO from '../Buttons/ApproveIFO'
import HarvestTokens from '../Buttons/HarvestTokens' */
import Buttons from './Buttons'

const index = () => {
  return (
    <div>
      <Card>
        <div className='p-2 text-white bg-gradient-to-br from-violet to-violetDark rounded-t-lg'>
          <p className='font-semibold'>Private Sale</p>
        </div>
        <div className='p-3 flex flex-col space-y-4'>
          <div className='flex items-center gap-2'>
            <img src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" alt="PancakeSwap" className='w-10' />
            <div className='text-lightText dark:text-darkText'>
              <p>შეტანილი CAKE</p>
              <p className='font-semibold'>0.000</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <img src={ifo.tokenDetails.tokenLogo} alt="PancakeSwap" className='w-10 rounded-full' />
            <div className='text-lightText dark:text-darkText'>
              <p>მიღებული {ifo.tokenDetails.symbol}</p>
              <p className='font-semibold'>0.000</p>
            </div>
          </div>
        </div>
        <div className='p-3'>
          <Buttons />
        </div>
        <div className='p-3'>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>შესასვლელად:</p>
            <p>0.00</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>ასაგროვებელი:</p>
            <p>${Number(ifo.privatePool.raiseAmount).toLocaleString("en-US")}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>გამოყოფილი:</p>
            <p>{(ifo.privatePool.saleAmount).toLocaleString("en-US")}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>{ifo.tokenDetails.symbol}-ს ფასი:</p>
            <p>${Number(ifo.privatePool.tokenOfferingPrice).toFixed(3)}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default index