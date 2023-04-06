import React, { useEffect, useState } from "react";
import VendorCard from "./VendorCard";
import { karachiAreas } from "../components/constants";

const VendorLayout = ({ pic, vendorCards, description, vendorType }) => {
  const title = vendorType.charAt(0).toUpperCase() + vendorType.slice(1);

  //filter
  const [filters, setFilters] = useState({
    price: "",
    location: "",
    rating: "",
    minPrice: "",
    maxPrice: "",
  });

  const ratings = [1, 2, 3, 4, 5];

  const handleFilterChange = (filter, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [filter]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      price: "",
      location: "",
      rating: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  useEffect(() => {
    clearFilters();
  }, [vendorType]);

  const filteredData = vendorCards.filter((item) => {
    return (
      (filters.price === "" || item.price <= filters.price) &&
      (filters.location === "" || item.location === filters.location) &&
      (filters.rating === "" || item.rating >= filters.rating) &&
      (filters.minPrice === "" || item.price >= filters.minPrice) &&
      (filters.maxPrice === "" || item.price <= filters.maxPrice)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (filters.price === "high") {
      return b.price - a.price;
    } else if (filters.price === "low") {
      return a.price - b.price;
    }
    return 0;
  });

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sortedData.slice(firstIndex, lastIndex);
  const lastPage = Math.ceil(sortedData.length / recordsPerPage);
  const numbers = [...Array(lastPage + 1).keys()].slice(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="background-vendor-layout">
      <div className="overflow-x-hidden ">
        <div className="card text-bg-dark rounded-0">
          <img
            src={pic}
            className="card-img"
            style={{ height: "250px" }}
            alt="..."
          />
          <div className="card-img-overlay">
            <h1 className="card-title ms-5 mt-5">{title}</h1>
            <p className="card-text ms-5">{description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div
              className="card mx-5 my-5 rounded-4"
              style={{ width: "300px", height: "800px", position: "absolute" }}
            >
              <div className="container mt-3">
                <div className="d-flex justify-content-between">
                  <h4>Filters</h4>
                  <u onClick={clearFilters} style={{ cursor: "pointer" }}>
                    Clear All Filters
                  </u>
                </div>
                <div className="container my-5">
                  <h5>Location</h5>
                  <select
                    className="dropdown-filter"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                  >
                    <option value="">Filter by location</option>
                    {karachiAreas.map((location, index) => (
                      <option value={location.name} key={index}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <hr className="divider-filter" />
                <div className="container my-5">
                  <h5 className="">Price</h5>
                  <select
                    className="dropdown-filter"
                    value={filters.price}
                    onChange={(e) =>
                      handleFilterChange("price", e.target.value)
                    }
                  >
                    <option value="">Sort by price</option>
                    <option value="high">Price high to low</option>
                    <option value="low">Price low to high</option>
                  </select>
                </div>

                <hr className="divider-filter" />

                <div className="container my-5">
                  <h5>Sort By Price Range</h5>
                  <div className="my-4">
                    <input
                      className="textfield-filter mx-3"
                      type="number"
                      placeholder="Min price"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      className="textfield-filter mx-3"
                      placeholder="Max price"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                      }
                    />
                  </div>
                </div>
                <hr className="divider-filter" />
                <div className="container my-5">
                  <h5>Rating</h5>
                  <select
                    className="dropdown-filter"
                    value={filters.rating}
                    onChange={(e) =>
                      handleFilterChange("rating", e.target.value)
                    }
                  >
                    <option value="">Filter by rating</option>
                    {ratings.map((rating) => (
                      <option value={rating} key={rating}>
                        {rating === 5
                          ? `${rating} stars `
                          : `${rating} stars or above`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col my-5">
            <VendorCard cards={records} vendorType={vendorType} />
            {sortedData.length !== 0 ? (
              <nav>
                <ul className="pagination">
                  <li onClick={prevPage} className="page-link pagination-hover">
                    Prev
                  </li>
                  {numbers.map((number, index) => (
                    <li
                      key={index}
                      onClick={() => paginate(number)}
                      className={`page-link ${
                        currentPage === number ? "active" : ""
                      } pagination-hover`}
                    >
                      {number}
                    </li>
                  ))}
                  <li onClick={nextPage} className="page-link pagination-hover">
                    Next
                  </li>
                </ul>
              </nav>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
