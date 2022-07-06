import React, { useState, useEffect } from 'react'
import Card from "../../../../Cards/Card"
import { ifo } from '../../../../../config/PancakeSwap/constants/ifo'
import { getVaultUserData } from '../../../../../utils/BNBChain/PancakeSwapHelpers/Helpers'
import { useCakePrice } from '../../../../../hooks/useDexTokenPrices'
import Buttons from './Buttons'
import { useWeb3React } from '@web3-react/core'

const Index = () => {
  const { account, active, chainId } = useWeb3React()
  const [userICAKE, setUserICAKE] = useState()
  const [userICAKEUSD, setUserICAKEUSD] = useState()

  const ICAKEChecker = async () => {
    const price = await useCakePrice();
    const getUser = await getVaultUserData(account)
    setUserICAKE(getUser.depositedCake)
    setUserICAKEUSD(Number(getUser.depositedCake) * Number(price))
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      ICAKEChecker()
    }
    // eslint-disable-next-line
  }, [active, chainId])

  return (
    <div>
      <Card>
        <div className='p-2 text-white bg-gradient-to-br from-violet to-violetDark rounded-t-lg'>
          <p className='font-semibold'>Public Sale</p>
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
            <p>{Number(userICAKE).toFixed(4)} CAKE (${Number(userICAKEUSD).toLocaleString("en-US")})</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>ასაგროვებელი:</p>
            <p>${Number(ifo.publicPool.raiseAmount).toLocaleString("en-US")}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>გამოყოფილი:</p>
            <p>{(ifo.publicPool.saleAmount).toLocaleString("en-US")} </p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>{ifo.tokenDetails.symbol}-ს ფასი:</p>
            <p>${Number(ifo.publicPool.tokenOfferingPrice).toFixed(3)}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Index