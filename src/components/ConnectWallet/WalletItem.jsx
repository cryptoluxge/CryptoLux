import React from 'react'

const WalletItem = ({ name, icon }) => {
  return (
    <li>
      <a href="#/" className="flex items-center p-3 text-base font-bold bg-gray-300 dark:bg-darkCard rounded-lg duration-200 hover:bg-primary dark:hover:bg-neutral-800">
        <img src={icon} alt="" className='w-5' />
        <div className="flex-1 ml-3 text-lightText dark:text-darkText hover:text-white">{name}</div>
        {name === "Metamask" ? (<span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs text-white  font-medium bg-gradient-to-br from-violet to-violetDark rounded-md shadow shadow-dark">პოპულარული</span>) : null}
      </a>
    </li>
  )
}

export default WalletItem