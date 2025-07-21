import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Track from "../Components/Track";

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
          <img
            src={trackInfo.album.images[0].url}
            alt={trackInfo.album.name}
            className="album-art"
          />
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
          >
            <button className="glass-button">Open in Spotify</button>
          </a>
          <h2>Main artist: {artistInfo.name}</h2>
          <img
            src={artistInfo.images[1].url}
            alt={artistInfo.name}
            className="album-art"
          />
          <p>{artistInfo.followers.total} followers</p>
        </>
      ) : (
        <></>
      )}
    </article>
  );
};

export default TrackInfo;
