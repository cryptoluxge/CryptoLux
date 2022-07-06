import React from 'react'

const itemList = ({ img, name, symbol, price, slug, url }) => {
	return (
		<div className='duration-150 hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-2 hover:text-white'>
			<a href={`${url}${slug}`} target="_blank" rel="noreferrer">
				<div className='flex items-center justify-between space-x-2'>
					<div className='flex items-center space-x-2'>
						<img src={img} alt="a" className='w-8 rounded-lg' />
						<p className='text-lightText dark:text-darkText text-sm'>{name} ({symbol})</p>
					</div>
					{price ? (
						<div className=''>
							<p className='text-lightText dark:text-darkText text-sm'>${price}</p>
						</div>
					) : null}
				</div>
			</a>
		</div>
	)
}

export default itemList