// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentContractV7 is Ownable {
    uint256 public constant PROJECTFEEPERCENTAGE = 10;
    using SafeERC20 for IERC20;

    IERC20 public paymentToken;
    address public projectWallet;
    address public multiPoolAddress;
    mapping(address => uint256) public userBalances;
    mapping(uint256 => uint256) public amountPerLevel;
    mapping(uint256 => uint256) public extraPerPool;

    uint256 public totalDistributed;

    constructor(address _usdtAddress, address _projectWallet) Ownable(msg.sender)  {
        require(msg.sender != address(0)); 
        paymentToken = IERC20(_usdtAddress);
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

    function saveReferralPayments(address[] calldata referrers, uint256 poolPrice) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        uint256 l = referrers.length;

        for (uint256 i = 0; i < l; ++i) {
            if (referrers[i] == address(0)) { //Aca se checkea si es 0 porque significa que llego a un numero de nivel que no tiene sponsor, ej: tiene 4 personas arriba de el en su arbol, al momento de llegar al nivel 5 seria 0x0
               break; 
            }
            userBalances[referrers[i]] += (poolPrice * amountPerLevel[i]) / 100;
            totalDistributed += (poolPrice * amountPerLevel[i]) / 100;
        }
    }

    function saveProjectFee(uint256 poolPrice) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        uint256 paymentForProject = (poolPrice * PROJECTFEEPERCENTAGE) / 100;
        userBalances[projectWallet] += paymentForProject;
    }

    function saveExceedingPayment(address user, uint256 poolId) external {
        require(msg.sender == multiPoolAddress, "Need Caller MultiPool");
        userBalances[user] += extraPerPool[poolId];
    }

    function claimEarnings() public {
        uint256 balance = userBalances[msg.sender];
        require(balance > 0, "No tienes fondos para reclamar");

        userBalances[msg.sender] = 0; 
        paymentToken.safeTransfer(msg.sender, balance);
    }

    function setMultiPoolAddress(address _multiPoolAddress) public onlyOwner {
         multiPoolAddress = _multiPoolAddress;
    }

    //AGREGAR LOGICA DE EMERGENCIA 

}