import React, { useEffect, useState, useRef } from "react";
import MiniCard from "../../components/Cards/MiniCard"
import Card from "../../components/Cards/Card"
import { getGlobalData, getTopCoins } from "../../utils/APIs/CoinGeckoAPI"
import { AiFillDollarCircle } from "react-icons/ai"
import { BsFillBarChartFill } from "react-icons/bs"
import BTCLogo from "../../images/Crypto/Bitcoin.svg"
import ETHLogo from "../../images/Crypto/Ethereum.svg"

const Index = () => {
  const mountedRef = useRef(true);
  const [data, setData] = useState([])
  const [coins, setCoins] = useState([])

  async function getMarketData() {
    const global = await getGlobalData();
    const top = await getTopCoins();
    setData(global.data.data);
    setCoins(top.data);
  }

  useEffect(() => {
    getMarketData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className='mt-5'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
        {data.length === 0 ? null : <MiniCard title="კაპიტალიზაცია" data={`$${Number(data.total_market_cap.usd).toLocaleString("en-US")}`} className="" icon={<AiFillDollarCircle className='text-white text-3xl' />} />}
        {data.length === 0 ? null : <MiniCard title="ნავაჭრი (24სთ)" data={`$${Number(data.total_volume.usd).toLocaleString("en-US")}`} className="" icon={<BsFillBarChartFill className='text-white text-3xl' />} />}
        {data.length === 0 ? null : <MiniCard title="BTC დომინირება" data={`${Number(data.market_cap_percentage.btc).toFixed(2)}%`} className="" icon={<img src={BTCLogo} alt='BTC' className='text-white w-5' />} />}
        {data.length === 0 ? null : <MiniCard title="ETH დომინირება" data={`${Number(data.market_cap_percentage.eth).toFixed(2)}%`} className="" icon={<img src={ETHLogo} alt='ETH' className='text-white w-5' />} />}
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
                <tr className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-darkBackground w-full text-lightText dark:text-darkText">
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