const { ethers, upgrades } = require("hardhat");

const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


async function upgrade() {
    var proxyAddress = '0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1';
    var Contract2 = await hre.ethers.getContractFactory("IcoCocay");
    await upgrades.upgradeProxy(proxyAddress, Contract2, {
        gasLimit: 15000000, // Aumenta gasLimit aquí
        gasPrice: ethers.parseUnits('5', 'gwei') // Aumenta gasPrice aquí
    });

    await wait(30000);

    var implV2 = await upgrades.erc1967.getImplementationAddress(proxyAddress);
    console.log('Address implV2: ', implV2);

    await wait(30000);

    await hre.run("verify:verify", {
        address: implV2,
        constructorArguments: [],
    });
}



        
async function deploy() {
    var SatoshiContract = await hre.ethers.getContractFactory("IcoCocay");
    var satoshiContract = await upgrades.deployProxy(
        SatoshiContract,
        ['0x55d398326f99059fF775485246999027B3197955', '0xf63F3543253B9Ce2a720410Cf73fe923DA617Ca3','0x5921aaCcc700164f667586f0315c579aA597c0AB', '0x74598319417e3dFf6081BF1eE9d269F5B41D4a93'],
        { kind: "uups", gasLimit: 10000000, gasPrice: ethers.parseUnits('5', 'gwei') },
    );
    var tx = await satoshiContract.waitForDeployment();
    await tx.deploymentTransaction().wait(10);

    var satContImpl = await upgrades.erc1967.getImplementationAddress(
        await satoshiContract.getAddress()
    );
    console.log(`Address del Proxy es: ${await satoshiContract.getAddress()}`);
    console.log(`Address de Impl es: ${satContImpl}`);

    await hre.run("verify:verify", {
        address: satContImpl,
        constructorArguments: [],
    });
}


async function main() {
    // Obtén el contrato a desplegar
    const CocayToken = await ethers.getContractFactory("CocayToken");
    
    // Despliega el contrato
    const cocayToken = await CocayToken.deploy();
    var tx = await cocayToken.waitForDeployment();
    await tx.deploymentTransaction().wait(8);
    
    console.log("CocayToken desplegado en:", await cocayToken.getAddress());

    // Espera unos minutos para que la red reconozca el contrato
    await new Promise(r => setTimeout(r, 30000)); 

    // Verifica el contrato en Etherscan
    await run("verify:verify", {
        address: await cocayToken.getAddress(),
        constructorArguments: [],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});