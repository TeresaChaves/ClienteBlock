import MyPortfolioCard from "../../Component/MyPortfolioCard/MyPortfolioCard";
import { useEffect, useState } from "react";
import "./MyPortfolio.css";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { web3GetUserPortfolio } from "../../backend/web3api";

const MyPortfolio = () => {
  const [myPortfolio, setMyPorfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    loadMyPortfolio();
  }, []);

  const loadMyPortfolio = async () => {
    try {
      let porfolio_api = await web3GetUserPortfolio();
      setMyPorfolio(porfolio_api);
    } catch (error) {
      console.error("Error loading portfolio:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false whether loading succeeded or failed
    }
  };

  return (
    <Container className="myporfolioContiner">
      <hr className="h2Port3"></hr>

      {isLoading ? (
        // Show a loading indicator while data is being loaded
        <div className="loading-indicator">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
        </div>
      ) : myPortfolio.length === 0 ? (
        <div className="container-emptyNFT">
          You haven't bought anything yet
          <br />
          <NavLink className="btnBuyInitial-NFT" to="/initial-offering">
            Buy your first NFT
          </NavLink>
        </div>
      ) : (
        myPortfolio?.map((port, index) => (
          <MyPortfolioCard myPortfolio={port} key={index} />
        ))
      )}
    </Container>
  );
};

export default MyPortfolio;
