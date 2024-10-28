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
      await token.transfer(User11.address, 10000000000);
      await token.transfer(User12.address, 10000000000);
      await token.transfer(User13.address, 10000000000);
      await token.transfer(User14.address, 10000000000);
      await token.transfer(User15.address, 10000000000);
      await token.transfer(User16.address, 10000000000);
      await token.transfer(User17.address, 10000000000);
      await token.transfer(User18.address, 10000000000);
      await token.transfer(User19.address, 10000000000);
      await token.transfer(User20.address, 10000000000);
      await token.transfer(User21.address, 10000000000);
      await token.transfer(User22.address, 10000000000);
      await token.transfer(User23.address, 10000000000);
      await token.transfer(User24.address, 10000000000);
      await token.transfer(User25.address, 10000000000);
      
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

        // it("Si una persona de mi arbol debajo de mi 7 niveles compra, yo deberia recibir el % establecido", async function () {
        //     const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //       User5, User6, User7, User8, User9, User10
        //      } = await loadFixture(deployOneYearLockFixture);
        //      let balanceTemporal1
        //      let balanceTemporal2
        //      let balanceTemporal3
        //      let balanceTemporal4
        //      let balanceTemporal5
        //      let balanceTemporal6
        //      let balanceTemporal7
        //      let balanceTemporal8
        //      let balanceTemporal9
        //      let balanceTemporal10

        //      const diferenciaEsperadaN1 = 20
        //      const diferenciaEsperadaN2 = 6
        //      const diferenciaEsperadaN3 = 4
        //      const diferenciaEsperadaN4 = 2
        //      const diferenciaEsperadaN5 = 2
        //      const diferenciaEsperadaN6 = 2
        //      const diferenciaEsperadaN7 = 4
        //      const diferenciaEsperadaN8 = 0

        //      //console.log("");
             
        //      const balanceInicial1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
        //      const balanceInicial2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
        //      const balanceInicial3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
        //      const balanceInicial4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
        //      const balanceInicial5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
        //      const balanceInicial6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
        //      const balanceInicial7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
        //      const balanceInicial8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6

        //     ///////////////

        //      await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
             
        //      balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6         
        //      expect(balanceTemporal1 - balanceInicial1).to.equal(diferenciaEsperadaN1);//Tiene 1020$ esta bien recibe 20% de 200$

        //     ///////////////

        //      await multiPool.connect(User3).joinPool(3, User2.address, User3.address);

        //      balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //      balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 

        //      expect(balanceTemporal1 - (balanceInicial1 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 1026$ esta bien recibe 6% de 200$ es decir 1020 que ya tenia + 6
        //      expect(balanceTemporal2 - (balanceInicial2 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20

        //      ///////////////

        //      await multiPool.connect(User4).joinPool(3, User3.address, User4.address);

        //      balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //      balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
        //      balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 



        //      expect(balanceTemporal1 - (balanceInicial1 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 1026$ esta bien recibe 4% de 200$ es decir 1026 que ya tenia + 4
        //      expect(balanceTemporal2 - (balanceInicial2 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 6% de 200$ es decir 826 que ya tenia + 6
        //      expect(balanceTemporal3 - (balanceInicial3 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20

        //     ///////////////

        //      await multiPool.connect(User5).joinPool(3, User4.address, User5.address);

        //      balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //      balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
        //      balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
        //      balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 


        //      expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 1030$ esta bien recibe 1% de 200$ es decir 1028 que ya tenia + 2
        //      expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 830$ esta bien recibe 2% de 200$ es decir 826 que ya tenia + 4
        //      expect(balanceTemporal3 - (balanceInicial3 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 826$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
        //      expect(balanceTemporal4 - (balanceInicial4 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


        //     /////////////// DE ACA PARA ABAJO FALTA DEFINIR BIEN LOS COMENTARIOS

        //     await multiPool.connect(User6).joinPool(3, User5.address, User6.address);

        //     balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //     balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
        //     balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
        //     balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
        //     balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
        //     expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
        //     expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
        //     expect(balanceTemporal4 - (balanceInicial4 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal5 - (balanceInicial4 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


        //     ///////////////

        //     await multiPool.connect(User7).joinPool(3, User6.address, User7.address);

        //     balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //     balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
        //     balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
        //     balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
        //     balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
        //     balanceTemporal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6 
        //     expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4 + 2 + 2)).to.equal(diferenciaEsperadaN6);//Tiene 1032$ esta bien recibe 1% de 200$ es decir 1030 que ya tenia + 2
        //     expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4 + 2)).to.equal(diferenciaEsperadaN5);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
        //     expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
        //     expect(balanceTemporal4 - (balanceInicial4 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal5 - (balanceInicial5 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal6 - (balanceInicial6 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


        //     ///////////////

        //     await multiPool.connect(User8).joinPool(3, User7.address, User8.address);

        //     balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //     balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
        //     balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
        //     balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
        //     balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
        //     balanceTemporal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6 
        //     balanceTemporal7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6 
        //     expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4 + 2 + 2 + 2)).to.equal(diferenciaEsperadaN7);//Tiene 1032$ esta bien recibe 1% de 200$ es decir 1030 que ya tenia + 2
        //     expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4 + 2 + 2)).to.equal(diferenciaEsperadaN6);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
        //     expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6 + 4 + 2)).to.equal(diferenciaEsperadaN5);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
        //     expect(balanceTemporal4 - (balanceInicial4 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal5 - (balanceInicial5 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal6 - (balanceInicial6 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal7 - (balanceInicial7 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20


        //     ///////////////

        //     await multiPool.connect(User9).joinPool(3, User8.address, User9.address);

        //     balanceTemporal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6 
        //     balanceTemporal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6 
        //     balanceTemporal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6 
        //     balanceTemporal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6 
        //     balanceTemporal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6 
        //     balanceTemporal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6 
        //     balanceTemporal7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6 
        //     balanceTemporal8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6 
        //     expect(balanceTemporal1 - (balanceInicial1 + 20 + 6 + 4 + 2 + 2 + 2 + 4)).to.equal(diferenciaEsperadaN8);//Tiene 1032$ esta bien recibe 1% de 200$ es decir 1030 que ya tenia + 2
        //     expect(balanceTemporal2 - (balanceInicial2 - 200 + 20 + 6 + 4 + 2 + 2 + 2)).to.equal(diferenciaEsperadaN7);//Tiene 832$ esta bien recibe 1% de 200$ es decir 830 que ya tenia + 2
        //     expect(balanceTemporal3 - (balanceInicial3 - 200 + 20 + 6 + 4 + 2 + 2)).to.equal(diferenciaEsperadaN6);//Tiene 830$ esta bien recibe 3% de 200$ es decir 820 que ya tenia + 6
        //     expect(balanceTemporal4 - (balanceInicial4 - 200 + 20 + 6 + 4 + 2)).to.equal(diferenciaEsperadaN5);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal5 - (balanceInicial5 - 200 + 20 + 6 + 4)).to.equal(diferenciaEsperadaN4);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal6 - (balanceInicial6 - 200 + 20 + 6)).to.equal(diferenciaEsperadaN3);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal7 - (balanceInicial7 - 200 + 20)).to.equal(diferenciaEsperadaN2);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20
        //     expect(balanceTemporal8 - (balanceInicial8 - 200)).to.equal(diferenciaEsperadaN1);//Tiene 820$ esta bien recibe 20% de 200$ es decir 800 que ya tenia + 20




        //      const balanceFinal1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
        //      const balanceFinal2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
        //      const balanceFinal3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
        //      const balanceFinal4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
        //      const balanceFinal5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
        //      const balanceFinal6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
        //      const balanceFinal7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
        //      const balanceFinal8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6
        //      const balanceFinal9 = Number((await token.balanceOf(User9.address)).toString()) / 10**6
        //      const balanceFinal10 = Number((await token.balanceOf(User10.address)).toString()) / 10**6

        //     //DEBO HACER LOS EQUALS DE LOS FINALES

        // });


        // it("El reparto del dinero es 70% contrato 20% arbol 10% organizacion", async function () {
        //     const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //       User5, User6, User7, User8, User9, User10,paymentContract
        //      } = await loadFixture(deployOneYearLockFixture);
  
        //     // console.log("");
             
        //      const diezPorciento = 20
        //      const veintePorciento = 40
        //      const setentaPorciento = 140

        //      await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //      await multiPool.connect(User3).joinPool(3, User2.address, User3.address);
        //      await multiPool.connect(User4).joinPool(3, User3.address, User4.address);
        //      await multiPool.connect(User5).joinPool(3, User4.address, User5.address);
        //      await multiPool.connect(User6).joinPool(3, User5.address, User6.address);
        //      await multiPool.connect(User7).joinPool(3, User6.address, User7.address);
        //      await multiPool.connect(User8).joinPool(3, User7.address, User8.address);
             
        //      const balanceInicial1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
        //      const balanceInicial2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
        //      const balanceInicial3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
        //      const balanceInicial4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
        //      const balanceInicial5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
        //      const balanceInicial6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
        //      const balanceInicial7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
        //      const balanceInicial8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6
        //      const balanceInicial9 = Number((await token.balanceOf(User9.address)).toString()) / 10**6

        //      const ContratoAntes = Number((await token.balanceOf(paymentContract.getAddress())).toString()) / 10**6
        //      const WalletReciverAntes = Number((await token.balanceOf(WalletReciver.address)).toString()) / 10**6
        //     // const balanceUser9Antes = Number((await token.balanceOf(User9.address)).toString()) / 10**6
        //      const totalDistributedAntes = Number((await multiPool.totalDistributed()).toString()) / 10**6
             
        //      await multiPool.connect(User9).joinPool(3, User8.address, User9.address);
        //      const ContratoDespues = Number((await token.balanceOf(paymentContract.getAddress())).toString()) / 10**6
        //      const WalletReciverDespues = Number((await token.balanceOf(WalletReciver.address)).toString()) / 10**6
        //    //  const balanceUser9Despues = Number((await token.balanceOf(User9.address)).toString()) / 10**6
        //      const totalDistributedDespues = Number((await multiPool.totalDistributed()).toString()) / 10**6


        //      const balanceDespues1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
        //      const balanceDespues2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
        //      const balanceDespues3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
        //      const balanceDespues4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
        //      const balanceDespues5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6
        //      const balanceDespues6 = Number((await token.balanceOf(User6.address)).toString()) / 10**6
        //      const balanceDespues7 = Number((await token.balanceOf(User7.address)).toString()) / 10**6
        //      const balanceDespues8 = Number((await token.balanceOf(User8.address)).toString()) / 10**6
        //      const balanceDespues9 = Number((await token.balanceOf(User9.address)).toString()) / 10**6


        //     //  console.log("Balance de usuario1 antes: ",balanceInicial1)
        //     //  console.log("Balance de usuario2 antes: ",balanceInicial2)
        //     //  console.log("Balance de usuario3 antes: ",balanceInicial3)
        //     //  console.log("Balance de usuario4 antes: ",balanceInicial4)
        //     //  console.log("Balance de usuario5 antes: ",balanceInicial5)
        //     //  console.log("Balance de usuario6 antes: ",balanceInicial6)
        //     //  console.log("Balance de usuario7 antes: ",balanceInicial7)
        //     //  console.log("Balance de usuario8 antes: ",balanceInicial8)
        //     //  console.log("Balance de usuario9 antes: ",balanceInicial9)

        //     //  console.log("Balance de usuario1 despues: ",balanceDespues1)
        //     //  console.log("Balance de usuario2 despues: ",balanceDespues2)
        //     //  console.log("Balance de usuario3 despues: ",balanceDespues3)
        //     //  console.log("Balance de usuario4 despues: ",balanceDespues4)
        //     //  console.log("Balance de usuario5 despues: ",balanceDespues5)
        //     //  console.log("Balance de usuario6 despues: ",balanceDespues6)
        //     //  console.log("Balance de usuario7 despues: ",balanceDespues7)
        //     //  console.log("Balance de usuario8 despues: ",balanceDespues8)
        //     //  console.log("Balance de usuario9 despues: ",balanceDespues9)


        //      expect(ContratoAntes + setentaPorciento).to.equal(ContratoDespues); 
        //      expect(WalletReciverAntes + diezPorciento).to.equal(WalletReciverDespues); 
        //      expect(totalDistributedAntes + veintePorciento).to.equal(totalDistributedDespues);

        //      expect(balanceInicial1).to.equal(balanceDespues1); //El se queda igual ya que esta en la posicion 8 y solo reparte hasta la 7
        //      expect(balanceInicial2 + 4).to.equal(balanceDespues2); //Se le suma 4 ya que esta en al posicion 7 y recibe el 2% de 200usd
        //      expect(balanceInicial3 + 2).to.equal(balanceDespues3); //Se le suma 2 ya que esta en al posicion 6 y recibe el 1% de 200usd
        //      expect(balanceInicial4 + 2).to.equal(balanceDespues4); //Se le suma 2 ya que esta en al posicion 5 y recibe el 1% de 200usd
        //      expect(balanceInicial5 + 2).to.equal(balanceDespues5); //Se le suma 2 ya que esta en al posicion 4 y recibe el 1% de 200usd
        //      expect(balanceInicial6 + 4).to.equal(balanceDespues6); //Se le suma 4 ya que esta en al posicion 3 y recibe el 2% de 200usd
        //      expect(balanceInicial7 + 6).to.equal(balanceDespues7); //Se le suma 6 ya que esta en al posicion 2 y recibe el 3% de 200usd
        //      expect(balanceInicial8 + 20).to.equal(balanceDespues8); //Se le suma 20 ya que esta en al posicion 1 y recibe el 10% de 200usd
        //      expect(balanceInicial9 - 200).to.equal(balanceDespues9); //Se le restan 200usd ya que fue el comprador

        // });

        // it("Para ir a otra pool debo cumplir con las regla de directos ", async function () {
        //     const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //       User5, User6, User7, User8, User9, User10
        //      } = await loadFixture(deployOneYearLockFixture);
  
             
        //      await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //      await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //      await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //      await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Aca no se mueve ya que no tiene minimo de directos (2)
        //      const Pool3Antes =  await multiPool.pools(3);
        //      const Pool4Antes =  await multiPool.pools(4);
        //      const getQueue3Antes =  await multiPool.getQueue(3);
        //      const getQueue4Antes =  await multiPool.getQueue(4);
        //      await multiPool.connect(User3).joinPool(3, User2.address, User3.address); //Aca entra una persona pero falta una mas para tener 2 directos, aca habria 5 en la pool 3 y 0 en la pool 4
        //      await multiPool.connect(User4).joinPool(3, User2.address, User4.address); //Al entrar esta segunda persona con el referido del 2, ya el usuario 2 tiene 2 directos y puede pasar
        //      const Pool3Despues =  await multiPool.pools(3);
        //      const Pool4Despues =  await multiPool.pools(4);
        //      const getQueue3Despues =  await multiPool.getQueue(3);
        //      const getQueue4Despues =  await multiPool.getQueue(4);
           
        //     //  console.log(Pool3Antes.numUsers)
        //     //  console.log(Pool4Antes.numUsers)
        //     //  console.log(getQueue3Antes)
        //     //  console.log(getQueue4Antes)
             
        //     //  console.log(Pool3Despues.numUsers)
        //     //  console.log(Pool4Despues.numUsers)
        //     //  console.log(getQueue3Despues)
        //     //  console.log(getQueue4Despues)
             
        //     expect(Pool3Antes.numUsers).to.equal(4); //Esta bien ya que no tiene ningun directos
        //     expect(Pool4Antes.numUsers).to.equal(0); //Esta bien ya que nadie compro pool 5

        //     expect(Pool3Despues.numUsers).to.equal(5); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //     expect(Pool4Despues.numUsers).to.equal(1); //Esta bien ya que paso el User2

        // });


        // it("Para ir a otr pool debo tener 3 personas debajo  y ademas estas personas no deberieron haber movido a nadie", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //    } = await loadFixture(deployOneYearLockFixture);

           



           
        //    await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //    await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //    await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //    await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Aca no se mueve ya que no tiene minimo de directos (2)



        //    const Pool3Antes =  await multiPool.pools(3);
        //    const Pool4Antes =  await multiPool.pools(4);
        //    await multiPool.connect(User3).joinPool(3, User2.address, User3.address); //Aca entra una persona pero falta una mas para tener 2 directos, aca habria 5 en la pool 3 y 0 en la pool 4
           


        //    await multiPool.connect(User4).joinPool(3, User2.address, User4.address); //Al entrar esta segunda persona con el referido del 2, ya el usuario 2 tiene 2 directos y puede pasar


        //asd
        //    const Pool3Despues =  await multiPool.pools(3);
        //    const Pool4Despues =  await multiPool.pools(4);



        //    //HASTA ACA IGUAL QUE EL ANTERIOR



        //    await multiPool.connect(User5).joinPool(3, User2.address, User5.address); // Aca empuja de nuevo a usuario 2 ya que user3, user4 y usuario 5 son nuevos

           
        //    await multiPool.connect(User6).joinPool(3, User2.address, User6.address); //Aca seria el usuario 6 la unica persona nueva
           
        //    const Pool3Despues2 =  await multiPool.pools(3);
        //    const Pool4Despues2 =  await multiPool.pools(4);




        //   expect(Pool3Antes.numUsers).to.equal(4); //Esta bien ya que no tiene ningun directos
        //   expect(Pool4Antes.numUsers).to.equal(0); //Esta bien ya que nadie compro pool 5

        //   expect(Pool3Despues.numUsers).to.equal(5); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //   expect(Pool4Despues.numUsers).to.equal(1); //Esta bien ya que paso el User2

        //   expect(Pool3Despues2.numUsers).to.equal(6); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //   expect(Pool4Despues2.numUsers).to.equal(2); //Esta bien ya que paso el User2

        // });


        // it("Para ir a otro pool debo cumplir con la regla 5 y 6 juntas", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);

          
          
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Aca no se mueve ya que no tiene minimo de directos (2)



        //   const Pool3Antes =  await multiPool.pools(3);
        //   const Pool4Antes =  await multiPool.pools(4);
        //   await multiPool.connect(User3).joinPool(3, User2.address, User3.address); //Aca entra una persona pero falta una mas para tener 2 directos, aca habria 5 en la pool 3 y 0 en la pool 4
          


        //   await multiPool.connect(User4).joinPool(3, User2.address, User4.address); //Al entrar esta segunda persona con el referido del 2, ya el usuario 2 tiene 2 directos y puede pasar



        //   const Pool3Despues =  await multiPool.pools(3);
        //   const Pool4Despues =  await multiPool.pools(4);



        //   //HASTA ACA IGUAL QUE EL ANTERIOR



        //   await multiPool.connect(User5).joinPool(3, User2.address, User5.address); // Aca empuja de nuevo a usuario 2 ya que user3, user4 y usuario 5 son nuevos

          
        //   await multiPool.connect(User6).joinPool(3, User2.address, User6.address); //Aca seria el usuario 6 la unica persona nueva
          
        //   const Pool3Despues2 =  await multiPool.pools(3);
        //   const Pool4Despues2 =  await multiPool.pools(4);




        //   expect(Pool3Antes.numUsers).to.equal(4); //Esta bien ya que no tiene ningun directos
        //   expect(Pool4Antes.numUsers).to.equal(0); //Esta bien ya que nadie compro pool 5

        //   expect(Pool3Despues.numUsers).to.equal(5); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //   expect(Pool4Despues.numUsers).to.equal(1); //Esta bien ya que paso el User2

        //   expect(Pool3Despues2.numUsers).to.equal(6); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //   expect(Pool4Despues2.numUsers).to.equal(2); //Esta bien ya que paso el User2

        // });


        // it("Si no cumplo con la cantidad minma de directos no paso", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);

          
          
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Aca (se deberia mover) pero... no se mueve ya que no tiene minimo de directos (2) que son necesarios para pasar de la pool 3 a la 4

          
        //   const Pool3Despues =  await multiPool.pools(3);
        //   const Pool4Despues =  await multiPool.pools(4);

        //   expect(Pool3Despues.numUsers).to.equal(4); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //   expect(Pool4Despues.numUsers).to.equal(0); //Esta bien ya que paso el User2

        // });

        // it("Si no no tengo 3 personas debajo no paso", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);

          
          
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address);//Aca (podria ser movido) pero... no se mueve ya que no tiene 3 personas NUEVAS debajo de el

        //   await multiPool.connect(User3).joinPool(4, User2.address, User3.address);
        //   await multiPool.connect(User4).joinPool(4, User2.address, User4.address);
        //   await multiPool.connect(User5).joinPool(4, User2.address, User5.address); 

          
        //   const Pool3Despues =  await multiPool.pools(3);
        //   const Pool4Despues =  await multiPool.pools(4);

        //   expect(Pool3Despues.numUsers).to.equal(1); //Esta bien ya que de las 6 personas paso el usuario 2 que es el unico en tener 3 debajo nuevos y con 2 directos
        //   expect(Pool4Despues.numUsers).to.equal(3); //Esta bien ya que paso el User2

        // });

        // it("Si paso cumple directos que busque alguien debajo", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);

        // //  console.log("SI NO CUMPLE QUE BUSQUE ABAJO ")

        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Compra user2 pero para no pasar
        //   await multiPool.connect(User3).joinPool(3, User1.address, User3.address); //Compra user3 para luego tener mas directos que user2 y si pasar

        //   await multiPool.connect(User4).joinPool(5, User3.address, User4.address); //Compra en la pool 5 el usuario 4 para hacer pasar al usuario 3
        //   await multiPool.connect(User5).joinPool(5, User3.address, User5.address); //Compra en la pool 5 el usuario 5 para hacer pasar al usuario 3
        //   await multiPool.connect(User6).joinPool(5, User3.address, User6.address); //Compra en la pool 5 el usuario 6 para hacer pasar al usuario 3
          
        //   await multiPool.connect(User7).joinPool(3, User1.address, User7.address); //Compra el usuario 7 en la pool 3 para que haya 3 personas nuevas y pase el ususario 3 y no el 2
        //   await multiPool.connect(User7).joinPool(3, User1.address, User7.address); //Compra el usuario 7 en la pool 3 para que haya 3 personas nuevas y pase el ususario 3 y no el 2, aca pasa y se le suma un missed a el usuario 2
        //   const getInfoUser =  await multiPool.getInfoUser(User2.address);
        //   // console.log(getInfoUser)

        //   const getQueue32 =  await multiPool.getQueue(3);
        //   const getQueue42 =  await multiPool.getQueue(4);
        //   const getQueue52 =  await multiPool.getQueue(5);
        
        //    const Pool3Despues =  await multiPool.pools(3);
        //    const Pool4Despues =  await multiPool.pools(4);
        //    const Pool5Despues =  await multiPool.pools(5);
        //   // console.log("CANTIDAD DE PERDIDAS")
        //   // console.log(getInfoUser[2])
        //    expect(getInfoUser[2]).to.equal(4); //Esta bien ya que perdio 1 oportunidad el usuario 2 de pasar
        //    expect(Pool3Despues.numUsers).to.equal(3); //Esta bien ya que en el pool 3 quedaron usuario 2 1 ves y usuario 7 2 veces
        //    expect(Pool4Despues.numUsers).to.equal(1); //Esta bien ya que paso el User3 ya que tiene los directos y 3 abajo
        //    expect(Pool5Despues.numUsers).to.equal(3); //Esta bien ya que los usuario 4,5,6 comprar aca
        //    expect(getQueue42[0]).to.equal(User3.address); //Esta bien ya que los usuario 3 el unico en cumplir en la Pool 3 con los directos y personas nuevas

        // });

        // it("Si no cumple con 3 personas abajo que busque alguien debajo ¿Podria pasar??????", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);

          
          
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Compra user2 pero para no pasar
        //   await multiPool.connect(User3).joinPool(3, User1.address, User3.address); //Compra user3 para luego tener mas directos que user2 y si pasar

        //   await multiPool.connect(User4).joinPool(5, User3.address, User4.address); //Compra en la pool 5 el usuario 4 para hacer pasar al usuario 3
        //   await multiPool.connect(User5).joinPool(5, User3.address, User5.address); //Compra en la pool 5 el usuario 5 para hacer pasar al usuario 3
        //   await multiPool.connect(User6).joinPool(5, User3.address, User6.address); //Compra en la pool 5 el usuario 6 para hacer pasar al usuario 3


        //   const getQueue3 =  await multiPool.getQueue(3);
        //   const getQueue4 =  await multiPool.getQueue(4);
        //   const getQueue5 =  await multiPool.getQueue(5);
      
        //   // console.log(getQueue3)
        //   // console.log(getQueue4)
        //   // console.log(getQueue5)
          
        //   await multiPool.connect(User7).joinPool(3, User1.address, User7.address); //Compra el usuario 7 en la pool 3 para que haya 3 personas nuevas y pase el ususario 3 y no el 2
        //   await multiPool.connect(User7).joinPool(3, User1.address, User7.address); //Compra el usuario 7 en la pool 3 para que haya 3 personas nuevas y pase el ususario 3 y no el 2, aca pasa y se le suma un missed a el usuario 2
        //   const getInfoUser =  await multiPool.getInfoUser(User2.address);
        //   // console.log(getInfoUser)

        //   const getQueue32 =  await multiPool.getQueue(3);
        //   const getQueue42 =  await multiPool.getQueue(4);
        //   const getQueue52 =  await multiPool.getQueue(5);
        //   // console.log(getQueue32)
        //   // console.log(getQueue42)
        //   // console.log(getQueue52)


        //    const Pool3Despues =  await multiPool.pools(3);
        //    const Pool4Despues =  await multiPool.pools(4);
        //    const Pool5Despues =  await multiPool.pools(5);

        //    expect(getInfoUser[2]).to.equal(4); //Esta bien ya que perdio 1 oportunidad el usuario 2 de pasar
        //    expect(Pool3Despues.numUsers).to.equal(3); //Esta bien ya que en el pool 3 quedaron usuario 2 1 ves y usuario 7 2 veces
        //    expect(Pool4Despues.numUsers).to.equal(1); //Esta bien ya que paso el User3 ya que tiene los directos y 3 abajo
        //    expect(Pool5Despues.numUsers).to.equal(3); //Esta bien ya que los usuario 4,5,6 comprar aca
        //    expect(getQueue42[0]).to.equal(User3.address); //Esta bien ya que los usuario 3 el unico en cumplir en la Pool 3 con los directos y personas nuevas

        // });

        // it("Si paso de una Pool a otra debo recibir el excedente", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);
        //   // console.log("AAAAAAAAA")

          
        //   const balanceAntes =  await token.balanceOf(User2.address);
        //   await multiPool.connect(User2).joinPool(3, User1.address, User2.address); //Compra user2 la pool 3
          
        //   await multiPool.connect(User3).joinPool(3, User2.address, User3.address); //Compra user3 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User4).joinPool(3, User2.address, User4.address); //Compra user4 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User5).joinPool(3, User2.address, User5.address); //Compra user5 el pool 3 y le da 20 a user 2
        //   const balanceDespues =  await token.balanceOf(User2.address);
          

        //   const balanceAntes2 = ethers.formatUnits(balanceAntes, 6);
        //   const balanceDespues2 = ethers.formatUnits(balanceDespues, 6);


        //   // console.log("despues")
        //   // console.log(balanceAntes2)
        //   // console.log(balanceDespues2)


        //   expect(Number(balanceDespues2)).to.equal((balanceAntes2 - 200) + 60 + 120);

        // });

        // it("En el caso de termina el ciclo es decir completar Pool 7, recibo 1600 usd y 500 se usan para empujar 10 posiciones en Pool 1", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10
        //   } = await loadFixture(deployOneYearLockFixture);

        //   await token.transfer(User3.address, 99000000000);
        //   await token.transfer(User2.address, 99000000000);
          
        //   const balanceAntes =  await token.balanceOf(User3.address);
        //   await multiPool.connect(User2).joinPool(1, User1.address, User2.address); //Compra user2 la pool 3
        //   await multiPool.connect(User3).joinPool(1, User1.address, User3.address); //Compra user2 la pool 3
        //   await multiPool.connect(User4).joinPool(1, User1.address, User4.address); //Compra user2 la pool 3
        //   await multiPool.connect(User5).joinPool(1, User1.address, User5.address); //Compra user2 la pool 3
        //   await multiPool.connect(User6).joinPool(1, User1.address, User6.address); //Compra user2 la pool 3
        //   await multiPool.connect(User7).joinPool(1, User1.address, User7.address); //Compra user2 la pool 3
        //   await multiPool.connect(User8).joinPool(1, User1.address, User8.address); //Compra user2 la pool 3


        //   const getQueue1 =  await multiPool.getQueue(1);
        //   const getQueue2 =  await multiPool.getQueue(2);
        //   const getQueue7 =  await multiPool.getQueue(7);



        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user3 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user4 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user5 el pool 3 y le da 20 a user 2
        //   await multiPool.connect(User3).joinPool(7, User2.address, User3.address); //Compra user5 el pool 3 y le da 20 a user 2
        
        //   const getQueue12 =  await multiPool.getQueue(1);
        //   const getQueue22 =  await multiPool.getQueue(2);
        //   const getQueue32 =  await multiPool.getQueue(3);
        //   const getQueue42 =  await multiPool.getQueue(4);
        //   const getQueue72 =  await multiPool.getQueue(7);

        //   const balanceDespues =  await token.balanceOf(User3.address);
          

        //   const balanceAntes2 = ethers.formatUnits(balanceAntes, 6);
        //   const balanceDespues2 = ethers.formatUnits(balanceDespues, 6);


        //   // console.log("despues")
        //   // console.log(balanceAntes2)
        //   // console.log(balanceDespues2)



        //   // console.log("Posiciones antes")
        //   // console.log(getQueue1)
        //   // console.log(getQueue2)
        //   // console.log(getQueue7)
        //   // console.log("Posiciones despues")
        //   // console.log(getQueue12)
        //   // console.log(getQueue22)
        //   // console.log(getQueue32)
        //   // console.log(getQueue42)
        //   // console.log(getQueue72)

          
        //   // console.log("Posiciones despues")
          
        //   const Pool1 =  await multiPool.pools(1);
        //   const Pool2 =  await multiPool.pools(2);
        //   const Pool7 =  await multiPool.pools(7);


        //   expect(Pool1.numUsers).to.equal(2); //Esta bien ya que la pool 1 la compraron 7 personas y de esas 2 fueron movidas a la pool 2, luego de completar la pool 7 quedaron 2 ya que al completarse se mueven 3 personas
        //   expect(Pool2.numUsers).to.equal(5); //Esta bien ya que habi 2 y se mueveron de la pool 1 a la 2 3 personas
        //   expect(Pool7.numUsers).to.equal(3); //Esta bien ya que en la pool 7 habia 4 y 1 la completo y se fue del sistema

        // });


        // it("Si se llega a un momento de emergencia las primeras 20 wallet votaran que hacer, si repartir el dinero o que siga el proyecto", async function () {
        //   const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
        //     User5, User6, User7, User8, User9, User10,paymentContract
        //     ,User11, User12, User13, User14,
        //     User15, User16, User17, User18, User19, User20
        //     ,User21, User22, User23, User24, User25
        //   } = await loadFixture(deployOneYearLockFixture);

   
          
        //   await multiPool.connect(User1).joinPool(2, owner.address, User1.address); //Compra user2 la pool 3
        //   await multiPool.connect(User2).joinPool(2, User1.address, User2.address); //Compra user2 la pool 3
        //   await multiPool.connect(User3).joinPool(2, User2.address, User3.address); //Compra user2 la pool 3
        //   await multiPool.connect(User4).joinPool(2, User3.address, User4.address); //Compra user2 la pool 3
        //   await multiPool.connect(User5).joinPool(2, User4.address, User5.address); //Compra user2 la pool 3
        //   await multiPool.connect(User6).joinPool(2, User5.address, User6.address); //Compra user2 la pool 3
        //   await multiPool.connect(User7).joinPool(2, User6.address, User7.address); //Compra user2 la pool 3
        //   await multiPool.connect(User8).joinPool(2, User7.address, User8.address); //Compra user2 la pool 3
        //   await multiPool.connect(User9).joinPool(2, User8.address, User9.address); //Compra user2 la pool 3
        //   await multiPool.connect(User10).joinPool(2, User9.address, User10.address); //Compra user2 la pool 3
        //   await multiPool.connect(User11).joinPool(2, User10.address, User11.address); //Compra user2 la pool 3
        //   await multiPool.connect(User12).joinPool(2, User11.address, User12.address); //Compra user2 la pool 3
        //   await multiPool.connect(User13).joinPool(2, User12.address, User13.address); //Compra user2 la pool 3
        //   await multiPool.connect(User14).joinPool(2, User13.address, User14.address); //Compra user2 la pool 3
        //   await multiPool.connect(User15).joinPool(2, User14.address, User15.address); //Compra user2 la pool 3
        //   await multiPool.connect(User16).joinPool(2, User15.address, User16.address); //Compra user2 la pool 3
        //   await multiPool.connect(User17).joinPool(2, User16.address, User17.address); //Compra user2 la pool 3
        //   await multiPool.connect(User18).joinPool(6, User17.address, User18.address); //Compra user2 la pool 3
        //   await multiPool.connect(User19).joinPool(6, User18.address, User19.address); //Compra user2 la pool 3
        //   await multiPool.connect(User20).joinPool(6, User19.address, User20.address); //Compra user2 la pool 3
        //   await multiPool.connect(User21).joinPool(6, User20.address, User21.address); //Compra user2 la pool 3
        //   await multiPool.connect(User22).joinPool(6, User21.address, User22.address); //Compra user2 la pool 3
        //   await multiPool.connect(User23).joinPool(7, User22.address, User23.address); //Compra user2 la pool 3
        //   await multiPool.connect(User24).joinPool(7, User23.address, User24.address); //Compra user2 la pool 3
        //   const balanceContrato =  await token.balanceOf(await paymentContract.getAddress());

        //   const earlyInvestors =  await paymentContract.getEarlyInvestorsLength();
        //   // console.log(earlyInvestors)


        //   const balanceAntes4 =  await token.balanceOf(User4.address);
        //   const balanceAntes5 =  await token.balanceOf(User5.address);
        //   const balanceAntes6 =  await token.balanceOf(User6.address);

        //   const balanceAntes18 =  await token.balanceOf(User18.address);
        //   const balanceAntes19 =  await token.balanceOf(User19.address);
        //   const balanceAntes20 =  await token.balanceOf(User20.address);

        //   const balanceAntes23 =  await token.balanceOf(User23.address);
        //   const balanceAntes24 =  await token.balanceOf(User24.address);

        //   // console.log(ethers.formatUnits(balanceContrato, 6))
        //   // console.log(ethers.formatUnits(balanceAntes4, 6))
        //   // console.log(ethers.formatUnits(balanceAntes5, 6))
        //   // console.log(ethers.formatUnits(balanceAntes6, 6))
        //   // console.log(ethers.formatUnits(balanceAntes18, 6))
        //   // console.log(ethers.formatUnits(balanceAntes19, 6))
        //   // console.log(ethers.formatUnits(balanceAntes20, 6))
        //   // console.log(ethers.formatUnits(balanceAntes23, 6))
        //   // console.log(ethers.formatUnits(balanceAntes24, 6))

        //   await paymentContract.connect(User20).startEmergencyVote();
          
        //   await paymentContract.connect(User1).voteForEmergency(true);
        //   await paymentContract.connect(User2).voteForEmergency(true);
        //   await paymentContract.connect(User3).voteForEmergency(true);
        //   await paymentContract.connect(User4).voteForEmergency(true);
        //   await paymentContract.connect(User5).voteForEmergency(true);
        //   await paymentContract.connect(User6).voteForEmergency(true);
        //   await paymentContract.connect(User7).voteForEmergency(true);
        //   await paymentContract.connect(User8).voteForEmergency(true);
        //   await paymentContract.connect(User9).voteForEmergency(true);
        //   await paymentContract.connect(User10).voteForEmergency(true);
        //   await paymentContract.connect(User11).voteForEmergency(true);


        //   const balanceContrato2 =  await token.balanceOf(await paymentContract.getAddress());
        //   const balanceAntes42 =  await token.balanceOf(User4.address);
        //   const balanceAntes52 =  await token.balanceOf(User5.address);
        //   const balanceAntes62 =  await token.balanceOf(User6.address);
        //   const balanceAntes182 =  await token.balanceOf(User18.address);
        //   const balanceAntes192 =  await token.balanceOf(User19.address);
        //   const balanceAntes202 =  await token.balanceOf(User20.address);
        //   const balanceAntes232 =  await token.balanceOf(User23.address);
        //   const balanceAntes242 =  await token.balanceOf(User24.address);

        //   // console.log("/////DESPUES/////")
        //   // console.log(ethers.formatUnits(balanceContrato2, 6))
        //   // console.log(ethers.formatUnits(balanceAntes42, 6))
        //   // console.log(ethers.formatUnits(balanceAntes52, 6))
        //   // console.log(ethers.formatUnits(balanceAntes62, 6))

        //   // console.log(ethers.formatUnits(balanceAntes182, 6))
        //   // console.log(ethers.formatUnits(balanceAntes192, 6))
        //   // console.log(ethers.formatUnits(balanceAntes202, 6))
        //   // console.log(ethers.formatUnits(balanceAntes232, 6))
        //   // console.log(ethers.formatUnits(balanceAntes242, 6))



        // });



        it("Verificando logica de niveles", async function () {
          const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
            User5, User6, User7, User8, User9, User10,paymentContract
            ,User11, User12, User13, User14,
            User15, User16, User17, User18, User19, User20
            ,User21, User22, User23, User24, User25
          } = await loadFixture(deployOneYearLockFixture);

          
          const balanceInicial = Number((await token.balanceOf(owner.address)).toString()) / 10**6
          await multiPool.connect(User1).joinPool(2, owner.address, User1.address); //Compra



          await multiPool.connect(User2).joinPool(2, User1.address, User2.address); //Compra nivel 1 de User1
          await multiPool.connect(User3).joinPool(2, User1.address, User3.address); //Compra nivel 1 de User1
          const balanceDespues = Number((await token.balanceOf(owner.address)).toString()) / 10**6


          await multiPool.connect(User4).joinPool(2, User2.address, User4.address); //Compra nivel 2 de User1
          await multiPool.connect(User5).joinPool(2, User2.address, User5.address); //Compra nivel 2 de User1
          await multiPool.connect(User6).joinPool(2, User3.address, User6.address); //Compra nivel 2 de User1
          
          console.log("COMPRA QUE SUMA A NIVEL 1 DE USER1")
          await multiPool.connect(User7).joinPool(2, User6.address, User7.address); //Compra nivel 3 de User1
          // await multiPool.connect(User8).joinPool(2, User6.address, User8.address); //Compra nivel 3 de User1
          // await multiPool.connect(User9).joinPool(2, User6.address, User9.address); //Compra nivel 3 de User1
  

          const getQueue1 =  await multiPool.getQueue(1);
          const getQueue2 =  await multiPool.getQueue(2);
          const getQueue3 =  await multiPool.getQueue(3);
          
          const referralsByLevelLevel1 =  await multiPool.referralsByLevel(User1.address,0);
          const amountInvestInLevels1 =  await multiPool.amountInvestInLevels(User1.address,0);

          const referralsByLevelLevel2 =  await multiPool.referralsByLevel(User1.address,1);
          const amountInvestInLevels2 =  await multiPool.amountInvestInLevels(User1.address,1);

          const referralsByLevelLevel3 =  await multiPool.referralsByLevel(User1.address,2);
          const amountInvestInLevels3 =  await multiPool.amountInvestInLevels(User1.address,2);

          const referralsByLevelLevel4 =  await multiPool.referralsByLevel(User1.address,3);
          const amountInvestInLevels4 =  await multiPool.amountInvestInLevels(User1.address,3);

          const referralsByLevelLevel5 =  await multiPool.referralsByLevel(User1.address,4);
          const amountInvestInLevels5 =  await multiPool.amountInvestInLevels(User1.address,4);


          const referralsByLevelLevel6 =  await multiPool.referralsByLevel(User1.address,5);
          const amountInvestInLevels6 =  await multiPool.amountInvestInLevels(User1.address,5);

          const referralsByLevelLevel7 =  await multiPool.referralsByLevel(User1.address,6);
          const amountInvestInLevels7 =  await multiPool.amountInvestInLevels(User1.address,6);


          console.log("Cantidad de dinero invertido en nivel 1: ",ethers.formatUnits(amountInvestInLevels1, 6))
          console.log("Cantidad de inversores en nivel 1: ",referralsByLevelLevel1)

          console.log("Cantidad de dinero invertido en nivel 2: ",ethers.formatUnits(amountInvestInLevels2, 6))
          console.log("Cantidad de inversores en nivel 2: ",referralsByLevelLevel2)

          console.log("Cantidad de dinero invertido en nivel 3: ",ethers.formatUnits(amountInvestInLevels3, 6))
          console.log("Cantidad de inversores en nivel 3: ",referralsByLevelLevel3)

          console.log("Cantidad de dinero invertido en nivel 4: ",ethers.formatUnits(amountInvestInLevels4, 6))
          console.log("Cantidad de inversores en nivel 4: ",referralsByLevelLevel4)

          console.log("Cantidad de dinero invertido en nivel 5: ",ethers.formatUnits(amountInvestInLevels5, 6))
          console.log("Cantidad de inversores en nivel 5: ",referralsByLevelLevel5)

          console.log("Cantidad de dinero invertido en nivel 6: ",ethers.formatUnits(amountInvestInLevels6, 6))
          console.log("Cantidad de inversores en nivel 6: ",referralsByLevelLevel6)

          console.log("Cantidad de dinero invertido en nivel 7: ",ethers.formatUnits(amountInvestInLevels7, 6))
          console.log("Cantidad de inversores en nivel 7: ",referralsByLevelLevel7)




         console.log(getQueue1)
         console.log(getQueue2)
         console.log(getQueue3)


         console.log(balanceInicial)
         console.log(balanceDespues)

        });

    });
  
  
  });
  