import React, { useEffect } from 'react'
import ConnectWallet from '../../../ConnectWallet/ConnectButton'
import ChangeNetworkBtn from '../../../ConnectWallet/WrongNetwork'
import { useToast } from '../../../../hooks/useToast'
import { shortAddress } from '../../../../utils/WalletHelpers'
import { getSyrupPoolContract } from '../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers'
import { getUserSyrupPoolData } from '../../../../utils/BNBChain/PancakeSwapHelpers/Helpers'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'

const HarvestButton = ({ poolAddress, name }) => {
  const { account, active, chainId } = useWeb3React()
  const [approved, setApproved] = useState()
  const syrupContract = getSyrupPoolContract(poolAddress, chainId)
  const toast = useToast()

  const harvestRewards = async () => {
    await syrupContract.methods
      .deposit(0)
      .send({ from: account })
      .once("sending", (payload) => {
        console.log(payload);
      })
      .once("transactionHash", (hash) => {
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
      })
      .then((receipt) => {
        if (receipt.status === true) {
          toast('success', 'ტრანზაქცია დადასტურდა')
        } else {
          toast('error', 'ტრანზაქცია არ დადასტურდა')
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
                  <button onClick={() => harvestRewards()} className='duration-150 hover:scale-95 bg-gradient-to-br from-violet to-violetDark px-5 py-2 rounded-lg text-white font-semibold text-sm'>აღება</button>
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