const hre = require("hardhat");

const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PAY_MASTER_ADDRESS = "0x09Cbc9c3FBa22e83cAD5272bb3bE3223A8D5C8a2";

async function main() {
    const entryPoint = await hre.ethers.getContractAt(
        "EntryPoint",
        ENTRY_POINT_ADDRESS
    );

    await entryPoint.depositTo(PAY_MASTER_ADDRESS, {
        value: hre.ethers.parseEther(".2"),
    });

    console.log("deposit was successful!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
