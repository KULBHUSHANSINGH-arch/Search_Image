import React from 'react';

const Search = ({ query, setQuery, fetchImages, clearAll }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <section className="user-info">
        <div className="info-row">
          <label>Name :</label>
          <span>Kulbhushan Singh</span>
        </div>
        <div className="info-row">
          <label>Email :</label>
          <span>Kulbhushansingh919@gmail.com</span>
        </div>
      </section>
      <form onSubmit={handleSubmit} className="search-form">

        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            className="clear-button"
            onClick={clearAll}
            aria-label="Clear search"
          >
            X
          </button>
        )}
        <button type="submit" className="search-button">
          🔍 Search
        </button>
      </form>
    </div>
  );
};

export default Search;