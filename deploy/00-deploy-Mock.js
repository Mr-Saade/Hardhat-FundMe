const network = require("hardhat");
const {Decimals, InitialAnswer} = require("../helper-hardhat-config");
module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();
  chainId = await network.getChainId();
  if (chainId === "31337") {
    log("Local network detected, Deploying mock...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [Decimals, InitialAnswer],
    });
    log("Mock Deployed!.");
    log("----------------------------------------");
  }
};
//For us to to run only our deploy scripts we can add these lines of code.
module.exports.tags = ["all", "mock"];
