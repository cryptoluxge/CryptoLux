import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Index = ({ title, variant, children, ...rest }) => {
  const [cardOpen, setCardOpen] = useState(false)

  return (
    <div className='bg-[#fff] dark:bg-darkCard rounded-lg shadow-md dark:shadow-black'>
      <div {...rest}>
        <div className='flex items-center justify-between'>
          <p className='text-lightText dark:text-darkText font-bold'>{title}</p>
          {variant === 'collapsible' ? (
            <div>
              {cardOpen ? <IoIosArrowUp onClick={() => setCardOpen(!cardOpen)} className='cursor-pointer text-lightText dark:text-darkText' /> : <IoIosArrowDown onClick={() => setCardOpen(!cardOpen)} className='cursor-pointer text-lightText dark:text-darkText' />}
            </div>
          ) : null}
        </div>
        {variant === 'collapsible' ? (
          <div>
            {cardOpen ? (
              <div className='border border-lightText dark:border-darkText opacity-10 mt-1'></div>
            ) : null}
          </div>
        ) : null}
        {variant === 'collapsible' ? (
          <div>
            {cardOpen ? (
              <div>
                {children}
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default Index