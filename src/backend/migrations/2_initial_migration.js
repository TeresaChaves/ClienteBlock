const MyTokenFactory = artifacts.require("MyTokenFactory");
const MyTokenRoyalties = artifacts.require("MyTokenRoyalties");

module.exports = (deployer) => {
  deployer.deploy(MyTokenRoyalties).then(function () {
    return deployer.deploy(MyTokenFactory, MyTokenRoyalties.address);
  });
};
