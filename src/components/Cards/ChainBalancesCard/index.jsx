import React from 'react'
import ItemList from './itemList';
import Card from "../Card"

import BNBLogo from "../../../images/Blockchains/Binance.svg"
import ETHLogo from "../../../images/Blockchains/Ethereum.svg"
import AVAXLogo from "../../../images/Blockchains/Avalanche.svg"

const index = ({ bscBalance, ethBalance, avaxBalance, bscBalanceUSD, ethBalanceUSD, avaxBalanceUSD }) => {
	return (
		<Card className="p-3">
			<div>
				<p className='text-lightText dark:text-darkText font-semibold'>ბალანსი სხვა ქსელებზე</p>
			</div>
			<ItemList logo={BNBLogo} color="warning" name="BSC" balance={bscBalance} balanceUSD={bscBalanceUSD} />
			<ItemList logo={ETHLogo} color="info" name="ETH" balance={ethBalance} balanceUSD={ethBalanceUSD} />
			<ItemList logo={AVAXLogo} color="error" name="AVAX" balance={avaxBalance} balanceUSD={avaxBalanceUSD} />
		</Card>
	)
}

export default index