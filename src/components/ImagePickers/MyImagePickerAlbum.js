import React, { useState } from "react";

const MyImagePickerAlbum = ({ showAlert, albums, setAlbums, name,setName,description,setDescription,albumImages,setAlbumImages }) => {

  const [albumNameError, setAlbumNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [albumError, setAlbumError] = useState("");

  const handleImageChange = (event) => {
    setAlbumError("");
    const files = Array.from(event.target.files);
   files.forEach(file=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setAlbumImages(oldArray => [...oldArray,reader.result])
    }
   })

    console.log(albumImages)
  };

  const handleAddAlbum = () => {
    if (albumImages.length > 0 && name && description) {
      setAlbums([
        ...albums,
        {
          name: name,
          description: description,
          images: albumImages,
        },
      ]);
      setAlbumImages([]);
      setName("");
      setDescription("");
      showAlert(
        "Album uploaded succesfully. You can add another album if you want before submitting",
        "success"
      );
    } else {
      if (!name) {
        setAlbumNameError("Album Name is required to upload album");
      }
      if (!description) {
        setDescriptionError("Album Description is required to upload album");
      }
      if (albumImages.length === 0) {
        setAlbumError("Atleast one image is required to upload album");
      }
    }
  };

  return (
    <div className="container my-5">
      <div>
        <h1>Upload Albums (Optional)</h1>
        <p className="ms-5">
          Upload multiple albums to display your business portfolio to customers
        </p>
        <div className="container">
          <div className="mt-5">
            <label htmlFor="albumName" className="form-label">
              Album Name:
            </label>
            <input
              placeholder="Enter Your Album's Name"
              name="albumName"
              type="text"
              className="form-control"
              id="albumName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setAlbumNameError("");
              }}
             
            />
            {albumNameError && (
              <span className="text-danger">{albumNameError}</span>
            )}
          </div>
          <div className="my-5">
            <label htmlFor="albumDescription" className="form-label">
              Album Description:
            </label>
            <input
              placeholder="Enter Album Description"
              name="albumDescription"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError("");
              }}
              type="text"
              className="form-control"
              id="albumDescription"
            
            />
            {descriptionError && (
              <span className="text-danger">{descriptionError}</span>
            )}
          </div>
        </div>
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          {albumError && <span className="text-danger">{albumError}</span>}
        </div>
        {albumImages.length > 0 && (
          <div
            id={`carousel-0`}
            className="carousel slide"
            style={{ width: "50%", margin: "0 auto" }}
          >
            <ol className="carousel-indicators">
              {albumImages.map((image, i) => (
                <li
                  key={i}
                  data-bs-target={`#carousel-0`}
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                ></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {albumImages.map((image, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={`${i + 1}`}
                    className="d-block w-100 rounded-4"
                    style={{ objectFit: "cover", height: "300px" }}
                  />
                </div>
              ))}
            </div>
            <a
              className="carousel-control-prev"
              href={`#carousel-0`}
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href={`#carousel-0`}
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        )}
      </div>

      <button type="button" className="btn btn-primary mt-5 me-5" onClick={handleAddAlbum}>
        Upload This Album
      </button>
    </div>
  );
};

export default MyImagePickerAlbum;
