import React from 'react'
import bank from '../img/bank.png'

function Navbar({ account }) {
	return (
		<nav
			className='d-flex justify-content-between navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow p-0'
			style={{ background: 'white' }}>
			<a className='navbar-brand col-sm-3 col-md-2 mr-0' href='#'>
				<img
					src={bank}
					alt='bank'
					width='50'
					height='30'
					className='d-inline-block align-top mr-3'
				/>
				DAPP Yield Staking (Decentralized Banking)
			</a>
			<ul className='navbar-nav px-3'>
				<li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
					<small style={{ color: 'white' }}>
						{' '}
						Account Number: {account}
					</small>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
