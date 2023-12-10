const networkConfig = {
  11155111: {
    name: "Sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};
const developmentChains = ["hardhat", "localhost"];
const Decimals = 8;
const InitialAnswer = 100000000000;

module.exports = {
  networkConfig,
  Decimals,
  developmentChains,
  InitialAnswer,
};
