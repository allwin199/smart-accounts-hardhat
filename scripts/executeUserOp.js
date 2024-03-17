const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAY_MASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    const entryPoint = await hre.ethers.getContractAt(
        "EntryPoint",
        ENTRY_POINT_ADDRESS
    );

    const sender = await hre.ethers.getCreateAddress({
        from: FACTORY_ADDRESS,
        nonce: FACTORY_NONCE,
    });

    const [signer0] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();
    const accountFactory = await hre.ethers.getContractFactory(
        "AccountFactory"
    );
    const initCode = "0x";
    // FACTORY_ADDRESS +
    // accountFactory.interface
    //     .encodeFunctionData("createAccount", [address0])
    //     .slice(2);

    const account = await hre.ethers.getContractFactory("Account");
    const callData = account.interface.encodeFunctionData("execute");

    console.log("Sender", { sender });

    // await entryPoint.depositTo(PAY_MASTER_ADDRESS, {
    //     value: hre.ethers.parseEther("100"),
    // });

    const userOp = {
        sender,
        nonce: await entryPoint.getNonce(sender, 0),
        initCode,
        callData,
        callGasLimit: 200_000,
        verificationGasLimit: 200_000,
        preVerificationGas: 50_000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: PAY_MASTER_ADDRESS,
        signature: "0x",
    };

    const tx = await entryPoint.handleOps([userOp], address0);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
