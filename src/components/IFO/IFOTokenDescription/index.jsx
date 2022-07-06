import React, { useEffect, useState } from 'react'
import Card from "../../Cards/Card"
import { ifo } from '../../../config/PancakeSwap/constants/ifo'
import { contract } from '../../../config/PancakeSwap/constants/contracts'
import { getBep20TokenContract } from '../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import { Transition } from '@headlessui/react'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"
import { getExplorerURL, shortAddress } from '../../../utils/WalletHelpers'
import { useWeb3React } from '@web3-react/core'
import WrongNetwork from '../../ConnectWallet/WrongNetwork'

const Index = () => {
  const { account, chainId, active } = useWeb3React()
  const [isOpen, setIsOpen] = useState(false)
  const [isApproved, setIsApproved] = useState();
  const tokenContract = getBep20TokenContract(ifo.tokenDetails.address);

  async function checkApprove() {
    const approvalCheck = await tokenContract.methods.allowance(account, contract.router.contractAddress).call();
    if (approvalCheck > 0) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }

  async function handleApprove() {
    await tokenContract.methods.approve(contract.router.contractAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`თქვენი ტრანზაქცია მუშავდება: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
          console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
          console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
        } else {
          /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
          console.log("არ დადასტურდა");
        }
      })
      .then((receipt) => {
        if (receipt.status === true) {
          console.log("თქვენი ტრანზაქცია დადასტურდა!");
          document.getElementById('approveButton').style.display = 'none'
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
      });
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      checkApprove();
    }
    // eslint-disable-next-line
  }, [active, chainId]);

  return (
    <Card className='mt-4'>
      <div className='p-3 text-white bg-gradient-to-br from-violet to-violetDark rounded-lg md:rounded-t-lg flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div>
            <div className='flex md:hidden'>
              <img src={ifo.tokenDetails.tokenLogo} alt={ifo.tokenDetails.name} className='w-12 rounded-full' />
            </div>
          </div>
          <div>
            <p>{ifo.tokenDetails.name}</p>
            <p>ტოკენის შესახებ</p>
          </div>
        </div>
        <div className='hidden md:flex'>
          <div className='border-2 rounded-full'>
            <img src={ifo.tokenDetails.tokenLogo} alt="PancakeSwap" className='w-12 rounded-full' />
          </div>
        </div>
        <div className='flex md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <BsFillArrowUpCircleFill className='text-3xl' /> : <BsFillArrowDownCircleFill className='text-3xl' />}
        </div>
      </div>
      <div className='hidden md:flex'>
        <div className='p-3 space-y-1'>
          <div className='flex justify-center'>
            {active ? (
              <div>
                {chainId === 56 ? (
                  <div>
                    {isApproved ? null : (
                      <button id='approveButton' className='bg-gradient-to-br from-violet to-violetDark px-5 py-2 text-white rounded-lg duration-150 hover:scale-105' onClick={() => handleApprove()}>Approve ვაჭრობისთვის</button>
                    )}
                  </div>
                ) : <WrongNetwork changeTo="BSC" text="გადართე BSC ქსელზე" />}
              </div>
            ) : null}
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>სახელი:</p>
            <p>{ifo.tokenDetails.name}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>სიმბოლო:</p>
            <p>{ifo.tokenDetails.symbol}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>სრული რაოდენობა:</p>
            <p>{ifo.tokenDetails.totalSupply}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>კონტრაქტი:</p>
            <a href={getExplorerURL("token", ifo.tokenDetails.address, 56)} target="_blank" rel='noreferrer'>{shortAddress(ifo.tokenDetails.address, 5)}</a>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>ვებ-გვერდი:</p>
            <a href={ifo.tokenDetails.website} target="_blank" rel='noreferrer'>{ifo.tokenDetails.website}</a>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>ტვიტერი:</p>
            <a href={`https://twitter.com/${ifo.tokenDetails.twitter}`} target="_blank" rel='noreferrer'>@{ifo.tokenDetails.twitter}</a>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>ტელეგრამი:</p>
            <a href={`https://t.me/${ifo.tokenDetails.telegram}`} target="_blank" rel='noreferrer'>@{ifo.tokenDetails.telegram}</a>
          </div>
          <div className='border-[1px] border-lightText dark:border-darkText mt-2 mb-2'></div>
          <div className='text-lightText dark:text-darkText'>
            <p className='font-semibold'>აღწერა:</p>
            <p>{ifo.tokenDetails.description}</p>
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
        <div className='p-3 space-y-1'>
          <div className='flex justify-center'>
            {active ? (
              <div>
                {chainId === 56 ? (
                  <div>
                    {isApproved ? null : (
                      <button className='bg-gradient-to-br from-violet to-violetDark px-5 py-2 text-white rounded-lg duration-150 hover:scale-105' onClick={() => handleApprove()}>Approve ვაჭრობისთვის</button>
                    )}
                  </div>
                ) : <WrongNetwork changeTo="BSC" text="გადართე BSC ქსელზე" />}
              </div>
            ) : null}
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>სახელი:</p>
            <p>{ifo.tokenDetails.name}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>სიმბოლო:</p>
            <p>{ifo.tokenDetails.symbol}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>სრული რაოდენობა:</p>
            <p>{ifo.tokenDetails.totalSupply}</p>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>კონტრაქტი:</p>
            <a href={getExplorerURL("token", ifo.tokenDetails.address, 56)} target="_blank" rel='noreferrer'>{shortAddress(ifo.tokenDetails.address, 5)}</a>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>ვებ-გვერდი:</p>
            <a href={ifo.tokenDetails.website} target="_blank" rel='noreferrer'>{ifo.tokenDetails.website}</a>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>ტვიტერი:</p>
            <a href={`https://twitter.com/${ifo.tokenDetails.twitter}`} target="_blank" rel='noreferrer'>@{ifo.tokenDetails.twitter}</a>
          </div>
          <div className='flex justify-between text-lightText dark:text-darkText'>
            <p className='font-semibold'>ტელეგრამი:</p>
            <a href={`https://t.me/${ifo.tokenDetails.telegram}`} target="_blank" rel='noreferrer'>@{ifo.tokenDetails.telegram}</a>
          </div>
          <div className='border-[1px] border-lightText dark:border-darkText mt-2 mb-2'></div>
          <div className='text-lightText dark:text-darkText'>
            <p className='font-semibold'>აღწერა:</p>
            <p>{ifo.tokenDetails.description}</p>
          </div>
        </div>
      </Transition>
    </Card >
  )
}

export default Index