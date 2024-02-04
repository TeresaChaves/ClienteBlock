import React, { useEffect, useState } from "react";
import CardInitialSong from "../../Component/CarInitialSong/CardInitialSong";
import { Row, Col, Tab, Container } from "react-bootstrap";
import { web3GetContractDetails } from "../../backend/web3api";
import "./InitialOffering.css";

const InitialOffering = () => {
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      const songsApi = await web3GetContractDetails();
      const updatedSongList = songsApi.map((song) => ({
        ...song,
        countSongs: song.allSongs.length,
      }));
      setSongList(updatedSongList);
      setIsLoading(false); // Set isLoading to false once loading is done
    } catch (error) {
      console.error("Error al cargar las canciones:", error);
      setIsLoading(false); // Set isLoading to false even if there's an error
    }
  };

  return (
    <section className="container-initialsong">
    {isLoading ? (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    ) : (
      // Mostrar la lista de canciones una vez que los datos están listos
      songList.map((song, index) => {
        return <CardInitialSong key={index} {...song} />;
      })
    )}
  </section>
  );
};

export default InitialOffering;
