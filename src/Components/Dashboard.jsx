import "./Dashboard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Track from "./Track";
import Search from "./Search";
import BarChart from "./BarChart";

const Dashboard = ({ accessToken }) => {
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const topSongsPlaylistID = "6UeSakyzhiEt4NB3UAd6NQ"; // Billboard top 100 tracks (updated weekly)

  useEffect(() => {
    getTopTracks();
  }, []);

  // Get top 100 tracks from Billboard
  const getTopTracks = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${topSongsPlaylistID}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const trackItems = data.items
        .map((item) => item.track)
        .filter((track) => track !== null);

      // Collect unique artist IDs
      const artistIdSet = new Set(); // Grab artists
      trackItems.forEach((item) => {
        if (item.artists.length > 0) {
          artistIdSet.add(item.artists[0].id);
        }
      });

      const artistIds = Array.from(artistIdSet);

      // Map each artist to their respective genres
      const genreMap = {};

      for (let i = 0; i < artistIds.length; i += 50) {
        // Spotify only allows a get several artists call to be up to 50 artists
        const batch = artistIds.slice(i, i + 50);
        const artistResponse = await fetch(
          `https://api.spotify.com/v1/artists?ids=${batch.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const artistData = await artistResponse.json();
        console.log(artistData);
        artistData.artists.forEach((artist) => {
          genreMap[artist.id] = artist.genres;
        });
      }

      const trackArray = [];
      console.log(trackItems);
      // Combine relevant information into single array for state variable
      trackItems.forEach((track) => {
        trackArray.push({
          id: track.id,
          name: track.name,
          albumArt: track.album.images[0]?.url,
          artists: track.artists.map((artist) => artist.name),
          date: new Date(track.album.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          popularity: track.popularity,
          genres: genreMap[track.artists[0]?.id] || [],
          duration: `${Math.floor(track.duration_ms / 60000)}:${(
            (track.duration_ms % 60000) /
            1000
          )
            .toFixed(0)
            .padStart(2, "0")}`,
          link: track.external_urls.spotify,
        });
      });

      setTracks(trackArray);
      setFilteredTracks(trackArray);
      setAvailableGenres([...new Set(Object.values(genreMap).flat())]);
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  const getMostFrequentGenre = (arr) => {
    let m = new Map();
    let maxCount = 0;
    let res = null;

    for (let num of arr) {
      let count = (m.get(num) || 0) + 1;
      m.set(num, count);

      if (count > maxCount) {
        maxCount = count;
        res = num;
      }
    }

    return res;
  };

  return (
    <main>
      <section className="container">
        <div className="glass-panel">
          <h1>
            Showing{" "}
            <span className="accent">
              {
                filteredTracks.length /* Total number of tracks being displayed */
              }
            </span>{" "}
            Tracks
          </h1>
        </div>
        <div className="glass-panel">
          <h1>
            Average Popularity
            <br />
            <span className="accent">
              {
                /* Average popularity of displayed tracks */
                filteredTracks.reduce(
                  (sum, track) => sum + track.popularity,
                  0
                ) / filteredTracks.length
              }
            </span>
          </h1>
        </div>
        <div className="glass-panel">
          <h1>
            Most Popular Genre
            <br />
            <span className="accent">
              {getMostFrequentGenre(
                filteredTracks.flatMap((track) => track.genres)
              )}
            </span>
          </h1>
        </div>
      </section>
      <div className="main-container">
        <article className="glass-panel">
          <div>
            <Search
              tracks={tracks}
              genres={availableGenres}
              setFilteredTracks={setFilteredTracks}
            />
            {filteredTracks &&
              filteredTracks.map((track) => (
                <Link key={track.id} to={`/track/${track.id}`}>
                  <Track
                    key={track.id}
                    albumArt={track.albumArt}
                    trackName={track.name}
                    artists={track.artists}
                    releaseDate={track.date}
                    popularity={track.popularity}
                    genres={track.genres}
                    duration={track.duration}
                  />
                </Link>
              ))}
          </div>
        </article>
        <div className="charts">
          <section className="glass-panel">
            <h3>Genre Pie Chart</h3>
            <BarChart
              genres={filteredTracks.flatMap((track) => track.genres)}
            />
          </section>
          <section className="glass-panel">
            <h3>Most Common Artists Bar Chart</h3>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
