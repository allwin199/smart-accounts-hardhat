const hre = require("hardhat");

async function main() {
    const deployEntryPoint = await hre.ethers.deployContract("EntryPoint");

    await deployEntryPoint.waitForDeployment();

    console.log(`Entry Point Deployed to ${deployEntryPoint.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
