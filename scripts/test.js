const hre = require("hardhat");

const accountAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";

async function main() {
    const account = await hre.ethers.getContractAt("Account", accountAddress);
    const count = await account.count();

    console.log("Count", count);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
