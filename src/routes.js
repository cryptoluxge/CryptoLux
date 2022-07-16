import HomeIcon from "./images/SidebarIcons/HomeIcon.svg"
import ChainIcon from "./images/SidebarIcons/BlockchainIcon.svg"
import AppsIcon from "./images/SidebarIcons/ApplicationIcon.svg"
import PeopleIcon from "./images/SidebarIcons/PeopleIcon.svg"
import MarketIcon from "./images/SidebarIcons/MarketIcon.svg"
import CryptoRankIcon from "./images/SidebarIcons/CryptoRankIcon.svg"
import PancakeSwapIcon from "./images/SidebarIcons/PancakeSwapIcon.svg"

export const menuItem = [
  {
    type: "noncollapsible",
    path: "/",
    key: "home",
    name: "მთავარი",
    icon: HomeIcon
  },
  {
    type: "noncollapsible",
    path: "/wallet",
    key: "wallet",
    name: "საფულე",
    icon: HomeIcon
  },
  {
    type: "noncollapsible",
    path: "/market",
    key: "market",
    name: "მარკეტი",
    icon: MarketIcon
  },
  {
    type: "noncollapsible",
    path: "/chains",
    key: "chains",
    name: "ქსელები",
    icon: ChainIcon
  },
  {
    type: "noncollapsible",
    path: "/applications",
    key: "applications",
    name: "აპლიკაციები",
    icon: AppsIcon
  },
  {
    type: "noncollapsible",
    path: "/groups",
    key: "groups",
    name: "Bots & Groups",
    icon: PeopleIcon
  },
  {
    type: "title",
    key: "title",
    name: "სხვა",
  },
  {
    type: "collapsible",
    path: "/cryptorank",
    key: "cryptorank",
    name: "CryptoRank",
    icon: CryptoRankIcon,
    collapse: [
      {
        name: "Funds",
        key: "fund",
        path: "/cryptorank/fund"
      },
    ]
  },
  {
    type: "collapsible",
    path: "/pancakeswap",
    key: "pancakeswap",
    name: "PancakeSwap",
    icon: PancakeSwapIcon,
    collapse: [
      {
        name: "IFO",
        key: "ifo",
        path: "/pancakeswap/ifo"
      },
      {
        name: "Staking",
        key: "staking",
        path: "/pancakeswap/staking"
      },
    ]
  },
]