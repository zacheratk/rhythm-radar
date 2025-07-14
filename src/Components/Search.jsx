import './Search.css'

const Search = () => {

  return (
  <div className='container' style={{gap: '1rem'}}>
    <input type="text" className="glass-input searchbar" placeholder='Search tracks...'/>
    <select className="glass-input">
      <option value="all" >All Genres</option>
      {/* TODO: Add additional genres to filter API results */}
    </select>
    <button type="submit" className="glass-button">Search Tracks</button>
  </div>
  );
};

export default Search;