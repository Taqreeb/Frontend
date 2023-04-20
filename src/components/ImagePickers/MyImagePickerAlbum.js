import React, { useState } from "react";

const MyImagePickerAlbum = (props) => {
  const [albums, setAlbums] = useState([]);
  const [albumImages, setAlbumImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [albumName,setAlbumName] = useState("")
  const [description,setDescription] = useState("")
  const [albumNameError,setAlbumNameError] = useState("")
  const [descriptionError,setDescriptionError] = useState("")
  const [albumError,setAlbumError] = useState("")
  
  const handleImageChange = (event) => {
    setAlbumError("")
    const selectedFiles = Array.from(event.target.files);
    let updatedAlbums = [...albumImages];

    // Add selected images to the corresponding album
    updatedAlbums=
      updatedAlbums.concat(selectedFiles);

    setSelectedImages(selectedImages.concat(selectedFiles));
    setAlbumImages(updatedAlbums);
  };

  const handleAddAlbum = () => {
    if(selectedImages.length>0 && albumName && description){
    setAlbums([...albums,{id:albums.length+1,name:albumName,description:description,images:albumImages}])
    setAlbumImages([])
    setAlbumName("")
    setDescription("")
    props.showAlert("Album uploaded succesfully. You can add another album if you want before submitting", "success")
    }
    else{
      if(!albumName){
        setAlbumNameError("Album Name is required to upload album")
      }
      if(!description){
        setDescriptionError("Album Description is required to upload album")
      }
      if(selectedImages.length===0){
        setAlbumError("Atleast one image is required to upload album")
      }
    }
  };

  const handleSubmit = () => {
   
    console.log(albums);
  };

  return (
    <div className="container my-5">
      
        <div >
          <h1>Upload Albums</h1>
          <p className="ms-5">Upload multiple albums to display your business portfolio to customers</p>
          <div className="container">
        <div>
           <input
                placeholder="Enter Your Album's Name"
                name="albumName"
                value={albumName}
                onChange={(e) => {
                  setAlbumName(e.target.value);
                  setAlbumNameError("")
                }}
               
                type="text"
                className="form-control mt-5"
                id="albumName"
                required
              />
              {albumNameError && <span className="text-danger">{albumNameError}</span>}
              </div>
              <div className="my-5">
               <input
                placeholder="Enter Album Description"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("")
                }}
                type="text"
                className="form-control" 
                id="description"
                required
              />
              {descriptionError && <span className="text-danger">{descriptionError}</span>}
              </div>
              </div>
           <div>   
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          {albumError&& <span className="text-danger">{albumError}</span>}
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
                      src={URL.createObjectURL(image)}
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
  
     
      <button className="btn btn-success mt-5 me-5" onClick={handleAddAlbum}>
        Upload This Album
      </button>
      <button className="btn btn-success mt-5" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default MyImagePickerAlbum;
