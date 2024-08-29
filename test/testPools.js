const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Test", function () {
  async function deployOneYearLockFixture() {


    // Contracts are deployed using the first signer/account by default
    const [owner, WalletReciver, otherAccount2, otherAccount3, otherAccount4, otherAccount5, 
      otherAccount6, otherAccount7, otherAccount8, otherAccount9, otherAccount10] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockUSDT"); 
    //Deploy Token
    const token = await Token.deploy();

    const MultiPool = await ethers.getContractFactory("multiPool");  
    //Deploy del contrato pasandole el token creado simulando USDT y la WalletReciver como receptora de ganancias
    const multiPool = await MultiPool.deploy(token.getAddress(), WalletReciver.address);  

    return { token, multiPool, owner, WalletReciver, otherAccount2, otherAccount3, otherAccount4, otherAccount5,
      otherAccount6, otherAccount7, otherAccount8, otherAccount9, otherAccount10
     };
  }


  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { token,multiPool, owner, WalletReciver, otherAccount2, otherAccount3, otherAccount4, otherAccount5,
          otherAccount6, otherAccount7, otherAccount8, otherAccount9, otherAccount10
         } = await loadFixture(deployOneYearLockFixture);
      
        
        //El owner envia 5000usd a otherAccount3
        await token.transfer(otherAccount3.address, 5000000000);
        
        //El owner envia 5000usd a otherAccount4
        await token.transfer(otherAccount4.address, 5000000000);
        console.log("Los usuarios reciben 5000usd")
        
        //Aprueba y compra Pool 1 el otherAccount3
        await token.connect(otherAccount3).approve(multiPool.getAddress(), 50000000); 



        //INICIA 
        console.log("OtherAccount3 compra Pool 1")
        await multiPool.connect(otherAccount3).joinPool(1, otherAccount2.address); 
        const formattedBalance = Number((await token.balanceOf(otherAccount3.address)).toString()) / 10**6;
        console.log("Balance de OtherAccount3 :", formattedBalance); 


      });
    });
   
  });


});
