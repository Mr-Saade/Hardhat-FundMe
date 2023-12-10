const {ethers} = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  deployer = accounts[0];
  fundme = await ethers.getContract("FundMe", deployer);
  console.log("Withdrawing......");
  const withdrawtxResponse = await fundme.withdraw();
  withdrawtxResponse.wait(1);
  console.log("Withdrawn..");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
