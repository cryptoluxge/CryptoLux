import React, { useEffect, useState, useRef } from "react";
import Card from '../../components/Cards/Card'
import MiniCard from "../../components/Cards/MiniCard"
import { getGlobalData, getTopCoins } from "../../utils/APIs/CoinGeckoAPI"
import { AiFillDollarCircle } from "react-icons/ai"
import { BsFillBarChartFill } from "react-icons/bs"
import { getCGTrendingCoins, getCGDeFiData } from "../../utils/APIs/CoinGeckoAPI";
import { getMostSearched, getTopGainers, getTopLosers, getNewATH, getNewATL } from "../../utils/APIs/CryptoRankAPI";
import { getCMCTrendingCoins } from "../../utils/APIs/CoinMarketCapAPI"
import TrendingCoinsCard from "../../components/Cards/TrendingCoinsCard"
import DeFiDataCard from "../../components/Cards/DeFiDataCard"
import DeFiItemList from "../../components/Cards/DeFiDataCard/ItemList"
import ItemList from "../../components/Cards/TrendingCoinsCard/itemList"
import BTCLogo from "../../images/Crypto/Bitcoin.svg"
import ETHLogo from "../../images/Crypto/Ethereum.svg"

const Index = () => {
  const mountedRef = useRef(true);
  const [data, setData] = useState([])
  const [coins, setCoins] = useState([])
  const [cmcTrending, setCMCTrending] = useState([]);
  const [cgTrending, setCgTrending] = useState([]);
  const [crTrending, setCrTrending] = useState([]);
  const [defiData, setDefiData] = useState([]);
  const [gainers, setGainers] = useState([])
  const [losers, setLosers] = useState([])
  const [ath, setAths] = useState([])
  const [atl, setAtls] = useState([])

  async function getMarketData() {
    const global = await getGlobalData();
    const top = await getTopCoins();
    setData(global.data.data);
    setCoins(top.data);

    const getTrendingCMC = await getCMCTrendingCoins()
    setCMCTrending(getTrendingCMC)

    const getTrendingCG = await getCGTrendingCoins()
    setCgTrending(getTrendingCG)

    const getTrendingOnCR = await getMostSearched()
    setCrTrending(getTrendingOnCR)

    const defi = await getCGDeFiData()
    setDefiData(defi)

    const getGainers = await getTopGainers(10)
    setGainers(getGainers)

    const getLosers = await getTopLosers(10)
    setLosers(getLosers)

    const getaths = await getNewATH(10)
    setAths(getaths)

    const getatls = await getNewATL(10)
    setAtls(getatls)
  }

  useEffect(() => {
    getMarketData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const CoinsCMC = cmcTrending.map((x) => <ItemList key={x.id} name={x.name} img={`https://s2.coinmarketcap.com/static/img/coins/64x64/${x.id}.png`} symbol={x.symbol} price={x.priceChange.price.toLocaleString("en-US")} slug={x.slug} url="https://coinmarketcap.com/currencies/" />);
  const CoinsCG = cgTrending.map((x) => <ItemList key={x.item.coin_id} name={x.item.name} img={x.item.large} symbol={x.item.symbol} slug={x.item.slug} url="https://www.coingecko.com/en/coins/" />);
  const CoinsCR = crTrending.map((x) => <ItemList key={x.key} name={x.name} img={x.image.native} symbol={x.symbol} price={x.hasOwnProperty('price') ? (x.price.USD).toLocaleString("en-US") : ''} slug={x.key} url="https://cryptorank.io/price/" />);


  return (
    <div className='mt-5'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
        {data.length === 0 ? null : <MiniCard title="კაპიტალიზაცია" data={`$${Number(data.total_market_cap.usd).toLocaleString("en-US")}`} className="" icon={<AiFillDollarCircle className='text-white text-3xl' />} />}
        {data.length === 0 ? null : <MiniCard title="ნავაჭრი (24სთ)" data={`$${Number(data.total_volume.usd).toLocaleString("en-US")}`} className="" icon={<BsFillBarChartFill className='text-white text-3xl' />} />}
        {data.length === 0 ? null : <MiniCard title="BTC დომინირება" data={`${Number(data.market_cap_percentage.btc).toFixed(2)}%`} className="" icon={<img src={BTCLogo} alt='BTC' className='text-white w-5' />} />}
        {data.length === 0 ? null : <MiniCard title="ETH დომინირება" data={`${Number(data.market_cap_percentage.eth).toFixed(2)}%`} className="" icon={<img src={ETHLogo} alt='ETH' className='text-white w-5' />} />}
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mt-4'>
        <TrendingCoinsCard title="ტრენდული ქოინები CMC-ზე 🚀">
          {CoinsCMC}
        </TrendingCoinsCard>
        <TrendingCoinsCard title="ტრენდული ქოინები CryptoRank-ზე 🚀">
          {CoinsCR}
        </TrendingCoinsCard>
        <TrendingCoinsCard title="ტრენდული ქოინები CG-ზე 🚀">
          {CoinsCG}
        </TrendingCoinsCard>
        <DeFiDataCard title="DeFi-ის მონაცემები">
          <DeFiItemList name="DeFi-ს დომინირება" data={`${Number(defiData.defi_dominance).toLocaleString("en-US")}%`} />
          <DeFiItemList name="DeFi Cap:" data={`$${Number(defiData.defi_market_cap).toLocaleString("en-US")}`} />
          <DeFiItemList name="ETH Cap:" data={`$${Number(defiData.eth_market_cap).toLocaleString("en-US")}`} />
          <DeFiItemList name="DeFi-ს Top Coin:" data={(defiData.top_coin_name)} />
          <DeFiItemList name={`${(defiData.top_coin_name)}-ს დომინირება:`} data={`${Number(defiData.top_coin_defi_dominance).toLocaleString("en-US")}%`} />
          <DeFiItemList name="ნავაჭრი (24სთ):" data={`$${Number(defiData.trading_volume_24h).toLocaleString("en-US")}`} />
        </DeFiDataCard>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mt-4'>
        {gainers.length > 0 ? (
          <TrendingCoinsCard title="TOP GAINERS 🚀">
            {gainers.map((x) => (
              <div key={x.key} className='duration-150 hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-2'>
                <a href={`https://cryptorank.io/price/${x.key}`} target='_blank' rel="noreferrer" className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={x.image.native} alt={x.key} className='w-8' />
                    <p className="text-lightText dark:text-darkText">{x.name}</p>
                  </div>
                  <div>
                    <p className="text-lightText dark:text-darkText">${Number(x.price.USD).toLocaleString('en-US')}</p>
                  </div>
                </a>
              </div>
            ))}
          </TrendingCoinsCard>
        ) : null}
        {losers.length > 0 ? (
          <TrendingCoinsCard title="TOP LOSERS 🚀">
            {losers.map((x) => (
              <div key={x.key} className='duration-150 hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-2'>
                <a href={`https://cryptorank.io/price/${x.key}`} target='_blank' rel="noreferrer" className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={x.image.native} alt={x.key} className='w-8' />
                    <p className="text-lightText dark:text-darkText">{x.name}</p>
                  </div>
                  <div>
                    <p className="text-lightText dark:text-darkText">${Number(x.price.USD).toLocaleString('en-US')}</p>
                  </div>
                </a>
              </div>
            ))}
          </TrendingCoinsCard>
        ) : null}
        {ath.length > 0 ? (
          <TrendingCoinsCard title="NEW ATH 🚀">
            {ath.map((x) => (
              <div key={x.key} className='duration-150 hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-2'>
                <a href={`https://cryptorank.io/price/${x.key}`} target='_blank' rel="noreferrer" className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={x.image.native} alt={x.key} className='w-8' />
                    <p className="text-lightText dark:text-darkText">{x.name}</p>
                  </div>
                  <div>
                    <p className="text-lightText dark:text-darkText">${Number(x.price.USD).toLocaleString('en-US')}</p>
                  </div>
                </a>
              </div>
            ))}
          </TrendingCoinsCard>
        ) : null}
        {atl.length > 0 ? (
          <TrendingCoinsCard title="NEW ATH 🚀">
            {atl.map((x) => (
              <div key={x.key} className='duration-150 hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-2'>
                <a href={`https://cryptorank.io/price/${x.key}`} target='_blank' rel="noreferrer" className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={x.image.native} alt={x.key} className='w-8' />
                    <p className="text-lightText dark:text-darkText">{x.name}</p>
                  </div>
                  <div>
                    <p className="text-lightText dark:text-darkText">${Number(x.price.USD).toLocaleString('en-US')}</p>
                  </div>
                </a>
              </div>
            ))}
          </TrendingCoinsCard>
        ) : null}
      </div>
      <Card className="mt-5">
        <div className="overflow-x-auto shadow-md mt-3">
          <table className="w-full text-sm mt-2 text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-darkCard text-lightText dark:text-darkText">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  სახელი
                </th>
                <th scope="col" className="px-6 py-3">
                  ფასი
                </th>
                <th scope="col" className="px-6 py-3">
                  ცვლილება
                </th>
                <th scope="col" className="px-6 py-3">
                  ნავაჭრი (24სთ)
                </th>
                <th scope="col" className="px-6 py-3">
                  კაპიტალიზაცია
                </th>
                <th scope="col" className="px-6 py-3">
                  ATH
                </th>
                <th scope="col" className="px-6 py-3">
                  ATHl
                </th>
              </tr>
            </thead>
            <tbody>
              {coins.map((x) => (
                <tr key={x.symbol} className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-darkBackground w-full text-lightText dark:text-darkText">
                  <td className="px-6 py-4 font-semibold">
                    {x.market_cap_rank}
                  </td>
                  <td className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap">
                    <img src={x.image} alt={x.name} className="w-8" />
                    <div>
                      <p className="font-semibold">{x.name}</p>
                      <p>{(x.symbol).toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${x.current_price.toLocaleString("en-US")}
                  </td>
                  <td className={`px-6 py-4 font-semibold ${Number(x.price_change_percentage_24h) > 0 ? "text-green-500" : "text-red-500"}`}>
                    {x.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${x.total_volume.toLocaleString("en-US")}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${x.market_cap.toLocaleString("en-US")}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${x.ath.toLocaleString("en-US")}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ${x.atl.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
export default Index