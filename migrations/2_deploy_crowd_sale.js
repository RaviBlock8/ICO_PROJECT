const DappToken=artifacts.require('DappToken')

module.exports=(deployer)=>{
    deployer.deploy(DappToken,'dapp','dap',27)
}