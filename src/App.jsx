import React, { useEffect, useState, useCallback } from 'react';
import Search from './components/Search';
import ImageGallery from './components/ImageGallery';
import ImageEditor from './components/ImageEditor';

import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const access_key = "ARxW-tTkdgmlFZJA6zyhXASbPun_KZv0N2_mKkwv6x0";

  /**Debounce function (simple version) **/ 
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchImages = async () => {
    if (!query) return;
    // if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query?.trim()}&client_id=${access_key}&per_page=12`
      );

      const data = await response.json();
      console.log('data', data)

      if (data.errors || data.results.length === 0) {
        setError('No results found.');
        setImages([]);
      } else {
        setImages(data.results);
      }
    } catch (err) {
      setError('Something went wrong while fetching images.');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  /**   Debounced search handler  */
  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    if (query.trim() === '') {
      setImages([]);
      setError(null);
    }
  }, [query]);

  const clearAll = () => {
    setQuery('');
    setImages([]);
    setError(null);
    setSelectedImage(null);
  };

  return (
    <main className="app-wrapper">
      <Search fetchImages={fetchImages} setQuery={setQuery} query={query} clearAll={clearAll}/>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {/* If image is selected, show ImageEditor, otherwise show gallery */}
      {
        selectedImage ? (
          <ImageEditor imageUrl={selectedImage} />
        ) : (
          <>
            {query.trim() === '' ? (
              <p className="no-query-message">

                Please enter a search term to find images.
              </p>
            ) : (
              <ImageGallery images={images} onSelectImage={setSelectedImage} />
            )}
          </>
        )
      }

    </main>
  );
};

export default App;
