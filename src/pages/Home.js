import React, { useEffect, useState } from "react";
import SlickSliderHome from "../components/SlickSliderHome";
import Footer from "../components/Footer";
// import { vendors } from "../utils/constants";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import {API_URL} from "../utils/apiUrl";

const Home = () => {
  const [businesses, SetBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApprovedBusiness = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/vendor/approvedbusinesses`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        SetBusinesses(response.data.approvedBusinesses);
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
    getApprovedBusiness();
  }, []);
  const venueUrl =
    "https://theceremonio.blob.core.windows.net/theceremonio-container/categories/venue.jpg";
  return (
    <>
      {!loading ? (
        <>
          <div className="background-home-body">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner ">
                <div className="carousel-item active">
                  <img
                    src={venueUrl}
                    className="d-block item mx-auto pt-2 rounded-5"
                    style={{ width: "90%" }}
                    alt="Just enjoy your day and leave the rest to our professional vendors"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Banain Apki Taqreeb Asaan</h5>
                    <p>
                      Organizing a big event is a hectic and challenging task.
                      Events like Weddings, birthday parties, and big events are
                      huge businesses, and we intend to capitalize on and
                      digitize them in one platform.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://theceremonio.blob.core.windows.net/theceremonio-container/banners%2Flarge%2Fu_1629924779631"
                    className="d-block mx-auto rounded-5 pt-2 item"
                    style={{ width: "90%" }}
                    alt="Modern venues of modern era with all possible facilities"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Venues</h5>
                    <p>
                      Modern venues of modern era with all possible facilities
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://theceremonio.blob.core.windows.net/theceremonio-container/banners%2F608ec2df8706755965e469f9%2Flarge%2F1628351186601"
                    className="d-block mx-auto rounded-5 item pt-2"
                    style={{ width: "90%" }}
                    alt="Indoor or outdoor, it's all about what you love"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Decorators</h5>
                    <p>Indoor or outdoor, it's all about what you love</p>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <SlickSliderHome
              title="Venues"
              businesses={businesses}
              vendorType={"venue"}
            />
            <SlickSliderHome
              title="Photographers"
              businesses={businesses}
              vendorType={"photographer"}
            />
            <SlickSliderHome
              title="Decorators"
              businesses={businesses}
              vendorType={"decorator"}
            />
            <SlickSliderHome
              title="Caterers"
              businesses={businesses}
              vendorType={"caterer"}
            />
            <SlickSliderHome
              title="Music"
              businesses={businesses}
              vendorType={"music"}
            />
          </div>
          <Footer />
        </>
      ) : (
        <LoadingScreen/>
      )}
    </>
  );
};

export default Home;
