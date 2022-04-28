pragma solidity ^0.5.0;
import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank {
    address public owner;
    string public name = "Decentral Bank";
    Tether public tether;
    Reward public reward;

    constructor(Reward reward, Tether tether) public {
        reward = _reward;
        tether = _tether;
    }
}
