import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../utils/apiUrl";

const MyImagePickerSingleAlbum = ({
  showAlert,
  name,
  setName,
  description,
  setDescription,
  albumImages,
  setAlbumImages,
  saveButton,
  setSaveButton,
  businessId,
}) => {
  const role = localStorage.getItem("role");
  const authtoken = localStorage.getItem("authtoken");
  const [albumNameError, setAlbumNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [albumError, setAlbumError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    setAlbumError("");
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAlbumImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const handleAddAlbum = async () => {
    setUploading(true);
    console.log(albumImages.length);
    if (albumImages.length > 0 && name && description) {
      const newAlbum = [
        { name: name, description: description, images: albumImages },
      ];
      try {
        console.log(newAlbum);
        const response = await axios.post(
          `${API_URL}/${role}/businesses/${businessId}/addAlbums`,
          {
            business_albums: newAlbum,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setAlbumImages([]);
          setName("");
          setDescription("");
          showAlert("Album uploaded successfully", "success");
          setUploading(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setUploading(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      if (!name) {
        setAlbumNameError("Album Name is required to upload album");
        setUploading(false);
      }
      if (!description) {
        setDescriptionError("Album Description is required to upload album");
        setUploading(false);
      }
      if (albumImages.length === 0) {
        setAlbumError("At least one image is required to upload album");
        setUploading(false);
      }
    }
  };
  return (
    <div className="container my-5">
      <div>
        <h1>Upload A New Album</h1>
        <p className="ms-5">
          Upload a new album to display your business portfolio to customers
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

      {!uploading ? (
        <button
          type="button"
          className="btn btn-primary mt-5 me-5"
          onClick={handleAddAlbum}
        >
          Upload This Album
        </button>
      ) : (
        <h6>Uploading...</h6>
      )}
    </div>
  );
};

export default MyImagePickerSingleAlbum;
