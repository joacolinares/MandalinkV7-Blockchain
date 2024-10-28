const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { ethers } = require("hardhat");



  describe("Test", function () {
    async function deployOneYearLockFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, WalletReciver, User1, User2, User3, User4, 
        User5, User6, User7, User8, User9, User10] = await ethers.getSigners();
  
      const Token = await ethers.getContractFactory("MockUSDT"); 
      const token = await Token.deploy();
  
      const PaymentContract = await ethers.getContractFactory("PaymentContract");  
      const MultiPool = await ethers.getContractFactory("multiPoolV4");  
      const paymentContract = await PaymentContract.deploy(token.getAddress(), WalletReciver.address);  
            const multiPool = await MultiPool.deploy(token.getAddress(), await paymentContract.getAddress());  

      await paymentContract.setMultiPoolAddress(multiPool.getAddress());   
  
      await token.transfer(User1.address, 1000000000);
      await token.transfer(User2.address, 1000000000);
      await token.transfer(User3.address, 1000000000);
      await token.transfer(User4.address, 1000000000);
      await token.transfer(User5.address, 1000000000);
      await token.transfer(User6.address, 1000000000);
      await token.transfer(User7.address, 1000000000);
      await token.transfer(User8.address, 1000000000);
      await token.transfer(User9.address, 1000000000);
      await token.transfer(User10.address, 10000000000);
      
      await token.connect(User1).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User2).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User3).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User4).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User5).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User6).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User7).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User8).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User9).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User10).approve(multiPool.getAddress(), 50000000000); 


      return { token, multiPool, owner, WalletReciver, User1, User2, User3, User4,
        User5, User6, User7, User8, User9, User10,paymentContract
       };
    }





    
})