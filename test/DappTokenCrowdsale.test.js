const DappToken=artifacts.require('DappToken');
const DappTokenCrowdSale=artifacts.require('DappTokenCrowdSale');

require('chai')
.should()

contract('DappTokenCrowdsale',([_,wallet])=>{
    beforeEach(async()=>{
        const _name='Dapp token'
        const _symbol='DAPP'
        const _decimals=18
        this.token=await DappToken.new(_name,_symbol,_decimals);
        this.rate=500
        this.wallet=wallet
        this.crowd=await DappTokenCrowdSale.new(this.rate,this.wallet,this.token.address)

    })
    describe('crowdsale',()=>{
        it('tracks the token',async ()=>{
            const token=await this.crowd.token();
            token.should.equal(this.token.address)
        })

        it('tracks the rate',async ()=>{
            const rate=await this.crowd.rate();
            assert.equal(rate,this.rate)
        })

        it('tracks the wallet',async ()=>{
            const wallet=await this.crowd.wallet();
            wallet.should.equal(this.wallet)
        })

        
    })



    

})