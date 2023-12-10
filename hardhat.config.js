require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //solidity: "0.8.18",
  solidity: {
    compilers: [{version: "0.8.0"}, {version: "0.8.18"}],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    Sepolia: {
      url: process.env.Sepolia_Rpc_Url,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas_reporter.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH", //To get a gas report on the ethereum network.
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};
