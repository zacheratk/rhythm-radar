import './Dashboard.css';
import { useState, useEffect } from 'react';
import Track from './Track';
import Search from './Search';

const Dashboard = ({ accessToken }) => {

  const [tracks, SetTracks] = useState([]);
  const topSongsPlaylistID = "6UeSakyzhiEt4NB3UAd6NQ"; // Billboard top 100 tracks (updated weekly)

  useEffect(() => {
    getTopTracks();
  }, [])

  const getTopTracks = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${topSongsPlaylistID}/tracks`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const trackItems = data.items.map(item => item.track).filter(track => track !== null);
      SetTracks(trackItems);
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  }

  return (
  <main>
    <section className='container'>
      <div className="glass-panel">
        <h1>Showing <span className="accent">{50}</span> Tracks</h1>
      </div>
      <div className="glass-panel">
        <h1>Average Popularity<br /><span className="accent">{'70/100'}</span></h1>
      </div>
      <div className="glass-panel">
        <h1>Most Popular Genre<br /><span className="accent">{'Genre'}</span></h1>
      </div>
    </section>

    <article className="glass-panel">
      <Search />
      {tracks && tracks.map((track) => (
        <Track
          key={track.id}
          albumArt={track.album.images[0]?.url}
          trackName={track.name}
          artists={track.artists.map(artist => artist.name)}
          releaseDate={track.album.release_date}
          popularity={track.popularity}
          genres={track.artists[0]?.genres || []}
          duration={`${Math.floor(track.duration_ms / 60000)}:${((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}`}
          preview={track.preview_rul}
        />
      ))}
    </article>
  </main>
  );
};

export default Dashboard;