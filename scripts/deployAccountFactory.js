const hre = require("hardhat");

async function main() {
    const deployAccountFactory = await hre.ethers.deployContract(
        "AccountFactory"
    );

    await deployAccountFactory.waitForDeployment();

    console.log(`Account Factory Deployed to ${deployAccountFactory.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
