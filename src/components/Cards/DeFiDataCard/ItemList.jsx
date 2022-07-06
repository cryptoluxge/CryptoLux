import React from 'react'

const ItemList = ({ name, data }) => {

  return (
    <div>
      <div className="flex items-center justify-between py-2 duration-150 hover:bg-indigo-200 dark:hover:bg-darkBackground rounded-lg p-3">
        <p className="text-lightText dark:text-darkText">{name}</p>
        <p className="text-lightText dark:text-darkText">{data}</p>
      </div>
      <div className='border-[1px] border-gray-200 dark:border-gray-500 mt-1 mb-1'></div>
    </div>
  )
}

export default ItemList