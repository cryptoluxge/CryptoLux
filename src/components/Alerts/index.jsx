import React from 'react'
import { AiFillCheckCircle, AiFillWarning, AiFillCloseCircle } from 'react-icons/ai'
import { MdInfo } from 'react-icons/md'

const index = ({ variant, text }) => {
  return (
    <div>
      {variant === 'info' ? (
        <div className="flex p-3 text-sm bg-teal-100 rounded-lg border-[1px] border-teal-500 shadow-md mt-3" role="alert">
          <MdInfo className='text-teal-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className="sr-only">Info</span>
          <div>
            <p className='text-lightText text-sm w-full font-semibold'>{text}</p>
          </div>
        </div>
      ) : null}
      {variant === 'success' ? (
        <div className="flex p-3 text-sm bg-green-200 rounded-lg border-[1px] border-green-500 shadow-md mt-3" role="alert">
          <AiFillCheckCircle className='text-green-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className="sr-only">success</span>
          <div>
            <p className='text-lightText text-sm w-full font-semibold'>{text}</p>
          </div>
        </div>
      ) : null}
      {variant === 'warning' ? (
        <div className="flex p-3 text-sm bg-yellow-200 rounded-lg border-[1px] border-yellow-500 shadow-md mt-3" role="alert">
          <AiFillWarning className='text-yellow-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className="sr-only">warning</span>
          <div>
            <p className='text-lightText text-sm w-full font-semibold'>{text}</p>
          </div>
        </div>
      ) : null}
      {variant === 'error' ? (
        <div className="flex p-3 text-sm bg-red-200 rounded-lg border-[1px] border-red-300 shadow-md mt-3" role="alert">
          <AiFillCloseCircle className='text-red-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className="sr-only">error</span>
          <div>
            <p className='text-lightText text-sm w-full font-semibold'>{text}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default index