const hre = require("hardhat");

const accountAddress = "0xa14e7187258e6c8640691781bc72bf138a5ed522";

async function main() {
    const account = await hre.ethers.getContractAt("Account", accountAddress);
    const count = await account.count();

    console.log("Count", count);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
