import React from 'react'

import PropTypes from 'prop-types';

const itemList = ({ logo, name, balance, balanceUSD }) => {
	return (
		<div className='mt-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<div className={`w-[35px] h-[35px] bg-gradient-to-br from-violet to-violetDark rounded-lg flex justify-center`}>
						<img src={logo} alt={name} className={`${name === "ETH" ? "w-4" : "w-5"}`} />
					</div>
					<h1 className='text-lightText dark:text-darkText font-bold'>{name} - {balance}</h1>
				</div>
				<div>
					<h1 className='text-lightText dark:text-darkText font-bold'>${balanceUSD}</h1>
				</div>
			</div>
			<div className='border-[1px] border-gray-200 dark:border-gray-500 rounded-full mt-4'></div>
		</div>
	)
}

itemList.defaultProps = {
	logo: "",
	name: "",
	balance: "",
	balanceUSD: "",
};

itemList.propTypes = {
	logo: PropTypes.string,
	name: PropTypes.string,
	balance: PropTypes.string,
	balanceUSD: PropTypes.string,
};

export default itemList