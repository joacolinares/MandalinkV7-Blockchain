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
  
      const PaymentContract = await ethers.getContractFactory("PaymentContractV7");  
      const MultiPool = await ethers.getContractFactory("multiPoolV7");  
      const paymentContract = await PaymentContract.deploy(token.getAddress(), WalletReciver.address);  
      const multiPool = await MultiPool.deploy(token.getAddress(), await paymentContract.getAddress());  

      await paymentContract.setMultiPoolAddress(multiPool.getAddress());   
  
      await token.transfer(User1.address, 100000000000);
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
          10 Si no cumple con 3 personas abajo que busque alguien debajo 
          11 Si paso de una Pool a otra debo recibir el excedente
          12 En el caso de termina el ciclo es decir completar Pool 7, recibo 1600 usd y 500 se usan para empujar 10 posiciones (Es decir se agregan 3 personas en la pool 1) en Pool 1
          13 Si se llega a un momento de emergencia las primeras 20 wallet votaran que hacer, si repartir el dinero o que siga el proyecto
          14 Si compro en Pool 5,6,7 puedo pasar siempre
          */

        it("Si una persona compra una pool debe descontarsele el precio de su balance", async function () {
          const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
            User5, User6, User7, User8, User9, User10
           } = await loadFixture(deployOneYearLockFixture);
           
           const balanceInicial = Number((await token.balanceOf(User2.address)).toString()) / 10**6
           await multiPool.connect(User2).joinPool(1, User1.address);
           const balanceFinal = Number((await token.balanceOf(User2.address)).toString()) / 10**6
     
           const diferenciaEsperada = 50;
           expect(balanceInicial - balanceFinal).to.equal(diferenciaEsperada); //950$ se le resta 50$ al balance
        });


        it("Si una persona de mi arbol debajo de mi 7 niveles compra, yo deberia recibir el % establecido", async function () {
            const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
              User5, User6, User7, User8, User9, User10,paymentContract
             } = await loadFixture(deployOneYearLockFixture);
             let balanceTemporal1
             let balanceTemporal2
             let balanceTemporal3
             let balanceTemporal4
             let balanceTemporal5
             let balanceTemporal6
             let balanceTemporal7
             let balanceTemporal8
             let balanceTemporal9
             let balanceTemporal10

             const diferenciaEsperadaN1 = 20
             const diferenciaEsperadaN2 = 6
             const diferenciaEsperadaN3 = 4
             const diferenciaEsperadaN4 = 2
             const diferenciaEsperadaN5 = 2
             const diferenciaEsperadaN6 = 2
             const diferenciaEsperadaN7 = 4
             const diferenciaEsperadaN8 = 0

             
             const balanceInicial1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
             const balanceInicial2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
             const balanceInicial3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
             const balanceInicial4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
             const balanceInicial5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
             const balanceInicial6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
             const balanceInicial7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
             const balanceInicial8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6

            ///////////////

             await multiPool.connect(User2).joinPool(3, User1.address);

             await paymentContract.connect(User1).claimEarnings()

             balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6         
             expect(balanceTemporal1 - balanceInicial1).to.equal(diferenciaEsperadaN1);//Tiene 1020$ esta bien recibe 20% de 200$

            ///////////////

             await multiPool.connect(User3).joinPool(3, User2.address);

             await paymentContract.connect(User1).claimEarnings()
             await paymentContract.connect(User2).claimEarnings()

             balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
             balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 

             expect(balanceTemporal1 - (balanceInicial1 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 1026$ esta bien recibe 6% de 200$ es decir 1020 que ya tenia + 6
             expect(balanceTemporal2 - (balanceInicial2 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20

             ///////////////

             await multiPool.connect(User4).joinPool(3, User3.address);

             await paymentContract.connect(User1).claimEarnings()
             await paymentContract.connect(User2).claimEarnings()
             await paymentContract.connect(User3).claimEarnings()

             balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
             balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
             balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 



             expect(balanceTemporal1 - (balanceInicial1 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 1026$ esta bien recibe 4% de 200$ es decir 1026 que ya tenia + 4
             expect(balanceTemporal2 - (balanceInicial2 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 6% de 200$ es decir 826 que ya tenia + 6
             expect(balanceTemporal3 - (balanceInicial3 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20

            ///////////////

             await multiPool.connect(User5).joinPool(3, User4.address);

             await paymentContract.connect(User1).claimEarnings()
             await paymentContract.connect(User2).claimEarnings()
             await paymentContract.connect(User3).claimEarnings()
             await paymentContract.connect(User4).claimEarnings()

             balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
             balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
             balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
             balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 


             expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 1030$ esta bien recibe 1% de 200$ es decir 1028 que ya tenia + 2
             expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 830$ esta bien recibe 2% de 200$ es decir 826 que ya tenia + 4
             expect(balanceTemporal3 - (balanceInicial3 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 826$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
             expect(balanceTemporal4 - (balanceInicial4 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


            /////////////// DE ACA PARA ABAJO FALTA DEFINIR BIEN LOS COMENTARIOS

            await multiPool.connect(User6).joinPool(3, User5.address);

            await paymentContract.connect(User1).claimEarnings()
            await paymentContract.connect(User2).claimEarnings()
            await paymentContract.connect(User3).claimEarnings()
            await paymentContract.connect(User4).claimEarnings()
            await paymentContract.connect(User5).claimEarnings()

            balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
            balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
            balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
            balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
            balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
            expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
            expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
            expect(balanceTemporal4 - (balanceInicial4 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal5 - (balanceInicial4 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


            ///////////////

            await multiPool.connect(User7).joinPool(3, User6.address);

            await paymentContract.connect(User1).claimEarnings()
            await paymentContract.connect(User2).claimEarnings()
            await paymentContract.connect(User3).claimEarnings()
            await paymentContract.connect(User4).claimEarnings()
            await paymentContract.connect(User5).claimEarnings()
            await paymentContract.connect(User6).claimEarnings()

            balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
            balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
            balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
            balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
            balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
            balanceTemporal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6 
            expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4 + 2 + 2)).to.equal(diferenciaEsperadaN6);//Tiene 1032$ esta bien recibe 1% de 200$ es decir 1030 que ya tenia + 2
            expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4 + 2)).to.equal(diferenciaEsperadaN5);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
            expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
            expect(balanceTemporal4 - (balanceInicial4 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal5 - (balanceInicial5 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal6 - (balanceInicial6 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


            ///////////////

            await multiPool.connect(User8).joinPool(3, User7.address);

            await paymentContract.connect(User1).claimEarnings()
            await paymentContract.connect(User2).claimEarnings()
            await paymentContract.connect(User3).claimEarnings()
            await paymentContract.connect(User4).claimEarnings()
            await paymentContract.connect(User5).claimEarnings()
            await paymentContract.connect(User6).claimEarnings()
            await paymentContract.connect(User7).claimEarnings()

            balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
            balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
            balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
            balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
            balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
            balanceTemporal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6 
            balanceTemporal7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6 
            expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4 + 2 + 2 + 2)).to.equal(diferenciaEsperadaN7);//Tiene 1032$ esta bien recibe 1% de 200$ es decir 1030 que ya tenia + 2
            expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4 + 2 + 2)).to.equal(diferenciaEsperadaN6);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
            expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6 + 4 + 2)).to.equal(diferenciaEsperadaN5);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
            expect(balanceTemporal4 - (balanceInicial4 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal5 - (balanceInicial5 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal6 - (balanceInicial6 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal7 - (balanceInicial7 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


            ///////////////

            await multiPool.connect(User9).joinPool(3, User8.address);

            //await paymentContract.connect(User1).claimEarnings()
            await paymentContract.connect(User2).claimEarnings()
            await paymentContract.connect(User3).claimEarnings()
            await paymentContract.connect(User4).claimEarnings()
            await paymentContract.connect(User5).claimEarnings()
            await paymentContract.connect(User6).claimEarnings()
            await paymentContract.connect(User7).claimEarnings()
            await paymentContract.connect(User8).claimEarnings()

            balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
            balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
            balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
            balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
            balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
            balanceTemporal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6 
            balanceTemporal7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6 
            balanceTemporal8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6 
            expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4 + 2 + 2 + 2 + 4)).to.equal(diferenciaEsperadaN8);//Tiene 1032$ esta bien recibe 1% de 200$ es decir 1030 que ya tenia + 2
            expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4 + 2 + 2 + 2)).to.equal(diferenciaEsperadaN7);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
            expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6 + 4 + 2 + 2)).to.equal(diferenciaEsperadaN6);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
            expect(balanceTemporal4 - (balanceInicial4 - 200 + 20 + 6 + 4 + 2)).to.equal(diferenciaEsperadaN5);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal5 - (balanceInicial5 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal6 - (balanceInicial6 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal7 - (balanceInicial7 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
            expect(balanceTemporal8 - (balanceInicial8 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20




             const balanceFinal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
             const balanceFinal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
             const balanceFinal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
             const balanceFinal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
             const balanceFinal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
             const balanceFinal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
             const balanceFinal7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
             const balanceFinal8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6
             const balanceFinal9 = Number((await token.balanceOf(User9.address)).toString()) / 10**6
             const balanceFinal10 = Number((await token.balanceOf(User10.address)).toString()) / 10**6

            //DEBO HACER LOS EQUALS DE LOS FINALES

        });

        it("El reparto del dinero es 70% contrato 20% arbol 10% organizacion", async function () {
            const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
              User5, User6, User7, User8, User9, User10,paymentContract
             } = await loadFixture(deployOneYearLockFixture);
  
            // console.log("");
             
             const diezPorciento = 20
             const veintePorciento = 40
             const setentaPorciento = 140
            
             //COMRPAS RANDOM PARA GENERAR NUMERO
             await multiPool.connect(User2).joinPool(3, User1.address);
             await multiPool.connect(User3).joinPool(3, User2.address);
             await multiPool.connect(User4).joinPool(3, User3.address);
             await multiPool.connect(User5).joinPool(3, User4.address);
             await multiPool.connect(User6).joinPool(3, User5.address);
             await multiPool.connect(User7).joinPool(3, User6.address);
             await multiPool.connect(User8).joinPool(3, User7.address);
             
             //RECLAMAMOS GANANCIAS
             await paymentContract.connect(User1).claimEarnings()
             await paymentContract.connect(User2).claimEarnings()
             await paymentContract.connect(User3).claimEarnings()
             await paymentContract.connect(User4).claimEarnings()
             await paymentContract.connect(User5).claimEarnings()
             await paymentContract.connect(User6).claimEarnings()
             await paymentContract.connect(User7).claimEarnings()
             await paymentContract.connect(WalletReciver).claimEarnings()

            //INICIAMOS LOS BALANCES
             const balanceInicial1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
             const balanceInicial2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
             const balanceInicial3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
             const balanceInicial4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
             const balanceInicial5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
             const balanceInicial6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
             const balanceInicial7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
             const balanceInicial8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6
             const balanceInicial9 = Number((await token.balanceOf(User9.address)).toString()) / 10**6

             const ContratoAntes = Number((await token.balanceOf(paymentContract.getAddress())).toString()) / 10**6
             const WalletReciverAntes = Number((await token.balanceOf(WalletReciver.address)).toString()) / 10**6
             const totalDistributedAntes = Number((await paymentContract.totalDistributed()).toString()) / 10**6
             
             await multiPool.connect(User9).joinPool(3, User8.address);

             await paymentContract.connect(User2).claimEarnings()
             await paymentContract.connect(User3).claimEarnings()
             await paymentContract.connect(User4).claimEarnings()
             await paymentContract.connect(User5).claimEarnings()
             await paymentContract.connect(User6).claimEarnings()
             await paymentContract.connect(User7).claimEarnings()
             await paymentContract.connect(User8).claimEarnings()
             await paymentContract.connect(WalletReciver).claimEarnings()

             const ContratoDespues = Number((await token.balanceOf(paymentContract.getAddress())).toString()) / 10**6
             const WalletReciverDespues = Number((await token.balanceOf(WalletReciver.address)).toString()) / 10**6
             const totalDistributedDespues = Number((await paymentContract.totalDistributed()).toString()) / 10**6


             const balanceDespues1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
             const balanceDespues2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
             const balanceDespues3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
             const balanceDespues4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
             const balanceDespues5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
             const balanceDespues6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
             const balanceDespues7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
             const balanceDespues8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6
             const balanceDespues9 = Number((await token.balanceOf(User9.address)).toString()) / 10**6

             expect(ContratoAntes + setentaPorciento).to.equal(ContratoDespues); 
             expect(WalletReciverAntes + diezPorciento).to.equal(WalletReciverDespues); 
             expect(totalDistributedAntes + veintePorciento).to.equal(totalDistributedDespues);

             expect(balanceInicial1).to.equal(balanceDespues1); //El se queda igual ya que esta en la posicion 8 y solo reparte hasta la 7
             expect(balanceInicial2 + 4).to.equal(balanceDespues2); //Se le suma 4 ya que esta en al posicion 7 y recibe el 2% de 200usd
             expect(balanceInicial3 + 2).to.equal(balanceDespues3); //Se le suma 2 ya que esta en al posicion 6 y recibe el 1% de 200usd
             expect(balanceInicial4 + 2).to.equal(balanceDespues4); //Se le suma 2 ya que esta en al posicion 5 y recibe el 1% de 200usd
             expect(balanceInicial5 + 2).to.equal(balanceDespues5); //Se le suma 2 ya que esta en al posicion 4 y recibe el 1% de 200usd
             expect(balanceInicial6 + 4).to.equal(balanceDespues6); //Se le suma 4 ya que esta en al posicion 3 y recibe el 2% de 200usd
             expect(balanceInicial7 + 6).to.equal(balanceDespues7); //Se le suma 6 ya que esta en al posicion 2 y recibe el 3% de 200usd
             expect(balanceInicial8 + 20).to.equal(balanceDespues8); //Se le suma 20 ya que esta en al posicion 1 y recibe el 10% de 200usd
             expect(balanceInicial9 - 200).to.equal(balanceDespues9); //Se le restan 200usd ya que fue el comprador

        });

        it("Para ir a otra pool debo cumplir con las regla de directos ", async function () {
            const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
              User5, User6, User7, User8, User9, User10
             } = await loadFixture(deployOneYearLockFixture);
  
             
             //Compro 4 veces para cumplir regla de 3 debajo
             await multiPool.connect(User2).joinPool(3, User1.address);
             await multiPool.connect(User2).joinPool(3, User1.address);
             await multiPool.connect(User2).joinPool(3, User1.address);
             await multiPool.connect(User2).joinPool(3, User1.address); 
            
            
             await multiPool.connect(User3).joinPool(3, User2.address); //Aca entra una persona pero falta una mas para tener 2 directos, aca habria 5 en la pool 3 y 0 en la pool 4
            
            //  console.log("COMPRA USUARIO 4 LA POOL 3")
             await multiPool.connect(User4).joinPool(3, User2.address); //Al entrar esta segunda persona con el referido del 2, ya el usuario 2 tiene 2 directos y podria pasar, pero todas las compras las hizo antes debe hacer una nueva
          
             const Pool3Antes =  await multiPool.pools(3);
             const Pool4Antes =  await multiPool.pools(4);
            //  const getCanPass =  await multiPool.getCanPass(3);
            //  const getGetQueue =  await multiPool.getQueue(3);
            //  console.log("getCanPass: ",getCanPass)
            //  console.log("GetQueue: ",getGetQueue)
            //  console.log("numUsers: ",Pool3Antes.numUsers)
            //  console.log("newUsers: ",Pool3Antes.newUsers)
             
            //  console.log("COMPRA")
             //Al hacer esta compra ahora si tiene 2 directos y hay gente suficinete en la Pool 3
             await multiPool.connect(User2).joinPool(3, User1.address);
             

            //  const Pool3Antes2 =  await multiPool.pools(3);
            //  const Pool4Antes2 =  await multiPool.pools(4);
            //  const getCanPass2 =  await multiPool.getCanPass(3);
            //  const getGetQueue2 =  await multiPool.getQueue(3);
            //  console.log("getCanPass: ",getCanPass2)
            //  console.log("GetQueue: ",getGetQueue2)
            //  console.log("numUsers: ",Pool3Antes2.numUsers)
            //  console.log("newUsers: ",Pool3Antes2.newUsers)

             const Pool3Despues =  await multiPool.pools(3);
             const Pool4Despues =  await multiPool.pools(4);
            //  const getQueue3Despues =  await multiPool.getQueue(3);
            //  const getQueue4Despues =  await multiPool.getQueue(4);
           
            //  const getGetQueue4 =  await multiPool.getQueue(4);
            //  console.log(getGetQueue4)
             
            expect(Pool3Antes.numUsers).to.equal(6); //Esta bien ya que no tiene ningun directos
            expect(Pool4Antes.numUsers).to.equal(0); //Esta bien ya que nadie compro pool 4

            expect(Pool3Despues.numUsers).to.equal(6); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
            expect(Pool4Despues.numUsers).to.equal(1); //Esta bien ya que paso el User2

        });
       
        //Se verifican tambien regla: 4,5,6,7,8,9,10,11
        it("Para ir a otr pool debo tener 3 personas debajo  y ademas estas personas no deberieron haber movido a nadie", async function () {
          const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
            User5, User6, User7, User8, User9, User10,paymentContract
           } = await loadFixture(deployOneYearLockFixture);

          //Compro 4 veces para cumplir regla de 3 debajo
          await multiPool.connect(User2).joinPool(3, User1.address);
          await multiPool.connect(User2).joinPool(3, User1.address);
          await multiPool.connect(User2).joinPool(3, User1.address);
          await multiPool.connect(User2).joinPool(3, User1.address); 
         
          await multiPool.connect(User3).joinPool(3, User2.address); //Aca entra una persona pero falta una mas para tener 2 directos, aca habria 5 en la pool 3 y 0 en la pool 4
          await multiPool.connect(User4).joinPool(3, User2.address); //Al entrar esta segunda persona con el referido del 2, ya el usuario 2 tiene 2 directos y podria pasar, pero todas las compras las hizo antes debe hacer una nueva
       
          
          //Al hacer esta compra ahora si tiene 2 directos y hay gente suficinete en la Pool 3 (Los primeros 3, las compras de User2)
          await multiPool.connect(User2).joinPool(3, User1.address);

       
          
          const Pool3Antes =  await multiPool.pools(3);
          const Pool4Antes =  await multiPool.pools(4);

          const getCanPass =  await multiPool.getCanPass(3);
          // console.log("getCanPass: ",getCanPass)
          // console.log("numUsers: ",Pool3Antes.numUsers)
          // console.log("newUsers: ",Pool3Antes.newUsers)
          // console.log("////POOL 4 ////")
          const getCanPass4 =  await multiPool.getCanPass(4);
          // console.log("getCanPass: ",getCanPass4)
          // console.log("numUsers: ",Pool4Antes.numUsers)
          // console.log("newUsers: ",Pool4Antes.newUsers)




           console.log("SEGUNDA COMPRA")
           //Al hacer esta compra ahora si tiene 2 directos y hay gente suficinete en la Pool 3 (Compra de User2,3 y 4)
           await multiPool.connect(User2).joinPool(3, User1.address);


           const Pool3Despues =  await multiPool.pools(3);
           const Pool4Despues =  await multiPool.pools(4);
 
           const getCanPass2 =  await multiPool.getCanPass(3);

          //  console.log("////////////////////////////")
          //  console.log("getCanPass: ",getCanPass2)
          //  console.log("numUsers: ",Pool3Despues.numUsers)
          //  console.log("newUsers: ",Pool3Despues.newUsers)
          //  console.log("////POOL 4 ////")
           const getCanPass42 =  await multiPool.getCanPass(4);
          //  console.log("getCanPass: ",getCanPass42)
          //  console.log("numUsers: ",Pool4Despues.numUsers)
          //  console.log("newUsers: ",Pool4Despues.newUsers)


           const userBalances2 =  await paymentContract.userBalances(User2.address); //280. El 10% de 200 dos veces y dos veces el excedente de pool 3 que son  120 = 280usd
          //  console.log(userBalances2)
          //  console.log(Number((userBalances2).toString()) / 10**6)



           console.log("////////////////////////////")

           await multiPool.connect(User5).joinPool(3, User8.address);
           await multiPool.connect(User6).joinPool(3, User8.address);

           await multiPool.connect(User8).joinPool(3, User1.address);

           await multiPool.connect(User7).joinPool(3, User8.address);


           const Pool3Despues2 =  await multiPool.pools(3);
           const Pool4Despues2 =  await multiPool.pools(4);
 
           const getCanPass22 =  await multiPool.getCanPass(3);

         
          //  console.log("getCanPass: ",getCanPass22)
          //  console.log("numUsers: ",Pool3Despues2.numUsers)
          //  console.log("newUsers: ",Pool3Despues2.newUsers)
          //  console.log("////POOL 4 ////")
           const getCanPass422 =  await multiPool.getCanPass(4);
          //  console.log("getCanPass: ",getCanPass422)
          //  console.log("numUsers: ",Pool4Despues2.numUsers)
          //  console.log("newUsers: ",Pool4Despues2.newUsers)

        });

        it("En el caso de termina el ciclo es decir completar Pool 7, recibo 1600 usd y 500 se usan para empujar 10 posiciones", async function () {
          const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
            User5, User6, User7, User8, User9, User10,paymentContract,User11,User12,
            User13, User14, User15, User16, User17,User18,
           } = await loadFixture(deployOneYearLockFixture);

          //Compro 4 veces para cumplir regla de 3 debajo
          await multiPool.connect(User2).joinPool(1, User1.address);
          await multiPool.connect(User3).joinPool(1, User1.address);
          await multiPool.connect(User4).joinPool(1, User1.address);
          await multiPool.connect(User5).joinPool(1, User1.address); 
         

          const Pool1Antes =  await multiPool.pools(1);
          const Pool2Antes =  await multiPool.pools(2);
          const getCanPass =  await multiPool.getCanPass(1);
          const getCanPass2 =  await multiPool.getCanPass(2);
          
          console.log("////POOL 1 ////")
          console.log("getCanPass: ",getCanPass)
          console.log("numUsers: ",Pool1Antes.numUsers)
          console.log("newUsers: ",Pool1Antes.newUsers)
          console.log("////POOL 2 ////")
          console.log("getCanPass: ",getCanPass2)
          console.log("numUsers: ",Pool2Antes.numUsers)
          console.log("newUsers: ",Pool2Antes.newUsers)


          console.log("//////////////////////////////")

          await multiPool.connect(User10).joinPool(7, User1.address);
          await multiPool.connect(User11).joinPool(7, User1.address);
          await multiPool.connect(User12).joinPool(7, User1.address);
          await multiPool.connect(User12).joinPool(7, User1.address);
          
          const Pool1Antes2 =  await multiPool.pools(1);
          const Pool2Antes2 =  await multiPool.pools(2);
          const Pool7Antes =  await multiPool.pools(7);
          const getCanPass1 =  await multiPool.getCanPass(1);
          const getCanPass22 =  await multiPool.getCanPass(2);
          const getCanPass7 =  await multiPool.getCanPass(2);
          
          console.log("////POOL 1 ////")
          console.log("getCanPass: ",getCanPass1)
          console.log("numUsers: ",Pool1Antes2.numUsers)
          console.log("newUsers: ",Pool1Antes2.newUsers)
          console.log("////POOL 2 ////")
          console.log("getCanPass: ",getCanPass22)
          console.log("numUsers: ",Pool2Antes2.numUsers)
          console.log("newUsers: ",Pool2Antes2.newUsers)
          console.log("////POOL 7 ////")
          console.log("getCanPass: ",getCanPass7)
          console.log("numUsers: ",Pool7Antes.numUsers)
          console.log("newUsers: ",Pool7Antes.newUsers)





        });






















    });
  
  
  });
  