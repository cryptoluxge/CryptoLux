import React, { useEffect } from 'react'
import ConnectWallet from '../../../ConnectWallet/ConnectButton'
import ChangeNetworkBtn from '../../../ConnectWallet/WrongNetwork'
import { getSyrupPoolContract } from '../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import { getUserSyrupPoolData } from '../../../../utils/BNBChain/PancakeSwapHelpers/Helpers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'

const HarvestButton = ({ poolAddress, name }) => {
  const { account, active, chainId } = useWeb3React()
  const [approved, setApproved] = useState()
  const syrupContract = getSyrupPoolContract(poolAddress, chainId)

  const harvestRewards = async () => {
    await syrupContract.methods
      .deposit(0)
      .send({ from: account })
      .once("sending", (payload) => {
        console.log(payload);
      })
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
          console.log("საკომისიო ძალიან დაბალია.");
        } else {
          /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
          console.log("არ დადასტურდა");
        }
      })
      .then((receipt) => {
        if (receipt.status === true) {
          console.log("თქვენი ტრანზაქცია დადასტურდა!");
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
      });
  }

  const data = async () => {
    const userData = await getUserSyrupPoolData(poolAddress, account, name)
    setApproved(userData.isApproved)
  }

  useEffect(() => {
    if (active === true) {
      data()
    }
    // eslint-disable-next-line
  }, [active])

  return (
    <div>
      {active ? (
        <div>
          {chainId === 56 ? (
            <div>
              {approved ? (
                <div>
                  <button onClick={() => harvestRewards()} className='duration-150 hover:scale-105 bg-gradient-to-br from-violet to-violetDark px-5 py-2 rounded-lg text-white font-semibold text-sm'>აღება</button>
                </div>
              ) : null}
            </div>
          ) : (
            <ChangeNetworkBtn text='გადართეთ BSC ქსელზე' changeTo='BSC' />
          )}
        </div>
      ) : (
        <ConnectWallet loginText="დააკავშირე საფულე" />
      )}
    </div>
  )
}

export default HarvestButton