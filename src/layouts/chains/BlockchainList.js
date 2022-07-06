import BNBLogo from "../../images/Blockchains/Binance.svg"
import AvaxLogo from "../../images/Blockchains/Avalanche.svg"
import FantomLogo from "../../images/Blockchains/Fantom.svg"
import MaticLogo from "../../images/Blockchains/Matic.svg"
import ArbitrumLogo from "../../images/Blockchains/Arbitrum.svg"
import OptimisticLogo from "../../images/Blockchains/Optimistic.svg"
import HarmonyLogo from "../../images/Blockchains/Harmony.svg"
import OKBLogo from "../../images/Blockchains/OKB.svg"
import CronosLogo from "../../images/Blockchains/Cronos.svg"
import HuobiLogo from "../../images/Blockchains/Huobi.svg"
import VelasLogo from "../../images/Blockchains/Velas.svg"

import { BNBChain, AvalancheChain, FantomChain, OKEXChain, PolygonChain, HecoChain, HarmonyChain, ArbitrumChain, OptimisticETHChain, VelasChain, CronosChain } from "../../utils/Networks"

export const networks = [
    {
        id: "BSC",
        name: "Smart Chain",
        logo: BNBLogo,
        rpc: "https://bsc-dataseed.binance.org",
        chainId: 56,
        symbol: "BNB",
        explorer: "https://bscscan.com/",
        action: (
            <button onClick={() => BNBChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "AVAX",
        name: "Avalanche C-Chain",
        logo: AvaxLogo,
        rpc: "https://api.avax.network/ext/bc/C/rpc",
        chainId: 43114,
        symbol: "AVAX",
        explorer: "https://cchain.explorer.avax.network/",
        action: (
            <button onClick={() => AvalancheChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "FANTOM",
        name: "Fantom",
        logo: FantomLogo,
        rpc: "https://rpc.ftm.tools/",
        chainId: 250,
        symbol: "FTM",
        explorer: "https://ftmscan.com/",
        action: (
            <button onClick={() => FantomChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "MATIC",
        name: "Polygon",
        logo: MaticLogo,
        rpc: "https://rpc-mainnet.maticvigil.com",
        chainId: 137,
        symbol: "MATIC",
        explorer: "https://polygonscan.com/",
        action: (
            <button onClick={() => PolygonChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "CRONOS",
        name: "Cronos",
        logo: CronosLogo,
        rpc: "https://evm-cronos.crypto.org/",
        chainId: 25,
        symbol: "CRO",
        explorer: "https://cronoscan.com",
        action: (
            <button onClick={() => CronosChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "ARBITRUM",
        name: "Arbitrum",
        logo: ArbitrumLogo,
        rpc: "https://arb1.arbitrum.io/rpc",
        chainId: 42161,
        symbol: "ETH",
        explorer: "https://arbiscan.io/",
        action: (
            <button onClick={() => ArbitrumChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )

    },
    {
        id: "OPTIMISM",
        name: "Optimism",
        logo: OptimisticLogo,
        rpc: "https://mainnet.optimism.io/",
        chainId: 10,
        symbol: "ETH",
        explorer: "https://optimistic.etherscan.io/",
        action: (
            <button onClick={() => OptimisticETHChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "Harmony",
        name: "Harmony",
        logo: HarmonyLogo,
        rpc: "https://api.harmony.one",
        chainId: 1666600000,
        symbol: "ONE",
        explorer: "https://explorer.harmony.one/",
        action: (
            <button onClick={() => HarmonyChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "OKB",
        name: "OKB",
        logo: OKBLogo,
        rpc: "https://exchainrpc.okex.org",
        chainId: 66,
        symbol: "OKT",
        explorer: "https://www.oklink.com/okexchain/",
        action: (
            <button onClick={() => OKEXChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
    {
        id: "Heco",
        name: "HECO",
        logo: HuobiLogo,
        rpc: "https://http-mainnet.hecochain.com",
        chainId: 128,
        symbol: "HT",
        explorer: "https://hecoinfo.com/",
        action: (
            <button onClick={() => HecoChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },

    {
        id: "Velas",
        name: "Velas",
        logo: VelasLogo,
        rpc: "https://evmexplorer.velas.com/rpc",
        chainId: 106,
        symbol: "VLX",
        explorer: "https://evmexplorer.velas.com",
        action: (
            <button onClick={() => VelasChain()} className='w-full h-full py-[6px] bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-105 hover:bg-transparent text-sm font-semibold'>დამატება</button>
        )
    },
];