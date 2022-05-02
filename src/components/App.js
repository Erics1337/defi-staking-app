import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'

function App() {
	// To use async functions inside useEffect, we need to defne them inside
	// Or if you need to have async function outside useEffect, wrap it in useCallback and cal it in the useEffect function and add it to dependency array
	// Simple Rule: If any variable is used inside the hook but is defined outside of it, then it should go in the dependency array. That goes both for simple variables as well as for functions.
	useEffect(() => {
		const loadWeb3 = async () => {
			if (window.ethereum) {
				window.web3 = new Web3(window.ethereum)
				await window.ethereum.enable()
			} else if (window.web3) {
				window.web3 = new Web3(window.web3.currentProvider)
			} else {
				window.alert(
					'Non-Ethereum browser detected. You should consider trying MetaMask!'
				)
			}
		}

		const loadBlockchainData = async () => {
			const web3 = window.web3
			const accounts = await web3.eth.getAccounts()
			console.log(accounts)
		}

		loadWeb3().catch(console.error)
		loadBlockchainData().catch(console.error)
	}, [])

	const [account, setAccount] = useState('0x0')

	return (
		<div>
			<Navbar account={account} />
		</div>
	)
}

export default App
