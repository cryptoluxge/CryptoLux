import React, { useEffect } from 'react'
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md"

const Index = () => {
  const darkModeSet = localStorage.getItem("darkMode")

  function setDarkMode() {
    const darkModeSet = localStorage.getItem("darkMode")
    if (darkModeSet === null) {
      localStorage.setItem("darkMode", "dark")
      document.documentElement.classList.add('dark')
    } else if (darkModeSet === "light") {
      localStorage.setItem("darkMode", "dark")
      document.documentElement.classList.add('dark')
    } else if (darkModeSet === "dark") {
      localStorage.setItem("darkMode", "light")
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    setDarkMode()
    // eslint-disable-next-line
  }, [])


  return (
    <div>
      <div onClick={() => setDarkMode()} className="duration-150 hover:scale-105 ml-2 bg-gradient-to-br from-violet to-violetDark bg-pos-0 hover:bg-pos-100 p-2 rounded-lg cursor-pointer">
        {darkModeSet === "light" ? <MdOutlineDarkMode className='text-2xl text-white' /> : <MdDarkMode className='text-2xl text-white' />}
      </div>
    </div>
  )
}

export default Index