import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../../utils/apiUrl";
import { FaTrashAlt } from "react-icons/fa";
import LoadingScreen from "../../components/LoadingScreen";
import MyImagePickerSingleAlbum from "../../components/ImagePickers/MyImagePickerSingleAlbum";
import axios from "axios";
const deleteButton = <FaTrashAlt />;

const EditBusinessAlbums = ({ showAlert }) => {
  const role = localStorage.getItem("role");
  const authtoken = localStorage.getItem("authtoken");
  const { businessId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [albums, setAlbums] = useState([]);

  //New Album
  const [albumImages, setAlbumImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleDeleteAlbum = async (albumId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${role}/business/${businessId}/albums/${albumId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        showAlert("You have deleted your Album succesfully", "success");
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
  const handleCancel = () => {
    setShowModal(false);
  };
  const DeleteAlbumModal = ({ albumId }) => {
    return (
      <>
        <div className="modal-wrapper"></div>
        <div className="modal-container">
          <h4 className="text-dark">Deleting Your Album</h4>

          <div className="d-flex justify-content-center my-4">
            <p className="text-dark">
              Are You sure you want to delete this Album?
            </p>
          </div>

          <div className="text-end">
            <button className="btn btn-dark mx-2" onClick={handleCancel}>
              No
            </button>
            <button
              className="btn btn-dark"
              onClick={() => handleDeleteAlbum(albumId)}
            >
              Yes
            </button>
          </div>
        </div>
      </>
    );
  };

  const getBusinessAlbums = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/${role}/businesses/${businessId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setAlbums(response.data.business.business_albums);
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
    getBusinessAlbums();
  }, [saveButton]);

  return (
    <>
      <div className="background-profile-top">
        <div className="container pt-4">
          <h2>Business Albums</h2>
          <p className="ms-5">You can manage your Albums here</p>
        </div>
      </div>
      {!loading ? (
        <div className="container mt-5">
          <div className="row">
            {albums.map((album) => (
              <div key={album._id} className="col-md-3 mt-5">
                <NavLink
                  to={`/vendor/viewbusiness/edit/${businessId}/businessAlbums/${album._id}`}
                >
                  <div className="card text-center text-white w-75">
                    <img
                      src={album.images[0].url}
                      className="card-img"
                      alt={album.album_name}
                      style={{ maxHeight: "120px", minHeight: "120px" }}
                    />
                    <div className="card-overlay">
                      <div className="d-flex justify-content-between">
                        <h6 style={{ marginBottom: "5.5rem" }}>
                          {album.album_name}
                        </h6>
                        {showModal && <DeleteAlbumModal albumId={album._id} />}
                        <i
                          className="text-white"
                          onClick={() => setShowModal(true)}
                          style={{ cursor: "pointer", fontSize: "15px" }}
                        >
                          {deleteButton}
                        </i>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
          <MyImagePickerSingleAlbum
            showAlert={showAlert}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            albumImages={albumImages}
            setAlbumImages={setAlbumImages}
            setSaveButton={setSaveButton}
            saveButton={saveButton}
            businessId={businessId}
          />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default EditBusinessAlbums;
