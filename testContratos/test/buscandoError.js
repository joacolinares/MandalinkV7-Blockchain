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
        User5, User6, User7, User8, User9, User10
      ] = await ethers.getSigners();
      
      const User11 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User12 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User13 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User14 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User15 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User16 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User17 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User18 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User19 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User20 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User21 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User22 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User23 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User24 = ethers.Wallet.createRandom().connect(ethers.provider);
      const User25 = ethers.Wallet.createRandom().connect(ethers.provider);

      const amountToTransfer = ethers.parseEther("1.0"); // Transfiere 1 ETH a cada cuenta nueva

      await owner.sendTransaction({
        to: User11.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User12.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User13.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User14.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User15.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User16.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User17.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User18.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User19.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User20.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User21.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User22.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User23.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User24.address,
        value: amountToTransfer
      });
      await owner.sendTransaction({
        to: User25.address,
        value: amountToTransfer
      });


      const Token = await ethers.getContractFactory("MockUSDT"); 
      const token = await Token.deploy();
  
      const PaymentContract = await ethers.getContractFactory("PaymentContract");  
      const MultiPool = await ethers.getContractFactory("multiPoolV4");  
      const paymentContract = await PaymentContract.deploy(token.getAddress(), WalletReciver.address);  
            const multiPool = await MultiPool.deploy(token.getAddress(), await paymentContract.getAddress());  

      await paymentContract.setMultiPoolAddress(multiPool.getAddress());   

      await token.transfer(User1.address, 10000000000000);
      await token.transfer(User2.address, 100000000000);
      await token.transfer(User3.address, 100000000000);
      await token.transfer(User4.address, 100000000000);
      await token.transfer(User5.address, 100000000000);
      await token.transfer(User6.address, 100000000000);
      await token.transfer(User7.address, 100000000000);
      await token.transfer(User8.address, 100000000000);
      await token.transfer(User9.address, 100000000000);
      await token.transfer(User10.address, 1000000000000);
      await token.transfer(User11.address, 1000000000000);
      await token.transfer(User12.address, 1000000000000);
      await token.transfer(User13.address, 1000000000000);
      await token.transfer(User14.address, 1000000000000);
      await token.transfer(User15.address, 1000000000000);
      await token.transfer(User16.address, 1000000000000);
      await token.transfer(User17.address, 1000000000000);
      await token.transfer(User18.address, 1000000000000);
      await token.transfer(User19.address, 1000000000000);
      await token.transfer(User20.address, 1000000000000);
      await token.transfer(User21.address, 1000000000000);
      await token.transfer(User22.address, 1000000000000);
      await token.transfer(User23.address, 1000000000000);
      await token.transfer(User24.address, 1000000000000);
      await token.transfer(User25.address, 1000000000000);
      
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
      await token.connect(User11).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User12).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User13).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User14).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User15).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User16).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User17).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User18).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User19).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User20).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User21).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User22).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User23).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User24).approve(multiPool.getAddress(), 50000000000); 
      await token.connect(User25).approve(multiPool.getAddress(), 50000000000); 


      return { token, multiPool, owner, WalletReciver, User1, User2, User3, User4,
        User5, User6, User7, User8, User9, User10,paymentContract
        ,User11, User12, User13, User14,
        User15, User16, User17, User18, User19, User20
        ,User21, User22, User23, User24, User25
       };
    }
  
      describe("Validations", function () {
          //REGLAS
          /*
          1 Si una persona compra una pool debe descontarsele el precio LISTO
          2 Si una persona de mi arbol debajo de mi 7 niveles compra, yo deberia recibir el % establecido LISTO
          3 El reparto del dinero es 70% contrato 20% arbol 10% organizacion LISTO
          4 Para ir a otra pool debo cumplir con las regla de directos  LISTO
          5 Para ir a otr pool debo tener 3 personas debajo  y ademas estas personas no deberieron haber movido a nadie
          6 Para ir a otro pool debo cumplir con la regla 5 y 6 juntas
          7 Si no cumplo con la cantidad minma de directos no paso
          8 Si no tengo 3 personas debajo no paso
          9 Si no cumple directos que busque alguien debajo
          10 Si no cumple con 3 personas abajo que busque alguien debajo ¿Podria pasar??????
          11 Si paso de una Pool a otra debo recibir el excedente
          12 En el caso de termina el ciclo es decir completar Pool 7, recibo 1600 usd y 500 se usan para empujar 10 posiciones (Es decir se agregan 3 personas en la pool 1) en Pool 1
          13 Si se llega a un momento de emergencia las primeras 20 wallet votaran que hacer, si repartir el dinero o que siga el proyecto
          */

        // it("Si una persona compra una pool debe descontarsele el precio de su balance", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //    } = await loadFixture(deployOneYearLockFixture);

        //   // console.log("");
           
        //    const balanceInicial = Number((await token.balanceOf(User2.address)).toString()) / 10**6
        //    await multiPool.connect(User2).joinPool(1, User1.address, User2.address);
        //    const balanceFinal = Number((await token.balanceOf(User2.address)).toString()) / 10**6
     
        //    const diferenciaEsperada = 50;
        //    expect(balanceInicial - balanceFinal).to.equal(diferenciaEsperada); //950$ se le resta 50$ al balance
        // });

        it("Buscando error", async function () {
            const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
              User5, User6, User7, User8, User9, User10,paymentContract
             } = await loadFixture(deployOneYearLockFixture);
            

            ///////////////
            //Wallet1 joaco = User1
            //Wallet2 Darwin = User2
            //Wallet3 Darwin = User2
            //Wallet4 Darwin = User3
            //Wallet5 Darwin = User4
            //Wallet6 Darwin = User5
            //Wallet7 Darwin = User6
            //Wallet8 Darwin = User7
            //Wallet9 Darwin = User8
             await multiPool.connect(User2).joinPool(1, User1.address, User2.address);
             await multiPool.connect(User3).joinPool(1, User2.address, User3.address);
             await multiPool.connect(User4).joinPool(1, User2.address, User4.address);
             await multiPool.connect(User5).joinPool(2, User2.address, User5.address);
             await multiPool.connect(User6).joinPool(5, User2.address, User6.address);
             await multiPool.connect(User7).joinPool(6, User2.address, User7.address);
             await multiPool.connect(User8).joinPool(7, User2.address, User8.address);  //Compra pool 7
             await multiPool.connect(User2).joinPool(2, User1.address, User2.address);
             await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
             await multiPool.connect(User2).joinPool(4, User1.address, User2.address);
             await multiPool.connect(User2).joinPool(5, User1.address, User2.address);
             await multiPool.connect(User2).joinPool(6, User1.address, User2.address);
             await multiPool.connect(User2).joinPool(7, User1.address, User2.address);  //Compra pool 7
             await multiPool.connect(User8).joinPool(7, User1.address, User8.address);  //Compra pool 7
             await multiPool.connect(User8).joinPool(7, User2.address, User8.address);  //Compra pool 7


             await multiPool.connect(User8).joinPool(3, User2.address, User8.address);
             await multiPool.connect(User8).joinPool(4, User2.address, User8.address);
             await multiPool.connect(User8).joinPool(1, User2.address, User8.address);
             await multiPool.connect(User8).joinPool(1, User2.address, User8.address);
             await multiPool.connect(User8).joinPool(6, User2.address, User8.address);
             await multiPool.connect(User8).joinPool(7, User2.address, User8.address);  //Compra pool 7
             await multiPool.connect(User7).joinPool(7, User2.address, User7.address);  //Compra pool 7
             await multiPool.connect(User7).joinPool(1, User2.address, User7.address);
             await multiPool.connect(User7).joinPool(7, User2.address, User7.address);  //Compra pool 7
             await multiPool.connect(User7).joinPool(7, User2.address, User7.address);  //Compra pool 7
             await multiPool.connect(User6).joinPool(1, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(1, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(3, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(1, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(2, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(3, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(1, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(2, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(3, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(4, User2.address, User6.address);
             await multiPool.connect(User6).joinPool(5, User2.address, User6.address);
             await multiPool.connect(User5).joinPool(6, User2.address, User5.address);
              await multiPool.connect(User5).joinPool(7, User2.address, User5.address);  //Compra pool 7
              await multiPool.connect(User5).joinPool(7, User2.address, User5.address);  //Compra pool 7
              await multiPool.connect(User5).joinPool(7, User2.address, User5.address);  //Compra pool 7
             await multiPool.connect(User5).joinPool(1, User2.address, User5.address);
             await multiPool.connect(User5).joinPool(1, User2.address, User5.address);
             await multiPool.connect(User5).joinPool(1, User2.address, User5.address);
              await multiPool.connect(User5).joinPool(7, User2.address, User5.address);  //Compra pool 7
             await multiPool.connect(User5).joinPool(1, User2.address, User5.address);
             await multiPool.connect(User5).joinPool(6, User2.address, User5.address);
             await multiPool.connect(User5).joinPool(5, User2.address, User5.address);


            /////// CONTINUA ////



            // await multiPool.connect(User5).joinPool(7, User2.address, User5.address);   //DEBERIA MOVER A LAS PERSONAS
            // await multiPool.connect(User5).joinPool(7, User2.address, User5.address);   //DEBERIA MOVER A LAS PERSONAS
            // await multiPool.connect(User5).joinPool(7, User2.address, User5.address);   //DEBERIA MOVER A LAS PERSONAS
            
            // await multiPool.connect(User5).joinPool(7, User2.address, User5.address);   //DEBERIA MOVER A LAS PERSONAS
            // await multiPool.connect(User3).joinPool(7, User2.address, User3.address);   //DEBERIA MOVER A LAS PERSONAS
            // await multiPool.connect(User3).joinPool(7, User2.address, User3.address);   //DEBERIA MOVER A LAS PERSONAS


             console.log("User 2 ",User2.address)
             console.log("User 5 ",User5.address)
             console.log("User 7 ",User7.address)
             console.log("User 8 ",User8.address)
             




             const getQueue1 =  await multiPool.getQueue(1);
             const getQueue2 =  await multiPool.getQueue(2);
             const getQueue3 =  await multiPool.getQueue(3);
             const getQueue4 =  await multiPool.getQueue(4);
             const getQueue5 =  await multiPool.getQueue(5);
             const getQueue6 =  await multiPool.getQueue(6);
             const getQueue7 =  await multiPool.getQueue(7);
             console.log(getQueue1)
             console.log(getQueue2)
             console.log(getQueue3)
             console.log(getQueue4)
             console.log(getQueue5)
             console.log(getQueue6)
             console.log(getQueue7)

             console.log("Reclamacia ganancias")
             const balanceInicial2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
             await paymentContract.connect(User2).claimEarnings();
             const balanceInicial22 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
             console.log(balanceInicial2)
             console.log(balanceInicial22)
             await multiPool.connect(User2).joinPool(3, User4.address, User2.address);
        })

        })
    })
