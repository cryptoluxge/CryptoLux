import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"

//ჩამოსაშლელი მენიუს კომპონენტი
const SidenavItemCollapse = ({ icon, name, path, pathname, collapse }) => {
  const [collapsed, setIsCollapsed] = useState(false)
  const collapseName = pathname.split("/").slice(1)[0];
  const active = path === `/${collapseName}`
  const renderCollapse = collapse.map(({ name, key, path }) => {
    let returnValue;
    returnValue = (
      <NavLink key={key} exact="true" to={path}>
        <div className="duration-150 hover:bg-white dark:hover:bg-darkCard rounded-lg p-3 cursor-pointer">
          <p className={`text-lightText dark:text-darkText text-sm ${active ? "font-bold underline" : ""}`}>{name}</p>
        </div>
      </NavLink>

    )
    return returnValue
  })

  return (
    <div>
      <div className={`${active ? "bg-white dark:bg-darkCard shadow-lg" : ""} flex items-center justify-between cursor-pointer duration-150 hover:bg-white dark:hover:bg-darkCard w-full h-[50px] px-2 rounded-lg`} onClick={() => collapsed === name ? setIsCollapsed(false) : setIsCollapsed(name)} >
        <div className='flex items-center space-x-2'>
          <div className={`w-[28px] h-[28px] ${active ? "bg-gradient-to-br from-violet to-violetDark" : "bg-gray-400 dark:bg-darkCard"} rounded-md flex items-center justify-center shadow shadow-${active ? "primary" : null}`}>
            <img src={icon} alt={name} className='w-5' />
          </div>
          <h1 className={`${active ? "text-lightText dark:text-darkText" : "text-lightText dark:text-darkText"} text-sm font-semibold`}>{name}</h1>
        </div>
        {collapsed ? (<IoIosArrowUp className='text-primary dark:text-white' />) : (<IoIosArrowDown className='text-primary dark:text-white' />)}
      </div >
      {collapsed ? (
        <div className='mt-2'>{renderCollapse}</div>
      ) : null}
    </div>
  )
}

export default SidenavItemCollapse