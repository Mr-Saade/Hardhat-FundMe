const {ethers} = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  deployer = accounts[0];
  fundme = await ethers.getContract("FundMe", deployer);
  console.log("Funding......");
  const fundtxResponse = await fundme.fund({
    value: ethers.utils.parseEther("1"),
  });
  fundtxResponse.wait(1);
  console.log("Funded..");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
