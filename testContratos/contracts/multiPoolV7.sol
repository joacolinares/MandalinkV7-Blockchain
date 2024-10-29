// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "./PaymentContractV7.sol"; // Importamos el contrato de pagos

contract multiPoolV7 {
    IERC20 public USDT;  
    PaymentContractV7 public paymentContract;
    uint256 public constant TOTAL_REFERRERS = 7;
    
    struct Pool {
        uint256 price; //Precio de Pool
        uint256 numUsers; //Cantidad de usuarios en Pool
       // address[] queue; // Lista de personas en la Pool
        address[] canPass; // Puede pasar
        uint256 newUsers; //Para acumular si llega a 3 personas
        uint256 minRefferals; //Minimo de referidos en esta pool
        uint256 indexCanPass; //Indice que lleva la ultima persona empujada de canPass para evitar loops
    }

    mapping(uint256 => Pool) public pools;
    mapping(address => address) public directReferrals;
    mapping(address => uint256) public numberOfDirects;

    mapping(address => bool) public canPassAllPools;

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
      
        if(poolId >= 5){
            canPassAllPools[msg.sender] = true;
        }

        //Si tiene la cantidad igual o mayor de directos lo agregar en las personas las cuales pueden pasar
        //Si tiene cantidad minima de directos entra o si entra en Pool 5,6 o 7 no deberia pedir
        if(numberOfDirects[msg.sender] >= pools[poolId].minRefferals || canPassAllPools[msg.sender]){
            pools[poolId].canPass.push(msg.sender);
        }
        
        //Guarda en referrers los referidos en un array de dimension limitada
        //El FOR lo veo importante ya que asi se puede recorrer a los referidos, es un for que hace algo simple y esta limitado a 
        //7 vueltas, no lo veo una amenaza en gas
        //Luego llama a la funcion pasandole los referidos y el valor de la Pool para hacer el reparto
        address[] memory referrers = new address[](7);
        address currentReferrer = directReferrals[msg.sender];

        for (uint256 i = 0; i < TOTAL_REFERRERS && currentReferrer != address(0); ++i) {
            if (currentReferrer == address(0)) {
               break; // Detener el ciclo si la dirección es 0x0000000000000000000000000000000000000000
            }
            referrers[i] = currentReferrer;
            currentReferrer = directReferrals[currentReferrer];
        }

        //Aca se llama dos veces ya que son dos logicas distintas, consume mucho gas que sean 2 en vez de una?
        paymentContract.saveReferralPayments(referrers, pools[poolId].price); //REGLA 2 / 3

        //Envia pago de 10% a proyecto
        paymentContract.saveProjectFee(pools[poolId].price); //REGLA 3

        //Suma 1 persona al total de la Pool
        pools[poolId].numUsers++;

        tryAdvance(poolId);
    }

    function tryAdvance(uint256 poolId) internal {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");

        if(pools[poolId].newUsers >= 3 && pools[poolId].canPass.length - pools[poolId].indexCanPass >= 1){
            _joinNextPool(poolId);
        }else{
            //Suma 1 persona nueva a la Pool si es que no es la primera persona
            pools[poolId].newUsers++;
        }   
       
    }

    function _joinNextPool(uint256 poolId) internal  {
        //Utilizamos la primera persona en al lista despues del ultimo movido
        address actualNewWallet = pools[poolId].canPass[pools[poolId].indexCanPass];

        //Aumentamos en 1 el indice ya que se consumio una persona de la pool que sera movida a la siguiente
        pools[poolId].indexCanPass++;

        //Eliminamos las 3 personas nuevas de la Pool actual
        //No se movieron a ningun lugar, pero ya que fueron "usados" para mover a alguien dejar de servir y se los quita de newUsers
        //ya que nos son personas nuevas
        pools[poolId].newUsers = pools[poolId].newUsers - 3;

        pools[poolId].numUsers--;
        
        pools[poolId + 1].numUsers++;
        
        //Agregamos a la nueva Pool la persona que estaba primera en casPass de la Pool previa si es que cumple con los minimos
        //directos de esta siguiente Pool
        if(numberOfDirects[actualNewWallet] >= pools[poolId + 1].minRefferals && poolId != 7 || canPassAllPools[actualNewWallet] && poolId != 7){
            pools[poolId + 1].canPass.push(actualNewWallet);
        }

        //Hacemos tambien distribucion de dinero
        address[] memory referrers = new address[](7);
        address currentReferrer = directReferrals[actualNewWallet];

        for (uint256 i = 0; i < TOTAL_REFERRERS && currentReferrer != address(0); ++i) {
            if (currentReferrer == address(0)) {
               break; // Detener el ciclo si la dirección es 0x0000000000000000000000000000000000000000
            }
            referrers[i] = currentReferrer;
            currentReferrer = directReferrals[currentReferrer];
        }

        if(poolId != 7){
            paymentContract.saveReferralPayments(referrers, pools[poolId + 1].price); //REGLA 2 / 3
            paymentContract.saveProjectFee(pools[poolId + 1].price); //REGLA 3
        }
        //Paga el excedente
        paymentContract.saveExceedingPayment(actualNewWallet, poolId);

        if(poolId != 7){
            tryAdvance(poolId + 1);
        }else{
            //Si es Pool 7 y termino el recorrido debe empujar 3 personas de la pool 1 a la 2
            // require(pools[1].queue.length >= 3, "Debe haber al menos 3 personas en la Pool 1");
            require(pools[1].canPass.length - pools[1].indexCanPass >= 3, "Debe haber al menos 3 personas en canPass de la Pool 1");

            // Mover las primeras 3 personas de  `canPass` de Pool 1 a Pool 2. Aca se tienen que mover las primeras 3 personas, pero como
            //canPass TENDRIA (Falta comprobar) que estar ordenado en Pool 1 (Ya que toda la gente que entra en Pool 1 va directos a canPass)
            //se mueven las 3 primeras
            for (uint256 i = 0; i < 3; ++i) {
                address userToMove = pools[1].canPass[pools[1].indexCanPass]; 
               // pools[2].queue.push(userToMove); 

                if (numberOfDirects[userToMove] >= pools[2].minRefferals || canPassAllPools[userToMove]) {
                    pools[2].canPass.push(userToMove);
                }
                //Sacamos 3 personas del canPass de la Pool 1 ya que fueron movidos a la Pool 2
                pools[1].indexCanPass++;
            }
            
            //Restamos 3 personas en Pool 1
            pools[1].numUsers -= 3;
            //Sumamos 3 personas en Pool  2
            pools[2].numUsers += 3;
            //Ponemos 3 personas nuevas (Disponible para empujar en Pool 2)
            pools[2].newUsers += 3;

            //REVISAR GUILLE
            // Llamamos a `tryAdvance` para verificar si pueden avanzar en Pool 2
            // tryAdvance(2); REVISAR SI DEJAR O NO PORQUE SEGUIRIA SIEMPRE DANDO VUELTAS, ADEMAS ESTA SUMANDO UNA PERSONA DE MAS EN newUsers
            
        }
        
    }

    function getCanPass(uint256 poolId) public view returns (address[] memory) { //EN PRODUCCION BORRAR!!!
        require(poolId >= 1 && poolId <= 7, "Pool no valida");
        return pools[poolId].canPass;
    }
}

    //GUILLE
    //POSIBILIDAD DE PROBLEMA DE GAS, DEBIDO A QUE SIEMPRE ESTA EMPUJANDO GENTE, ES DECIR
    //EMPUJA DESDE LA POOL 1 A LA 2, ASI HASTA LA 7 Y SI SIGUE HABIENDO GENTE DISPONBIBLE SE REPITE INDEFINIDAMENTE
