import React,{ useEffect, useState } from "react";
import BusinessCards from "./BusinessCards";
import { returnPaginationPage } from "../utils/pagination-utils";
const BusinessLayout = ({ business,showAlert,setDeletedBusiness }) => {
  const decoratorUrl =
    "https://theceremonio.blob.core.windows.net/theceremonio-container/banners%2F608ec2df8706755965e469f9%2Flarge%2F1628351186601";

  const locations = business.filter(
    (card, index) =>
      business.findIndex(
        (l) => l.business_location === card.business_location
      ) === index
  );

  const [filters, setFilters] = useState({
    status:"",
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
      status:"",
      price: "",
      location: "",
      rating: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  useEffect(() => {
    clearFilters();
  }, []);

  const filteredData = business.filter((item) => {
    return (
      (filters.location === "" ||
        item.business_location === filters.location) &&
        (filters.status === "" ||
        item.business_status === filters.status) &&
      (filters.rating === "" || item.rating >= filters.rating) &&
      (filters.minPrice === "" || item.estimated_price >= filters.minPrice) &&
      (filters.maxPrice === "" || item.estimated_price <= filters.maxPrice)
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
  const totalPage = Math.ceil(sortedData.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber === "... ") {
      setCurrentPage(1);
    } else if (pageNumber === " ...") {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage(pageNumber);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  let array = returnPaginationPage(totalPage, currentPage, recordsPerPage, 1);
  return (
    <div className="background-vendor-layout">
      <div className="card text-bg-dark rounded-0">
        <img
          src={decoratorUrl}
          className="card-img"
          style={{ height: "30vh", objectFit: "cover" }}
          alt="..."
        />
        <div className="card-img-overlay">
          <h1 className="card-title ms-5 mt-5">Vendor Businesses</h1>
          <p className="card-text ms-5">These are all of your businesses</p>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div
            className="card mx-5 my-5 rounded-4"
            style={{ width: "300px", height: "950px", maxHeight: "950px" }}
          >
            <div className="container mt-3">
              <div className="d-flex justify-content-between">
                <h4>Filters</h4>
                <u onClick={clearFilters} style={{ cursor: "pointer" }}>
                  Clear All Filters
                </u>
              </div>
              <div className="container my-5">
                <h5 className="">Business Status</h5>
                <select
                  className="dropdown-filter"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">Sort by Business Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <hr className="divider-filter" />
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
                  {locations.map((card) => (
                    <option key={card._id} value={card.business_location}>
                      {card.business_location}
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
                  onChange={(e) => handleFilterChange("price", e.target.value)}
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
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
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
          <BusinessCards cards={records} showAlert={showAlert} setDeletedBusiness={setDeletedBusiness}/>
          {sortedData && (
            <nav>
              <ul className="pagination">
                <li
                  onClick={() => setCurrentPage(1)}
                  className="page-link pagination-hover"
                >
                  &laquo;
                </li>
                <li onClick={prevPage} className="page-link pagination-hover">
                  &lsaquo;
                </li>
                {array.map((value) => (
                  <li
                    key={value}
                    onClick={() => paginate(value)}
                    className={`page-link ${
                      currentPage === value ? "active" : ""
                    } pagination-hover`}
                  >
                    {value}
                  </li>
                ))}
                <li onClick={nextPage} className="page-link pagination-hover">
                  &rsaquo;
                </li>
                <li
                  onClick={() => setCurrentPage(totalPage)}
                  className="page-link pagination-hover"
                >
                  &raquo;
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessLayout;
