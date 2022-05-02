import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'

function App() {
	const [account, setAccount] = useState('0x0')
	const [tether, setTether] = useState({})
	const [reward, setReward] = useState({})
	const [decentralBank] = useState({})
	const [tetherBalance, setTetherBalance] = useState('0')
	const [rewardBalance, setRewardBalance] = useState('0')
	const [stakingBalance, setStakingBalance] = useState('0')
	const [loading, setLoading] = useState(true)

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
			setAccount(accounts[0])
			const networkId = await web3.eth.net.getId()
			console.log('Network ID: ', networkId)

			// Load Tether Contract
			const tetherData = Tether.networks[networkId]
			if (tetherData) {
				// Get contract abi json and contract address
				const tether = new web3.eth.Contract(
					Tether.abi,
					tetherData.address
				)
				setTether(tether)
				// Must use call() b/c its a callback
				let tetherBalance = await tether.methods
					.balanceOf(accounts[0])
					.call()
				setTetherBalance(tetherBalance.toString())
				console.log('Tether Balance: ', tetherBalance)
			} else {
				window.alert(
					'Tether contract not deployed to detected network.'
				)
			}
		}

		loadWeb3().catch(console.error)
		loadBlockchainData().catch(console.error)
	}, [])

	return (
		<div>
			<Navbar account={account} />
		</div>
	)
}

export default App
