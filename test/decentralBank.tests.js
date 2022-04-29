/* eslint-disable */
const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DecentralBank = artifacts.require('DecentralBank')

// Arrange/Act/Assert

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('DecentralBank', ([owner, recipient]) => {
	let tether, reward, decentralBank

	// Helper function to convert eth to wei
	function tokens(number) {
		return web3.utils.toWei(number.toString(), 'ether')
	}

	// Arrange - Load contracts
	before(async () => {
		tether = await Tether.new()
		reward = await Reward.new()
		decentralBank = await DecentralBank.new(tether.address, reward.address)

		// Transfer all tokens to DecentralBank (1 million)
		await reward.transfer(decentralBank.address, tokens(1000000))

		// Transfer 100 mock Tether tokens to customer/investor/user from owner account
		await tether.transfer(recipient, tokens(100), { from: owner })
	})

	describe('Mock Tether Deployment', async () => {
		it('matches name successfully', async () => {
			// Get name
			const name = await tether.name()
			// Assert name
			assert.equal(name, 'Mock Tether Token')
		})
	})

	describe('Reward Token Deployment', async () => {
		it('matches name successfully', async () => {
			// Get name
			const name = await reward.name()
			// Assert name
			assert.equal(name, 'Reward Token')
		})
	})

	describe('Decentral Bank Deployment', async () => {
		it('matches name successfully', async () => {
			// Get name
			const name = await decentralBank.name()
			// Assert name
			assert.equal(name, 'Decentral Bank')
		})
	})

	it('contract has tokens', async () => {
		let balance = await reward.balanceOf(decentralBank.address)
		assert.equal(balance, tokens(1000000))
	})

	describe('Yield Farming', async () => {
		it('rewards tokens for staking', async () => {
			let result
			// Check recipient balance
			result = await tether.balanceOf(recipient)
			assert.equal(
				result.toString(),
				tokens(100),
				'recipient mock tether balance before staking 100 tokens'
			)
			// Check staking for recipient w/ 100 tokens. Get approval then depost tokens
			await tether.approve(decentralBank.address, tokens(100), {
				from: recipient,
			})
			await decentralBank.depositTokens(tokens(100), { from: recipient })

			// Check updated recipient balance
			result = await tether.balanceOf(recipient)
			assert.equal(
				result.toString(),
				tokens(0),
				'recipient mock tether balance after staking 100 tokens'
			)
			// Check updated balance of decentral bank
			result = await tether.balanceOf(decentralBank.address)
			assert.equal(
				result.toString(),
				tokens(100),
				'decentral bank mock tether balance before staking'
			)

			// Is staking update
			result = await decentralBank.isStaking(recipient)
			assert.equal(result.toString(), true, 'recipient is staking')

			// Issue tokens
			await decentralBank.issueTokens({ from: owner })

			// Ensure only the owner can issue tokens
			await decentralBank.issueTokens({ from: recipient }).should.be
				.rejected

			/* --------------------- Check balances after unstaking --------------------- */
			// Check unstake tokens
			await decentralBank.unstakeTokens(tokens(100), { from: recipient })

			// Check recipient balance
			result = await tether.balanceOf(recipient)
			assert.equal(
				result.toString(),
				tokens(100),
				'recipient mock tether balance before unstaking'
			)
			// Check updated balance of decentral bank
			result = await tether.balanceOf(decentralBank.address)
			assert.equal(
				result.toString(),
				tokens(0),
				'decentral bank mock tether balance before staking'
			)
			// Is staking update
			result = await decentralBank.isStaking(recipient)
			assert.equal(
				result.toString(),
				false,
				'recipient is is no longer staking after unstaking'
			)
		})
	})
})
