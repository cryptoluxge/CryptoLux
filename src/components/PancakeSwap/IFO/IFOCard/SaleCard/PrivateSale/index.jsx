import React, { useState, useEffect } from 'react'
import Card from "../../../../../Cards/Card"
import Skelaton from '../../../../../Skelaton'
import { ifo } from '../../../../../../config/PancakeSwap/constants/ifo'
import { useWeb3React } from '@web3-react/core'
import { getIfoPoolContract } from '../../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import { useCakePrice } from '../../../../../../hooks/useDexTokenPrices'
import Buttons from './Buttons'
import Web3 from 'web3'

const Index = () => {
  const { account, active, chainId } = useWeb3React()
  const [userMAX, setUserMAX] = useState()
  const [userMAXUSD, setUserMAXUSD] = useState()
  const [userDepositedCakePrivate, setUserDepositedCakePrivate] = useState()
  const [userRecivedTokenPrivate, setUserRecivedTokenPrivate] = useState()
  const ifoContract = getIfoPoolContract(ifo.poolContract, chainId)
  const web3 = new Web3('https://bsc-dataseed1.binance.org/');

  const GetUserMAX = async () => {
    const price = await useCakePrice();
    const maxlp = await ifoContract.methods.viewPoolInformation(0).call()
    const maxCAKE = web3.utils.fromWei(maxlp[2], 'ether')
    setUserMAX(maxCAKE)
    setUserMAXUSD(Number(maxCAKE) * Number(price))
  }

  const detailsPrivate = async () => {
    const ifo = await ifoContract.methods.viewUserOfferingAndRefundingAmountsForPools(account, [0]).call();
    setUserDepositedCakePrivate(Number(web3.utils.fromWei(ifo[0][1], "ether")))
    setUserRecivedTokenPrivate(Number(web3.utils.fromWei(ifo[0][0], "ether")))
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      GetUserMAX()
      detailsPrivate()
    }
    // eslint-disable-next-line
  }, [active, chainId])

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
              <p className='font-semibold'>{Number(userDepositedCakePrivate) > 0 ? Number(userDepositedCakePrivate).toFixed(4) : '0.000'}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <img src={ifo.tokenDetails.tokenLogo} alt="PancakeSwap" className='w-10 rounded-full' />
            <div className='text-lightText dark:text-darkText'>
              <p>მიღებული {ifo.tokenDetails.symbol}</p>
              <p className='font-semibold'>{Number(userRecivedTokenPrivate) > 0 ? Number(userRecivedTokenPrivate).toFixed(4) : '0.000'}</p>
            </div>
          </div>
        </div>
        <div className='p-3'>
          <Buttons />
        </div>
        <div className='p-3'>
          <div className='flex justify-between text-lightText dark:text-darkText font-semibold'>
            <p>შესასვლელად:</p>
            {Number(userMAX) >= 0 ? (
              <p>{Number(userMAX).toFixed(4)} (${Number(userMAXUSD).toLocaleString("en-US")})</p>
            ) : <Skelaton />}
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

export default Index