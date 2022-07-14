import React, { useEffect, useState } from 'react'
import Card from "../../../Cards/Card"
import { getCakeVaultV2IsApproved, getTotalCakeLocked, getTotalStakedCake, getVaultUserData } from "../../../../utils/BNBChain/PancakeSwapHelpers/Helpers"
import ConnectButton from "../../../../components/ConnectWallet/ConnectButton"
import WrongNetwork from '../../../ConnectWallet/WrongNetwork'
import { Transition } from '@headlessui/react'
import { MdOpenInNew } from "react-icons/md"
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"
import { AiFillInfoCircle } from "react-icons/ai"
import { useWeb3React } from '@web3-react/core'

const Index = () => {
  const { account, active, chainId } = useWeb3React()
  const [isApproved, setIsApproved] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState([])
  const [totalCakeStaked, setTotalCakeStaked] = useState(0)
  const [totalCakeLocked, setTotalCakeLocked] = useState(0)

  const getUserData = async () => {
    const approved = await getCakeVaultV2IsApproved(account)
    const user = await getVaultUserData(account)
    setUserData(user)
    setIsApproved(approved)
  }

  const getPoolData = async () => {
    const cakeStaked = await getTotalStakedCake()
    const cakeLocked = await getTotalCakeLocked()
    setTotalCakeStaked(cakeStaked)
    setTotalCakeLocked(cakeLocked)
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      getPoolData()
      getUserData()
    }
    // eslint-disable-next-line
  }, [active, chainId])


  return (
    <Card>
      <div>
        <div className='p-3 text-white bg-gradient-to-br from-violet to-violetDark rounded-lg md:rounded-t-lg flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex md:hidden'>
              <div className=''>
                <img src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" alt="PancakeSwap" className='w-12' />
              </div>
            </div>
            <div>
              <p>Stake CAKE</p>
              <p>Earn, IFO and more!</p>
            </div>
          </div>
          <div className='hidden md:flex'>
            <div className='border-2 rounded-full'>
              <img src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" alt="PancakeSwap" className='w-12' />
            </div>
          </div>
          <div className='flex md:hidden' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <BsFillArrowUpCircleFill className='text-3xl' /> : <BsFillArrowDownCircleFill className='text-3xl' />}
          </div>
        </div>
        <div className='hidden md:block'>
          {userData.isLocked ? null : (
            <div className='p-3'>
              <div className='bg-teal-100 rounded-lg p-3 flex items-start gap-2 border-[1px] border-teal-500 shadow-md'>
                <AiFillInfoCircle className='text-2xl text-teal-500' />
                <p className='text-lightText text-sm w-full font-semibold'>IFO-ში რომ მიიღოთ მონაწილეობა აუცილებელია დალუქოთ CAKE.</p>
              </div>
            </div>
          )}
          <div>
            {active ? (
              <div className='p-3 flex flex-col space-y-3'>
                <div className='text-lightText dark:text-darkText'>
                  <p>{userData.isLocked ? "დალუქული" : "შეტანილი"} CAKE</p>
                  <p className='font-semibold'>{Number(userData.cakeAmount).toFixed(4)}</p>
                </div>
                <div className='text-lightText dark:text-darkText'>
                  <p>დაგროვებული</p>
                  <p className='font-semibold'>{Number(userData.pendingAmount).toFixed(4)}</p>
                </div>
                <div className='text-lightText dark:text-darkText'>
                  <p>iCAKE</p>
                  <p className='font-semibold'>{Number(userData.depositedCake).toFixed(4)}</p>
                </div>
                {userData.isLocked ? (
                  <div className='text-lightText dark:text-darkText'>
                    <p>განიბლოკება</p>
                    <p className='font-semibold'>{userData.lockEndTime.date}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

          </div>
          <div className='flex justify-center'>
            <div>
              {active ? (
                <div>
                  {chainId === 56 ? (
                    <div>
                      {isApproved ? (
                        <div>
                          {userData.isLocked ? null : (
                            <div className='flex items-center gap-2'>
                              <button className='bg-gradient-to-br from-violet to-violetDark duration-150 hover:scale-105 font-semibold px-5 py-2 rounded-lg text-white text-sm text-medium'>შეტანა</button>
                              <button className='bg-gradient-to-br from-violet to-violetDark duration-150 hover:scale-105 font-semibold px-5 py-2 rounded-lg text-white text-sm text-medium'>გამოტანა</button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button className='bg-gradient-to-br from-violet to-violetDark duration-150 hover:scale-105 font-semibold px-5 py-2 rounded-lg text-white text-sm text-medium'>Enable</button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <WrongNetwork changeTo="BSC" text="გადართე BSC ქსელზე" />
                    </div>)}
                </div>
              ) : (<div className='mt-2'><ConnectButton loginText="დააკავშირე საფულე" /></div>)}
            </div>
          </div>
          <div className='p-3'>
            <div className='border-[1px] border-lightText dark:border-darkText rounded-lg mb-3'></div>
            <div className='flex justify-between text-lightText dark:text-darkText'>
              <p className='font-semibold'>Total Staked:</p>
              <p>{Number(totalCakeStaked).toLocaleString("en-US")}</p>
            </div>
            <div className='flex justify-between text-lightText dark:text-darkText'>
              <p className='font-semibold'>Total Locked:</p>
              <p>{Number(totalCakeLocked).toLocaleString("en-US")}</p>
            </div>
            <a href='https://bscscan.com/address/0x45c54210128a065de780C4B0Df3d16664f7f859e' rel="noreferrer" target="_blank" className='mt-2 flex justify-end text-lightText dark:text-darkText items-center'>
              <p className='font-semibold text-sm'>ნახე კონტრაქტი</p>
              <MdOpenInNew />
            </a>
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
        <div>
          <div>
            {active ? (
              <div className='p-3 flex flex-col space-y-3'>
                <div className='text-lightText dark:text-darkText'>
                  <p>{userData.isLocked ? "დალუქული" : "შეტანილი"} CAKE</p>
                  <p className='font-semibold'>{Number(userData.cakeAmount).toFixed(4)}</p>
                </div>
                <div className='text-lightText dark:text-darkText'>
                  <p>დაგროვებული</p>
                  <p className='font-semibold'>{Number(userData.pendingAmount).toFixed(4)}</p>
                </div>
                <div className='text-lightText dark:text-darkText'>
                  <p>iCAKE</p>
                  <p className='font-semibold'>{Number(userData.depositedCake).toFixed(4)}</p>
                </div>
                {userData.isLocked ? (
                  <div className='text-lightText dark:text-darkText'>
                    <p>განიბლოკება</p>
                    <p className='font-semibold'>{userData.lockEndTime.date}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

          </div>
          <div className='flex justify-center'>
            <div>
              {active ? (
                <div>
                  {chainId === 56 ? (
                    <div>
                      {isApproved ? (
                        <div>
                          {userData.isLocked ? null : (
                            <div className='flex items-center gap-2'>
                              <button className='bg-gradient-to-br from-violet to-violetDark duration-150 hover:scale-105 font-semibold px-5 py-2 rounded-lg text-white text-sm text-medium'>შეტანა</button>
                              <button className='bg-gradient-to-br from-violet to-violetDark duration-150 hover:scale-105 font-semibold px-5 py-2 rounded-lg text-white text-sm text-medium'>გამოტანა</button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button className='bg-gradient-to-br from-violet to-violetDark duration-150 hover:scale-105 font-semibold px-5 py-2 rounded-lg text-white text-sm text-medium'>Enable</button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <WrongNetwork changeTo="BSC" text="გადართე BSC ქსელზე" />
                    </div>)}
                </div>
              ) : (<div className='mt-2'><ConnectButton loginText="დააკავშირე საფულე" /></div>)}
            </div>
          </div>
          <div className='p-3'>
            <div className='border-[1px] border-lightText dark:border-darkText rounded-lg mb-3'></div>
            <div className='flex justify-between text-lightText dark:text-darkText'>
              <p className='font-semibold'>Total Staked:</p>
              <p>{Number(totalCakeStaked).toLocaleString("en-US")}</p>
            </div>
            <div className='flex justify-between text-lightText dark:text-darkText'>
              <p className='font-semibold'>Total Locked:</p>
              <p>{Number(totalCakeLocked).toLocaleString("en-US")}</p>
            </div>
            <a href='https://bscscan.com/address/0x45c54210128a065de780C4B0Df3d16664f7f859e' rel="noreferrer" target="_blank" className='mt-2 flex justify-end text-lightText dark:text-darkText items-center'>
              <p className='font-semibold text-sm'>ნახე კონტრაქტი</p>
              <MdOpenInNew />
            </a>
          </div>
        </div>
      </Transition>
    </Card >
  )
}

export default Index