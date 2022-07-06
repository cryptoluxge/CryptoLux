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
    <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3">
      <table className="w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs shadow-md text-gray-700 uppercase bg-white dark:bg-darkCard dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">

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
                  <img src={x.images.x150} alt={x.name} className="w-8" />
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
  )
}

export default Index