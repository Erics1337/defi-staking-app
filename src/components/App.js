import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'
import Reward from '../truffle_abis/Reward.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main'

function App() {
	const [account, setAccount] = useState('0x0')
	const [tether, setTether] = useState({})
	const [reward, setReward] = useState({})
	const [decentralBank, setDecentralBank] = useState({})
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
				// Must use call() b/c methods in web3 are callbacks
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

			// Load Reward Contract
			const rewardData = Reward.networks[networkId]
			if (rewardData) {
				// Get contract abi json and contract address
				const reward = new web3.eth.Contract(
					Reward.abi,
					rewardData.address
				)
				setReward(reward)
				let rewardBalance = await reward.methods
					.balanceOf(accounts[0])
					.call()
				setRewardBalance(rewardBalance.toString())
				console.log('Reward Balance: ', rewardBalance)
			} else {
				window.alert(
					'Reward contract not deployed to detected network.'
				)
			}

			// Load DecentralBank Contract
			const decentralBankData = DecentralBank.networks[networkId]
			if (decentralBankData) {
				// Get contract abi json and contract address
				const decentralBank = new web3.eth.Contract(
					DecentralBank.abi,
					decentralBankData.address
				)
				setDecentralBank(decentralBank)
				let stakingBalance = await decentralBank.methods
					.stakingBalance(accounts[0])
					.call()
				setStakingBalance(stakingBalance.toString())
				console.log('Staking Balance: ', stakingBalance)
			} else {
				window.alert(
					'DecentralBank contract not deployed to detected network.'
				)
			}

			setLoading(false)
		}

		loadWeb3().catch(console.error)
		loadBlockchainData().catch(console.error)
	}, [])

	// leverage functions we created in decentralBank contract - deposit tokens and unstaking
	// run function to approve before we call depositToken
	// Staking Function >> access decentralBank, deposit tokens, send transaction hash
	const stakeTokens = (amount) => {
		setLoading(true)
		// approve tokens to be staked
		tether.methods
			.approve(decentralBank.address, amount)
			.send({ from: account })
			.on('transactionHash', (hash) => {
				// deposit tokens from amount user is staking
				decentralBank.methods
					.depositTokens(amount)
					.send({ from: account })
					.on('transactionHash', (hash) => {
						setLoading(false)
					})
			})
	}

	const unstakeTokens = (amount) => {
		setLoading(true)
		decentralBank.methods
			.unstakeTokens(amount)
			.send({ from: account })
			.on('transactionHash', (hash) => {
				setLoading(false)
			})
	}

	if (loading)
		return (
			<p id='loader' className='text-center' style={{ margin: '30px' }}>
				Loading...
			</p>
		)
	return (
		<div>
			<Navbar account={account} />
			<div className='container-fluid mt-5'>
				<div className='row'>
					<main
						role='main'
						className='col-lg-12 ml-auto mr-auto'
						style={{
							maxWidth: '600px',
							minHeight: '100vm',
						}}>
						<Main
							tetherBalance={tetherBalance}
							rewardBalance={rewardBalance}
							stakingBalance={stakingBalance}
							stakeTokens={stakeTokens}
							unstakeTokens={unstakeTokens}
						/>
					</main>
				</div>
			</div>
		</div>
	)
}

export default App
