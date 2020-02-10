

const BigNumber=web3.BigNumber
const DappToken= artifacts.require('DappToken')
require('chai')
.should()

// contract('DappToken',accounts=>{
//     describe('token attributes',()=>{
//         it('has correct name',()=>{
//             DappToken.deployed().then((inst)=>{
//                 inst.name().then((name)=>{
//                     assert.equal(name,"DappToken")
//                 })
//             })
//         })
//     })
// })

contract('DappToken',accounts=>{
    const _name='Dapp token'
    const _symbol='DAPP'
    const _decimals=27

    beforeEach(async ()=>{
        this.token=await DappToken.new(_name,_symbol,_decimals)
    })

    describe('token attributes',()=>{
        it('has correct name',async ()=>{
            let name=await this.token.name();
            name.should.equal(_name)
        })

        it('has correct symbol',async ()=>{
            let symbol=await this.token.symbol();
            symbol.should.equal(_symbol)
        })

        it('has correct decimals',async ()=>{
            let decimals=await this.token.decimals();
            assert.equal(decimals,_decimals)
        })
    })
})