const {assert, expect} = require("chai");
const {ethers, deployments, network} = require("hardhat");
const {developmentChains} = require("../../helper-hardhat-config");
!developmentChains.includes(network.name).toString()
  ? describe.skip
  : describe("FundMe", async function () {
      let FundMe;
      let deployer;
      let MockV3Aggregator;
      const sentvalue = ethers.utils.parseEther("1");
      beforeEach(async function () {
        /*deployer = (await ethers.getNamedAccounts()).deployer;/*With this line of code you must import
    getNamedAccounts from hardhat so you get NamedAccounts like this from the deployer property in
    NamedAccounts in hardhatconfig File.*/
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture("all");
        FundMe = await ethers.getContract("FundMe", deployer);
        MockV3Aggregator = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
      });

      describe("constructor", function () {
        it("Should set aggregator address correctly", async function () {
          const response = await FundMe.getpriceFeed();
          assert.equal(response, MockV3Aggregator.address);
        });
      });
      describe("Fund", function () {
        it("Fails when minimum ETH is sent", async function () {
          await expect(FundMe.getfunder.length.toString()).to.equal("0");
        });
        it("Update the amount funded after funding", async function () {
          await FundMe.fund({value: sentvalue});
          const response = await FundMe.getaddressToAmountFunded(
            deployer.address
          );
          assert.equal(response.toString(), sentvalue.toString());
        });
        it("Updates getfunder array with funder", async function () {
          await FundMe.fund({value: sentvalue});
          const getfunder = await FundMe.getfunder(0);
          assert.equal(getfunder, deployer.address);
        });
      });
      describe("withdraw", function () {
        beforeEach(async function () {
          await FundMe.fund({value: sentvalue});
        });
        it("Withdraw eth by deployer", async function () {
          const startingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const startingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          transactionReceipt = await (await FundMe.withdraw()).wait(1);
          const {gasUsed, effectiveGasPrice} = transactionReceipt;
          const gasCost = effectiveGasPrice.mul(gasUsed);

          const endingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const endingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          assert.equal(endingcontractbalance, 0);
          assert.equal(
            startingcontractbalance.add(startingdeployerbalance).toString(),
            endingdeployerbalance.add(gasCost).toString()
          );
        });
        it("Withdraws eth when multiple getfunder are present", async function () {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            fundmeconnectedaccount = await FundMe.connect(accounts[i]);
            await fundmeconnectedaccount.fund({value: sentvalue});
          }
          const startingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const startingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          transactionReceipt = await (await FundMe.withdraw()).wait(1);
          const {gasUsed, effectiveGasPrice} = transactionReceipt;
          const gasCost = effectiveGasPrice.mul(gasUsed);

          const endingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const endingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          assert.equal(endingcontractbalance, 0);
          assert.equal(
            startingcontractbalance.add(startingdeployerbalance).toString(),
            endingdeployerbalance.add(gasCost).toString()
          );
          //Making sure the array is reset properly
          await expect(FundMe.getfunder.length.toString()).to.equal("0");
          //Makins sure the amount funded by getfunder are reset to 0
          for (let i = 1; i < 6; i++) {
            assert.equal(
              await FundMe.getaddressToAmountFunded(accounts[i].address),
              0
            );
          }
        });
        it("Cheaper withdrawals wtih single funder(gas effecient) testing....", async function () {
          const startingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const startingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          transactionReceipt = await (await FundMe.withdraw()).wait(1);
          const {gasUsed, effectiveGasPrice} = transactionReceipt;
          const gasCost = effectiveGasPrice.mul(gasUsed);

          const endingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const endingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          assert.equal(endingcontractbalance, 0);
          assert.equal(
            startingcontractbalance.add(startingdeployerbalance).toString(),
            endingdeployerbalance.add(gasCost).toString()
          );
        });
        it("Cheaper withdrawals wtih multi funders(gas effecient) testing....", async function () {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            fundmeconnectedaccount = await FundMe.connect(accounts[i]);
            await fundmeconnectedaccount.fund({value: sentvalue});
          }
          const startingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const startingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          transactionReceipt = await (await FundMe.CheaperWithdraw()).wait(1);
          const {gasUsed, effectiveGasPrice} = transactionReceipt;
          const gasCost = effectiveGasPrice.mul(gasUsed);

          const endingcontractbalance = await ethers.provider.getBalance(
            FundMe.address
          );
          const endingdeployerbalance = await ethers.provider.getBalance(
            deployer.address
          );
          assert.equal(endingcontractbalance, 0);
          assert.equal(
            startingcontractbalance.add(startingdeployerbalance).toString(),
            endingdeployerbalance.add(gasCost).toString()
          );
          //Making sure the array is reset properly
          await expect(FundMe.getfunder.length.toString()).to.equal("0");
          //Makins sure the amount funded by getfunder are reset to 0
          for (let i = 1; i < 6; i++) {
            assert.equal(
              await FundMe.getaddressToAmountFunded(accounts[i].address),
              0
            );
          }
        });
        /*it("Allows only the owner to withdraw", async function () {
      const accounts = await ethers.getSigners();
      const attacker = accounts[1];
      const attackerconnectedaccount = await FundMe.connect(attacker);
      await expect(attackerconnectedaccount.withdraw()).to.be.reverted;
      });  This commented test block erros out because the expect from chai matchers depends on 
      the new ethersV6 and since we are using ethersV5 because as at
      now hardhat deploy depends on that version*/
      });
    });
