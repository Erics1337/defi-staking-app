// const { artifacts } = require('truffle')
// import { artifacts } from 'truffle'
const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer) {
	// Deploy Mock Tether Contract
	await deployer.deploy(Tether)

	// Deploy Reward Contract
	await deployer.deploy(Reward)

	// Deploy DecentralBank Contract
	await deployer.deploy(DecentralBank)
}
