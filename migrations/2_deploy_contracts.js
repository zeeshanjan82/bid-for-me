var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Bidder = artifacts.require("./Bidder.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Bidder);
};
