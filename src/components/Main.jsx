import React, { useState } from 'react'
import tether from '../img/tether.png'

function Main({
	tetherBalance,
	rewardBalance,
	stakingBalance,
	stakeTokens,
	unstakeTokens,
}) {
	const [amount, setAmount] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		stakeTokens(window.web3.utils.toWei(amount, 'Ether'))
	}
	return (
		<div id='content' className='mt-3'>
			<table className='table text-muted text-center'>
				<thead>
					<tr style={{ color: 'black' }}>
						<th scope='col'>Staking Balance</th>
						<th scope='col'>Reward Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ color: 'black' }}>
						<td>
							{window.web3.utils.fromWei(stakingBalance)} USDT
						</td>
						<td>{window.web3.utils.fromWei(rewardBalance)} RWD</td>
					</tr>
				</tbody>
			</table>
			<div className='card mb-2' style={{ opacity: '.9' }}>
				<form className='mb-3' onSubmit={(e) => handleSubmit(e)}>
					<div style={{ borderSpacing: '0 1em' }}>
						<label
							htmlFor=''
							className='float-left'
							style={{ marginLeft: '15px' }}>
							<b>Stake Tokens</b>
						</label>
						<span
							className='float-right'
							style={{ marginRight: '8px' }}>
							Balance: {window.web3.utils.fromWei(tetherBalance)}
						</span>
						<div className='input-group mb-4'>
							<input
								name='input'
								onChange={(e) => setAmount(e.target.value)}
								type='text'
								placeholder='0'
								required
							/>
							<div className='input-group-text'>
								<img
									src={tether}
									alt='tether token'
									height='32'
								/>
								&nbsp;USDT
							</div>
						</div>
					</div>
					<button
						type='submit'
						className='btn btn-primary btn-lg btn-block'>
						Deposit
					</button>
				</form>
				<button
					onClick={() => unstakeTokens()}
					className='btn btn-primary btn-lg btn-block'>
					Withdraw
				</button>
				<div
					className='card-body text-center'
					style={{ color: 'blue' }}>
					AIRDROP
				</div>
			</div>
		</div>
	)
}

export default Main
