import React from "react";
import "./MyPortfolioCard.css";
import { web3ClaimRoyalties } from "../../backend/web3api";
import Modal from "react-modal";
import { useState } from "react";
import descarga from "../../assets/img/download.png";
import { NavLink } from "react-router-dom";

function MyPortfolioCard({ myPortfolio }) {
  const [detail, setDetail] = React.useState({});

  //modal 1
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  //modal 2
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  const handleOpenModal2 = () => {
    setModalIsOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalIsOpen2(false);
  };

  const apiClaimRoyalties = async (
    address,
    list_of_nft_ids,
    list_of_nft_ids_balance
  ) => {
    let list_of_nft_ids_with_balance = [];

    for (let i = 0; i < list_of_nft_ids.length; i++) {
      if (list_of_nft_ids_balance[i] > 0) {
        list_of_nft_ids_with_balance.push(list_of_nft_ids[i]);
      }
    }
    const status = await web3ClaimRoyalties(
      address,
      list_of_nft_ids_with_balance
    );
    alert(status);
  };

  const openPDFFile = async (filePath) => {
    //js download pdf
    fetch(filePath).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "LegalContract.pdf";
        alink.click();
      });
    });
  };

  return (
    <div className="card12">
      <div className="image-container">
        <img src={myPortfolio?.allSongs[0].song_image} alt={myPortfolio?.song_name} />
      </div>
      <div className="content2">
        <span className="nameportfolio">
          {myPortfolio?.allSongs[0].song_name}
        </span>
        <span className="second-title-portfolio">
          by {myPortfolio?.allSongs[0].artist_name}
        </span>

        <div className="totsup2">
          <NavLink
            className="btnBuy3"
            type="submit"
            to={`/detail-song/${myPortfolio?.id}`}
          >
            Buy More
          </NavLink>
          <a
            className="btnBuy4"
            href="https://testnets.opensea.io/es"
            target="_blank"
          >
            Sell
          </a>
          <button className="info" type="submit" onClick={handleOpenModal}>
            i
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
          >
            <p className="modal-text">
              We take care of the distribution of royalties. Holders will
              recieve the royalties associated to the their song.
            </p>
            {/* Contenido de la ventana modal */}
            <button className="close" onClick={handleCloseModal}>
              Close
            </button>
          </Modal>
        </div>
        <div></div>
      </div>
      <div className="content2">
        <span className="nameportfolio">Royalties</span>

        <div className="container-portfolio-nft">
          <div className="row1">
            <span className="second-title-portfolio2"> Owned</span>
            <span className="second-title-portfolio">
              {myPortfolio?.allSongs[0]?.user_num_NFTs} NTF's
            </span>

          </div>
          <div className="row1">

            <div className="second-title-portfolio"> Royalties</div>
            <div className="second-title-portfolio">
              {myPortfolio?.allSongs[0]?.user_nft_total_balance} Eth
              <button className="info" type="submit" onClick={handleOpenModal2}>
                i
              </button>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen2}
            onRequestClose={handleCloseModal2}
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
          >
            <p className="modal-text">
              Pending royalties to collect at a token id level:
            </p>
            {myPortfolio?.allSongs[0]?.list_of_nft_ids.map((item, index) => (
              <div className="container-pending-royalties">

                <p style={{ color: "white" }}>
                  NFT Number:{item} | Royalties:
                  {myPortfolio?.allSongs[0]?.list_of_nft_ids_balance[index]} Eth
                </p>
              </div>
            ))}
            {/* Contenido de la ventana modal */}
            <div className="container-btn-cls">

              <button className="close" onClick={handleCloseModal2}>
                Cerrar
              </button>
            </div>
          </Modal>
        </div>
        <div className="container-portfolio-nft2">
          <span className="second-title-portfolio-3">Performance</span>
          <span className="second-title-portfolio-3">
            {" "}
            {
              <button>
                <img
                  className="descarga"
                  src={descarga}
                  alt="descarga"
                  onClick={() =>
                    openPDFFile(myPortfolio?.allSongs[0]?.legal_pdf)
                  }
                />
              </button>
            }{" "}
          </span>
        </div>
      </div>
      <div className="content3">
        {myPortfolio?.allSongs[0]?.user_nft_total_balance > 0 ? (
          <button
            className="btnBuy5"
            type="submit"
            onClick={() =>
              apiClaimRoyalties(
                myPortfolio?.allSongs[0]?.address,
                myPortfolio?.allSongs[0]?.list_of_nft_ids,
                myPortfolio?.allSongs[0]?.list_of_nft_ids_balance
              )
            }
          >
            Collect in wallet
          </button>
        ) : (
          "Nothing to collect"
        )}
      </div>
    </div>
  );
}

export default MyPortfolioCard;
