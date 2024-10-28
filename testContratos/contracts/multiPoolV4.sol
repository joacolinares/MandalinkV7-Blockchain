// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "./PaymentContract.sol"; // Importamos el contrato de pagos

contract multiPoolV4 {
    struct Purchase {
        uint256 poolId; //Pool que entraste con esa compra
        uint256 position; //En la posicion que entraste en la Pool
        bool hasPassed;   //Si ya pasaste a la siguiente
        bool startedInThisPool; //Se pone en true si inciaste en la Pool 5,6 o 7
        bool canContribute;
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
    PaymentContract public paymentContract;
    mapping(address => User) public users;
    mapping(uint256 => Pool) public pools;
    Level[] public levels;
    uint256[] public payForExtraInPools;
    address public projectWallet;
    uint256 public projectFeePercentage = 10;
    uint256 public networkFeePercentage = 20;
    uint256 public totalPayed; //NUEVO
    uint256 public totalDistributed;    //NUEVO
    uint256 public totalExtra;  //NUEVO

    mapping(address => mapping(uint256 => uint256)) public referralsByLevel;
    mapping(address => mapping(uint256 => uint256)) public amountInvestInLevels;
    mapping(address => mapping(address => uint256)) public amountInvestInLevelsPerWallet;


    constructor(address _usdtAddress, address _paymentContractAddress) {
        USDT = IERC20(_usdtAddress);
        paymentContract = PaymentContract(_paymentContractAddress); // Inicializamos el contrato de pagos

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
        require(referrer != msg.sender, "No es posible que seas el mismo sponsor");

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
            require(USDT.transferFrom(wallet, address(paymentContract), pools[poolId].price), "Transferencia fallida");
        }
        totalPayed +=  pools[poolId].price;
        
        // Reparto del dinero
        uint256 poolPrice = pools[poolId].price;
        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;

        // Pagos
       // require(USDT.transfer(projectWallet, paymentForProject), "Pago al proyecto fallido"); //Paga el 10% del total
            paymentContract.distributeProjectFee(pools[poolId].price, true, msg.sender);
        // Crear una nueva entrada de compra
        user.purchases.push(Purchase({
            poolId: poolId,
            position: position,
            hasPassed: false,
            startedInThisPool: (poolId >= 5),
            canContribute: true
        }));

        
        pools[poolId].queue.push(wallet);
        pools[poolId].numUsers++;

        // Repartir el pago a los referidos hasta 7 niveles
        distributeReferralPayments(wallet, poolId);

        // Intentar avanzar al usuario que cumpla comenzando la busqueda desde el primero de la Pool
        if (position >= 3) {
            tryAdvance(poolId, 0);
        }

    }

    function distributeReferralPayments(address user, uint256 poolId) internal {
        address currentReferrer = users[user].referrer;
        address[] memory referrers = new address[](levels.length);
        uint256[] memory payments = new uint256[](levels.length);
        uint256 referrerCount = 0;

        for (uint256 i = 0; i < levels.length && currentReferrer != address(0); i++) {
            if (currentReferrer == address(0)) {
               break; // Detener el ciclo si la dirección es 0x0000000000000000000000000000000000000000
            }
            uint256 payment = (pools[poolId].price * levels[i].percentage) / 100;
            referrers[referrerCount] = currentReferrer;
            payments[referrerCount] = payment;
            referrerCount++;
            totalDistributed +=  payment;
            users[currentReferrer].totalTree += payment;

            if(amountInvestInLevelsPerWallet[currentReferrer][user] == 0){
                amountInvestInLevelsPerWallet[currentReferrer][user] += payment;
                amountInvestInLevels[currentReferrer][i] += payment;
                referralsByLevel[currentReferrer][i]++;
            }else{
                amountInvestInLevelsPerWallet[currentReferrer][user] += payment;
                amountInvestInLevels[currentReferrer][i] += payment;
            }

            currentReferrer = users[currentReferrer].referrer;

        }
        // Llamar al contrato de pagos para repartir entre los referidos
        paymentContract.distributeReferralPayments(referrers, payments);
    }

    function tryAdvance(uint256 poolId, uint256 position) internal {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");
        require(position < pools[poolId].numUsers, "Posicion no valida en el pool");

        address userAddress = pools[poolId].queue[position];
        User storage user = users[userAddress];

        Purchase storage purchase = findPurchase(user, poolId, position);
       // require(!purchase.hasPassed, "Ya has pasado este pool con esta compra");

        uint256 requiredReferrals = getRequiredReferrals(poolId);

        // Si la persona cumple con los referidos mínimos o inicio en la Pool 5 o superior
        if ((user.directReferrals >= requiredReferrals || purchase.startedInThisPool) && hasValidSubordinates(poolId, position)) {
            advancePool(userAddress, poolId, position);
                for (uint256 poolIdToCheck = 2; poolIdToCheck <= 7; poolIdToCheck++) {
                    for (uint256 i = 0; i < pools[poolIdToCheck].numUsers; i++) {
                        tryAdvance(poolIdToCheck, 0);
                    }
                }
        } else {
            user.missedOpportunities++;

            // Buscar si hay alguien debajo que cumpla con los requisitos
            for (uint256 i = position + 1; i < pools[poolId].numUsers; i++) {
                address nextUserAddress = pools[poolId].queue[i];
                User storage nextUser = users[nextUserAddress];
                if ((nextUser.directReferrals >= requiredReferrals || purchase.startedInThisPool) && hasValidSubordinates(poolId, position) ) {
                    advancePool(nextUserAddress, poolId, i);
                    for (uint256 poolIdToCheck = 2; poolIdToCheck <= 7; poolIdToCheck++) {
                        for (uint256 x = 0; x < pools[poolIdToCheck].numUsers; x++) {
                            tryAdvance(poolIdToCheck, 0);
                        }
                    }
                    break;
                } else {
                    nextUser.missedOpportunities++;
                }
            }
        }


    }

      struct infoSub {
            address wallet;
            uint256 l;
        }
        

    function hasValidSubordinates(uint256 poolId, uint256 position) internal  returns (bool) {
        uint256 subordinatesCount = 0;
        infoSub[] memory arraySubordinantes = new infoSub[](3);
        uint256 x;
        // Verificar las 3 posiciones justo debajo del usuario

        for (uint256 i = position + 1; i < pools[poolId].queue.length && subordinatesCount < 3; i++) {
            address subordinateAddress = pools[poolId].queue[i];
            User storage subordinate = users[subordinateAddress];
 
            // Verificar que esta persona no haya avanzado en ningún pool
            bool hasPassedInAnyPool = false;


        for (uint256 j = subordinate.purchases.length; j > 0; j--) {
            Purchase storage purchase = subordinate.purchases[j - 1];

            // Verificamos si la compra es válida en este pool y si puede contribuir
            if (purchase.poolId == poolId && purchase.canContribute) {
                hasPassedInAnyPool = true;
                arraySubordinantes[x] = infoSub(subordinateAddress, j - 1);
                subordinate.purchases[j - 1].canContribute = false;
                x++;
                break;  // Nos detenemos después de encontrar la primera válida
            }
        }
            // Si el usuario no ha pasado en este pool, lo contamos como válido
            if (hasPassedInAnyPool) {
                subordinatesCount++;
            }
        }


        // Retorna true si al menos hay 3 subordinates que pueden ayudar a pasar a la personas han avanzado
         if (subordinatesCount >= 3) {
            for (uint256 k = 0; k < 3; k++) {
                infoSub memory validSubordinate = arraySubordinantes[k];
                User storage subordinateToUpdate = users[validSubordinate.wallet];
               subordinateToUpdate.purchases[validSubordinate.l].canContribute = false;
                
            }
           
         }else{
            for (uint256 k = 0; k < 3; k++) {
                infoSub memory validSubordinate = arraySubordinantes[k];
                if(validSubordinate.wallet == 0x0000000000000000000000000000000000000000){
                    break;
                }
                User storage subordinateToUpdate = users[validSubordinate.wallet];
                subordinateToUpdate.purchases[validSubordinate.l].canContribute = true;
            }
            return false;
         }


   return true;
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

       // require(USDT.transfer(userAddress, payForExtraInPools[poolId]), "Pago de avance fallido"); //Pago del excedente
        paymentContract.distributeExceedingPayment(userAddress, payForExtraInPools[poolId]);
       
        totalExtra += payForExtraInPools[poolId];
        user.payedExtra += payForExtraInPools[poolId];

        if (poolId == 7) {
            // En lugar de inyectar 10 wallets en la Pool 1, movemos 10 posiciones
            movePositions(1, 3);
        } else {
            joinNextPool(nextPoolId, userAddress);  // Llamada directa a la función `joinPool` sin referidos
        }
      
    }

    function removeUserFromPool(uint256 poolId, uint256 position) private {
        require(position < pools[poolId].queue.length, "Posicion no valida");

        // Obtener la dirección del usuario en la posición actual
        address userAddress = pools[poolId].queue[position];
        User storage user = users[userAddress];

        // Eliminar la compra correspondiente de su lista de compras
        for (uint256 i = 0; i < user.purchases.length; i++) {
            if (user.purchases[i].poolId == poolId && user.purchases[i].position == position) {
                // Mover las compras una posición atrás para llenar el hueco
                for (uint256 j = i; j < user.purchases.length - 1; j++) {
                    user.purchases[j] = user.purchases[j + 1];
                }
                user.purchases.pop(); // Remover la última entrada que ahora está duplicada
                break; // Salir del bucle una vez que encontramos y eliminamos la compra
            }
        }

        // Eliminar al usuario de la posición actual en la queue
        for (uint256 i = position; i < pools[poolId].queue.length - 1; i++) {
            pools[poolId].queue[i] = pools[poolId].queue[i + 1];
        }
        pools[poolId].queue.pop(); // Remover la última entrada
        pools[poolId].numUsers--;  // Disminuir el conteo de usuarios en el pool
    }


    function joinNextPool(uint256 poolId, address wallet) private {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");

        User storage user = users[wallet];
        uint256 position = pools[poolId].numUsers;
        // Reparto del dinero
        uint256 poolPrice = pools[poolId].price;
        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;
       
        // Pagos
       // require(USDT.transfer(projectWallet, paymentForProject), "Pago al proyecto fallido"); //Paga el 10% del total
         paymentContract.distributeProjectFee(pools[poolId].price, false, wallet);
        // Crear una nueva entrada de compra
        user.purchases.push(Purchase({
            poolId: poolId,
            position: position,
            hasPassed: false,
            startedInThisPool: (poolId >= 5),
            canContribute: true
        }));
        
        pools[poolId].queue.push(wallet);
        pools[poolId].numUsers++;


        // Repartir el pago a los referidos hasta 7 niveles
        distributeReferralPayments(wallet, poolId);
    }


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
            advancePool(userAddress, 1, 0);

            // Después de avanzar, elimina al usuario de la cola
           // removeUserFromPool(1, 0); // Siempre eliminar la primera posición
        }

        // ESTA DANDO ERROR Y PASAN LAS 3 PERSONAS DE LA POOL 1 A LA 2 PERO LUEGO NO
        for (uint256 poolIdToCheck = 2; poolIdToCheck <= 7; poolIdToCheck++) {
                for (uint256 i = 0; i < pools[poolIdToCheck].numUsers; i++) {
                    tryAdvance(poolIdToCheck, 0);
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


    function getReferralCountsByLevel(address user) public view returns (uint256[] memory) {
        uint256[] memory referralCounts = new uint256[](levels.length);
        
        address currentReferrer = users[user].referrer;
        
        for (uint256 i = 0; i < levels.length; i++) {
            if (currentReferrer == address(0)) {
                break;  // No más referidos en niveles superiores
            }
            
            referralCounts[i] = users[currentReferrer].directReferrals;
            currentReferrer = users[currentReferrer].referrer;
        }

        return referralCounts;
    }

}
