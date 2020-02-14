pragma solidity ^0.5.1;

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/WhitelistCrowdsale.sol";
// import "../node_modules/@openzeppelin/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

contract DappTokenCrowdSale is Crowdsale,MintedCrowdsale,CappedCrowdsale ,TimedCrowdsale,WhitelistCrowdsale
{

    // track investors investment
    uint256 private investorMinCap=2000000000000000000;
    uint256 private investorMaxCap=50000000000000000000;
  
    mapping(address=>uint256) public contributions;

    //keep track of ICO stage
    enum CrowdsaleStage{PreICO,ICO}
    //default to presale stage
    CrowdsaleStage public stage=CrowdsaleStage.PreICO;


    constructor(
    uint256 rate,
    address payable wallet,
    IERC20 token,
    uint cap,
    uint _openingTime,
    uint _closingTime
    )
    Crowdsale(rate,wallet,token)
    CappedCrowdsale(cap)
    TimedCrowdsale(_openingTime,_closingTime)
    public{
        // require(_goal <= cap," goal exceeds cap");
    }

    // get user contributions

    function getContributions(address _beneficiary) public view returns(uint256){
        return contributions[_beneficiary];
    }

    //set crowdsale stage

    function setCrowdsaleStage(uint _stage) public{
        if(uint(CrowdsaleStage.PreICO)==_stage){
            stage = CrowdsaleStage.PreICO;
            //to enable this change of value i have changed _rate from private to internal in crowdsale.sol
            _rate = 500;
        }else{
            stage = CrowdsaleStage.ICO;
           _rate = 250;
        }

        
    }

    function _forwardFunds() internal {
        if(stage == CrowdsaleStage.PreICO){
            wallet().transfer(msg.value);
        }else if(stage == CrowdsaleStage.ICO){
            super._forwardFunds();
        }
        
    }

    function preValidatePurchase(address _beneficiary,uint _weiAmount) internal{
        super._preValidatePurchase(_beneficiary,_weiAmount);
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution + _weiAmount;
        require(_newContribution>=investorMinCap && _newContribution <= investorMaxCap,"some error happened");
        contributions[_beneficiary] = _newContribution;
    }
}