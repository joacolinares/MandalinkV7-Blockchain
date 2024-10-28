// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {

    constructor() ERC20("MockUSDT", "MUSDT") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
    
    // Sobrescribir la función decimals para que devuelva 6
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
