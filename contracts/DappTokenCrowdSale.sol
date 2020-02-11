pragma solidity ^0.5.1;

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract DappTokenCrowdSale is Crowdsale,MintedCrowdsale,CappedCrowdsale{

    uint256 private investorMinCap=2000000000000000000;
    uint256 private investorMaxCap=50000000000000000000;
    mapping(address=>uint256) public contributions;
    constructor(uint256 rate,
    address payable wallet,
    IERC20 token,uint cap)
    Crowdsale(rate,wallet,token)
    CappedCrowdsale(cap)
    public{

    }

    function preValidatePurchase(address _beneficiary,uint _weiAmount) internal{
        super._preValidatePurchase(_beneficiary,_weiAmount);
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution + _weiAmount;
        require(_newContribution>=investorMinCap && _newContribution <= investorMaxCap,"some error happened");
        contributions[_beneficiary] = _newContribution;
    }
}