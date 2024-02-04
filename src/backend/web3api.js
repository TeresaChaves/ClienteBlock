import Web3 from "web3";
import MyTokenFactoryBuild from "../backend/abis/MyTokenFactory.json";
import artistsSocial from "../Component/RedesSociales";
import songLegal from "../Contratoslegales/contratoslegalespath";
//Environment variables

//Metamask connection global variables
let selectedAccount;
let network_id;
let isInitialized;
let web3;

//Smart contract global variable
let myTokenFactory;

////////////////////////////////////////////////////////////////////////
////Metamask Connection
////////////////////////////////////////////////////////////////////////

export const web3ConnectWallet = async () => {
  //setup the provider
  let provider = window.ethereum;

  if (provider) {
    //get the user metamask account
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
      })
      .catch((err) => {
        alert(err);
      });

    //get the user metamask account if the user account changes
    provider.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      return selectedAccount;
    });

    //get the network id the user is connected to
    network_id = provider.networkVersion;

    if (network_id !== "11155111") {
      alert("Por favor cambia de red a Sepolia");
      isInitialized = false;
      return false;
    }

    //get the network id the used is connected to if the user changes the network
    provider.on("chainChanged", function (new_network_id) {
      if (new_network_id !== "11155111") {
        alert("Por favor cambia de red a Sepolia");
        isInitialized = false;
        return false;
      } else {
        isInitialized = true;
        network_id = new_network_id;
      }
    });
  } else {
    alert("Por favor, installa Metamask");
    return;
  }
  //Setup the web3 provider
  web3 = new Web3(provider);
  return selectedAccount;
};

////////////////////////////////////////////////////////////////////////
////My Token Factory interaction
////////////////////////////////////////////////////////////////////////

//get contract details

export const web3GetContractDetails = async () => {
  //check if the user account is connected to the right network
  if (!isInitialized) {
    await web3ConnectWallet();
  }

  //retrieve an instance of the myTokenFactory contract
  myTokenFactory = new web3.eth.Contract(
    MyTokenFactoryBuild.abi,
    MyTokenFactoryBuild.networks[network_id].address
  );

  //retrieve the list of nft collections
  let list_collections = await myTokenFactory.methods
    .getMyTokenTemplateList()
    .call({ from: selectedAccount });

  const song_level_data = [];
  for (let i = 0; i < list_collections.length; i++) {
    //process the collection details
    let a = await myTokenFactory.methods
      .getMyTokenTemplateDetails(list_collections[i])
      .call({
        from: selectedAccount,
      });

    //process the royalties info
    let nft_ids_list = await myTokenFactory.methods
      .getUserNFTIds(list_collections[i])
      .call({
        from: selectedAccount,
      });

    let nft_ids_list_balance = [];
    let user_total_balance = 0;

    for (let i = 0; i < nft_ids_list.length; i++) {
      let balance = await myTokenFactory.methods
        .getRoyaltiesInfo(a.contractAddress, nft_ids_list[i])
        .call({
          from: selectedAccount,
        });
      user_total_balance += parseInt(balance) / (1 * Math.pow(10, 18));
      nft_ids_list_balance.push(parseInt(balance) / (1 * Math.pow(10, 18)));
    }

    //we process the uri
    let uri_data = JSON.parse(httpGet(a.uri));
    let artist_instagram, artist_youtube, artist_spotify;

    for (let j = 0; j < artistsSocial.length; j++) {
      if (artistsSocial[j].name == uri_data.artist_or_group_name) {
        artist_instagram = artistsSocial[j].instagram;
        artist_youtube = artistsSocial[j].youtube;
        artist_spotify = artistsSocial[j].spotify;
      }
    }

    let artist_song_legal_path;
    for (let j = 0; j < songLegal.length; j++) {
      if (songLegal[j].song_name == uri_data.name) {
        artist_song_legal_path = songLegal[j].path;
      }
    }

    song_level_data.push({
      artist_name: uri_data.artist_or_group_name,
      artist_image: uri_data.artist_or_group_image,
      artist_banner_image: uri_data.artist_or_group_headerimage,
      address: a.contractAddress,
      song_name: uri_data.name,
      song_image: uri_data.image,
      song_video: uri_data.youtube_url,
      total_supply: a.totalSupply,
      available_supply: a.availableSupply,
      price: a.price / (1 * Math.pow(10, 18)),
      instagram_url: artist_instagram,
      youtube_url: artist_youtube,
      spotify_url: artist_spotify,
      legal_pdf: artist_song_legal_path,
      user_num_NFTs: nft_ids_list.length,
      user_nft_total_balance: user_total_balance,
      list_of_nft_ids: nft_ids_list,
      list_of_nft_ids_balance: nft_ids_list_balance,
    });
  }

  const artist_level_data = [];
  let id = 1;

  for (let i = 0; i < song_level_data.length; i++) {
    const artist = song_level_data[i].artist_name;
    let artistExists = false;
    for (let j = 0; j < artist_level_data.length; j++) {
      if (artist_level_data[j].artist_name === artist) {
        artistExists = true;
        artist_level_data[j].allSongs.push(song_level_data[i]);
      }
    }
    if (!artistExists) {
      const newArtistObject = {
        id,
        artist_image: song_level_data[i].artist_image,
        artist_name: song_level_data[i].artist_name,
        allSongs: [song_level_data[i]],
      };
      artist_level_data.push(newArtistObject);
      id++;
    }
  }
  return artist_level_data;
};

//get user portfolio

export const web3GetUserPortfolio = async () => {
  //check if the user account is connected to the right network
  if (!isInitialized) {
    await web3ConnectWallet();
  }

  const artist_level_data = await web3GetContractDetails();

  const user_portfolio = artist_level_data.filter((artist) =>
    artist.allSongs.some((song) => song.user_num_NFTs > 0)
  );

  return user_portfolio;
};

//buy a token
export const web3BuyToken = async (
  address,
  numberOfTokensToBuy,
  pricePerToken
) => {
  if (!isInitialized) {
    await web3ConnectWallet();
  }

  let buy_status;

  let final_price = numberOfTokensToBuy * pricePerToken;

  await myTokenFactory.methods
    .buyMyTokenTemplateNFTs(address, numberOfTokensToBuy)
    .send(
      {
        from: selectedAccount,
        value: web3.utils.toWei(String(final_price), "ether"),
      },
      function (err, transactionHash) {
        if (!err) {
          buy_status =
            "Transaction " +
            transactionHash +
            " successfully send to the network";
        } else {
          buy_status =
            "Transaction " +
            transactionHash +
            " with error not send to the network";
        }
      }
    );

  return buy_status;
};

//claim user royalties
export const web3ClaimRoyalties = async (address, list_of_nft_ids) => {
  if (!isInitialized) {
    await web3ConnectWallet();
  }

  console.log("dentro del api del claim, el address es: ", address);
  let claim_status;

  await myTokenFactory.methods.claimRoyalties(address, list_of_nft_ids).send(
    {
      from: selectedAccount,
    },
    function (err, transactionHash) {
      if (!err) {
        claim_status =
          "Transaction " +
          transactionHash +
          " successfully send to the network";
      } else {
        claim_status =
          "Transaction " +
          transactionHash +
          " with error not send to the network";
      }
    }
  );

  return claim_status;
};

///////////////////////////////////////
////////////utilities
//////////////////////////////////////
function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
