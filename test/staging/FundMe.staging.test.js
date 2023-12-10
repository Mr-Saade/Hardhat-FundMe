const {ethers, deployments, network} = require("hardhat");
const {assert, expect} = require("chai");
const developmentChains = require("../../helper-hardhat-config");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
//Same as an if condition statement(ternary operator)
Array.from(developmentChains).includes(network.name).toString()
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const sentvalue = ethers.utils.parseEther("1");
      beforeEach(async function () {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        fundMe = await ethers.getContract("FundMe", deployer);
      });
      it("Should allow funding and withdrawal", async function () {
        const fundTxResponse = await fundMe.fund({value: sentvalue});
        await fundTxResponse.wait(1);
        const withdrawTxResponse = await fundMe.withdrawal();
        await withdrawTxResponse.wait(1);
        const endingbalance = await ethers.provider.getBalance(FundMe.address);
        assert.equal(endingbalance.toString(), "0");
      });
    });
