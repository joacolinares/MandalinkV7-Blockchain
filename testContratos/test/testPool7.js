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
  
      const MultiPool = await ethers.getContractFactory("multiPoolV3");  
      const multiPool = await MultiPool.deploy(token.getAddress(), WalletReciver.address);  
  
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
        User5, User6, User7, User8, User9, User10
       };
    }
  
      describe("Validations", function () {
        it("En el caso de termina el ciclo es decir completar Pool 7, recibo 1600 usd y 500 se usan para empujar 10 posiciones en Pool 1", async function () {
          const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
            User5, User6, User7, User8, User9, User10
          } = await loadFixture(deployOneYearLockFixture);

          await token.transfer(User3.address, 99000000000);
          await token.transfer(User2.address, 99000000000);
          
          const balanceAntes =  await token.balanceOf(User3.address);
          await multiPool.connect(User2).joinPool(1, User1.address, User2.address); //Compra user2 la pool 3
          await multiPool.connect(User3).joinPool(1, User2.address, User3.address); //Compra user2 la pool 3
          await multiPool.connect(User4).joinPool(1, User2.address, User4.address); //Compra user2 la pool 3
          await multiPool.connect(User5).joinPool(1, User2.address, User5.address); //Compra user2 la pool 3
          await multiPool.connect(User6).joinPool(1, User3.address, User6.address); //Compra user2 la pool 3
          await multiPool.connect(User7).joinPool(1, User3.address, User7.address); //Compra user2 la pool 3
          await multiPool.connect(User8).joinPool(1, User3.address, User8.address); //Compra user2 la pool 3
          await multiPool.connect(User6).joinPool(1, User4.address, User6.address); //Compra user2 la pool 3
          await multiPool.connect(User7).joinPool(1, User4.address, User7.address); //Compra user2 la pool 3
          await multiPool.connect(User8).joinPool(1, User4.address, User8.address); //Compra user2 la pool 3
          await multiPool.connect(User6).joinPool(1, User5.address, User6.address); //Compra user2 la pool 3
          await multiPool.connect(User7).joinPool(1, User5.address, User7.address); //Compra user2 la pool 3
          console.log("COMPRA PARA PASAR A LA POOL 2 A 3")
          await multiPool.connect(User8).joinPool(1, User5.address, User8.address); //Compra user2 la pool 3


          const getQueue1 =  await multiPool.getQueue(1);
          const getQueue2 =  await multiPool.getQueue(2);
          const getQueue3 =  await multiPool.getQueue(3);
          const getQueue7 =  await multiPool.getQueue(7);



          await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user3 el pool 3 y le da 20 a user 2
          await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user4 el pool 3 y le da 20 a user 2
          await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user5 el pool 3 y le da 20 a user 2
          console.log("COMPRA CUARTO EN POOL 7")
          await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user5 el pool 3 y le da 20 a user 2
        
          const getQueue12 =  await multiPool.getQueue(1);
          const getQueue22 =  await multiPool.getQueue(2);
          const getQueue32 =  await multiPool.getQueue(3);
          const getQueue42 =  await multiPool.getQueue(4);
          const getQueue72 =  await multiPool.getQueue(7);

          const balanceDespues =  await token.balanceOf(User3.address);
          

          const balanceAntes2 = ethers.formatUnits(balanceAntes, 6);
          const balanceDespues2 = ethers.formatUnits(balanceDespues, 6);


          console.log("despues")
          console.log(balanceAntes2)
          console.log(balanceDespues2)



          console.log("POSICIONES ANTES PRIERA VES")
          console.log(getQueue1)
          console.log(getQueue2)
          console.log(getQueue3)
          console.log(getQueue7)
          console.log("POSICIONES DESPUES SEGUNDA VES")
          console.log(getQueue12)
          console.log(getQueue22)
          console.log(getQueue32)
          console.log(getQueue42)
          console.log(getQueue72)



        //   console.log("COMPRA CUARTO EN POOL 7")
        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user3 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user3 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User3).joinPool(1, User2.address, User3.address); //Compra user3 el pool 1 y para que haya 3 personas
        //   const getQueue13 =  await multiPool.getQueue(1);
        //   const getQueue23 =  await multiPool.getQueue(2);
        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user3 el pool 3 y le da 20 a user 2
        //   const getQueue132 =  await multiPool.getQueue(1);
        //   const getQueue232 =  await multiPool.getQueue(2);




        //  // const getQueue23 =  await multiPool.getQueue(2);
        //   const getQueue33 =  await multiPool.getQueue(3);
        //   const getQueue43 =  await multiPool.getQueue(4);
        //   const getQueue73 =  await multiPool.getQueue(7);


        //   console.log("POSICIONES DESPUES TERCERA VES")
        //   console.log("Pool 1 antes")
        //   console.log(getQueue13)
        //   console.log("Pool 1 despues")
        //   console.log(getQueue132)
        //   console.log("Pool 2 antes")
        //   console.log(getQueue23)
        //   console.log("Pool 2 antes")
        //   console.log(getQueue232)
        //   console.log(getQueue33)
        //   console.log(getQueue43)
        //   console.log(getQueue73)
          
          // console.log("Posiciones despues")
          
          // const Pool1 =  await multiPool.pools(1);
          // const Pool2 =  await multiPool.pools(2);
          // const Pool7 =  await multiPool.pools(7);


          // expect(Pool1.numUsers).to.equal(2); //Esta bien ya que la pool 1 la compraron 7 personas y de esas 2 fueron movidas a la pool 2, luego de completar la pool 7 quedaron 2 ya que al completarse se mueven 3 personas
          // expect(Pool2.numUsers).to.equal(5); //Esta bien ya que habi 2 y se mueveron de la pool 1 a la 2 3 personas
          // expect(Pool7.numUsers).to.equal(3); //Esta bien ya que en la pool 7 habia 4 y 1 la completo y se fue del sistema

        });


    });
  
  
  });
  