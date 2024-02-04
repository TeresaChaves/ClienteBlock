var MyTokenFactory = artifacts.require("MyTokenFactory");

module.exports = async function (callback) {
  const creditsong_account = "0x3412E7B8F7E6Db759340c26Fc7b4F9BB60E83426";
  //TODO
  const myTokenFactoryInstance = await MyTokenFactory.deployed();

  //Initiate MyTokenTemplate

  await myTokenFactoryInstance.addMyTokenTemplateRoyaltyBalance(
    "0xf783eF6B5260FA1e448D93D1e131a235D6bB7582",
    {
      from: creditsong_account,
      value: 10000,
    }
  );

  //invoke callback
  callback();
};
