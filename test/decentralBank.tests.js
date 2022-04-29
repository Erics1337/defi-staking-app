/* eslint-disable */
const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('DecentralBank', (accounts) => {
	// All of the code goes here for testing
	describe('Mock Tether Deployment', async () => {
		it('matches name successfully', async () => {
			let tether = await Tether.new()
			// Get name
			const name = await tether.name()
			// Assert name
			assert.equal(name, 'Mock Tether Token')
		})
	})
})
