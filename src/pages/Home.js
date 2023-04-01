import React from "react";
import ScrollToTop from "../components/ScrollToTop";
import SlickSlider from "../components/SlickSlider";
import pic from "../img/carousel-1.png";
const Home = () => {
  const photographerCards = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1616940844649-535215ae4eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "Ideal Photography",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
      title: "King Deluxe Room",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 3.8,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      title: "Royal Suite",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 3.5,
    },
  ];

  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide">
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
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={pic}
              className="d-block w-100 item pt-2"
              style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
              alt="Just enjoy your day and leave the rest to our professional vendors"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Banain Apki Taqreeb Asaan</h5>
              <p>
                Organizing a big event is a hectic and challenging task. Events
                like Weddings, birthday parties, and big events are huge
                businesses, and we intend to capitalize on and digitize them in
                one platform.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://theceremonio.blob.core.windows.net/theceremonio-container/banners%2Flarge%2Fu_1629924779631"
              className="d-block w-100 pt-2 item"
              style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
              alt="Modern venues of modern era with all possible facilities"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Venues</h5>
              <p>Modern venues of modern era with all possible facilities</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://theceremonio.blob.core.windows.net/theceremonio-container/banners%2F608ec2df8706755965e469f9%2Flarge%2F1628351186601"
              className="d-block w-100 item pt-2"
              style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
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
      <SlickSlider title="Venues" cards={photographerCards} />
      <SlickSlider title="Photographers" cards={photographerCards} />
      <SlickSlider title="Decorators" cards={photographerCards} />
      <SlickSlider title="Caterers" cards={photographerCards} />
      <SlickSlider title="Music" cards={photographerCards} />
      <ScrollToTop />
      <div
        className="card text-white"
      >
        <img
          src={pic}
          className="card-img w-100 rounded-0"
          style={{maxHeight:"200px"}}
          alt="Just enjoy your day and leave the rest to our professional vendors"
        />
        <div class="container card-img-overlay text-center my-5">
          <h5>Banain Apki Taqreeb Asaan</h5>
          <p className="px-5">
            Organizing a big event is a hectic and challenging task. Events like
            Weddings, birthday parties, and big events are huge businesses, and
            we intend to capitalize on and digitize them in one platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
