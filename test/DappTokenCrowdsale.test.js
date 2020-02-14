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
        
        this.openingTime=Math.round((new Date()).getTime() / 1000);
        this.closingTime=1781502943
        this.crowd=await DappTokenCrowdSale.new(this.rate,this.wallet,this.token.address,new BN(this.cap,2),this.openingTime,this.closingTime)
        await this.token.addMinter(this.crowd.address)
        await this.crowd.addWhitelisted(investor1)
        // console.log('ownerhsip transfered')
        this.vaultAddress=await this.crowd.vault()
        console.log('vault address:',this.vaultAddress)

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
            _cap=_cap.toNumber()
            _cap.should.equal(this.cap)
        })
    })

    describe("check timed crowdsale deployement",()=>{
        it("check opening time",async()=>{
            let _openingTime=await this.crowd.openingTime()
            _openingTime=_openingTime.toNumber()
            _openingTime.should.equal(this.openingTime)
        })
    })


    describe("white list crowdsale",()=>{
        it("check if person is whitelisted",async()=>{
            let res=await this.crowd.isWhitelisted(investor1)
            res.should.equal(true)
        })

        it("check if this non-whitelisted person is whitelist",async()=>{
            let res=await this.crowd.isWhitelisted(investor2)
            res.should.equal(false)
        })

        describe("accepting payments",()=>{
            it("shouldn't accept payment from non-whitelist person",async ()=>{
            // let _value=ether(1);
            await this.crowd.sendTransaction({value:'100',from:investor2}).should.be.rejected
        })
    })
    })

    describe("crowdsale stages",()=>{
        it("check stage is preIco",async()=>{
            let stage=await this.crowd.stage();
            stage=stage.toNumber()
            stage.should.equal(0);
        })
    })

    describe("check where money goes in PreICO stage",()=>{
        beforeEach(async ()=>{
            await this.crowd.setCrowdsaleStage(0,{from:investor1})
            await this.crowd.sendTransaction({value:'100',from:investor1}).should.be.fulfilled
        })

        it("check where is money",async ()=>{
            const balnc=await web3.eth.getBalance(this.wallet)
            console.log('balance of wallet',balnc)
        })
    })

    describe("crowdsale stage after changing",()=>{
        it("check stage is preIco",async()=>{
            await this.crowd.setCrowdsaleStage(1,{from:investor1})
            let stage=await this.crowd.stage();
            stage=stage.toNumber()
            stage.should.equal(1);
        })
    })

    

    



    

})