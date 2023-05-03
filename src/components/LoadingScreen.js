import React from "react";
import ReactLoading from "react-loading";
const LoadingScreen = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "40vh" }}
    >
      <ReactLoading type="spin" color="#000000" height={100} width={50} />
    </div>
  );
};

export default LoadingScreen;
