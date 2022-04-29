/* eslint-disable */
const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DecentralBank = artifacts.require('DecentralBank')

// Arrange/Act/Assert

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('DecentralBank', (accounts) => {
	let tether, reward

	before(async () => {
		// Arrange
		tether = await Tether.new()
		reward = await Reward.new()
	})

	// All of the code goes here for testing
	describe('Mock Tether Deployment', async () => {
		it('matches name successfully', async () => {
			// Get name
			const name = await tether.name()
			// Assert name
			assert.equal(name, 'Mock Tether Token')
		})
	})

	describe('Reward Token', async () => {
		it('matches name successfully', async () => {
			// Get name
			const name = await reward.name()
			// Assert name
			assert.equal(name, 'Reward Token')
		})
	})
})
