import React from 'react';

const Search = ({ query, setQuery, fetchImages }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍 Search
        </button>
      </form>
    </div>
  );
};

export default Search;
