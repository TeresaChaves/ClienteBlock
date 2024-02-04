var MyTokenFactory = artifacts.require("MyTokenFactory");

module.exports = async function (callback) {
  const creditsong_account = "0x3412E7B8F7E6Db759340c26Fc7b4F9BB60E83426";
  //TODO
  const myTokenFactoryInstance = await MyTokenFactory.deployed();

  //Initiate MyTokenTemplate
  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_WINESON_DAISY", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmbVgm1skrZkAcXrp5kBF1NasLKPXiYvPKxRgqgKGByLcJ", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_WINESON_CUTE_GIRL", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmUmJLuk9bdtvE35goJsP2b7EvxMoPjSC4bCk9sgEJaD8G", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_WINESON_LUCKY_MONKEY", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmeQfLfmrqxUcDk8oY1q14joefqajZrDFZHycW4dFUDs8v", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_BESMAYA_TU_CARITA", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmXujLUtWqqZAsGiqRf4MSm7bRApprtDZBZEKGRBpia53Z", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_BESMAYA_SI_SALES_A_X_MI", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmQxkaimt5X4Vs284hfJWfAiDnhLUd6VU9isj1SFAWTrbB", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );
  
  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_BESMAYA_HONEY", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmVvm8PgiU3aYunGPCV35Rj4owL76W4EjJhMQyutEWLZ9H", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_ANA_NIETO_CONDENADA", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmPiRDRsTf1FUTWsEw1Cz53Ba5eF7C7itHZtjbCQKR9JiH", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_ANA_NIETO_LAS_GATAS", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmQvyYSRBYMQXmd5oA9dQYNN1TCALccKCcBVMFjkUNN1Qs", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_ANA_NIETO_IDENTIDAD", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmSEFi5sFbnJLLzLQ2iT1xKhVajaceYQMuqtnN8vpL2Era", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_JULIETA_CARI", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmRxkxH5Ggmykk6uwsWYAT71SzhWKnp9iLpg46oxpwqouG", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_JULIETA_SECR3T", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmNP2qpcHMhkyMnUPQhZM4R2JDcyQgXzdNAyEYxzm1WkDj", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_JULIETA_T'ENXULES", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmbUJtMvRiSXfPhhdCGqeeK2o7DRLUXf6uUzjhBLzYYYNc", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_MALMÖ_040_LA_ÚLTIMA_CANCIÓN", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmTtERsjABPSzULR4vvwD4i6QhXRK53nJfQS1sg5P5BwRM", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_MALMÖ_040_LO_QUE_HAY_DENTRO_DE_MÍ", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmSg8XUYvt38noJnR8kkn6LB1Ss2o3Q255gj8puZrMaFwK", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_MALMÖ_040_LOS_DÍAS_DE_MIKE", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmUra1JEXMiXvPBVPihRxQ1H9KkoRUNtDMvxyZjKGU2Kz1", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_CIAO_MARINA_96", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmbnsHAiP9zjddLTbXNtJYw9az7DJAPMjNN1D2SdyFStpV", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_CIAO_MARINA_GOLPE_DE_SUEÑOS", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/Qmecn6ogFkv1HUD2mJ9TzPpVUi8ihMW4U8Xpbu3MCFEVru", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  await myTokenFactoryInstance.createMyTokenTemplate(
    "CREDIT_SONG_CIAO_MARINA_BELLA_VITA", //SC Name
    "CS", //SC Symbol
    "https://creditsong.infura-ipfs.io/ipfs/QmdzWfi9Gikzw9c5WfZUUMxsfXsw76VKD3S2pJa37ypnPu", //uri
    10, //totalSupply
    30000000000000, //price in weis
    {
      from: creditsong_account,
    }
  );

  



  //invoke callback
  callback();

};
