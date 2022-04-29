pragma solidity ^0.5.0;
import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank {
    address public owner;
    string public name = "Decentral Bank";
    Tether public tether;
    Reward public reward;

    // Key store
    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(Reward reward, Tether tether) public {
        reward = reward;
        tether = tether;
    }

    // Staking function
    function depositTokens(uint256 amount) public {
        // Requirements
        require(amount > 0, "Amount cannot be 0");

        // Transfer Tether tokens to this address for staking
        tether.transferFrom(msg.sender, address(this), amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + amount;

        if (!hasStaked) {
            stakers.push[msg.sender];
        }

        // Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
