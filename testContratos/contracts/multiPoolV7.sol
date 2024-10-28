// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "./PaymentContractV7.sol"; // Importamos el contrato de pagos

contract multiPoolV7 {
    IERC20 public USDT;  
    PaymentContractV7 public paymentContract;
    
    struct Pool {
        uint256 price; //Precio de Pool
        uint256 numUsers; //Cantidad de usuarios en Pool
        address[] queue; // Lista de personas en la Pool
        address[] canPass; // Puede pasar
        uint256 newUsers; //Para acumular si llega a 3 personas
        uint256 minRefferals; //Minimo de referidos en esta pool
    }

    mapping(uint256 => Pool) public pools;
    mapping(address => address) public directReferrals;
    mapping(address => uint256) public numberOfDirects;


    constructor(address _usdtAddress, address _paymentContractAddress) {
        USDT = IERC20(_usdtAddress);
        paymentContract = PaymentContractV7(_paymentContractAddress); 

        // Inicialización de Pools
        pools[1].price = 50 * 1e6;  
        pools[2].price = 100 * 1e6;
        pools[3].price = 200 * 1e6;
        pools[4].price = 300 * 1e6;
        pools[5].price = 400 * 1e6;
        pools[6].price = 500 * 1e6;
        pools[7].price = 1000 * 1e6;

        pools[1].minRefferals = 0;  
        pools[2].minRefferals = 1;
        pools[3].minRefferals = 2;
        pools[4].minRefferals = 3;
        pools[5].minRefferals = 4;
        pools[6].minRefferals = 5;
        pools[7].minRefferals = 0;
    }

    function joinPool(uint256 poolId, address referrer) public {
        //Reglas basicas y pago
        require(poolId >= 1 && poolId <= 7, "Pool no valido");
        require(referrer != msg.sender, "No es posible que seas el mismo sponsor");
        require(USDT.transferFrom(msg.sender, address(paymentContract), pools[poolId].price), "Transferencia fallida"); //REGLA 1

        //Si no tiene directo le asigna la direccion actual
        if (directReferrals[msg.sender] == address(0)) {
            directReferrals[msg.sender] = referrer; 
            numberOfDirects[referrer]++;
        }
      
        //Agrega la billetera compradora a la lista
        pools[poolId].queue.push(msg.sender);

        // console.log("Num Users: ",pools[3].numUsers);
        // console.log("Cantidad de personas array: ",pools[3].queue.length);

        //Si tiene la cantidad igual o mayor de directos lo agregar en las personas las cuales pueden pasar
        //Si tiene cantidad minima de directos entra o si entra en Pool 5,6 o 7 no deberia pedir
        if(numberOfDirects[msg.sender] >= pools[poolId].minRefferals || poolId >= 5){
            pools[poolId].canPass.push(msg.sender);
        }
        
        // console.log("Cantidad de personas en canPass: ",pools[3].canPass.length);

        //Guarda en referrers los referidos en un array de dimension limitada
        //El FOR lo veo importante ya que asi se puede recorrer a los referidos, es un for que hace algo simple y esta limitado a 
        //7 vueltas, no lo veo una amenaza en gas
        //Luego llama a la funcion pasandole los referidos y el valor de la Pool para hacer el reparto
        address[] memory referrers = new address[](7);
        address currentReferrer = directReferrals[msg.sender];

        for (uint256 i = 0; i < referrers.length && currentReferrer != address(0); i++) {
            if (currentReferrer == address(0)) {
               break; // Detener el ciclo si la dirección es 0x0000000000000000000000000000000000000000
            }
            referrers[i] = currentReferrer;
            currentReferrer = directReferrals[currentReferrer];
        }
        paymentContract.distributeReferralPayments(referrers, pools[poolId].price); //REGLA 2 / 3

        //Envia pago de 10% a proyecto
        paymentContract.distributeProjectFee(pools[poolId].price); //REGLA 3

        //Suma 1 persona nueva a la Pool si es que no es la primera persona
        
        //pools[poolId].newUsers++;
        
        //Suma 1 persona al total de la Pool
        pools[poolId].numUsers++;

       

        tryAdvance(poolId);
    }

    function tryAdvance(uint256 poolId) internal {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");

        if(pools[poolId].newUsers >= 3 && pools[poolId].canPass.length >= 1){
            joinNextPool(poolId);
        }else{
            //Suma 1 persona nueva a la Pool si es que no es la primera persona
            pools[poolId].newUsers++;
        }   
       
    }

    function joinNextPool(uint256 poolId) internal  {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");
       
       
        //Si la Pool es diferente de 7, si es 7 significa que ya llego al fin
        if(poolId != 7){
            pools[poolId + 1].queue.push(pools[poolId].canPass[0]);
        }
        
        address actualNewWallet = pools[poolId].canPass[0];

        //Elimina el primero de la lista de persona que pueden pasar de esta pool
        for (uint256 i = 0; i < pools[poolId].canPass.length - 1; i++) {
            pools[poolId].canPass[i] = pools[poolId].canPass[i + 1]; //REVISAR FOR DINAMICO!!
        }
        
        pools[poolId].canPass.pop();

        //Elimina el primero de la lista de persona de esta pool
        for (uint256 i = 0; i < pools[poolId].queue.length - 1; i++) {
            pools[poolId].queue[i] = pools[poolId].queue[i + 1]; //REVISAR FOR DINAMICO!!
        }
        
        pools[poolId].queue.pop();        

        //Eliminamos las 3 personas nuevas de la Pool actual
        pools[poolId].newUsers = pools[poolId].newUsers - 3;

        pools[poolId].numUsers--;
        
        pools[poolId + 1].numUsers++;
        
        //Agregamos a la nueva Pool la persona que estaba primera en casPass de la Pool previa si es que cumple con los minimos
        //directos de esta siguiente Pool
        if(numberOfDirects[actualNewWallet] >= pools[poolId + 1].minRefferals && poolId != 7){
            pools[poolId + 1].canPass.push(actualNewWallet);
        }

        //Hacemos tambien distribucion de dinero
        address[] memory referrers = new address[](7);
        address currentReferrer = directReferrals[actualNewWallet];

        for (uint256 i = 0; i < referrers.length && currentReferrer != address(0); i++) {
            if (currentReferrer == address(0)) {
               break; // Detener el ciclo si la dirección es 0x0000000000000000000000000000000000000000
            }
            referrers[i] = currentReferrer;
            currentReferrer = directReferrals[currentReferrer];
        }

        if(poolId != 7){
            paymentContract.distributeReferralPayments(referrers, pools[poolId + 1].price); //REGLA 2 / 3
            paymentContract.distributeProjectFee(pools[poolId + 1].price); //REGLA 3
        }
        //Paga el excedente
        paymentContract.distributeExceedingPayment(actualNewWallet, poolId);

        if(poolId != 7){
           // pools[poolId + 1].newUsers++;
            tryAdvance(poolId + 1);
        }else{
            //Si es Pool 7 y termino el recorrido debe empujar 3 personas de la pool 1 a la 2
            require(pools[1].queue.length >= 3, "Debe haber al menos 3 personas en la Pool 1");
            require(pools[1].canPass.length >= 3, "Debe haber al menos 3 personas en canPass de la Pool 1");

            // Mover las primeras 3 personas de `queue` y `canPass` de Pool 1 a Pool 2
            for (uint256 i = 0; i < 3; i++) {
                address userToMove = pools[1].queue[i]; 
                pools[2].queue.push(userToMove); 

                if (numberOfDirects[userToMove] >= pools[2].minRefferals) {
                    pools[2].canPass.push(userToMove);
                }
            }

            // Remover los primeros 3 usuarios de la lista `queue` de Pool 1
            for (uint256 i = 0; i < pools[1].queue.length - 3; i++) {
                pools[1].queue[i] = pools[1].queue[i + 3];
            }

            for (uint256 i = 0; i < 3; i++) {
                pools[1].queue.pop();
            }

            // Remover los primeros 3 usuarios de la lista `canPass` de Pool 1a
            for (uint256 i = 0; i < pools[1].canPass.length - 3; i++) {
                pools[1].canPass[i] = pools[1].canPass[i + 3];
            }

            for (uint256 i = 0; i < 3; i++) {
                pools[1].canPass.pop();
            }

            pools[1].numUsers -= 3;
            pools[2].numUsers += 3;
            console.log("cantidad!!!!");
            console.log(pools[2].newUsers);
            pools[2].newUsers += 3;
            console.log("cantidad2!!!!");
            console.log(pools[2].newUsers);
            // Llamamos a `tryAdvance` para verificar si pueden avanzar en Pool 2
           // tryAdvance(2); REVISAR SI DEJAR O NO PORQUE SEGUIRIA SIEMPRE DANDO VUELTAS, ADEMAS ESTA SUMANDO UNA PERSONA DE MAS EN newUsers
        }

    }
   
    function getQueue(uint256 poolId) public view returns (address[] memory) {
        require(poolId >= 1 && poolId <= 7, "Pool no valida");                      //EN PRODUCCION BORRAR!!!
        return pools[poolId].queue;
    }

    function getCanPass(uint256 poolId) public view returns (address[] memory) { //EN PRODUCCION BORRAR!!!
        require(poolId >= 1 && poolId <= 7, "Pool no valida");
        return pools[poolId].canPass;
    }

    //POSIBILIDAD DE PROBLEMA DE GAS, DEBIDO A QUE SIEMPRE ESTA EMPUJANDO GENTE, ES DECIR
    //EMPUJA DESDE LA POOL 1 A LA 2, ASI HASTA LA 7 Y SI SIGUE HABIENDO GENTE DISPONBIBLE SE REPITE INDEFINIDAMENTE
    

    //REVISAR EL TEMA DE POOL 5,6 Y 7 QUE PASAN SI O SI, SI FUNCIONA

    //REVISAR SI  pools[poolId].queue ES NECESARIO, YA QUE ES UN ARRAY QUE LO UTILIZO PARA VER LAS WALLETS QUE ESTAN DENTRO
    //PERO NI EN LA DAPP NI EN LA LOGICA DE NEGOCIO TIENEN USO
}