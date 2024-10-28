// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentContractV7 is Ownable {
    IERC20 public USDT;
    address public projectWallet;
    address public multiPoolAddress;
    mapping(address => uint256) public userBalances;
    mapping(uint256 => uint256) public amountPerLevel;
    mapping(uint256 => uint256) public extraPerPool;

    uint256 public projectFeePercentage = 10;
    uint256 public totalDistributed;

    constructor(address _usdtAddress, address _projectWallet) Ownable(msg.sender)  {
        USDT = IERC20(_usdtAddress);
        projectWallet = _projectWallet;

        amountPerLevel[0] = 10;  
        amountPerLevel[1] = 3;
        amountPerLevel[2] = 2;
        amountPerLevel[3] = 1;
        amountPerLevel[4] = 1;
        amountPerLevel[5] = 1;
        amountPerLevel[6] = 2;

        extraPerPool[1] = 5 * 1e6;  
        extraPerPool[2] = 10 * 1e6;
        extraPerPool[3] = 120 * 1e6;
        extraPerPool[4] = 230 * 1e6;
        extraPerPool[5] = 340 * 1e6;
        extraPerPool[6] = 50 * 1e6;
        extraPerPool[7] = 1600 * 1e6;
    }

    function distributeReferralPayments(address[] memory referrers, uint256 poolPrice) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        for (uint256 i = 0; i < referrers.length; i++) {
            if (referrers[i] == address(0)) {
               break; 
            }
            userBalances[referrers[i]] += (poolPrice * amountPerLevel[i]) / 100;
            totalDistributed += (poolPrice * amountPerLevel[i]) / 100;
        }
    }

    function distributeProjectFee(uint256 poolPrice) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        uint256 paymentForProject = (poolPrice * projectFeePercentage) / 100;
        userBalances[projectWallet] += paymentForProject;
    }

    function distributeExceedingPayment(address user, uint256 poolId) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        userBalances[user] += extraPerPool[poolId];
    }

    function claimEarnings() public {
        uint256 balance = userBalances[msg.sender];
        require(balance > 0, "No tienes fondos para reclamar");

        userBalances[msg.sender] = 0; 
        require(USDT.transfer(msg.sender, balance), "Transferencia fallida");
    }

    function setMultiPoolAddress(address _multiPoolAddress) public onlyOwner {
         multiPoolAddress = _multiPoolAddress;
    }

    //AGREGAR LOGICA DE EMERGENCIA

}