const hre = require("hardhat");

const accountAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAY_MASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    const [signer0] = await hre.ethers.getSigners();
    const signature = signer0.signMessage(
        hre.ethers.getBytes(hre.ethers.id("wee"))
    );

    const Test = await hre.ethers.getContractFactory("Test");

    const test = await Test.deploy(signature);

    console.log("address0", await signer0.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
