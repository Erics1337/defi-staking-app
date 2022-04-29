/* eslint-disable */
const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer, network, accounts) {
	// Deploy Mock Tether Contract
	await deployer.deploy(Tether)
	const tether = await Tether.deployed()

	// Deploy Reward Contract
	await deployer.deploy(Reward)
	const reward = await Reward.deployed()

	// Deploy DecentralBank Contract
	await deployer.deploy(DecentralBank, reward.address, tether.address)
	const decentralBank = await DecentralBank.deployed()

	// Transfer all Reward tokens to DecentralBank
	await reward.transfer(decentralBank.address, '1000000000000000000000000')

	// Distribute 100 tether tokens to investor
	await tether.transfer(accounts[1], '1000000000000000000')
}
