import React from 'react'
import MetamaskIcon from '../../images/WalletIcons/MetamaskIcon.svg'
import { useToast } from '../../hooks/useToast'

const Index = ({ variant, address, symbol, decimal }) => {
  const toast = useToast()
  if (symbol.length > 11) {
    symbol = symbol.slice(0, 11)
  }
  const addToken = async () => {
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: address,
            symbol: symbol,
            decimals: Number(decimal),
          },
        },
      })
      .then((success) => {
        if (success) {
          toast('success', `${symbol} დაემატა Metamask-ში`)
        } else {
          toast('error', 'Something went wrong')
        }
      })
      .catch((error) => {
        toast('error', error.message)
      });
  }

  return (
    <div>
      {variant === 'text' ? (
        <div onClick={() => addToken()} className='inline-flex items-center gap-2 cursor-pointer duration-200 hover:underline'>
          <p className='text-lightText dark:text-darkText'>მეტამასკში დამატება</p>
          <div>
            <img src={MetamaskIcon} alt="metamask" className='w-5' />
          </div>
        </div>
      ) : (
        <div onClick={() => addToken()} className='px-3 py-2 bg-violet-800 rounded-lg inline-flex items-center gap-2 cursor-pointer duration-200 hover:bg-violet-900'>
          <p className='text-lightText dark:text-darkText'>მეტამასკში დამატება</p>
          <div>
            <img src={MetamaskIcon} alt="metamask" className='w-5' />
          </div>
        </div>
      )}
    </div>
  )
}

export default Index