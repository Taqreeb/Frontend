import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../../utils/apiUrl";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import LoadingScreen from "../../components/LoadingScreen";
import { NavLink } from "react-router-dom";
import { returnPaginationPage } from "../../utils/pagination-utils";
const approveButton = <FaCheck />;
const rejectButton = <FaTimes />;
const BusinessApprovals = ({ showAlert }) => {
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [statusClicked, setStatusClicked] = useState(false);
  const role = localStorage.getItem("role");
  const authtoken = localStorage.getItem("authtoken");

  const modalRef = useRef(null);

  const getApprovedBusiness = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/vendor/pendingbusinesses`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setBusinesses(response.data.pendingBusinesses);
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

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/${role}/businesses/${id}/status`,
        { status: "approved" },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        modalRef.current.setAttribute("data-bs-dismiss", "modal");
        modalRef.current.click();
        showAlert("The business has been approved", "success");
        setStatusClicked(true);
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

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/${role}/businesses/${id}/status`,
        { status: "rejected" },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        modalRef.current.setAttribute("data-bs-dismiss", "modal");
        modalRef.current.click();
        showAlert("The business has been rejected", "danger");

        setStatusClicked(true);
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

  const AcceptStatusPopup = ({ id }) => {
    return (
      <div
        className="modal fade"
        id="acceptStatus"
        tabIndex="-1"
        aria-labelledby="acceptStatusLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="acceptStatusLabel">
                Approving The Business
              </h5>
            </div>
            <div className="modal-body">
              <p>Are You sure you want to approve this business?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                id="button1"
                className="btn btn-dark"
                onClick={() => handleApprove(id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RejectStatusPopup = ({ id }) => {
    return (
      <div
        className="modal fade"
        id="rejectStatus"
        tabIndex="-1"
        aria-labelledby="rejectStatusLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="rejectStatusLabel">
                Rejecting The Business
              </h5>
            </div>
            <div className="modal-body">
              <p>Are You sure you want to reject this business?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                id="button2"
                className="btn btn-dark"
                onClick={() => handleReject(id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    getApprovedBusiness();
  }, [statusClicked]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = businesses.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(businesses.length / recordsPerPage);

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
    <>
      {!loading ? (
        <>
          <div className="background-top-business-approval">
            <div className="container pt-4">
              <h1>Business Approvals</h1>
              <p className="ms-3">
                Accept or reject the following pending businesses
              </p>
            </div>
          </div>
          {businesses.length > 0 ? (
            <div className="table-responsive mt-5 container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Business ID</th>
                    <th>Business Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((business) => (
                    <tr key={business._id}>
                      <td className="border-end">{business._id}</td>
                      <td className="border-end">{business.business_name}</td>
                      <td>
                        <div className="container">
                          <i
                            className="text-danger fs-5 mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#rejectStatus"
                            style={{ cursor: "pointer" }}
                          >
                            {rejectButton}
                          </i>
                          <RejectStatusPopup id={business._id} />

                          <i
                            className="text-success fs-5 mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#acceptStatus"
                            style={{ cursor: "pointer" }}
                          >
                            {approveButton}
                          </i>
                          <AcceptStatusPopup id={business._id} />
                          <NavLink
                            className="nav-link"
                            to={`/businessdetails/${business.business_type}/${business.business_name}/${business.vendor_id}/${business._id}`}
                            state={{ cards: business }}
                          >
                            {" "}
                            <span className="text-primary ">View Business</span>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="col ">
                {businesses && (
                  <nav>
                    <div className="d-flex justify-content-center">
                      <ul className="pagination">
                        <li
                          onClick={() => setCurrentPage(1)}
                          className="page-link pagination-hover"
                        >
                          &laquo;
                        </li>
                        <li
                          onClick={prevPage}
                          className="page-link pagination-hover"
                        >
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
                        <li
                          onClick={nextPage}
                          className="page-link pagination-hover"
                        >
                          &rsaquo;
                        </li>
                        <li
                          onClick={() => setCurrentPage(totalPage)}
                          className="page-link pagination-hover"
                        >
                          &raquo;
                        </li>
                      </ul>
                    </div>
                  </nav>
                )}
              </div>
            </div>
          ) : (
            <h1>No Pending Businesses to show</h1>
          )}
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default BusinessApprovals;
