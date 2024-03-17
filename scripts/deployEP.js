const hre = require("hardhat");

async function main() {
    const deployEP = await hre.ethers.deployContract("EntryPoint");

    await deployEP.waitForDeployment();

    console.log(`Entry Point Deployed to ${deployEP.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
