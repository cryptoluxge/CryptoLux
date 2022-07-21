import React, { useState, Fragment, useRef, useEffect } from 'react'
import { ifo } from '../../../../../config/PancakeSwap/constants/ifo'
import { Dialog, Transition } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { getIfoPoolContract, getIfoCakePoolContract } from "../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers"
import { getVaultUserData, getUserCakeBalance } from "../../../../../utils/BNBChain/PancakeSwapHelpers/Helpers"
import Web3 from 'web3'

const DepositCAKE = ({ poolType }) => {
  const mountedRef = useRef(true);
  const cancelButtonRef = useRef(null)
  const { account, active, chainId } = useWeb3React()
  const [isOpen, setIsOpen] = useState(false)
  const [limitPerUserCAKE, setLimitPerUserCAKE] = useState("");
  const [userBalance, setUserBalance] = useState(0)
  const web3 = new Web3(window.ethereum);
  const offeringTokenIFOPoolContract = getIfoPoolContract(ifo.poolContract, chainId);
  const IFOPoolContract = getIfoCakePoolContract(chainId);

  const getMaximumCake = async () => {
    if (poolType === "private") {
      const getMAXCake = await getVaultUserData(account)
      setLimitPerUserCAKE(getMAXCake.depositedCake);
      const cakeBalance = await getUserCakeBalance(account)
      setUserBalance(cakeBalance)
    } else {
      const userCredit = await IFOPoolContract.methods.getUserCredit(account).call();
      setLimitPerUserCAKE(web3.utils.fromWei(userCredit, "ether"));
    }
  }

  const setMAXcake = () => {
    if (Number(limitPerUserCAKE) <= Number(userBalance)) {
      document.getElementById("cakeToDeposit").value = userBalance;
    } else if (Number(limitPerUserCAKE) >= Number(userBalance)) {
      document.getElementById("cakeToDeposit").value = limitPerUserCAKE
    }

  }

  const depositInPool = async () => {
    const cakeInEther = document.getElementById("cakeToDeposit").value;
    const cakeInWei = web3.utils.toWei(cakeInEther, "ether");
    if (poolType === "private") {
      console.log("depositing in private:", cakeInWei);
      await offeringTokenIFOPoolContract.methods.depositPool(cakeInWei, 0).send({ from: account });
    } else {
      console.log("depositing in public:", cakeInWei);
      await offeringTokenIFOPoolContract.methods.depositPool(cakeInWei, 1).send({ from: account });
    }
  }

  useEffect(() => {
    if (active === true && account.length > 0) {
      getMaximumCake();
    }
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line
  }, [account, active]);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className='bg-gradient-to-br from-violet to-violetDark rounded-md px-5 py-1 w-full text-white duration-150 hover:scale-95'>
        შეტანა
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-darkCard bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed z-10 inset-0">
            <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="relative shadow bg-lightModal dark:bg-darkModal">
                    <button onClick={() => setIsOpen(false)} type="button" on className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="crypto-modal">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="py-4 px-3 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-lightText dark:text-darkText font-semibold">
                        {poolType === "public" ? "Public" : "Private"} Sale - შეტანა
                      </h3>
                    </div>
                    <div className='p-3'>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-lightText dark:text-darkText">რაოდენობა</label>
                        <div className='flex items-center gap-2'>
                          <input type="text" id="cakeToDeposit" className="rounded-lg block w-full p-2.5 bg-gray-200 dark:bg-darkCard dark:border-primary dark:placeholder-gray-400 text-lightText dark:text-white" placeholder="რაოდენობა" required />
                          <div onClick={() => setMAXcake()} className='bg-primary p-2 rounded-lg text-white duration-150 hover:bg-dark cursor-pointer'>MAX</div>
                        </div>
                      </div>
                      <div className='flex justify-between items-center mt-4'>
                        <p className="block mb-2 text-sm font-medium text-lightText dark:text-darkText">მაქსიმუმ შეგიძლიათ შეიტანოთ:</p>
                        <p className="block mb-2 text-sm font-medium text-lightText dark:text-darkText">{Number(limitPerUserCAKE).toLocaleString("en-US")} CAKE</p>
                      </div>
                      <div className='flex justify-between items-center'>
                        <p className="block mb-2 text-sm font-medium text-lightText dark:text-darkText">ბალანსზე გაქვთ:</p>
                        <p className="block mb-2 text-sm font-medium text-lightText dark:text-darkText">{Number(userBalance).toLocaleString("en-US")} CAKE</p>
                      </div>
                      <div className='border-[1px] rounded-full border-gray-200 dark:border-neutral-800'></div>
                      <div className='flex justify-end mt-3 gap-3'>
                        <button className='bg-gradient-to-br from-violet to-violetDark text-white px-5 py-2 rounded-lg duration-150 hover:scale-95' onClick={() => setIsOpen(!isOpen)}>დახურვა</button>
                        <button className='bg-gradient-to-br from-violet to-violetDark text-white px-5 py-2 rounded-lg duration-150 hover:scale-95' onClick={() => depositInPool()}>შეტანა</button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default DepositCAKE