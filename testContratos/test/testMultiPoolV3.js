const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
describe("Test", function () {
  async function deployOneYearLockFixture() {


    // Contracts are deployed using the first signer/account by default
    const [owner, WalletReciver, User1, User2, User3, User4, 
      User5, User6, User7, User8, User9, User10] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockUSDT"); 
    //Deploy Token
    const token = await Token.deploy();

    const MultiPool = await ethers.getContractFactory("multiPoolV3");  
    //Deploy del contrato pasandole el token creado simulando USDT y la WalletReciver como receptora de ganancias
    const multiPool = await MultiPool.deploy(token.getAddress(), WalletReciver.address);  

    return { token, multiPool, owner, WalletReciver, User1, User2, User3, User4,
      User5, User6, User7, User8, User9, User10
     };
  }

    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { token,multiPool, owner, WalletReciver, User1, User2, User3, User4,
          User5, User6, User7, User8, User9, User10
         } = await loadFixture(deployOneYearLockFixture);
      
        
        //El owner envia 5000usd a User2
        await token.transfer(User2.address, 10000000000);
        
        //El owner envia 5000usd a User3
        await token.transfer(User3.address, 10000000000);

        await token.transfer(User4.address, 10000000000);

        await token.transfer(User5.address, 10000000000);

        await token.transfer(User6.address, 10000000000);
        
        console.log("Los usuarios reciben 10.000usd")
        
        //Aprueba y compra Pool 1 el User2
        await token.connect(User2).approve(multiPool.getAddress(), 50000000000); 
        await token.connect(User3).approve(multiPool.getAddress(), 50000000000); 
        await token.connect(User4).approve(multiPool.getAddress(), 50000000000); 
        await token.connect(User5).approve(multiPool.getAddress(), 50000000000); 
        await token.connect(User6).approve(multiPool.getAddress(), 50000000000); 

        
        

        const antesEjecutar = async(pool,wallet) =>{
          console.log("/////////// ANTES DE COMPRA //////////////////")
          const balance1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
          const balance2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
          const balance3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
          const balance4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
          const balance5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6

          const walletVault = Number((await token.balanceOf(WalletReciver.address)).toString()) / 10**6;

          const Pool1 =  await multiPool.pools(1);
          const Pool2 =  await multiPool.pools(2);
          const Pool3 =  await multiPool.pools(3);
          const Pool4 =  await multiPool.pools(4);

          const getQueue1 =  await multiPool.getQueue(1);
          const getQueue2 =  await multiPool.getQueue(2);
          const getQueue3 =  await multiPool.getQueue(3);
          const getQueue4 =  await multiPool.getQueue(4);


          const getPurchases =  await multiPool.getPurchases(wallet.address);
          const getInfoUser =  await multiPool.getInfoUser(wallet.address);
  
          console.log("Balance de Vault :", walletVault); 

          console.log("Balance de Usuario 1: ", balance1); 
          console.log("Balance de Usuario 2: ", balance2); 
          console.log("Balance de Usuario 3: ", balance3); 
          console.log("Balance de Usuario 4: ", balance4); 
          console.log("Balance de Usuario 5: ", balance5); 

          console.log("Cantidad de usuarios en la Pool 1: ", Pool1.numUsers)
          console.log("Listado de wallets en la Pool 1: ", getQueue1);

          console.log("Cantidad de usuarios en la Pool 2: ", Pool2.numUsers)
          console.log("Listado de wallets en la Pool 2: ", getQueue2);

          console.log("Cantidad de usuarios en la Pool 3: ", Pool3.numUsers)
          console.log("Listado de wallets en la Pool 3: ", getQueue3);

          console.log("Cantidad de usuarios en la Pool 4: ", Pool4.numUsers)
          console.log("Listado de wallets en la Pool 4: ", getQueue4);


          console.log("Informacion del comprador: ", getInfoUser)
          console.log("Compras del comprador: ", getPurchases);
              
          console.log("Comprador entra a  Pool ", pool)

        }

        const despuesEjecutar = async(wallet) =>{
          console.log("/////////// DESPUES DE COMPRA //////////////////")
          const balance1 = Number((await token.balanceOf(User1.address)).toString()) / 10**6
          const balance2 = Number((await token.balanceOf(User2.address)).toString()) / 10**6
          const balance3 = Number((await token.balanceOf(User3.address)).toString()) / 10**6
          const balance4 = Number((await token.balanceOf(User4.address)).toString()) / 10**6
          const balance5 = Number((await token.balanceOf(User5.address)).toString()) / 10**6

          const walletVault = Number((await token.balanceOf(WalletReciver.address)).toString()) / 10**6;
          
          const contractBalance = Number((await token.balanceOf(multiPool.getAddress())).toString()) / 10**6;


          const Pool1 =  await multiPool.pools(1);
          const Pool2 =  await multiPool.pools(2);
          const Pool3 =  await multiPool.pools(3);
          const Pool4 =  await multiPool.pools(4);
          const Pool5 =  await multiPool.pools(5);
          const Pool6 =  await multiPool.pools(6);
          const Pool7 =  await multiPool.pools(7);

          const getQueue1 =  await multiPool.getQueue(1);
          const getQueue2 =  await multiPool.getQueue(2);
          const getQueue3 =  await multiPool.getQueue(3);
          const getQueue4 =  await multiPool.getQueue(4);
          const getQueue5 =  await multiPool.getQueue(5);
          const getQueue6 =  await multiPool.getQueue(6);
          const getQueue7 =  await multiPool.getQueue(7);


          const getPurchases =  await multiPool.getPurchases(wallet.address);
          const getInfoUser =  await multiPool.getInfoUser(wallet.address);
  
          console.log("Balance de Contrato :", contractBalance); 
          console.log("Balance de Vault :", walletVault); 

          console.log("Balance de Usuario 1: ", balance1); 
          console.log("Balance de Usuario 2: ", balance2); 
          console.log("Balance de Usuario 3: ", balance3); 
          console.log("Balance de Usuario 4: ", balance4); 
          console.log("Balance de Usuario 5: ", balance5); 

          console.log("Cantidad de usuarios en la Pool 1: ", Pool1.numUsers)
          console.log("Listado de wallets en la Pool 1: ", getQueue1);

          console.log("Cantidad de usuarios en la Pool 2: ", Pool2.numUsers)
          console.log("Listado de wallets en la Pool 2: ", getQueue2);

          console.log("Cantidad de usuarios en la Pool 3: ", Pool3.numUsers)
          console.log("Listado de wallets en la Pool 3: ", getQueue3);

          console.log("Cantidad de usuarios en la Pool 4: ", Pool4.numUsers)
          console.log("Listado de wallets en la Pool 4: ", getQueue4);

          console.log("Cantidad de usuarios en la Pool 5: ", Pool5.numUsers)
          console.log("Listado de wallets en la Pool 5: ", getQueue5);

          console.log("Cantidad de usuarios en la Pool 6: ", Pool6.numUsers)
          console.log("Listado de wallets en la Pool 6: ", getQueue6);

          console.log("Cantidad de usuarios en la Pool 7: ", Pool7.numUsers)
          console.log("Listado de wallets en la Pool 7: ", getQueue7);


          console.log("Informacion del comprador: ", getInfoUser)
          console.log("Compras del comprador: ", getPurchases);

        }



        //INICIA 
        console.log("////// INICIAN POOLS //////")

        console.log("PRIMERA COMPRA USUARIO 2 COMPRA REFIRIENDO AL 1 LA POOL 1")
        await antesEjecutar(1, User2)
        await multiPool.connect(User2).joinPool(1, User1.address, User2.address); 
        await despuesEjecutar(User2)
        

        console.log("PRIMERA COMPRA USUARIO 3 COMPRA REFIRIENDO AL 2 LA POOL 1")
        await antesEjecutar(1, User3)
        await multiPool.connect(User3).joinPool(1, User2.address, User3.address); 
        await despuesEjecutar(User3)

        console.log("PRIMERA COMPRA USUARIO 4 COMPRA REFIRIENDO AL 3 LA POOL 1")
        await antesEjecutar(1, User4)
        await multiPool.connect(User4).joinPool(1, User3.address, User4.address); 
        await despuesEjecutar(User4)

        

        /////SALTO USUARIO 2 A LA POOL 2/////

        console.log("PRIMERA COMPRA USUARIO 5 COMPRA REFIRIENDO AL 4 LA POOL 1 Y HACEN SALTAR AL USUARIO 2")
        await antesEjecutar(1, User5)
        await multiPool.connect(User5).joinPool(1, User4.address, User5.address); 
        await despuesEjecutar(User5)

        console.log("SEGUNDA COMPRA USUARIO 3 COMPRA REFIRIENDO AL 2 LA POOL 1")
        await antesEjecutar(1, User3)
        await multiPool.connect(User3).joinPool(1, User2.address, User3.address); 
        await despuesEjecutar(User3)

        console.log("TERCERA COMPRA USUARIO 3 COMPRA REFIRIENDO AL 2 LA POOL 1")
        await antesEjecutar(1, User3)
        await multiPool.connect(User3).joinPool(1, User2.address, User3.address); 
        await despuesEjecutar(User3)

        console.log("CUARTA COMPRA USUARIO 3 COMPRA REFIRIENDO AL 2 LA POOL 1 Y HACEN SALTAR AL USUARIO 3")
        await antesEjecutar(1, User3)
        await multiPool.connect(User3).joinPool(1, User2.address, User3.address); 
        await despuesEjecutar(User3)
    
         /////SALTO USUARIO 3 A LA POOL 2/////
/*

         console.log("SEGUNDA COMPRA USUARIO 4 COMPRA REFIRIENDO AL 3 LA POOL 1")
         await antesEjecutar(1, User4)
         await multiPool.connect(User4).joinPool(1, User3.address, User4.address); 
         await despuesEjecutar(User4)
 
         console.log("TERCERA COMPRA USUARIO 4 COMPRA REFIRIENDO AL 3 LA POOL 1")
         await antesEjecutar(1, User4)
         await multiPool.connect(User4).joinPool(1, User3.address, User4.address); 
         await despuesEjecutar(User4)
 
         console.log("CUARTA COMPRA USUARIO 4 COMPRA REFIRIENDO AL 3 LA POOL 1 Y HACEN SALTAR AL USUARIO 3")
         await antesEjecutar(1, User4)
         await multiPool.connect(User4).joinPool(1, User3.address, User4.address); 
         await despuesEjecutar(User4)
        */
        
      });
  });


});
