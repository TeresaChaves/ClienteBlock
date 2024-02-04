import { NavLink } from "react-router-dom";
import "./CardInitialSong.css";
import instagramLogo from "../../assets/img/logoInstagram.png";
import youtube from "../../assets/img/youtube.png";
import spotify from "../../assets/img/spotify.png";

function CardInitialSong({
  id,
  artist_name,
  artist_image,
  countSongs,
  allSongs,
}) {
  return (
    <>
      <article className="cardInitialSong">
        <div className="img-display">
          <img className="img-artist-initialSong" src={artist_image}></img>
        </div>
        <div className="center-column-initial">
          <a className="name-artist">{artist_name}</a>
          <span className="redesdisplay">
            <a
              className="redesbutton"
              href={allSongs[0].instagram_url}
              target="_blank"
            >
              <img className="logoredes" src={instagramLogo} alt="Instagram" />
            </a>
            <a
              className="redesbutton"
              href={allSongs[0].youtube_url}
              target="_blank"
            >
              <img className="logoredes" src={youtube} alt="youtube" />
            </a>
            <a
              className="redesbutton"
              href={allSongs[0].spotify_url}
              target="_blank"
            >
              <img className="logoredes" src={spotify} alt="spoty" />
            </a>
          </span>
        </div>
        <div className="card-right-initial">
          <div className="card-left-initial">
            <div className="count-song-container">
              <a className="text-initial-count">Songs avaliable&nbsp;&nbsp;{countSongs}</a>
            </div>
            <NavLink to={`/detail-song/${id}`}>
              <button className="btnBuyInitial">View Full Listing</button>
            </NavLink>
          </div>
        </div>
      </article>
    </>
  );
}

export default CardInitialSong;
