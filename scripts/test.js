const hre = require("hardhat");

const accountAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAY_MASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    const account = await hre.ethers.getContractAt("Account", accountAddress);
    const count = await account.count();

    console.log("Count", count);

    console.log(
        "account balance",
        await hre.ethers.provider.getBalance(accountAddress)
    );

    const entryPoint = await hre.ethers.getContractAt(
        "EntryPoint",
        ENTRY_POINT_ADDRESS
    );

    console.log(
        "account balance on Entry Point",
        await entryPoint.balanceOf(accountAddress)
    );

    console.log(
        "account balance on Paymaster",
        await entryPoint.balanceOf(PAY_MASTER_ADDRESS)
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
