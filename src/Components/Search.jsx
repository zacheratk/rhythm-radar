import "./Search.css";
import { useState, useEffect } from "react";

const Search = ({ tracks, genres, setFilteredTracks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");

  useEffect(() => {
    handleSearch();
  }, [searchQuery, genreFilter])

  const handleSearch = () => {
    let filteredTracks = tracks;
    // Filter tracks by genre if necessary
    if (genreFilter !== "all") {
      filteredTracks = filteredTracks.filter((track) =>
        track.genres.includes(genreFilter)
      );
    }

    // Restrict tracks to tracks that contain the searchQuery string in the name or artists
    if (searchQuery) {
      filteredTracks = filteredTracks.filter(
        (track) =>
          track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artists.some((artist) =>
            artist.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredTracks(filteredTracks);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value.trim());
  };

  const handleDropdownChange = (e) => {
    setGenreFilter(e.target.value);
  };

  return (
    <div className="container" style={{ gap: "1rem" }}>
      <input
        type="text"
        className="glass-input searchbar"
        placeholder="Search tracks..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <select
        className="glass-input"
        value={genreFilter}
        onChange={handleDropdownChange}
      >
        <option value="all">All Genres</option>
        {genres &&
          genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
      </select>
      {/* <button type="submit" className="glass-button" onClick={handleSearch}>
        Search Tracks
      </button> */}
    </div>
  );
};

export default Search;
