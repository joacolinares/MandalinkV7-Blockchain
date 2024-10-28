// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentContract is Ownable {
    IERC20 public USDT;
    address public projectWallet;
    address public multiPoolAddress;
    uint256 public projectFeePercentage = 10;


    address[] public earlyInvestors; // Lista de las primeras 20 wallets
    mapping(address => bool) public hasVoted; // Seguimiento de quién ha votado
    uint256 public votesInFavor; // Número de votos a favor
    bool public votingActive = false; // Estado de la votación de emergencia
    mapping(address => uint256) public userInvestments; // Cantidad invertida por cada usuario
    uint256 public totalInvested; // Suma total de las inversiones
    address[] public allInvestors;
    mapping(address => uint256) public userBalances;
    
    constructor(address _usdtAddress, address _projectWallet) Ownable(msg.sender)  {
        USDT = IERC20(_usdtAddress);
        projectWallet = _projectWallet;
    }

    function setMultiPoolAddress(address _multiPoolAddress) public onlyOwner {
         multiPoolAddress = _multiPoolAddress;
    }

    function distributeProjectFee(uint256 poolPrice, bool joinPool, address wallet) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        if(joinPool){
            if(earlyInvestors.length < 20){
                 earlyInvestors.push(wallet);
            }
            if (userInvestments[wallet] == 0) {
                allInvestors.push(wallet);
            }
            userInvestments[wallet] += poolPrice;
            totalInvested += poolPrice;
        }
       


        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;
        userBalances[projectWallet] += paymentForProject;
       // require(USDT.transfer(projectWallet, paymentForProject), "Pago al proyecto fallido");
    }

    function distributeReferralPayments(
        address[] memory referrers, 
        uint256[] memory amounts
    ) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        require(referrers.length == amounts.length, "Inconsistencia en datos de referidos");
        for (uint256 i = 0; i < referrers.length; i++) {
            if (referrers[i] == address(0)) {
               break; 
            }
            userBalances[referrers[i]] += amounts[i];
            //require(USDT.transfer(referrers[i], amounts[i]), "Pago al referido fallido");
        }
    }

    function distributeExceedingPayment(address user, uint256 amount) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        //require(USDT.transfer(user, amount), "Pago del excedente fallido");
        userBalances[user] += amount;
    }


    function claimEarnings() public {
        uint256 balance = userBalances[msg.sender];
        require(balance > 0, "No tienes fondos para reclamar");

        userBalances[msg.sender] = 0; 
        require(USDT.transfer(msg.sender, balance), "Transferencia fallida");
    }


    // Iniciar votación de emergencia
    function startEmergencyVote() public {
        require(earlyInvestors.length == 20, "Necesitamos al menos 20 inversores para iniciar una votacion");
        require(!votingActive, "Ya hay una votacion en progreso");
        require(isEarlyInvestor(msg.sender), "No estas en la lista de los primeros inversores");

        votingActive = true;
        votesInFavor = 0;

    }

    // Votar para la emergencia
    function voteForEmergency(bool voteInFavor) public {
        require(votingActive, "No hay votacion activa");
        require(hasVoted[msg.sender] == false, "Ya has votado");
        require(isEarlyInvestor(msg.sender), "No estas en la lista de los primeros inversores");

        hasVoted[msg.sender] = true;

        if (voteInFavor) {
            votesInFavor++;
        }

        if (votesInFavor >= 11) {
            executeEmergencyDistribution();
        }
    }

    // Verifica si una wallet es de los primeros inversores
    function isEarlyInvestor(address wallet) internal view returns (bool) {
        for (uint256 i = 0; i < earlyInvestors.length; i++) {
            if (earlyInvestors[i] == wallet) {
                return true;
            }
        }
        return false;
    }

    function getEarlyInvestorsLength() public view returns (uint256) {
        return earlyInvestors.length;
    } 

    // Ejecutar la distribución de emergencia si se alcanza la mayoría
    function executeEmergencyDistribution() internal {
        uint256 contractBalance = USDT.balanceOf(address(this));

        // Distribuir proporcionalmente entre todos los inversores
        for (uint256 i = 0; i < allInvestors.length; i++) {
            address investor = allInvestors[i];
            uint256 userShare = (userInvestments[investor] * contractBalance) / totalInvested;
            require(USDT.transfer(investor, userShare), "Pago del excedente fallido");
        }

        votingActive = false;
    }
}