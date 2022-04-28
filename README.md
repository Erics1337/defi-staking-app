# Tether Smart Token and Staking DApp
Yield farming - rewards user with reward token for depositing tether token in bank
## Getting Started
```
truffle init
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