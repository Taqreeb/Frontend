import React from "react";
import { useLocation } from "react-router-dom";
import cash from "../../img/cash.jpg";
const PackagesDetails = () => {
  const location = useLocation();
  const packages = location.state.packages;
  
  return (
    <div className="background-album-detail">
      <div className="mx-5 mb-5 ">
        <div className="row">
          <div className="col-12">
            <div className="mt-5">
              <h1>{packages.name}</h1>
            </div>
            <div
              className="card mt-5"
              style={{ borderRadius: "20px", width: "20vw" }}
            >
              <img
                src={cash}
                className="card-img"
                alt="packages"
                style={{ height: "40vh", borderRadius: "20px" }}
              />
            </div>
            <div className="mt-5">
              <span className="fs-2">Package Price:</span>
              <span className="mx-3 fs-3">{packages.price} PKR</span>
            </div>
            <hr />
            <div className="mt-5">
              <h3>Package Description</h3>
              <p className="mx-5">{packages.description}</p>
            </div>
            <hr />
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default PackagesDetails;
