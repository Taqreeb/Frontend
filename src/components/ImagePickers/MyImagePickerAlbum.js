import React, { useState } from 'react';

const MyImagePickerAlbum = () => {
  const [albums, setAlbums] = useState([{ images: [] }]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event, albumIndex) => {
    const selectedFiles = Array.from(event.target.files);
    const updatedAlbums = [...albums];

    // Add selected images to the corresponding album
    updatedAlbums[albumIndex].images = updatedAlbums[albumIndex].images.concat(selectedFiles);

    setSelectedImages(selectedImages.concat(selectedFiles));
    setAlbums(updatedAlbums);
  }

  const handleAddAlbum = () => {
    setAlbums([...albums, { images: [] }]);
  }

  const handleSubmit = () => {
    // Perform submission logic with selected images
    console.log('Selected Images:', selectedImages);
  }

  return (
    <div>
      {albums.map((album, index) => (
        <div key={index}>
          <h2>Album {index + 1}</h2>
          <input type="file" multiple accept="image/*" onChange={(e) => handleImageChange(e, index)} />
          {album.images.length > 0 && (
            <div id={`carousel-${index}`} className="carousel slide" style={{width: "50%", margin: "0 auto" }}>
              <ol className="carousel-indicators">
                {album.images.map((image, i) => (
                  <li key={i} data-bs-target={`#carousel-${index}`} data-bs-slide-to={i} className={i === 0 ? "active" : ""}></li>
                ))}
              </ol>
              <div className="carousel-inner">
                {album.images.map((image, i) => (
                  <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <img src={URL.createObjectURL(image)} alt={`Image ${i + 1}`} className="d-block w-100 rounded-4" style={{objectFit:"cover",height:"300px"}}/>
                  </div>
                ))}
              </div>
              <a className="carousel-control-prev" href={`#carousel-${index}`} role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a className="carousel-control-next" href={`#carousel-${index}`} role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </a>
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-primary mt-3" onClick={handleAddAlbum}>Add Another Album</button>
      {selectedImages.length > 0 && (
        <button className="btn btn-success mt-3" onClick={handleSubmit}>Upload</button>
      )}
    </div>
  );
}

export default MyImagePickerAlbum;