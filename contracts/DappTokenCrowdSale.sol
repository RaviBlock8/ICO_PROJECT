pragma solidity ^0.5.1;

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DappTokenCrowdSale is Crowdsale{

    constructor(uint256 rate,
    address payable wallet,
    IERC20 token)
    Crowdsale(rate,wallet,token) public{

    }
}