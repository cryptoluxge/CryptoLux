import React from 'react'
import { getCakeContract } from '../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import { useWeb3React } from '@web3-react/core'

const ApproveButtons = ({ poolContract }) => {
  const { account, chainId } = useWeb3React()
  const cakeContract = getCakeContract(chainId);

  const handleApprove = async () => {
    await cakeContract.methods
      .approve(poolContract, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      .send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`მუშავდება: თქვენი ტრანზაქცია გაიგზავნა: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          console.log("Transaction rejected by user: თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          console.log("Transaction rejected: თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          console.log("intrinsic gas too low: საკომისიო ძალიან დაბალია.");
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