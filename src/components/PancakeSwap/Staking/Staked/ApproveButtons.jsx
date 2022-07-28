import React from 'react'
import { useToast } from '../../../../hooks/useToast'
import { getCakeContract } from '../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import { shortAddress } from '../../../../utils/WalletHelpers'
import { useWeb3React } from '@web3-react/core'

const ApproveButtons = ({ poolContract }) => {
  const toast = useToast()
  const { account, chainId } = useWeb3React()
  const cakeContract = getCakeContract(chainId);

  const handleApprove = async () => {
    await cakeContract.methods
      .approve(poolContract, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      .send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`მუშავდება: თქვენი ტრანზაქცია გაიგზავნა: ${hash}`);
        toast('loading', 'თქვენი ტრანზაქცია მუშავდება', `${shortAddress(hash, 5)}`)
      })
      .on("error", (error) => {
        if (error.code === 4001) {
          toast('error', 'თქვენ ტრანზაქცია არ დაადასტურეთ')
        } else if (error.code === -32003) {
          toast('error', 'თქვენი ტრანზაქცია არ დადასტურდა')
        } else if (error.code === -32603) {
          toast('error', 'საკომისიო ძალიან დაბალია.')
        } else {
          toast('error', 'შეცდომა', 'ცადეთ თავიდან')
        }
      }).then((receipt) => {
        if (receipt.status === true) {
          toast('success', 'ტრანზაქცია დადასტურდა')
        } else {
          toast('error', 'ტრანზაქცია არ დადასტურდა')
        }
      });
  }

  return (
    <div>
      <button onClick={() => handleApprove()} className='duration-150 hover:scale-95 bg-gradient-to-br from-violet to-violetDark px-5 py-2 rounded-lg text-white font-semibold text-sm'>Enable</button>
    </div>
  )
}

export default ApproveButtons