const ether=(n)=>{
    return new Web3.BigNumber(web3.utils.toWei(n,'ether'))
}

module.exports=ether