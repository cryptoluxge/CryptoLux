import React, { useState, useEffect } from 'react'
import BSC from "../../../images/Blockchains/Binance.svg"
import ETH from "../../../images/Blockchains/Ethereum.svg"
import AVAX from "../../../images/Blockchains/Avalanche.svg"
import Web3 from 'web3'
import ConnectButton from '../../../components/ConnectWallet/ConnectButton'
import ChangeNetwork from '../../../components/ConnectWallet/WrongNetwork'
import { useWeb3React } from '@web3-react/core'
import { getChainName } from '../../../utils/WalletHelpers'
import { FaQuestion } from 'react-icons/fa'

const Index = () => {
  const { account, chainId, active } = useWeb3React()
  const [userBalance, setUserBalance] = useState()
  const web3 = new Web3(window.ethereum);

  const setMAX = () => {
    document.getElementById('sentNativeAmount').value = userBalance;
  }

  const getUserBalance = async () => {
    const balance = await web3.eth.getBalance(account.toLowerCase());
    setUserBalance(web3.utils.fromWei(balance, 'ether'))
  }

  const send = async () => {
    const toAddress = document.getElementById('reciverAddressNative').value
    const value = document.getElementById('sentNativeAmount').value

    if (toAddress === '') {
      alert('შეიყვანეთ მისამართი')
    } else {
      if (web3.utils.checkAddressChecksum(toAddress)) {
        if (value === '') {
          alert('შეიყვანეთ რაოდენობა')
        } else if (value === '0') {
          alert('0-ს ვერ გააგზავნით')
        } else {
          const valueInWei = web3.utils.toWei(value, 'ether')
          const transactionParameters = {
            to: toAddress, // Required except during contract publications.
            from: account, // must match user's active address.
            value: web3.utils.toHex(valueInWei), // Only required to send ether to the recipient from the initiating external account.
          };
          await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
        }
      } else {
        alert('არასწორი მისამართი!')
      }
    }
  }

  useEffect(() => {
    if (active === true) {
      document.getElementById('sentNativeAmount').removeAttribute('disabled', true)
      document.getElementById('reciverAddressNative').removeAttribute('disabled', true)
      getUserBalance()
    }
    // eslint-disable-next-line
  }, [active])

  return (
    <div >
      <div className='bg-white dark:bg-darkCard rounded-lg p-3'>
        <div className='flex flex-col items-center justify-center'>
          {chainId === 56 || chainId === 1 || chainId === 43114 ? (
            <div>
              {chainId === 56 ? (
                <div className='w-[42px] h-[42px] bg-yellow-500 rounded-lg flex justify-center'>
                  <img src={BSC} alt="" className='w-8' />
                </div>
              ) : null}
              {chainId === 1 ? (
                <div className='w-[42px] h-[42px] bg-blue-500 rounded-lg flex justify-center'>
                  <img src={ETH} alt="" className='w-5' />
                </div>
              ) : null}
              {chainId === 43114 ? (
                <div className='w-[42px] h-[42px] bg-red-500 rounded-lg flex justify-center'>
                  <img src={AVAX} alt="" className='w-6' />
                </div>
              ) : null}
            </div>
          ) : (
            <div className='w-[42px] h-[42px] bg-red-500 rounded-lg flex justify-center items-center'>
              <FaQuestion className='text-white text-2xl' />
            </div>
          )}
          {active ? (
            <p className='text-lightText dark:text-darkText font-bold mt-2'>{getChainName(chainId)}</p>
          ) : null}
        </div>
        <div className='border-[1px] border-gray-200 dark:border-gray-500 mt-3 mb-3'></div>
        <div>
          <div className='flex justify-between items-center mt-5'>
            <p className='text-lightText dark:text-darkText font-bold'>ბალანსი:</p>
            <p className='text-lightText dark:text-darkText font-bold'>{active ? `${Number(userBalance).toFixed(5)}` : '0.00'}</p>
          </div>
        </div>
        <div className='mt-2'>
          <p className='text-lightText dark:text-darkText font-bold'>გაგზავნა:</p>
          <div className='flex items-center gap-2 mt-1'>
            <input disabled id='sentNativeAmount' type="text" className='w-full rounded-lg bg-indigo-50 border border-indigo-300 dark:border-neutral-700 dark:bg-darkBackground text-lightText dark:text-white p-2' placeholder='რაოდენობა' />
            {active ? (
              <div onClick={() => setMAX()} className='bg-gradient-to-br from-violet to-violetDark rounded-lg px-2 py-2 flex items-center justify-center'>
                <p className='text-white font-bold cursor-pointer'>MAX</p>
              </div>
            ) : null}
          </div>
          <input disabled id='reciverAddressNative' type="text" className='w-full mt-2 rounded-lg bg-indigo-50 border border-indigo-300 dark:border-neutral-700 dark:bg-darkBackground text-lightText dark:text-white p-2' placeholder='მიმღების მისამართი' />
          {active === true ? (
            <div>
              {chainId === 1 || chainId === 56 || chainId === 43114 ? (
                <div>
                  <button onClick={() => send()} type='button' className='w-full duration-150 hover:scale-95 bg-gradient-to-br from-violet to-violetDark bg-pos-0 hover:bg-pos-100 px-5 py-1 mt-2 rounded-lg text-white'>გაგზავნა</button>
                </div>
              ) : (
                <div className='flex justify-center mt-3'>
                  <ChangeNetwork changeTo='BSC' text='შეცვალეთ ქსელი' />
                </div>
              )}
            </div>
          ) : (
            <div className='flex justify-center mt-3 w-full'>
              <ConnectButton text='დააკავშირეთ საფულე' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index