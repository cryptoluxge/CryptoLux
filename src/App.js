import React, { useEffect } from 'react';
import Sidenav from "./components/SideNav"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from "./layouts/dashboard"
import Chains from "./layouts/chains"
import Appliactions from "./layouts/appliactions"
import Groups from "./layouts/groups"
import Market from "./layouts/market"
import CRFund from "./layouts/cryptorank/fund"
import VCPage from './layouts/cryptorank/fund/VCPage';
import IFOPage from './layouts/pancakeswap/IFO'
import Staking from './layouts/pancakeswap/Staking'
import Wallet from './layouts/wallet'
import CardanoWallet from './layouts/cardano/wallet'

function App() {

  useEffect(() => {
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
  }, [])

  return (
    <div className="p-3 duration-200 min-h-screen bg-lightBackground dark:bg-darkBackground">
      <BrowserRouter>
        <Sidenav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chains" element={<Chains />} />
            <Route path="/applications" element={<Appliactions />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/market" element={<Market />} />
            <Route path="/cryptorank/fund" element={<CRFund />} />
            <Route path="/cryptorank/fund/:id" element={<VCPage />} />
            <Route path="/pancakeswap/ifo" element={<IFOPage />} />
            <Route path="/pancakeswap/staking" element={<Staking />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/cardano/wallet" element={<CardanoWallet />} />
          </Routes>
        </Sidenav>
      </BrowserRouter>
    </div>
  );
}

export default App;
