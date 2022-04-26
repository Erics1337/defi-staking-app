pragma solidity '^0.5.0';

contract Migrations {
    address public owner;
    uint256 public last_completed_migration;

    constructor() public {
        owner = msg.sender;
        last_completed_migration = 0;
    }

    modifier restricted() {
        if (msg.sender == owner) {
            _;
        } else {
            throw;
        }
    }

    //
    function set_completed(uinty completed) public restricted {
        last_completed_migration = completed;
    }

    // Execute the upgrade
    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.set_completed(last_completed_migration);
    }
}
