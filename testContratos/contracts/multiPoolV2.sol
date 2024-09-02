// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract multiPoolV2 {
    struct Purchase {
        uint256 poolId; //Pool que entraste con esa compra
        uint256 position; //En la posicion que entraste en la Pool
        bool hasPassed;   //Si ya pasaste a la siguiente
        bool startedInThisPool; //Se pone en true si inciaste en la Pool 5,6 o 7
    }

    struct User {
        Purchase[] purchases; // Lista de todas las compras del usuario en todos los Pools
        address referrer; // Dirección del usuario que lo refirió
        uint256 directReferrals; // Cantidad de referidos directos
        uint256 missedOpportunities; // Veces que perdió la posibilidad de avanzar
        uint256 payedExtra; //acumulacion del extra
        uint256 totalTree; //acumulacion del extra
    }

    struct Pool {
        uint256 price; //Precio de Pool
        uint256 numUsers; //Cantidad de usuarios en Pool
        address[] queue; // Cambiado a array
    }

    struct Level {
        uint256 percentage; //Porcentaje de reaparto
    }

    IERC20 public USDT;  // Token USDT
    mapping(address => User) public users;
    mapping(uint256 => Pool) public pools;
    Level[] public levels;
    uint256[] public payForExtraInPools;
    address public projectWallet;
    uint256 public projectFeePercentage = 10;
    uint256 public networkFeePercentage = 20;

    event PoolJoined(address indexed user, uint256 indexed poolId, uint256 position);
    event PoolAdvanced(address indexed user, uint256 indexed fromPool, uint256 indexed toPool, uint256 position);
    event PaymentDistributed(address indexed user, uint256 amount, uint256 poolId, uint256 position);
    event ExceedingPayment(address indexed user, uint256 amount, uint256 poolId, uint256 position);
    event MissedOpportunity(address indexed user, uint256 poolId, uint256 missedCount);

    constructor(address _usdtAddress, address _projectWallet) {
        projectWallet = _projectWallet;
        USDT = IERC20(_usdtAddress);

        // Inicialización de Pools
        pools[1].price = 50 * 1e6;  // Suponiendo que USDT tiene 6 decimales
        pools[2].price = 100 * 1e6;
        pools[3].price = 200 * 1e6;
        pools[4].price = 300 * 1e6;
        pools[5].price = 400 * 1e6;
        pools[6].price = 500 * 1e6;
        pools[7].price = 1000 * 1e6;

        // Inicialización de niveles
        levels.push(Level(10)); // Nivel 1
        levels.push(Level(3));  // Nivel 2
        levels.push(Level(2));  // Nivel 3
        levels.push(Level(1));  // Nivel 4
        levels.push(Level(1));  // Nivel 5
        levels.push(Level(1));  // Nivel 6
        levels.push(Level(2));  // Nivel 7

        payForExtraInPools.push(0); // Pool 0
        payForExtraInPools.push(5 * 1e6); // Pool 1
        payForExtraInPools.push(10 * 1e6);  // Pool 2
        payForExtraInPools.push(120 * 1e6);  // Pool 3
        payForExtraInPools.push(230 * 1e6);  // Pool 4
        payForExtraInPools.push(340 * 1e6);  // Pool 5
        payForExtraInPools.push(50 * 1e6);  // Pool 6
        payForExtraInPools.push(1600 * 1e6);  // Pool 7
    }

    function joinPool(uint256 poolId, address referrer, address wallet) public {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");

        User storage user = users[wallet];
        uint256 position = pools[poolId].numUsers;

        // Si es la primera vez que se une, asignamos el referrer
        if (user.purchases.length == 0) {
            user.referrer = referrer;
            if (referrer != address(0)) {
                users[referrer].directReferrals++;  // Incrementar referidos directos
            }
        }

        // Transferir USDT al contrato
        if(wallet != address(this)){
            require(USDT.transferFrom(wallet, address(this), pools[poolId].price), "Transferencia fallida");
        }

        // Reparto del dinero
        uint256 poolPrice = pools[poolId].price;
        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;

        // Pagos
        require(USDT.transfer(projectWallet, paymentForProject), "Pago al proyecto fallido"); //Paga el 10% del total

        // Crear una nueva entrada de compra
        user.purchases.push(Purchase({
            poolId: poolId,
            position: position,
            hasPassed: false,
            startedInThisPool: (poolId >= 5)
        }));

        pools[poolId].queue.push(wallet);
        pools[poolId].numUsers++;

        emit PoolJoined(wallet, poolId, position);

        // Repartir el pago a los referidos hasta 7 niveles
        distributeReferralPayments(wallet, poolId);

        // Intentar avanzar al usuario que cumpla comenzando la busqueda desde el primero de la Pool
        if (position >= 3) {
            tryAdvance(poolId, 0);
        }
    }

    function distributeReferralPayments(address user, uint256 poolId) internal {
        address currentReferrer = users[user].referrer;
        for (uint256 i = 0; i < levels.length && currentReferrer != address(0); i++) {
            uint256 payment = (pools[poolId].price * levels[i].percentage) / 100;
            require(USDT.transfer(currentReferrer, payment), "Pago al referido fallido");
            console.log("referido:",currentReferrer, "Pago: ",payment);
            users[currentReferrer].totalTree += payment;
            emit PaymentDistributed(currentReferrer, payment, poolId, i+1);

            currentReferrer = users[currentReferrer].referrer;

            // Incrementar el contador de referidos directos para el primer nivel
          //  if (i == 0) {
          //      users[currentReferrer].directReferrals++;
          //  }
        }
     
    }

    function tryAdvance(uint256 poolId, uint256 position) internal {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");
        require(position < pools[poolId].numUsers, "Posicion no valida en el pool");

        address userAddress = pools[poolId].queue[position];
        User storage user = users[userAddress];

        Purchase storage purchase = findPurchase(user, poolId, position);
       // require(!purchase.hasPassed, "Ya has pasado este pool con esta compra");

        uint256 requiredReferrals = getRequiredReferrals(poolId);
       // console.log("Cantidad de referido requeridos: ",requiredReferrals);
       // console.log("Cantidad de referido : ",user.directReferrals);
        // Si la persona cumple con los referidos mínimos o inicio en la Pool 5 o superior
        if (user.directReferrals >= requiredReferrals || purchase.startedInThisPool) {
            advancePool(userAddress, poolId, position);
        } else {
            user.missedOpportunities++;
            emit MissedOpportunity(userAddress, poolId, user.missedOpportunities);

            // Buscar si hay alguien debajo que cumpla con los requisitos
            for (uint256 i = position + 1; i < pools[poolId].numUsers; i++) {
                address nextUserAddress = pools[poolId].queue[i];
                User storage nextUser = users[nextUserAddress];
                if (nextUser.directReferrals >= requiredReferrals || purchase.startedInThisPool) {
                    advancePool(nextUserAddress, poolId, i);
                    break;
                } else {
                    nextUser.missedOpportunities++;
                    emit MissedOpportunity(nextUserAddress, poolId, nextUser.missedOpportunities);
                }
            }
        }
    }






    function advancePool(address userAddress, uint256 poolId, uint256 position) private {

        User storage user = users[userAddress];
        Purchase storage purchase = findPurchase(user, poolId, position);
       // require(!purchase.hasPassed, "Ya has pasado este pool");

        // Avanza al siguiente Pool
        purchase.hasPassed = true;
        uint256 nextPoolId = poolId + 1;
        removeUserFromPool(poolId, position);
        // Actualizar las posiciones de los usuarios restantes REVISAR MUCHO CONSUMO DE GAS
        for (uint256 i = position; i < pools[poolId].queue.length; i++) {
            address remainingUserAddress = pools[poolId].queue[i];
            User storage remainingUser = users[remainingUserAddress];
            Purchase storage remainingPurchase = findPurchase(remainingUser, poolId, i + 1);  // Buscar en la posición i+1
            remainingPurchase.position = i;  // Actualizar la posición
        }

        require(USDT.transfer(userAddress, payForExtraInPools[poolId]), "Pago de avance fallido"); //Pago del excedente
        emit ExceedingPayment(userAddress, payForExtraInPools[poolId], poolId, position);

        user.payedExtra += payForExtraInPools[poolId];

        if (poolId == 7) {
            // En lugar de inyectar 10 wallets en la Pool 1, movemos 10 posiciones
            console.log("Mueve posiciones");
            movePositions(1, 3);
        } else {
            joinNextPool(nextPoolId, userAddress);  // Llamada directa a la función `joinPool` sin referidos
            emit PoolAdvanced(userAddress, poolId, nextPoolId, position);
        }
      
    }

    function removeUserFromPool(uint256 poolId, uint256 position) private {
        require(position < pools[poolId].queue.length, "Posicion no valida");
        
        // Eliminar al usuario de la posición actual
        for (uint256 i = position; i < pools[poolId].queue.length - 1; i++) {
            pools[poolId].queue[i] = pools[poolId].queue[i + 1];
        }
        pools[poolId].queue.pop();
        pools[poolId].numUsers--;
    }


    function joinNextPool(uint256 poolId, address wallet) private {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");

        User storage user = users[wallet];
        uint256 position = pools[poolId].numUsers;
        // Reparto del dinero
        uint256 poolPrice = pools[poolId].price;
        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;
       
        // Pagos
        require(USDT.transfer(projectWallet, paymentForProject), "Pago al proyecto fallido"); //Paga el 10% del total
        
        // Crear una nueva entrada de compra
        user.purchases.push(Purchase({
            poolId: poolId,
            position: position,
            hasPassed: false,
            startedInThisPool: (poolId >= 5)
        }));
        
        pools[poolId].queue.push(wallet);
        pools[poolId].numUsers++;

        emit PoolJoined(wallet, poolId, position);

        // Repartir el pago a los referidos hasta 7 niveles
        distributeReferralPayments(wallet, poolId);
    }

   /* function movePositions(uint256 poolId, uint256 positionsToMove) private {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");
        require(positionsToMove > 0, "Posiciones a mover deben ser mayor a 0");
        require(pools[poolId].numUsers >= positionsToMove, "No hay suficientes usuarios en la Pool");

        // Mover las posiciones en la Pool 1
        for (uint256 i = 0; i < positionsToMove; i++) {
            console.log("Repite");
            console.log(pools[1].queue[1]);
            address userAddress = pools[1].queue[i]; ///ERROR ACA reverted with panic code 0x32
            console.log("Moviendo usuario",userAddress);
            console.log("Posicion",i);
            User storage user = users[userAddress];

            // Buscar la compra correspondiente en la Pool 1 y marcarla como "pasada"
            Purchase storage purchase = findPurchase(user, 1, i);
            purchase.hasPassed = true;

            // Avanzar al usuario en la siguiente pool
            advancePool(userAddress, 1, i);
        console.log("Todo bien");
        }
    }*/


    function movePositions(uint256 poolId, uint256 positionsToMove) private {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");
        require(positionsToMove > 0, "Posiciones a mover deben ser mayor a 0");
        require(pools[poolId].numUsers >= positionsToMove, "No hay suficientes usuarios en la Pool");

        // Mover las posiciones en la Pool 1
        for (uint256 i = 0; i < positionsToMove; i++) {

            // Siempre trabajar con el primer usuario en la cola
            address userAddress = pools[1].queue[0]; 
            User storage user = users[userAddress];

            // Buscar la compra correspondiente en la Pool 1 y marcarla como "pasada"
            Purchase storage purchase = findPurchase(user, 1, 0); // Siempre en la posición 0
            purchase.hasPassed = true;

            // Avanzar al usuario en la siguiente pool
            console.log("Mueve a la address", userAddress);
            advancePool(userAddress, 1, 0);

            // Después de avanzar, elimina al usuario de la cola
           // removeUserFromPool(1, 0); // Siempre eliminar la primera posición
        }

        // Verificar si hay que avanzar en las siguientes pools REVISAR SI DEJAR
        for (uint256 poolIdToCheck = 2; poolIdToCheck <= 7; poolIdToCheck++) {
            while (pools[poolIdToCheck].numUsers > 3) { // Asegura que solo queden 3 wallets
                uint256 qualifyingUsers = 0;

                // Contar cuántos usuarios califican para avanzar
                for (uint256 i = 0; i < pools[poolIdToCheck].numUsers; i++) {
                    address currentUserAddress = pools[poolIdToCheck].queue[i];
                    User storage currentUser = users[currentUserAddress];
                    Purchase storage currentPurchase = findPurchase(currentUser, poolIdToCheck, i);

                    if (currentUser.directReferrals >= getRequiredReferrals(poolIdToCheck) || currentPurchase.startedInThisPool) {
                        qualifyingUsers++;
                    }

                    // Si tenemos 3 usuarios calificando, salimos del bucle
                    if (qualifyingUsers >= 3) {
                        break;
                    }
                }

                // Solo avanzar si hay menos de 3 usuarios calificados en la pool
                if (qualifyingUsers >= 3) {
                    console.log("Total calificados: ",qualifyingUsers);
                    tryAdvance(poolIdToCheck, 0);
                } else {
                    break; // Salimos del while si ya tenemos 3 usuarios calificados
                }
            }
        }

    }


    //Gettrs
    function findPurchase(User storage user, uint256 poolId, uint256 position) internal view returns (Purchase storage) {
        for (uint256 i = 0; i < user.purchases.length; i++) {
            if (user.purchases[i].poolId == poolId && user.purchases[i].position == position) {
                return user.purchases[i];
            }
        }
        revert("Compra no encontrada");
    }

    function getRequiredReferrals(uint256 poolId) internal pure returns (uint256) {
        if (poolId == 1) return 0;
        if (poolId == 2) return 1;
        if (poolId == 3) return 2;
        if (poolId == 4) return 3;
        if (poolId == 5) return 4;
        if (poolId == 6) return 5;
        return 0;
    }

    function getQueue(uint256 poolId) public view returns (address[] memory) {
        require(poolId >= 1 && poolId <= 7, "Pool no valida");
        return pools[poolId].queue;
    }

    function getPurchases(address userAddress) public view returns (Purchase[] memory) {
        return users[userAddress].purchases;
    }

    function getInfoUser(address userAddress) public view returns (address, uint256, uint256) {
        return( users[userAddress].referrer, users[userAddress].directReferrals, users[userAddress].missedOpportunities); 
    }
}
