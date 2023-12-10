const networkConfig = require("../helper-hardhat-config");
const network = require("hardhat");
const {verify} = require("../utils/verify");
require("dotenv").config();
module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();
  const chainId = await network.getChainId();
  const ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;
  if (chainId === "31337") {
    const ethusdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethusdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = ethUsdPriceFeed;
    log("Deploying FundMe and awaiting 6 block confirmations....");
  }

  const FundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log("---------------------------------------");

  if (chainId !== "31337" && process.env.ETHERSCAN_API_KEY) {
    log("Verifying FundMe contract.....");
    await verify(FundMe.address, [ethUsdPriceFeedAddress]);
  }
};
module.exports.tags = ["all", "fundme"];
