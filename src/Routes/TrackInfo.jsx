import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Track from "../Components/Track";
import "./TrackInfo.css";

const TrackInfo = ({ accessToken }) => {
  const [trackInfo, setTrackInfo] = useState({});
  const [artistInfo, setArtistInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/404");
    } else {
      queryAPI(id);
    }
  }, []);

  const queryAPI = async (trackID) => {
    try {
      // Get track information
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Couldn't fetch track: HTTP ${response.status}: ${response.statusText}`
        );
      }

      const track = await response.json();
      console.log(track);
      setTrackInfo(track);

      // Get artist information
      const artistId = track.artists[0].id;
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!artistResponse.ok) {
        throw new Error(
          `Couldn't fetch artist: HTTP ${artistResponse.status}: ${response.statusText}`
        );
      }

      const artistData = await artistResponse.json();
      console.log("Artist:", artistData);
      setArtistInfo(artistData);
    } catch (error) {
      console.error("Error fetching individual track details: ", error);
    }
  };

  return (
    <article className="glass-panel">
      {trackInfo &&
      trackInfo.album &&
      artistInfo &&
      Object.keys(artistInfo).length > 0 ? (
        <>
          <div className="container">
            <img
              src={trackInfo.album.images[0].url}
              alt={trackInfo.album.name}
              className="album-art large-img"
            />
            <div className="column">
              <h2>{trackInfo.name}</h2>
              <p>from {trackInfo.album.name}</p>
              <p>{trackInfo.explicit ? "Explicit" : ""}</p>
              <p>Popularity</p>
              <div className="popular-bar glass-panel">
                <div
                  className="inner-bar"
                  style={{ width: `${trackInfo.popularity}%` }}
                />
              </div>
              <a
                href={trackInfo.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="pad-extra"
              >
                <button className="glass-button">Open in Spotify</button>
              </a>
            </div>
          </div>
          <h2>Main artist:</h2>
          <div className="container">
            <img
              src={artistInfo.images[1].url}
              alt={artistInfo.name}
              className="album-art large-img"
            />
            <div className="column">
              <h2>{artistInfo.name}</h2>
              <p>{artistInfo.followers.total} followers</p>
              {artistInfo.genres?.length > 0 ? (
                <p>Genres: {artistInfo.genres.join(", ")}</p>
              ) : (
                <p>Genre not known.</p>
              )}
            </div>
          </div>
          <Link to="/" className="pad-extra">
            <button className="glass-button">Go back</button>
          </Link>
        </>
      ) : (
        <></>
      )}
    </article>
  );
};

export default TrackInfo;
