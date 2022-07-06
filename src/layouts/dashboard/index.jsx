import React, { useEffect, useState, useRef } from "react";
import MiniCard from "../../components/Cards/MiniCard"
import TrendingCoinsCard from "../../components/Cards/TrendingCoinsCard"
import ChainBalancesCard from "../../components/Cards/ChainBalancesCard"
import TokenBalancesCard from "../../components/Cards/TokenBalancesCard"
import TransactionsCard from "../../components/Cards/TransactionsCard"
import DeFiDataCard from "../../components/Cards/DeFiDataCard"

import ItemList from "../../components/Cards/TrendingCoinsCard/itemList";
import DeFiItemList from "../../components/Cards/DeFiDataCard/ItemList"

import { MdAccountBalanceWallet } from "react-icons/md"
import { GiToken } from "react-icons/gi"
import { FaImages } from "react-icons/fa"
import { SiBitcoinsv } from "react-icons/si"
import { getChainName, getNativeBalance, getBalancesOnSupportedChains } from "../../utils/WalletHelpers";
import { getTokenBalances, getNftBalances, getNativeTransactions } from "../../utils/APIs/MoralisAPI";
import { useWeb3React } from "@web3-react/core";
import { getSimpleCoinPrice, getCGTrendingCoins, getCGDeFiData } from "../../utils/APIs/CoinGeckoAPI";
import { getMostSearched } from "../../utils/APIs/CryptoRankAPI";
import { getCMCTrendingCoins } from "../../utils/APIs/CoinMarketCapAPI"

const Index = () => {
	const mountedRef = useRef(true);
	const { account, active, chainId } = useWeb3React()
	const [cmcTrending, setCMCTrending] = useState([]);
	const [cgTrending, setCgTrending] = useState([]);
	const [crTrending, setCrTrending] = useState([]);
	const [defiData, setDefiData] = useState([]);
	const [nativeBalances, setNativeBalances] = useState([])
	const [btcPrice, setBtcPrice] = useState(0);
	const [userNativeBalance, setUserNativeBalance] = useState()
	const [userTokens, setUserTokens] = useState([])
	const [userNFTs, setUserNFTs] = useState(0)
	const [userTXs, setUserTXs] = useState([])

	const getTrendingCoins = async () => {
		const getTrendingCMC = await getCMCTrendingCoins()
		setCMCTrending(getTrendingCMC)

		const getTrendingCG = await getCGTrendingCoins()
		setCgTrending(getTrendingCG)

		const getTrendingOnCR = await getMostSearched()
		setCrTrending(getTrendingOnCR)
	}

	const userData = async () => {
		const bal = await getBalancesOnSupportedChains(account)
		setNativeBalances(bal)

		const balance = await getNativeBalance(account)
		setUserNativeBalance(balance)

		const tokens = await getTokenBalances(account, (getChainName(chainId)).toLowerCase())
		setUserTokens(tokens)

		const nfts = await getNftBalances(account, (getChainName(chainId)).toLowerCase())
		setUserNFTs(nfts)

		const txs = await getNativeTransactions(account, (getChainName(chainId)).toLowerCase())
		setUserTXs(txs.result.sort((a, b) => a.block_number - b.block_number))
	}

	const fetchData = async () => {
		const btc = await getSimpleCoinPrice("bitcoin")
		setBtcPrice(btc)

		const defi = await getCGDeFiData()
		setDefiData(defi)
	}

	useEffect(() => {
		getTrendingCoins()
		fetchData()
		if (active) {
			userData()
		}
		return () => {
			mountedRef.current = false;
		};
		// eslint-disable-next-line
	}, [active]);

	const CoinsCMC = cmcTrending.map((x) => <ItemList key={x.id} name={x.name} img={`https://s2.coinmarketcap.com/static/img/coins/64x64/${x.id}.png`} symbol={x.symbol} price={x.priceChange.price.toLocaleString("en-US")} slug={x.slug} url="https://coinmarketcap.com/currencies/" />);
	const CoinsCG = cgTrending.map((x) => <ItemList key={x.item.coin_id} name={x.item.name} img={x.item.large} symbol={x.item.symbol} slug={x.item.slug} url="https://www.coingecko.com/en/coins/" />);
	const CoinsCR = crTrending.map((x) => <ItemList key={x.key} name={x.name} img={x.image.native} symbol={x.symbol} price={x.hasOwnProperty('price') ? (x.price.USD).toLocaleString("en-US") : ''} slug={x.key} url="https://cryptorank.io/price/" />);

	return (
		<div className='mt-5'>
			{active ? (
				<div>
					<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
						<MiniCard title="ბალანსი" data={`${Number(userNativeBalance).toFixed(4)}`} className="" icon={<MdAccountBalanceWallet className='text-white text-3xl' />} />
						<MiniCard title="ტოკენები" data={userTokens === 0 ? "0" : userTokens.length} className="" icon={<GiToken className='text-white text-3xl' />} />
						<MiniCard title="NFT" data={userNFTs === 0 ? "0" : userNFTs.total} className="" icon={<FaImages className='text-white text-2xl' />} />
						<MiniCard title="ბიტკოინის ფასი" data={`$${(btcPrice).toLocaleString("en-US")}`} className="" icon={<SiBitcoinsv className='text-white text-2xl' />} />
					</div>
					<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mt-4'>
						<ChainBalancesCard bscBalance={nativeBalances.bsc ? Number(nativeBalances.bsc.bal).toFixed(3) : "0"}
							ethBalance={nativeBalances.eth ? Number(nativeBalances.eth.bal).toFixed(3) : "0"}
							avaxBalance={nativeBalances.avax ? Number(nativeBalances.avax.bal).toFixed(3) : "0"}
							bscBalanceUSD={nativeBalances.bsc ? Number(nativeBalances.bsc.usd).toLocaleString("en-US") : "0"}
							ethBalanceUSD={nativeBalances.eth ? Number(nativeBalances.eth.usd).toLocaleString("en-US") : "0"}
							avaxBalanceUSD={nativeBalances.avax ? Number(nativeBalances.avax.usd).toLocaleString("en-US") : "0"} />
						<TokenBalancesCard data={userTokens} />
						<TransactionsCard data={userTXs} />
					</div>
				</div>
			) : null}
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mt-4'>
				<TrendingCoinsCard title="ტრენდული ქოინები CMC-ზე 🚀">
					{CoinsCMC}
				</TrendingCoinsCard>
				<TrendingCoinsCard title="ტრენდული ქოინები CryptoRank-ზე 🚀">
					{CoinsCR}
				</TrendingCoinsCard>
				<TrendingCoinsCard title="ტრენდული ქოინები CG-ზე 🚀">
					{CoinsCG}
				</TrendingCoinsCard>
				<DeFiDataCard title="DeFi-ის მონაცემები">
					<DeFiItemList name="DeFi-ს დომინირება" data={`${Number(defiData.defi_dominance).toLocaleString("en-US")}%`} />
					<DeFiItemList name="DeFi Cap:" data={`$${Number(defiData.defi_market_cap).toLocaleString("en-US")}`} />
					<DeFiItemList name="ETH Cap:" data={`$${Number(defiData.eth_market_cap).toLocaleString("en-US")}`} />
					<DeFiItemList name="DeFi-ს Top Coin:" data={(defiData.top_coin_name)} />
					<DeFiItemList name={`${(defiData.top_coin_name)}-ს დომინირება:`} data={`${Number(defiData.top_coin_defi_dominance).toLocaleString("en-US")}%`} />
					<DeFiItemList name="ნავაჭრი (24სთ):" data={`$${Number(defiData.trading_volume_24h).toLocaleString("en-US")}`} />
				</DeFiDataCard>
			</div>
		</div>
	)
}
export default Index