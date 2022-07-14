import React, { useState, useEffect } from 'react'
import Card from '../../Cards/Card'
import Details from './Details'
import Harvest from './Harvest'
import Staked from './Staked'
import { getUserSyrupPoolData } from '../../../utils/BNBChain/PancakeSwapHelpers/Helpers'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { useWeb3React } from '@web3-react/core'

const Index = ({ tokenName, tokenAddress, poolAddress, website, rewardPerBlock }) => {
  const [tableOpen, setTableOpen] = useState(false)
  const { active, account } = useWeb3React()
  const [pendingReward, setPendingReward] = useState()
  const [stakedCake, setStakedCake] = useState()
  const [totalStakedCake, setTotalStakedCake] = useState()

  const getData = async () => {
    const data = await getUserSyrupPoolData(poolAddress, account, tokenName)
    console.log(data)
    setPendingReward(data.userPending)
    setStakedCake(data.userStaked)
    setTotalStakedCake(data.totalCakeStaked)
  }

  useEffect(() => {
    if (active === true) {
      getData()
    }
    // eslint-disable-next-line
  }, [active])


  return (
    <div >
      <Card className='w-auto'>
        <div className='p-3 flex items-center cursor-pointer' onClick={() => setTableOpen(!tableOpen)}>
          <div className='flex items-center gap-6 md:gap-12'>
            <div className='flex items-center gap-2'>
              <img src={`https://pancakeswap.finance/images/tokens/${tokenAddress}.png`} alt="" className='w-8 md:w-10 border border-gray-400 rounded-full' />
              <div>
                <p className='text-lightText dark:text-darkText font-bold text-sm'>Earn {tokenName}</p>
                <p className='text-lightText dark:text-darkText hidden md:flex text-sm'>Stake CAKE</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div>
                <p className={`font-bold text-sm ${Number(pendingReward) > 0 ? 'text-indigo-500' : 'text-lightText dark:text-darkText '}`}>დაგროვებული</p>
                <p className={`${Number(pendingReward) > 0 ? 'text-indigo-500' : 'text-lightText dark:text-darkText '}`}>{Number(pendingReward) > 0 ? Number(pendingReward).toFixed(4) : '0.00'}</p>
              </div>
            </div>
            <div className='hidden md:flex items-center'>
              <div>
                <p className={`font-bold text-sm ${Number(stakedCake) > 0 ? 'text-indigo-500' : 'text-lightText dark:text-darkText '}`}>დასტეიკებული</p>
                <p className={`${Number(stakedCake) > 0 ? 'text-indigo-500' : 'text-lightText dark:text-darkText '}`}>{Number(stakedCake) > 0 ? Number(stakedCake).toFixed(4) : '0.00'}</p>
              </div>
            </div>
            <div className='hidden md:flex items-center'>
              <div>
                <p className='text-lightText dark:text-darkText font-bold text-sm'>Total Staked</p>
                <p className='text-lightText dark:text-darkText text-sm'>{Number(totalStakedCake) > 0 ? `${Number(totalStakedCake).toLocaleString('en-US')} ` : '0.00'}</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div>
                <p className='text-lightText dark:text-darkText font-bold text-sm'>APY</p>
                <p className='text-lightText dark:text-darkText text-sm'>100.00%</p>
              </div>
            </div>
            <div className='hidden md:flex items-center'>
              <div>
                <p className='text-lightText dark:text-darkText font-bold'>დამთავრდება</p>
                <p className='text-lightText dark:text-darkText text-sm text-smtext-sm'>0.00</p>
              </div>
            </div>
          </div>
          <div className='ml-5'>
            {tableOpen ?
              <BsFillArrowUpCircleFill className='text-primary text-2xl cursor-pointer' onClick={() => setTableOpen(!tableOpen)} /> :
              <BsFillArrowDownCircleFill className='text-primary text-2xl cursor-pointer' onClick={() => setTableOpen(!tableOpen)} />}
          </div>
        </div>
        {tableOpen ? (
          <div className='bg-zinc-200 dark:bg-zinc-800 p-3'>
            <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
              <Details rewardPerBlock={rewardPerBlock} tokenName={tokenName} poolAddress={poolAddress} website={website} />
              <div className='flex flex-col md:flex-col lg:flex-row gap-2 lg:ml-auto'>
                <Harvest poolAddress={poolAddress} tokenName={tokenName} pendingReward={Number(pendingReward) > 0 ? Number(pendingReward).toFixed(4) : '0.00'} />
                <Staked name={tokenName} stakedCake={Number(stakedCake) > 0 ? Number(stakedCake).toFixed(4) : '0.00'} poolContract={poolAddress} />
              </div>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  )
}

export default Index