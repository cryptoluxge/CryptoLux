import React, { useState, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"
import { ifo } from '../../../../config/PancakeSwap/constants/ifo'
import { useCakePrice } from '../../../../hooks/useDexTokenPrices'
import { getIfoPoolContract } from '../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import getSquadUsers from "./getSquadUsers"
import Skelaton from '../../../Skelaton'
import Card from "../../../Cards/Card"
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

const Index = () => {
  const mountedRef = useRef(true);
  const { chainId } = useWeb3React()
  const [isOpen, setIsOpen] = useState(false)
  const squadUsers = getSquadUsers();
  const [maxLP, setMaxLP] = useState();
  const [cakePrice, setCakePrice] = useState();

  const GetCakePrice = async () => {
    const price = await useCakePrice();
    setCakePrice(price);
  }
  //  თუ ყველამ მიიღო მონაწილეობა მაშინ აგროვდება
  const ifAllUserParticipatedRaised = squadUsers * (maxLP * cakePrice);
  //  ტოკენების გადანაწილება
  const eachTokensForAllUsers = ifo.privatePool.saleAmount / squadUsers;
  //  ტოკენების ფასი
  const eachTokensForAllUsersPrice = eachTokensForAllUsers * ifo.privatePool.tokenOfferingPrice;
  // Overflow-ს გამოთვლა
  const overflowIfAllUserParticipatd = (ifAllUserParticipatedRaised / ifo.privatePool.raiseAmount) * 100;
  // დასაბრუნებელი ქეიქი
  const maXLPinUSD = maxLP * cakePrice;
  const overflowThree = ifo.privatePool.saleAmount / squadUsers;
  const eachTokensPrice = overflowThree * ifo.privatePool.tokenOfferingPrice;
  const cakeToReturn = (maXLPinUSD - eachTokensPrice) / cakePrice;
  const cakeToReturnPrice = cakeToReturn * cakePrice;

  const getMaximumCAKE = async () => {
    const web3 = new Web3("https://bsc-dataseed.binance.org");
    const OfferingIFOContract = getIfoPoolContract(ifo.poolContract, chainId);
    const getMax = await OfferingIFOContract.methods.viewPoolInformation(0).call();
    setMaxLP(web3.utils.fromWei(getMax[2], "ether"));
  }

  useEffect(() => {
    GetCakePrice()
    getMaximumCAKE()

    return () => {
      mountedRef.current = false;
    }
    // eslint-disable-next-line
  }, [])


  return (
    <Card>
      <div className='p-3 text-white bg-gradient-to-br from-violet to-violetDark rounded-lg md:rounded-t-lg flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div>
            <div className='flex md:hidden'>
              <img src="https://pancakeswap.finance/images/ifos/vesting/not-tokens.svg" alt="Info" className='w-12 rounded-full' />
            </div>
          </div>
          <div>
            <p>Private Sale</p>
            <p>წინასწარი ინფორმაცია</p>
          </div>
        </div>
        <div className='hidden md:flex'>
          <div className='border-2 rounded-full'>
            <img src="https://pancakeswap.finance/images/ifos/vesting/not-tokens.svg" alt="Info" className='w-12 rounded-full' />
          </div>
        </div>
        <div className='flex md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <BsFillArrowUpCircleFill className='text-3xl' /> : <BsFillArrowDownCircleFill className='text-3xl' />}
        </div>
      </div>
      <div className='hidden md:flex'>
        <div className='p-3 space-y-5'>
          <div className='text-lightText dark:text-darkText'>
            <p>აგროვდება</p>
            {Number(ifAllUserParticipatedRaised) >= 0 ? (
              <p className='font-semibold'>
                {Number(ifAllUserParticipatedRaised) > 0 ? `$${ifAllUserParticipatedRaised.toLocaleString("en-US")}` : 0}
              </p>
            ) : <Skelaton />}
          </div>
          <div className='text-lightText dark:text-darkText'>
            <p>თითოს შეხვდება</p>
            {Number(eachTokensForAllUsers) >= 0 ? (
              <p className='font-semibold'>
                {Number(eachTokensForAllUsers) > 0 ? ` ~${eachTokensForAllUsers.toLocaleString("en-US")} ${ifo.tokenDetails.symbol} ($${eachTokensForAllUsersPrice.toLocaleString("en-US")})` : `0.00 ${ifo.tokenDetails.symbol}`}
              </p>
            ) : <Skelaton />}
          </div>
          <div className='text-lightText dark:text-darkText'>
            <p>Overflow იქნება</p>
            {Number(overflowIfAllUserParticipatd) >= 0 ? (
              <p className='font-semibold'>{Number(overflowIfAllUserParticipatd) > 1 ? ` ~${overflowIfAllUserParticipatd.toLocaleString("en-US")}%` : `0.00%`}</p>
            ) : <Skelaton />}
          </div>
          <div className='text-lightText dark:text-darkText'>
            <p>დაგიბრუნდებათ</p>
            <p className='font-semibold'>{Number(cakeToReturn) > 0 ? `~${cakeToReturn.toLocaleString("en-US")} CAKE (~${cakeToReturnPrice.toLocaleString("en-US")})` : `0.00 CAKE`}</p>
          </div>
          <div className='text-lightText dark:text-darkText'>
            <p>იუზერები Squad-ით</p>
            {Number(squadUsers) >= 0 ? (
              <p className='font-semibold'>{Number(squadUsers) > 0 ? squadUsers : 0}</p>
            ) : <Skelaton />}
          </div>
        </div>
      </div>
      <Transition show={isOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 "
        enterTo="opacity-100"
        leave="transition ease-in-out duration-200 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className=''>
          <div className='p-3 space-y-5'>
            <div className='text-lightText dark:text-darkText'>
              <p>აგროვდება</p>
              {Number(ifAllUserParticipatedRaised) >= 0 ? (
                <p className='font-semibold'>
                  {Number(ifAllUserParticipatedRaised) > 0 ? `$${ifAllUserParticipatedRaised.toLocaleString("en-US")}` : 0}
                </p>
              ) : <Skelaton />}
            </div>
            <div className='text-lightText dark:text-darkText'>
              <p>თითოს შეხვდება</p>
              {Number(eachTokensForAllUsers) >= 0 ? (
                <p className='font-semibold'>
                  {Number(eachTokensForAllUsers) > 0 ? ` ~${eachTokensForAllUsers.toLocaleString("en-US")} ${ifo.tokenDetails.symbol} ($${eachTokensForAllUsersPrice.toLocaleString("en-US")})` : `0.00 ${ifo.tokenDetails.symbol}`}
                </p>
              ) : <Skelaton />}
            </div>
            <div className='text-lightText dark:text-darkText'>
              <p>Overflow იქნება</p>
              {Number(overflowIfAllUserParticipatd) >= 0 ? (
                <p className='font-semibold'>{Number(overflowIfAllUserParticipatd) > 1 ? ` ~${overflowIfAllUserParticipatd.toLocaleString("en-US")}%` : `0.00%`}</p>
              ) : <Skelaton />}
            </div>
            <div className='text-lightText dark:text-darkText'>
              <p>დაგიბრუნდებათ</p>
              <p className='font-semibold'>{Number(cakeToReturn) > 0 ? `~${cakeToReturn.toLocaleString("en-US")} CAKE (~${cakeToReturnPrice.toLocaleString("en-US")})` : `0.00 CAKE`}</p>
            </div>
            <div className='text-lightText dark:text-darkText'>
              <p>იუზერები Squad-ით</p>
              {Number(squadUsers) >= 0 ? (
                <p className='font-semibold'>{Number(squadUsers) > 0 ? squadUsers : 0}</p>
              ) : <Skelaton />}
            </div>
          </div>
        </div>
      </Transition>
    </Card >
  )
}

export default Index