# Tether Smart Token and Staking DApp
Yield farming - rewards user with reward token for depositing tether token in bank
## Getting Started
```
truffle init
```
### Compile
```
truffle compile
```

### Deploying
```
truffle migrate
```
### Updating
Provides new addresses to what is already on the blockchain
```
truffle migrate --reset
```
### Testing
```
truffle console
tether = await Tether.deployed()
tether
```
### Check If Successfully Deployed
Run web3 to access ganache get accounts from eth
```
accounts = await web3.eth.getAccounts()
accounts[0]
```
### Check Balance
```
balance = await web3.eth.getBalance(accounts[0])
balance
balance.toString()
convertBalance = web3.utils.fromWei(balance)
web3.utils.toWei('15', 'Ether')
```
```