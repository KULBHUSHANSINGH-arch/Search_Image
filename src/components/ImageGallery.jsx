import React from 'react';


const ImageGallery = ({ images, onSelectImage }) => {
  return (
    <div className="gallery-container">
      {images.map((img) => (
        <div className="image-card" key={img.id}>
          <img src={img.urls.small} alt={img.alt_description} className="gallery-image" />
          <button className="caption-button" onClick={() => onSelectImage(img.urls.regular)}>
            ➕ Add Captions
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
