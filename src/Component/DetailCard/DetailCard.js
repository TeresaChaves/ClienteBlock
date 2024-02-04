import "./DetailCard.css";
import { useState } from "react";
import { web3BuyToken } from "../../backend/web3api";
import copy from "../../assets/img/copy.png";

function DetailCard({ detail }) {
  console.log({ detail });
  const [number, setNumber] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleChange(event) {
    setNumber(event.target.value);
  }

  const [copySuccess, setCopySuccess] = useState(false);

  function handleCopyAddress() {
    const address = detail?.address;
    if (address) {
      const input = document.createElement("input");
      input.value = address;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopySuccess(true);
    }
    alert("Contract address copied to clipboard!");
  }

  const apiBuyToken = async (address, numberOfTokensToBuy, pricePerToken) => {
    const status = await web3BuyToken(
      address,
      numberOfTokensToBuy,
      pricePerToken
    );
    alert(status);
  };

  return (
    <div className="card-detail">
      <div className="image-container-detail " >

        <img className="top-detail" src={detail?.song_image} />
      </div>

      <div className="globaltext">
        <div className="firstline">{detail?.song_name}</div>
        <div className="detail-title">
          <span className="nameofPrice">Available Supply</span>
          <span className="nameoflist2">
            {detail?.available_supply} out of {detail?.total_supply}
          </span>
          <span className="nameofPrice">Price</span>
          <span className="nameoflist2">{detail?.price} Eth</span>
        </div>
        <div className="detail-title">
          <span className="nameofPrice">Contract Address</span>
          <span className="copyIcon" onClick={handleCopyAddress}>
            <img src={copy} alt="Copy to Clipboard" />
          </span>
        </div>
        <form className="botones-form" onSubmit={handleSubmit}>
          <label className="btnBuyQuantity">
            <input
              type="number"
              value={number}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </label>
          <button
            className="btnBuyPurchuse"
            type="submit"
            onClick={() =>
              apiBuyToken(detail?.address, number, detail?.price)
            }
          >
            Puchase
          </button>
        </form>

      </div>
    </div>
  );
}

export default DetailCard;
