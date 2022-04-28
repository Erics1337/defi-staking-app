pragma solidity ^0.5.0;

contract Tether {
    string public name = "Mock Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    // Events are camelCased by convention
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Allow the user an additional security measure to approve transfer event
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        // Check if the sender has enough balance
        require(balanceOf[msg.sender] >= value);
        // Transfer amnt and subtract the balance
        balanceOf[msg.sender] -= value;
        // Add the balance to the recipient
        balanceOf[to] += value;
        // Emit the transfer event
        // Outside consumer can see the event through web3js
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool success) {
        require(value <= balanceOf[from]);
        require(value <= allowance[from][msg.sender]);
        // Add the balance for transferFrom
        balanceOf[to] += value;
        // Subtract the balance for transferFrom
        balanceOf[from] -= value;
        allowance[msg.sender][from] -= value;
        // Emit the transfer event
        emit Transfer(from, to, value);
        return true;
    }
}
