import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
const deleteButton = <FaTrashAlt />;
const addButton = <FaPlus />;
const EditSpecificAlbum = ({ showAlert }) => {
  const role = localStorage.getItem("role");
  const authtoken = localStorage.getItem("authtoken");
  const { businessId, albumId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [saveImage, setSaveImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState(false);

  const [name, setName] = useState("");
  const [album, setAlbum] = useState([]);
  const [albumImages, setAlbumImages] = useState([]);
  const [description, setDescription] = useState("");
 
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleSaveChangesAlbumName = async () => {
    if (name) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/business/${businessId}/albumName/${albumId}`,
          { name: name },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setNameError("");
          showAlert("Album Name Changed Successfully", "success");
          setClick(false);
          setIsEditingName(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setNameError("Album Name is required");
    }
  };

  const handleSaveChangesAlbumDescription = async () => {
    if (description) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/business/${businessId}/albumDescription/${albumId}`,
          { description: description },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setDescriptionError("");
          showAlert("Album Description Changed Successfully", "success");
          setClick(false);
          setIsEditingDescription(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setDescriptionError("Album Description is required");
    }
  };

  const handleImageUpload = async (e, albumId) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = async () => {
     setSaveImage(true);
      try {
        const response = await axios.post(
          `${API_URL}/${role}/business/${businessId}/albums/${albumId}/images`,
          { image: reader.result },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          showAlert("Image Added Successfully", "success");
          setSaveImage(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setSaveImage(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    };
  
    reader.readAsDataURL(file);
  };
  

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${role}/business/${businessId}/albums/${albumId}/images/${imageId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        showAlert("Image Deleted Successfully", "success");
        setShowModal(false);
        setSaveButton(!saveButton);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  const getBusinessAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/${role}/business/${businessId}/album/${albumId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setAlbum(response.data.album);
        setAlbumImages(response.data.album.images);
        setName(response.data.album.album_name);
        setDescription(response.data.album.description);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBusinessAlbum();
  }, [saveButton]);

  const handleCancel = () => {
    setShowModal(false);
  };
  const DeleteAlbumModal = ({ imageId }) => {
    return (
      <>
        <div className="modal-wrapper"></div>
        <div className="modal-container">
          <h4 className="text-dark text-center">Deleting Image</h4>
          <div className="d-flex justify-content-center my-4">
            <p className="text-dark">
              Are You sure you want to delete the following image?
            </p>
          </div>

          <div className="text-end">
            <button className="btn btn-dark mx-2" onClick={handleCancel}>
              No
            </button>
            <button
              className="btn btn-dark"
              onClick={() => handleDeleteImage(imageId)}
            >
              Yes
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="background-profile-top">
        <div className="container pt-4">
          <h2>Edit Album</h2>
        </div>
      </div>
      {!loading ? (
        <div>
          <div className="background-album-detail">
            <div className="mx-5 mb-5 ">
              <div className="row">
                <div className="col-12">
                  {!isEditingName ? (
                    <div className="mt-5 d-flex justify-content-between">
                      <h1>{album.album_name}</h1>
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsEditingName(true)}
                      >
                        Edit Album Name
                      </button>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <div className="container text-start mb-2">
                        <label htmlFor="albumName" className="form-label">
                          Album Name
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="albumName"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setNameError("");
                        }}
                      />
                      <div className="container mt-2 ms-3 text-end">
                        {!click ? (
                          <>
                            <button
                              className="btn btn-danger me-3"
                              onClick={() => setIsEditingName(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-success "
                              onClick={handleSaveChangesAlbumName}
                            >
                              Save Changes
                            </button>
                          </>
                        ) : (
                          <p>Saving...</p>
                        )}
                      </div>
                      {nameError && (
                        <span className="text-danger">{nameError}</span>
                      )}
                    </div>
                  )}
                  <hr />
                  {!isEditingDescription ? (
                    <div className="mt-5 d-flex justify-content-between">
                      <div>
                        <h3>Description</h3>
                        <p className="mx-5">{album.description}</p>
                      </div>

                      <button
                        className="btn btn-primary my-3"
                        onClick={() => setIsEditingDescription(true)}
                      >
                        Edit Album Description
                      </button>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <div className="container text-start mb-2">
                        <label
                          htmlFor="albumDescription"
                          className="form-label"
                        >
                          Album Description
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="albumDescription"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setDescriptionError("");
                        }}
                      />
                      <div className="container mt-2 ms-3 text-end">
                        {!click ? (
                          <>
                            <button
                              className="btn btn-danger me-3"
                              onClick={() => setIsEditingDescription(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-success "
                              onClick={handleSaveChangesAlbumDescription}
                            >
                              Save Changes
                            </button>
                          </>
                        ) : (
                          <p>Saving...</p>
                        )}
                      </div>
                      {descriptionError && (
                        <span className="text-danger">{descriptionError}</span>
                      )}
                    </div>
                  )}
                </div>
                <hr />

                {albumImages.map((image) => (
                  <div key={image._id} className="col-md-3 mt-5">
                    <div
                      className="card text-center text-white"
                      style={{
                        minWidth: "15rem",
                        minHeight: "10rem",
                        maxWidth: "15rem",
                        maxHeight: "10rem",
                      }}
                    >
                      <img
                        src={image.url}
                        style={{
                          minWidth: "15rem",
                          minHeight: "10rem",
                          maxWidth: "15rem",
                          maxHeight: "10rem",
                        }}
                        alt={`${image._id}`}
                      />
                      <div className="card-overlay">
                        <div
                          className="text-end"
                          style={{ marginBottom: "7rem" }}
                        >
                          {showModal && (
                            <DeleteAlbumModal imageId={image._id} />
                          )}
                          <i
                            className="text-danger"
                            onClick={() => setShowModal(true)}
                            style={{ cursor: "pointer", fontSize: "15px" }}
                          >
                            {deleteButton}
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {!saveImage?
                <>
                <input
                type="file"
                accept="image/*"
                onChange={(e)=>handleImageUpload(e,album._id)}
                className="d-none"
                id="imageUpload"
              />

              <label htmlFor="imageUpload">
                <i
                  className="text-danger"
                  style={{ cursor: "pointer", fontSize: "2rem" }}
                >
                  {addButton}
                </i>
              </label>
              </>:<p>Uploading Image...</p>}
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default EditSpecificAlbum;
