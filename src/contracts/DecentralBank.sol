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
    mapping(address => bool) public isStaking;

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

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "Balance cannot be 0");

        // Transfer Tether tokens back to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issue rewards
    function issueTokens() public {
        // Require the owner to issue tokens only
        require(msg.sender == owner, "Only the owner can issue tokens");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9; // Divide by 9 to create percentage incentive for stakers
            if (balance > 0) {
                reward.transfer(recipient, balance);
            }
        }
    }
}
