const hre = require("hardhat");

async function main() {
    const deployAccountFactory = await hre.ethers.deployContract(
        "AccountFactory"
    );

    await deployAccountFactory.waitForDeployment();

    console.log(`Account Factory Deployed to ${deployAccountFactory.target}`);

    // const deployEntryPoint = await hre.ethers.deployContract("EntryPoint");

    // await deployEntryPoint.waitForDeployment();

    // console.log(`Entry Point Deployed to ${deployEntryPoint.target}`);

    const payMaster = await hre.ethers.deployContract("Paymaster");

    await payMaster.waitForDeployment();

    console.log(`Pay Master Deployed to ${payMaster.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
