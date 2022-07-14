import React, { useState, useEffect } from 'react'
import ConnectButton from '../../../ConnectWallet/ConnectButton'
import WrongNetwork from '../../../ConnectWallet/WrongNetwork'
import WithdrawButton from './WithdrawButton'
import DepositButton from './DepositButton'
import ApproveButton from './ApproveButtons'
import { getUserSyrupPoolData } from '../../../../utils/BNBChain/PancakeSwapHelpers/Helpers'
import { useWeb3React } from '@web3-react/core'

const Buttons = ({ name, poolContract }) => {
  const { account, active, chainId } = useWeb3React()
  const [approved, setApproved] = useState()

  const getData = async () => {
    const userData = await getUserSyrupPoolData(poolContract, account)
    setApproved(userData.isApproved)
  }

  useEffect(() => {
    if (active === true) {
      getData()
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
                <div className='flex items-center space-x-2'>
                  <WithdrawButton poolContract={poolContract} name={name} />
                  <DepositButton name={name} poolContract={poolContract} />
                </div>
              ) : (
                <ApproveButton poolContract={poolContract} />
              )}
            </div>
          ) : (
            <WrongNetwork text='გადართე BSC ქსელზე' changeTo='BSC' />
          )}
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  )
}

export default Buttons