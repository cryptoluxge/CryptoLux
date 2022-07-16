import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Tab } from '@headlessui/react'
import { getTokenBalances } from '../../utils/APIs/MoralisAPI'
import { shortAddress } from '../../utils/WalletHelpers'
import { getBep20TokenContract } from '../../utils/BNBChain/Helpers/contractHelpers'
import ConnectButton from '../../components/ConnectWallet/ConnectButton'
import AddToMetamask from '../../components/AddToMetamask'
import BSC from "../../images/Blockchains/Binance.svg"
import ETH from "../../images/Blockchains/Ethereum.svg"
import AVAX from "../../images/Blockchains/Avalanche.svg"
import Modal from '../../components/Modal'
import Web3 from 'web3'

const Index = () => {
  const { account, active, chainId } = useWeb3React()
  const [bscTokenBalance, setBscTokenBalance] = useState([])
  const [ethTokenBalance, setEthTokenBalance] = useState([])
  const [avaxTokenBalance, setAvaxTokenBalance] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [token, setToken] = useState([])
  const web3 = new Web3(window.ethereum);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const getBalance = async () => {
    const dataBSC = await getTokenBalances(account, 'bsc')
    if (dataBSC === "error") {
      setBscTokenBalance({ isERROR: true })
    } else {
      setBscTokenBalance(dataBSC)
    }

    const dataETH = await getTokenBalances(account, 'eth')
    if (dataETH === "error") {
      setEthTokenBalance({ isERROR: true })
      console.log(ethTokenBalance)
    } else {
      setEthTokenBalance(dataETH)
    }

    const dataAVAX = await getTokenBalances(account, 'avalanche')
    console.log(dataAVAX)
    if (dataAVAX === "error") {
      setAvaxTokenBalance({ isERROR: true })
    } else {
      setAvaxTokenBalance(dataAVAX)
    }

  }

  const sendToken = async (tokenAddress, reciverAddress, decimal, balance) => {
    const BIG_TEN = new BigNumber(10)
    const tokenContract = getBep20TokenContract(tokenAddress, chainId)
    const amount = new BigNumber(balance).times(BIG_TEN.pow(decimal))

    await tokenContract.methods.transfer(reciverAddress, web3.utils.toHex(amount)).send({ from: account })
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
        console.log("LAST CALLBACK: ", receipt);
        if (receipt.status === true) {
          /* showNotification("დადასტურდა", "გაიყიდა", "success"); */
          console.log("გაიგზავნა");
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
      });
  }

  useEffect(() => {
    if (active === true) {
      getBalance()
    }
    // eslint-disable-next-line
  }, [active])

  return (
    <div className='w-full'>
      <div className='bg-white dark:bg-darkCard rounded-lg'>
        <p className='p-3 text-lightText dark:text-darkText'>ტოკენების ბალანსი</p>
        <Tab.Group>
          <div className='px-3'>
            <Tab.List className='flex rounded-xl bg-violet-600 p-1'>
              <Tab className={({ selected }) =>
                classNames('w-full rounded-lg py-1 text-sm font-medium leading-5 text-blue-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-violet-900 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                <div className='flex items-center justify-center gap-2'>
                  <img src={BSC} alt="" className='w-5' />
                  <p className='font-bold text-white'>BSC</p>
                </div>
              </Tab>
              <Tab className={({ selected }) =>
                classNames('w-full rounded-lg py-1 text-sm font-medium leading-5 text-blue-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-violet-900 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                <div className='flex items-center justify-center gap-2'>
                  <img src={ETH} alt="" className='w-5' />
                  <p className='font-bold text-white'>ETH</p>
                </div>
              </Tab>
              <Tab className={({ selected }) =>
                classNames('w-full rounded-lg py-1 text-sm font-medium leading-5 text-blue-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-violet-900 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                <div className='flex items-center justify-center gap-2'>
                  <img src={AVAX} alt="" className='w-5' />
                  <p className='font-bold text-white'>AVAX</p>
                </div>
              </Tab>
            </Tab.List>
          </div>
          {active ? (
            <Tab.Panels>
              <Tab.Panel>
                <div className="overflow-x-auto shadow-md rounded-lg max-h-[500px]">
                  {bscTokenBalance.isERROR ? (
                    <div className='flex justify-center text-center py-5'>
                      <p className='font-bold text-lightText dark:text-darkText'>დაფიქსირდა შეცდომა :( ცადეთ თავიდან.</p>
                    </div>
                  ) : (
                    <div>
                      {bscTokenBalance.length > 0 ? (
                        <table className="w-full shadow-md text-sm text-left text-lightText dark:text-darkText">
                          <thead className="text-sm shadow-md text-lightText dark:text-darkText">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                სახელი
                              </th>
                              <th scope="col" className="px-6 py-3">
                                ბალანსი
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {bscTokenBalance.map((x) => (
                              <tr onClick={chainId === 56 ? () => setModalOpen(!modalOpen) : () => alert('გადართეთ AVAX ქსელზე')} onMouseEnter={() => setToken({ address: x.token_address, decimal: x.decimals, name: x.name, symbol: x.symbol, balance: Number(Number(x.balance) / 10 ** x.decimals) })} key={x.token_address} className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-zinc-800 w-full cursor-pointer">
                                <td className="px-6 py-4">
                                  <p className='font-bold text-lightText dark:text-darkText'>{x.symbol}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className='text-lightText dark:text-darkText'>{Number(Number(x.balance) / 10 ** x.decimals).toLocaleString('en-US')}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className='flex justify-center text-center py-5'>
                          <p className='font-bold text-lightText dark:text-darkText'>BSC ქსელზე ტოკენები არ გაქვთ</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="overflow-x-auto shadow-md rounded-lg max-h-[500px]">
                  {ethTokenBalance.isERROR ? (
                    <div className='flex justify-center text-center py-5'>
                      <p className='font-bold text-lightText dark:text-darkText'>დაფიქსირდა შეცდომა :( ცადეთ თავიდან.</p>
                    </div>
                  ) : (
                    <div>
                      {ethTokenBalance.length > 0 ? (
                        <table className="w-full shadow-md text-sm text-left text-lightText dark:text-darkText">
                          <thead className="text-sm shadow-md text-lightText dark:text-darkText">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                სახელი
                              </th>
                              <th scope="col" className="px-6 py-3">
                                ბალანსი
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ethTokenBalance.map((x) => (
                              <tr onClick={chainId === 1 ? () => setModalOpen(!modalOpen) : () => alert('გადართეთ AVAX ქსელზე')} onMouseEnter={() => setToken({ address: x.token_address, decimal: x.decimals, name: x.name, symbol: x.symbol, balance: Number(Number(x.balance) / 10 ** x.decimals) })} key={x.token_address} className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-zinc-800 w-full cursor-pointer">
                                <td className="px-6 py-4">
                                  <p className='font-bold text-lightText dark:text-darkText'>{x.symbol}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className='text-lightText dark:text-darkText'>{Number(Number(x.balance) / 10 ** x.decimals).toLocaleString('en-US')}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className='flex justify-center text-center py-5'>
                          <p className='font-bold text-lightText dark:text-darkText'>ETH ქსელზე ტოკენები არ გაქვთ</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="overflow-x-auto shadow-md rounded-lg max-h-[500px]">
                  {avaxTokenBalance.isERROR ? (
                    <div className='flex justify-center text-center py-5'>
                      <p className='font-bold text-lightText dark:text-darkText'>დაფიქსირდა შეცდომა :( ცადეთ თავიდან.</p>
                    </div>
                  ) : (
                    <div>
                      {avaxTokenBalance.length > 0 ? (
                        <table className="w-full shadow-md text-sm text-left text-lightText dark:text-darkText">
                          <thead className="text-sm shadow-md text-lightText dark:text-darkText">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                სახელი
                              </th>
                              <th scope="col" className="px-6 py-3">
                                ბალანსი
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {avaxTokenBalance.map((x) => (
                              <tr onClick={chainId === 43114 ? () => setModalOpen(!modalOpen) : () => alert('გადართეთ AVAX ქსელზე')} onMouseEnter={() => setToken({ address: x.token_address, decimal: x.decimals, name: x.name, symbol: x.symbol, balance: Number(Number(x.balance) / 10 ** x.decimals) })} key={x.token_address} className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-zinc-800 w-full cursor-pointer">
                                <td className="px-6 py-4">
                                  <p className='font-bold text-lightText dark:text-darkText'>{x.symbol}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className='text-lightText dark:text-darkText'>{Number(Number(x.balance) / 10 ** x.decimals).toLocaleString('en-US')}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className='flex justify-center text-center py-5'>
                          <p className='font-bold text-lightText dark:text-darkText'>AVAX ქსელზე ტოკენები არ გაქვთ</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </Tab.Panel>
            </Tab.Panels>
          ) : (
            <div className='py-5 flex justify-center'>
              <ConnectButton text='დააკავშირეთ საფულე' />
            </div>
          )}
        </Tab.Group>
      </div>
      <Modal title='ტოკენის გაგზავნა' open={modalOpen} close={() => setModalOpen(!modalOpen)}>
        <div className='p-3'>
          <p className='text-lightText dark:text-darkText'><span className='font-bold text-sm'>სახელი:</span> {token.name} ({token.symbol})</p>
          <p className='text-lightText dark:text-darkText'><span className='font-bold text-sm'>ბალანსი:</span> {token.balance}</p>
          <p className='text-lightText dark:text-darkText'><span className='font-bold text-sm'>კონტრაქტი:</span> <a href={`https://bscscan.com/address/${token.address}`} target='_blank' rel="noreferrer" className='text-lightText dark:text-darkText'>{shortAddress(token.address, 5)}</a></p>
          <AddToMetamask variant='text' address={token.address} decimal={token.decimal} symbol={token.symbol} />
          <div className='rounded-t border-b border-gray-600 dark:border-gray-600 rounded-3xl mt-2'></div>
          <p className='text-lightText dark:text-darkText mt-2 font-bold text-sm'>გაგზავნა</p>
          <div className='flex items-center gap-2 mt-1'>
            <input id='sentAmount' type="text" className='w-full rounded-lg bg-indigo-50 border border-indigo-300 dark:border-neutral-700 dark:bg-darkBackground text-lightText dark:text-white p-2' placeholder='რაოდენობა' />
            <div onClick={() => document.getElementById('sentAmount').value = token.balance} className='bg-gradient-to-br from-violet to-violetDark rounded-lg px-2 py-2 flex items-center justify-center'>
              <p className='text-white font-bold cursor-pointer'>MAX</p>
            </div>
          </div>
          <input id='reciverAddress' type="text" className='w-full mt-2 rounded-lg bg-indigo-50 border border-indigo-300 dark:border-neutral-700 dark:bg-darkBackground text-lightText dark:text-white p-2' placeholder='მიმღების მისამართი' />
          <button onClick={() => sendToken(token.address, document.getElementById('reciverAddress').value, token.decimal, document.getElementById('sentAmount').value)} type='button' className='w-full duration-150 hover:scale-105 bg-gradient-to-br from-violet to-violetDark bg-pos-0 hover:bg-pos-100 px-5 py-1 mt-2 rounded-lg text-white'>გაგზავნა</button>
        </div>
      </Modal>
    </div>
  )
}

export default Index

