import React, { useEffect, useState } from 'react'
import { getVCsData } from '../../../utils/APIs/CryptoRankAPI'
import { NavLink } from 'react-router-dom';
import { nFormatter } from '../../../utils/NumberFormatter';

const Index = () => {
  const [data, setData] = useState([])

  async function getData() {
    const vcData = await getVCsData()
    setData(vcData.sort((a, b) => a.tier - b.tier))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='flex flex-col text-center'>
      <div className='mt-5'>
        <p className='text-lightText dark:text-darkText text-md font-bold'>ინვესტორები და მათი პორტფოლიო</p>
      </div>
      <div className='flex justify-center'>
        {data.length > 0 ? (
          <div className="overflow-x-auto mt-3 rounded-lg">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-darkCard dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ინვესტორი
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ტიპი
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ცვლილება (24სთ)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    კაპიტალიზაცია
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ნავაჭრი
                  </th>
                  <th scope="col" className="px-6 py-3">
                    დომინირება
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((x) => (
                    <tr key={x.slug} className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-darkBackground w-full">
                      <td className="flex items-center gap-2 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <img src={x.images ? x.images.native : 'https://pbs.twimg.com/media/B5ZmXEZIUAAjj10.jpg'} alt={x.name} className="w-8 rounded-full" />
                        <NavLink to={x.slug}>
                          {x.name}
                        </NavLink>
                      </td>
                      <td className="px-6 py-4">
                        {x.tier}
                      </td>
                      <td className={`px-6 py-4 ${(Number(x.avgPriceChange["24H"]) > 0 ? "text-green-500" : "text-red-500")}`}>
                        {x.avgPriceChange["24H"]}%
                      </td>
                      <td className="px-6 py-4">
                        ${nFormatter(x.marketCap)}
                      </td>
                      <td className="px-6 py-4">
                        ${nFormatter(x.volume24h)}
                      </td>
                      <td className="px-6 py-4">
                        {(x.dominance).toLocaleString("en-US")}%
                      </td>
                    </tr>
                  ))
                ) : null}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>

  )
}

export default Index