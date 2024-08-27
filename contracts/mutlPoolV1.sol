// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProyectoDarwin {
    struct Purchase {
        uint256 poolId;
        uint256 position;
        bool hasPassed;
    }

    struct User {
        Purchase[] purchases; // Lista de todas las compras del usuario en todos los Pools
        address referrer; // Dirección del usuario que lo refirió
    }

    struct Pool {
        uint256 price;
        uint256 numUsers;
        mapping(uint256 => address) queue;
    }

    struct Level {
        uint256 percentage;
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

    function joinPool(uint256 poolId, address referrer) public {
        require(poolId >= 1 && poolId <= 7, "Pool no valido");

        User storage user = users[msg.sender];
        uint256 position = pools[poolId].numUsers;

        // Si es la primera vez que se une, asignamos el referrer
        if (user.purchases.length == 0) {
            user.referrer = referrer;
        }

        // Transferir USDT al contrato
        if(msg.sender != address(this)){
            require(USDT.transferFrom(msg.sender, address(this), pools[poolId].price), "Transferencia fallida");
        }

        // Reparto del dinero
        uint256 poolPrice = pools[poolId].price;
       // uint256 paymentForNetwork = (poolPrice * networkFeePercentage) / 100;
        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;
      //  uint256 paymentForAdvancement = poolPrice - paymentForNetwork - paymentForProject;

        // Pagos
        require(USDT.transfer(projectWallet, paymentForProject), "Pago al proyecto fallido"); //Paga el 10% del total
        //require(USDT.transfer(pools[poolId].queue[position], paymentForNetwork), "Pago a la red fallido"); //Aca paga 20% a los referidos de la persona, deberia pagar en base al orden de niveles
        //Se quedan en el contrat el 70% restante


        // Crear una nueva entrada de compra
       
        user.purchases.push(Purchase({
            poolId: poolId,
            position: position,
            hasPassed: false
        }));

        pools[poolId].queue[position] = msg.sender;
        pools[poolId].numUsers++;

        emit PoolJoined(msg.sender, poolId, position);

        // Repartir el pago a los referidos hasta 7 niveles
        distributeReferralPayments(msg.sender, poolId);

        // Intentar avanzar al usuario que está tres posiciones por delante
        if (position >= 3) {
            tryAdvance(poolId, position - 3);
        }
    }

    function distributeReferralPayments(address user, uint256 poolId) internal {
        address currentReferrer = users[user].referrer;
        for (uint256 i = 0; i < levels.length && currentReferrer != address(0); i++) {
            uint256 payment = (pools[poolId].price * levels[i].percentage) / 100;
            require(USDT.transfer(currentReferrer, payment), "Pago al referido fallido");
            emit PaymentDistributed(currentReferrer, payment, poolId, i+1);
            currentReferrer = users[currentReferrer].referrer;  // Avanzamos al siguiente nivel
        }
        // El restante no pagado a referidos se queda en el contrato
    }

    function tryAdvance(uint256 poolId, uint256 position) internal {
        require(poolId >= 1 && poolId < 7, "Pool no valido");
        require(position < pools[poolId].numUsers, "Posicion no valida en el pool");

        address userAddress = pools[poolId].queue[position];
        User storage user = users[userAddress];

        Purchase storage purchase = findPurchase(user, poolId, position);
        require(!purchase.hasPassed, "Ya has pasado este pool con esta compra");

        // Verifica si al menos tres personas se han unido después de este usuario
        if (pools[poolId].numUsers >= position + 3) {
            advancePool(userAddress, poolId, position);
        }
    }

    function advancePool(address userAddress, uint256 poolId, uint256 position) public {
        require(msg.sender == address(this), "Only Contract");

        User storage user = users[userAddress];

        Purchase storage purchase = findPurchase(user, poolId, position);
        require(!purchase.hasPassed, "Ya has pasado este pool");

        // Avanza al siguiente Pool
        purchase.hasPassed = true;
        uint256 nextPoolId = poolId + 1;

        
        require(USDT.transfer(userAddress, payForExtraInPools[poolId]), "Pago de avance fallido"); //Pago del excedente
        emit ExceedingPayment(userAddress, payForExtraInPools[poolId], poolId, position);
       

        if (poolId == 7) {
            // Inyecta 500 USDT en Pool 1
            for (uint256 i = 0; i < 10; i++) {
                users[projectWallet].purchases.push(Purchase({
                    poolId: 1,
                    position: pools[1].numUsers,
                    hasPassed: false
                }));
                pools[1].queue[pools[1].numUsers] = projectWallet;
                pools[1].numUsers++;
                emit PoolJoined(projectWallet, 1, pools[1].numUsers - 1);
            }
        } else {
            joinPool(nextPoolId, address(0));  // Llamada directa a la función `joinPool` sin referidos
            emit PoolAdvanced(userAddress, poolId, nextPoolId, position);
        }
    }

    function findPurchase(User storage user, uint256 poolId, uint256 position) internal view returns (Purchase storage) {
        for (uint256 i = 0; i < user.purchases.length; i++) {
            if (user.purchases[i].poolId == poolId && user.purchases[i].position == position) {
                return user.purchases[i];
            }
        }
        revert("Compra no encontrada");
    }




}
