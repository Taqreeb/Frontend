import React from "react";
import { useLocation } from "react-router-dom";

const AlbumDetails = () => {
  const location = useLocation();
  const album = location.state.album;
  const businessDisplayPicture =location.state.businessDisplayPicture
  return (
  <div className="background-album-detail">
    <div className="mx-5 mb-5 ">
      <div className="row">
        <div className="col-12">
          <div className="mt-5">
            <h1>{album.album_name}</h1>
          </div>
          <div
            className="card mt-5"
            style={{ borderRadius: "20px", width: "20vw" }}
          >
            <img
              src={businessDisplayPicture}
              className="card-img"
              alt="album"
              style={{ height: "40vh", borderRadius: "20px" }}
            />
          </div>
          <div className="mt-5">
            <h3>Description</h3>
            <p className="mx-5">{album.description}</p>
          </div>
        </div>
        <hr />
        {album.images.map((image, index) => (
          <div key={index} className="col-md-3 mt-5">
            <img
              src={image.url}
              style={{
                minWidth: "20rem",
                minHeight: "20rem",
                maxWidth: "20rem",
                maxHeight: "20rem",
              }}
              alt={`${index}`}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AlbumDetails;
