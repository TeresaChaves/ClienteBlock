import React, { useEffect, useState } from "react";
import "./DetailPage.css";
import { useParams } from "react-router-dom";
import DetailCard from "../../Component/DetailCard/DetailCard";
import { Row, Col, Container } from "react-bootstrap";
import { web3GetContractDetails } from "../../backend/web3api";

const DetailPage = () => {
  const { id } = useParams();
  const newId = Number(id);
  const [detail, setDetailSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  const loadSongs = async () => {
    try {
      let songs_api = await web3GetContractDetails();
      setDetailSong(songs_api);
    } catch (error) {
      console.error("Error loading songs:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false whether loading succeeded or failed
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const detailArtist = detail.filter((element) => element.id === newId);

  return (
    <>
      {isLoading ? (
        // Show a loading indicator while data is being loaded
        <div className="loading-indicator">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
      ) : (
        <>
          <Row>
            <div
              className="detailHeader"
              style={{
                backgroundImage: `url(${detailArtist[0]?.allSongs[0].artist_banner_image})`,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <h1 className="h1-detail">{detailArtist[0]?.artist_name}</h1>
            </div>
          </Row>
          <div>
            <div className="carddetailflex">
              {detailArtist[0]?.allSongs.map((songdetail, index) => {
                return (
                  <DetailCard
                    detail={songdetail}
                    key={index}
                    // {...songdetail}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailPage;
