import React, { useState } from 'react'
import { getWallet } from '../../../utils/APIs/CardanoAPI'
import Card from '../../../components/Cards/Card'
import MiniCard from "../../../components/Cards/MiniCard"
import { MdAccountBalanceWallet, MdSwapHorizontalCircle } from 'react-icons/md'
import { BsPiggyBankFill } from 'react-icons/bs'
import { GiToken } from 'react-icons/gi'
import NotFound from '../../../components/NFT/NotFound'

const Index = () => {
  const [walletData, setWalletData] = useState([])
  const [walletNFTs, setWalletNFTs] = useState([])
  const [walletTokens, setWalletTokens] = useState([])

  const getWalletData = async () => {
    setWalletData(walletData => [])
    const address = document.getElementById('walletAddress').value
    if (address === '') {
      console.log('ცარიელია')
    } else {
      const data = await getWallet(address)
      console.log(data)
      if (data === 'invalid address') {
        console.log('invalid address')
      } else if (data === 'no balance') {
        console.log('ცარიელია')
      } else if (data === 'try again') {
        console.log('try again')
      } else {
        console.log(data.data)
        setWalletData(data.data)

        const nfts = []
        data.data.tokens.forEach(x => { !x.hasOwnProperty('decimals') && nfts.push(x) })
        setWalletNFTs(nfts)

        const tokens = []
        data.data.tokens.forEach(x => { x.hasOwnProperty('decimals') && tokens.push(x) })
        setWalletTokens(tokens)
      }
    }
  }

  const ipfsToUrl = (tokenURI) => {
    if (String(tokenURI).startsWith("ipfs://")) {
      const url = tokenURI.replace("ipfs://", "https://infura-ipfs.io/ipfs/");
      return url
    } else {
      return tokenURI
    }
  }

  const nft =
    (walletNFTs.length > 0 ? (
      <div className='w-full px-1'>
        <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mt-6'>
          {walletNFTs.map((x) => (
            <div key={x.name}>
              <div className='flex flex-col items-center'>
                {x.hasOwnProperty('metadata') ? (
                  <img src={ipfsToUrl(x.metadata.image)} alt={x.name} className='w-[140px] h-[150px] rounded-lg' />
                ) : <NotFound />}
                <p className='text-lightText dark:text-darkText mt-2'>{x.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : null)

  const tokens =
    (walletTokens.length > 0 ? (
      <div className='w-full px-1'>
        <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 w-full mt-6'>
          {walletTokens.map((x) => (
            <div key={x.fingerprint} className=''>
              <Card key={x.name} className='p-2'>
                <div className='flex items-center gap-2'>
                  <div>
                    <img src={x.metadata ? ipfsToUrl(x.metadata.image) : 'https://www.meme-arsenal.com/memes/d8b908c80e97d7a695e108830806a835.jpg'} alt={x.name} className='w-[42px] h-[42px] rounded-full' />
                  </div>
                  <div>
                    <p className='text-lightText dark:text-darkText'>{x.name}</p>
                    <p className='text-lightText dark:text-darkText'>{Number(Number(x.quantity) / 10 ** Number(x.decimals)).toLocaleString('en-US')}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    ) : null)

  return (
    <div>
      <div className='flex justify-center mt-3'>
        <div className='w-[500px]'>
          <Card className='p-3'>
            <div>
              <p className='text-lightText dark:text-darkText font-semibold'>Cardano-ს საფულის შემოწმება</p>
            </div>
            <div className='mt-2'>
              <input className='bg-indigo-100 dark:bg-zinc-900 rounded-lg p-2 w-full text-lightText dark:text-darkText focus:border-2 focus:outline-none focus:border-indigo-700  placeholder:text-lightText' type="text" name="cardanoWallet" id="walletAddress" placeholder='შეიყვანეთ საფულის მისამართი' />
            </div>
            <div className='mt-3'>
              <button onClick={() => getWalletData()} className='bg-gradient-to-br from-violet to-violetDark text-white px-5 py-2 rounded-lg w-full duration-150 ease-in-out hover:scale-95'>შემოწმება</button>
            </div>
          </Card>
        </div>
      </div>
      <div>
        {Object.keys(walletData).length > 0 ? (
          <div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mt-6'>
              <MiniCard title='ბალანსი' data={`${Number(Number(walletData.lovelaces) / 10 ** 6).toLocaleString('en-US')} ADA`} icon={<MdAccountBalanceWallet className='text-white text-4xl' />} />
              <MiniCard title='სტეიკზეა' data={walletData.pool ? "კი" : "არა"} icon={<BsPiggyBankFill className='text-white text-4xl' />} />
              <MiniCard title='UTXOs' data={walletData.utxos} icon={<MdSwapHorizontalCircle className='text-white text-4xl' />} />
              <MiniCard title='ტოკენები & NFT' data={walletData.tokens.length > 0 ? walletData.tokens.length : "0"} icon={<GiToken className='text-white text-4xl' />} />
            </div>
            <div>
              <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-6'>
                <div>
                  <Card className='p-3'>
                    <div className='flex justify-center'>
                      <p className='text-lightText dark:text-darkText'>ტოკენების ბალანსი</p>
                    </div>
                    <div className='overflow-y-auto h-[500px]'>
                      {tokens}
                    </div>
                  </Card>
                </div>
                <div>
                  <Card title='NFT ბალანსი' className='p-3'>
                    <div className='overflow-y-auto h-[500px]'>
                      {nft}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Index