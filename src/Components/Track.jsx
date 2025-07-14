import './Track.css';
import PreviewButton from './PreviewButton';

const Track = ({ albumArt, trackName, artists, releaseDate, popularity, genres, duration, preview}) => {
  return (
  <>
  <div className="card">
    <img src={albumArt} alt={trackName} className="album-art"/>
    <div className="center">
      <div className='main-info'>
        <div className="left">
          <p>{trackName}</p>
          <p className="small">{artists.join(', ')}</p>
          <p className="small">{'Released: ' + releaseDate}</p>
          <p className="small">Popularity</p>
        </div>
        <div className='right'>
          <p><br/></p>
          <p className="small">{genres.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ')}</p>
          <p className="small">{duration}</p>
        </div>
      </div>
      <div className="popular-bar glass-panel">
        <div className='inner-bar' style={{ width: `${popularity*100}%`}} />
      </div>
    </div>
    <PreviewButton preview={preview} />
  </div>
  </>
  );
};

export default Track;