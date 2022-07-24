import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getVCData, getVCInvestments } from '../../../utils/APIs/CryptoRankAPI'
import { nFormatter } from '../../../utils/NumberFormatter'
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"

const VCPage = () => {
  const [vcData, setVcData] = useState([])
  const [vcInvestment, setVcInvestment] = useState([])
  const [vcInvestmentCategories, setVcInvestmentCategories] = useState([])
  const [openInvestment, setOpenInvestment] = useState(false)
  const params = useParams()

  async function getInvestorData() {
    const getData = await getVCData(params.id)
    setVcData(getData)
    const getVcInvestment = await getVCInvestments(getData.id)
    setVcInvestment(getVcInvestment)
    setVcInvestmentCategories(getData.categoriesDistribution.sort((a, b) => b.percentage - a.percentage))
  }

  useEffect(() => {
    getInvestorData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col md:flex-row gap-2 justify-center mt-5'>
      <div>
        {vcInvestment.length > 0 ? (
          <div className='flex justify-center p-3 bg-white dark:bg-darkCard rounded-lg'>
            <div>
              <div className='flex items-center gap-2'>
                <img src={vcData.images ? vcData.images["x150"] : 'https://pbs.twimg.com/media/B5ZmXEZIUAAjj10.jpg'} alt={vcData.name} className="w-14" />
                <p className='text-lightText dark:text-darkText text-2xl'>{vcData.name}</p>
              </div>
              <div className='flex mt-3 gap-2'>
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-br from-violet to-violetDark rounded">Tier {vcData.tier}</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-br from-violet to-violetDark rounded">{vcData.category.name}</span>
              </div>
              <div className='mt-2 w-[300px]'>
                <p className='text-lightText dark:text-darkText'>{vcData.shortDescription}</p>
              </div>
              <div onClick={() => setOpenInvestment(!openInvestment)} className='cursor-pointer bg-gradient-to-br from-violet to-violetDark rounded px-2 py-1 flex justify-between items-center gap-2 mt-2'>
                <p className='text-white text-sm font-semibold'>გაკეთებული ინვესტიციები - {vcInvestment.length}</p>
                <div>
                  {openInvestment ? <IoIosArrowUp className='text-gray-900 dark:text-white cursor-pointer' /> : <IoIosArrowDown className='text-grey-900 dark:text-white mt-1 cursor-pointer' />}
                </div>
              </div>
              {openInvestment ? (
                <div className='mt-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2 w-full'>
                  {vcInvestmentCategories.map((x) => (
                    <span key={x.name} className="inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium text-white bg-gradient-to-br from-violet to-violetDark rounded">{x.name} ({x.count}) - {(x.percentage).toLocaleString("en-US")}%</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {vcInvestment.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-darkCard dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    სახელი
                  </th>
                  <th scope="col" className="px-6 py-3">
                    კატეგორია
                  </th>
                  <th scope="col" className="px-6 py-3">
                    კაპიტალიზაცია
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ნავაჭრი (24სთ)
                  </th>
                </tr>
              </thead>
              <tbody>
                {vcInvestment.map((x) => (
                  <tr key={x.key} className="bg-white dark:bg-darkCard hover:bg-indigo-100 dark:hover:bg-darkBackground w-full">
                    <td className="flex items-center gap-2 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <img src={x.image["x150"]} alt={x.name} className="w-8" />
                      <a href={`https://cryptorank.io/price/${x.key}`} target='_blank' rel='noreferrer'>{x.symbol}</a>
                    </td>
                    <td className="px-6 py-4">
                      {x.category}
                    </td>
                    <td className="px-6 py-4">
                      ${nFormatter(x.marketCap)}
                    </td>
                    <td className="px-6 py-4">
                      ${nFormatter(x.volume24h)}
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default VCPage