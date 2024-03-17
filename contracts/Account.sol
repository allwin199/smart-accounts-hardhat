// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {EntryPoint, UserOperation} from "@account-abstraction/contracts/core/EntryPoint.sol";
import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount {
    uint256 public count;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function validateUserOp(UserOperation calldata, /*userOp*/ bytes32, /*userOpHash*/ uint256 /*missingAccountFunds*/ )
        external
        pure
        returns (uint256 validationData)
    {
        return 0;
    }

    function execute() external {
        count++;
    }
}
