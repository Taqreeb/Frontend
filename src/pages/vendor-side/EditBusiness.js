import React from "react";
import { NavLink, useParams } from "react-router-dom";
import EditBusinessOverlay from "../../components/EditBusinessOverlay";

const EditBusiness = () => {
  const {businessId} = useParams();
  return (
    <>
      <div className="background-profile-top">
        <div className="container pt-4">
          <h2>Edit Business</h2>
          <p className="ms-5">You can Edit Your Business from here</p>
        </div>
      </div>
      <div className="text-center mt-5">
        <div className="d-flex flex-wrap">
          <div className="my-3 w-25 mx-5">
            <NavLink
              className="nav-link"
              to={`/vendor/viewbusiness/edit/${businessId}/businessProfile`}
            >
              <EditBusinessOverlay
                title="Edit Business Profile"
                imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories%2Fmedium%2Fu_1636922726681"
              />
            </NavLink>
          </div>

          <div className="my-3 w-25 mx-5">
            <NavLink
              className="nav-link"
              to={`/vendor/viewbusiness/edit/${businessId}/businessAlbums`}
            >
              <EditBusinessOverlay
                title="Edit Business Albums"
                imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories/venue.jpg"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBusiness;
