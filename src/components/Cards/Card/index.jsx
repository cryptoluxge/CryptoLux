import React from 'react'

const index = ({ children, ...rest }) => {
  return (
    <div className='bg-[#fff] dark:bg-darkCard rounded-lg shadow-md dark:shadow-black'>
      <div {...rest}>
        {children}
      </div>
    </div>
  )
}

export default index