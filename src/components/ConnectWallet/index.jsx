import React, { useRef, useEffect } from "react"
import DisconnectButton from "./DisconnectButton"
import ConnectButton from "./ConnectButton"
import { injected } from "./connectors";
import { useWeb3React } from '@web3-react/core'
import WrongNetwork from "./WrongNetwork";

export default function Modal() {
	const mountedRef = useRef(true);
	const { active, activate, chainId } = useWeb3React();
	const provider = window.ethereum;
	const isConnected = localStorage.getItem("isWalletConnected");

	useEffect(() => {

		const connectWalletOnPageLoad = async () => {
			if (localStorage?.getItem("isWalletConnected") === "true") {
				try {
					if (typeof provider !== "undefined") {
						await activate(injected);
						localStorage.setItem("isWalletConnected", true);
					} else {
						console.log("გთხოვთ დააყენოთ Metamask!");
					}
				} catch (ex) {
					console.log("error", ex);
				}
			}
		};

		connectWalletOnPageLoad();

		return () => {
			mountedRef.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{active === true || isConnected === "true" ? (
				<div>
					{chainId === 1 || chainId === 56 || chainId === 43114 ? <DisconnectButton /> : <WrongNetwork changeTo="BSC" text="არასწორი ქსელი" />}
				</div>
			) : (<ConnectButton />)}
		</div>
	);
}