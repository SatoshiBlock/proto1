const CropSure = artifacts.require("CropSure");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(
    CropSure,
    { from: accounts[9], gas:6721975, value: 500000000000000000 }
  );
};
