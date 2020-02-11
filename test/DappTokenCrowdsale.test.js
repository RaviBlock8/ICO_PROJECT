const DappToken=artifacts.require('DappToken');
const DappTokenCrowdSale=artifacts.require('DappTokenCrowdSale');
const BN =require('bn.js')

// const ether=require('./helpers/ether')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DappTokenCrowdsale',([_,wallet,investor1,investor2])=>{
    beforeEach(async()=>{
        const _name='Dapp token'
        const _symbol='DAPP'
        const _decimals=18
        this.token=await DappToken.new(_name,_symbol,_decimals);
        this.rate=500
        this.wallet=wallet
        this.cap=20000
        this.crowd=await DappTokenCrowdSale.new(this.rate,this.wallet,this.token.address,new BN(this.cap,2))
        await this.token.addMinter(this.crowd.address)
        // console.log('ownerhsip transfered')

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

    describe("accepting payments",()=>{
            it("should accept payments",async ()=>{
            // let _value=ether(1);
            await this.crowd.sendTransaction({value:'100',from:investor1}).should.be.fulfilled
        })
    })

    describe("check crowdsale function",()=>{
        it("check cap value",async ()=>{
            let _cap=await this.crowd.cap()
            _cap.should.equal(this.cap)
        })
    })



    

})