const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x25BAAec78833d52781810E9e16A9BD3BC837733C";
const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PAY_MASTER_ADDRESS = "0x09Cbc9c3FBa22e83cAD5272bb3bE3223A8D5C8a2";

async function main() {
    const entryPoint = await hre.ethers.getContractAt(
        "EntryPoint",
        ENTRY_POINT_ADDRESS
    );

    const [signer0] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();
    const accountFactory = await hre.ethers.getContractFactory(
        "AccountFactory"
    );
    let initCode =
        FACTORY_ADDRESS +
        accountFactory.interface
            .encodeFunctionData("createAccount", [address0])
            .slice(2);

    let sender;

    try {
        await entryPoint.getSenderAddress(initCode);
    } catch (ex) {
        sender = "0x" + ex.data.slice(-40);
        console.log({ sender });
    }

    const code = await ethers.provider.getCode(sender);
    if (code !== "0x") {
        initCode = "0x";
    }

    const account = await hre.ethers.getContractFactory("Account");
    const callData = account.interface.encodeFunctionData("execute");

    const userOp = {
        sender,
        nonce: "0x" + (await entryPoint.getNonce(sender, 0)).toString(16),
        initCode,
        callData,
        paymasterAndData: PAY_MASTER_ADDRESS,
        signature:
            "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
    };

    const response = await ethers.provider.send(
        "eth_estimateUserOperationGas",
        [userOp, ENTRY_POINT_ADDRESS]
    );

    console.log("response", response);

    // callGasLimit: 400_000,
    // verificationGasLimit: 500_000,
    // preVerificationGas: 100_000,
    // maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
    // maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),

    const userOpHash = await entryPoint.getUserOpHash(userOp);
    userOp.signature = signer0.signMessage(hre.ethers.getBytes(userOpHash));

    const tx = await entryPoint.handleOps([userOp], address0);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
