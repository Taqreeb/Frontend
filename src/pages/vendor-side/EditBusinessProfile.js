import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
import { useParams } from "react-router-dom";
import MultiDatesPicker from "react-multi-date-picker";
import { karachiAreas } from "../../utils/constants";
import MyImagePickerBusiness from "../../components/ImagePickers/MyImagePickerBusiness";
import LoadingScreen from "../../components/LoadingScreen";

const EditBusinessProfile = (props) => {
  const { businessId } = useParams();
  const currentDate = new Date().toISOString().split("T")[0];
  const role = localStorage.getItem("role");
  const authtoken = localStorage.getItem("authtoken");
  const validPhoneNo = new RegExp("^(03|\\+923)[0-9]{2}[0-9]{7}$");
  const [loading, setLoading] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [businesstype, setBusinessType] = useState("");
  const [click, setClick] = useState(false);

  //values
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessEstimatedPrice, setBusinessEstimatedPrice] = useState();
  const [businessFacebookUrl, setBusinessFacebookUrl] = useState("");
  const [businessYoutubeUrl, setBusinessYoutubeUrl] = useState("");
  const [businessInstagramUrl, setBusinessInstagramUrl] = useState("");
  const [businessBookedDates, setBusinessBookedDates] = useState([]);
  const [venuePersonsCapacity, setVenuePersonsCapacity] = useState();
  const [venueCoverageArea, setVenueCoverageArea] = useState();
  const [packages, setPackages] = useState([]);
  const [silverPackagePrice, setSilverPackagePrice] = useState();
  const [goldPackagePrice, setGoldPackagePrice] = useState();
  const [platinumPackagePrice, setPlatinumPackagePrice] = useState();
  const [silverPackageDescription, setSilverPackageDescription] = useState();
  const [goldPackageDescription, setGoldPackageDescription] = useState();
  const [platinumPackageDescription, setPlatinumPackageDescription] =
    useState();

  //Errors
  const [businessEmailError, setBusinessEmailError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessDescriptionError, setBusinessDescriptionError] = useState("");
  const [businessphoneError, setBusinessPhoneError] = useState("");
  const [businessLocationError, setBusinessLocationError] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  const [businessEstimatedPriceError, setBusinessEstimatedPriceError] =
    useState("");
  const [businessBookedDatesError, setBusinessBookedDatesError] = useState("");
  const [venuePersonsCapacityError, setVenuePersonsCapacityError] =
    useState("");
  const [venueCoverageAreaError, setVenueCoverageAreaError] = useState("");
  const [packageError, setPackageError] = useState("");

  //Editing
  const [isEditingbusinessName, setIsEditingBusinessName] = useState(false);
  const [isEditingBusinessDecription, setIsEditingBusinessDescription] =
    useState(false);
  const [isEditingBusinessPhone, setIsEditingBusinessPhone] = useState(false);
  const [isEditingBusinessEmail, setIsEditingBusinessEmail] = useState(false);
  const [isEditingBusinessLocation, setIsEditingBusinessLocation] =
    useState(false);
  const [isEditingBusinessAddress, setIsEditingBusinessAddress] =
    useState(false);
  const [isEditingBusinessEstimatedPrice, setIsEditingBusinessEstimatedPrice] =
    useState(false);
  const [isEditingBusinessFacebookUrl, setIsEditingBusinessFacebookUrl] =
    useState(false);
  const [isEditingBusinessYoutubeUrl, setIsEditingBusinessYoutubeUrl] =
    useState(false);
  const [isEditingBusinessInstagramUrl, setIsEditingBusinessInstagramUrl] =
    useState(false);
  const [isEditingBusinessBookedDates, setIsEditingBusinessBookedDates] =
    useState(false);
  const [isEditingVenuePersonsCapacity, setIsEditingVenuePersonsCapacity] =
    useState(false);
  const [isEditingVenueCoverageArea, setIsEditingVenueCoverageArea] =
    useState(false);
  const [isEditingSilverPackage, setIsEditingSilverPackage] = useState(false);
  const [isEditingGoldPackage, setIsEditingGoldPackage] = useState(false);
  const [isEditingPlatinumPackage, setIsEditingPlatinumPackage] =
    useState(false);

  const handleSaveChangesBusinessName = async () => {
    if (businessName) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessName/${businessId}`,
          { business_name: businessName },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessNameError("");
          props.showAlert("Business Name Changed Successfully", "success");
          setClick(false);
          setIsEditingBusinessName(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessNameError("Business Name is required");
    }
  };

  const handleSaveChangesBusinessDescription = async () => {
    if (businessDescription) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessDescription/${businessId}`,
          { business_description: businessDescription },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessDescriptionError("");
          props.showAlert(
            "Business Description Changed Successfully",
            "success"
          );
          setClick(false);
          setIsEditingBusinessDescription(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessDescriptionError("Business Description is required");
    }
  };

  const handleSaveChangesBusinessPhone = async () => {
    if (businessPhone) {
      if (validPhoneNo.test(businessPhone)) {
        setClick(true);
        try {
          const response = await axios.put(
            `${API_URL}/${role}/businessPhone/${businessId}`,
            { business_phone_number: businessPhone },
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken,
              },
            }
          );
          if (response.data.success) {
            setBusinessPhoneError("");
            props.showAlert("Phone Number Changed Successfully", "success");
            setClick(false);
            setIsEditingBusinessPhone(false);
            setSaveButton(!saveButton);
          }
        } catch (error) {
          setClick(false);
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        }
      } else {
        setBusinessPhoneError(
          "Please enter a valid phone number in the format 03XXXXXXXXX or +923XXXXXXXXX"
        );
      }
    } else {
      setBusinessPhoneError("Phone Number is required");
    }
  };

  const handleSaveChangesBusinessEmail = async () => {
    if (businessEmail) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessEmail/${businessId}`,
          { business_email: businessEmail },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessEmailError("");

          props.showAlert("Email Changed Successfully", "success");
          setClick(false);
          setIsEditingBusinessEmail(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessEmailError("Business Email is required");
    }
  };
  const handleSaveChangesBusinessLocation = async () => {
    if (businessLocation) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessLocation/${businessId}`,
          { business_location: businessLocation },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessLocationError("");

          props.showAlert("Business Location Changed Successfully", "success");
          setClick(false);
          setIsEditingBusinessLocation(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessLocationError("Business Location is required");
    }
  };

  const handleSaveChangesBusinessAddress = async () => {
    if (businessAddress) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessAddress/${businessId}`,
          { business_address: businessAddress },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessAddressError("");
          props.showAlert("Business Address Changed Successfully", "success");
          setClick(false);
          setIsEditingBusinessAddress(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessAddressError("Business Address is required");
    }
  };

  const handleSaveChangesBusinessEstimatedPrice = async () => {
    if (businessEstimatedPrice) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessPrice/${businessId}`,
          { estimated_price: businessEstimatedPrice },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessEstimatedPriceError("");
          setClick(false);
          props.showAlert("Business Price Changed Successfully", "success");
          setIsEditingBusinessEstimatedPrice(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessAddressError("Business Estimated Price is required");
    }
  };

  const handleSaveChangesBusinessBookedDates = async () => {
    if (businessBookedDates.length > 0) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessBookedDates/${businessId}`,
          { booked_dates: businessBookedDates },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setBusinessBookedDatesError("");
          props.showAlert("Booked Dates Changed Successfully", "success");
          setClick(false);
          setIsEditingBusinessBookedDates(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessBookedDatesError("Booked Dates are required");
    }
  };

  const handleSaveChangesFacebook = async () => {
    setClick(true);
    try {
      const response = await axios.put(
        `${API_URL}/${role}/businessFacebook/${businessId}`,
        { business_facebook_url: businessFacebookUrl },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        props.showAlert(
          "Business Facebook Url Changed Successfully",
          "success"
        );
        setClick(false);
        setIsEditingBusinessFacebookUrl(false);
        setSaveButton(!saveButton);
      }
    } catch (error) {
      setClick(false);
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  const handleSaveChangesYoutube = async () => {
    setClick(true);
    try {
      const response = await axios.put(
        `${API_URL}/${role}/businessYoutube/${businessId}`,
        { business_youtube_url: businessYoutubeUrl },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        props.showAlert("Business Youtube Url Changed Successfully", "success");
        setClick(false);
        setIsEditingBusinessYoutubeUrl(false);
        setSaveButton(!saveButton);
      }
    } catch (error) {
      setClick(false);
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  const handleSaveChangesInstagram = async () => {
    setClick(true);
    try {
      const response = await axios.put(
        `${API_URL}/${role}/businessInstagram/${businessId}`,
        { business_instagram_url: businessInstagramUrl },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        props.showAlert(
          "Business Instagram Url Changed Successfully",
          "success"
        );
        setClick(false);
        setIsEditingBusinessInstagramUrl(false);
        setSaveButton(!saveButton);
      }
    } catch (error) {
      setClick(false);
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  const handleSaveChangesVenuePersonsCapacity = async () => {
    if (venuePersonsCapacity) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessCapacity/${businessId}`,
          { venue_persons_capacity: venuePersonsCapacity },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setVenuePersonsCapacityError("");
          props.showAlert(
            "Venue Persons Capacity Changed Successfully",
            "success"
          );
          setClick(false);
          setIsEditingVenuePersonsCapacity(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setBusinessAddressError("Persons Capacity is required");
    }
  };
  const handleSaveChangesVenueCoverageArea = async () => {
    if (venueCoverageArea) {
      setClick(true);
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessCoverageArea/${businessId}`,
          { venue_coverage_area: venueCoverageArea },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.success) {
          setVenueCoverageAreaError("");
          props.showAlert("Venue Coverage Area Successfully", "success");
          setClick(false);
          setIsEditingVenueCoverageArea(false);
          setSaveButton(!saveButton);
        }
      } catch (error) {
        setClick(false);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    } else {
      setVenueCoverageAreaError("Coverage Area is required");
    }
  };

  const handleSavePackage = async (id, price, description, name) => {
    if (description) {
      if (!price) {
        setPackageError(`${name} price is required with its description`);
        return;
      }
    }
    if (price) {
      if (!description) {
        setPackageError(`${name} description is required with its price`);
        return;
      }
    }
    setClick(true);
    try {
      const response = await axios.put(
        `${API_URL}/${role}/businessPackages/${businessId}`,
        {
          package_id: id,
          description: description,
          price: price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      if (response.data.success) {
        setPackageError("");
        setClick(false);
        setIsEditingSilverPackage(false);
        setIsEditingGoldPackage(false);
        setIsEditingPlatinumPackage(false);
        props.showAlert(`${name} Successfully Changed`, "success");
        setSaveButton(!saveButton);
      }
    } catch (error) {
      setClick(false);
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  const getBusinessProfile = async () => {
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
        setBusinessName(response.data.business.business_name);
        setBusinessDescription(response.data.business.business_description);
        setBusinessEmail(response.data.business.business_email);
        setBusinessPhone(response.data.business.business_phone_number);
        setDisplayPicture(response.data.business.business_display_picture);
        setBusinessLocation(response.data.business.business_location);
        setBusinessAddress(response.data.business.business_address);
        setBusinessEstimatedPrice(response.data.business.estimated_price);
        setBusinessFacebookUrl(response.data.business.business_facebook_url);
        setBusinessYoutubeUrl(response.data.business.business_youtube_url);
        setBusinessInstagramUrl(response.data.business.business_instagram_url);
        setBusinessBookedDates(response.data.business.booked_dates);
        setBusinessType(response.data.business.business_type);
        setVenueCoverageArea(response.data.business.venue_coverage_area);
        setVenuePersonsCapacity(response.data.business.venue_persons_capacity);
        setPackages(response.data.business.business_packages);
        setSilverPackagePrice(
          response.data.business.business_packages[0].price
        );
        setGoldPackagePrice(response.data.business.business_packages[1].price);
        setPlatinumPackagePrice(
          response.data.business.business_packages[2].price
        );
        setSilverPackageDescription(
          response.data.business.business_packages[0].description
        );
        setGoldPackageDescription(
          response.data.business.business_packages[1].description
        );
        setPlatinumPackageDescription(
          response.data.business.business_packages[2].description
        );
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
    getBusinessProfile();
  }, [saveButton]);

  return (
    <>
      <div className="background-profile-top">
        <div className="container pt-4">
          <h2>Welcome to your Business Profile</h2>
          <p className="ms-5">You can manage your business profile here</p>
        </div>
      </div>
      {!loading ? (
        <div className="background-business-profile py-5">
          <div>
            <MyImagePickerBusiness
              displayPicture={displayPicture}
              role={role}
              authtoken={authtoken}
              businessId={businessId}
              setSaveButton={setSaveButton}
              showAlert={props.showAlert}
            />
          </div>
          <div
            className="container w-50 text-center"
            style={{ marginTop: "5rem" }}
          >
            <div>
              {isEditingbusinessName ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessName" className="form-label">
                      Business Name
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      setBusinessNameError("");
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessName(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessName}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessNameError && (
                    <span className="text-danger">{businessNameError}</span>
                  )}
                </div>
              ) : (
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Business Name: </span>
                    <span>{businessName}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessName(true)}
                    >
                      Change Business Name
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3">
              {isEditingBusinessDecription ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessDescription" className="form-label">
                      Business Description
                    </label>
                  </div>
                  <textarea
                    type="text"
                    style={{ resize: "none" }}
                    rows="3"
                    className="form-control"
                    id="businessDescription"
                    value={businessDescription}
                    onChange={(e) => {
                      setBusinessDescription(e.target.value);
                      setBusinessDescriptionError("");
                    }}
                    required
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessDescription(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessDescription}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessDescriptionError && (
                    <span className="text-danger">
                      {businessDescriptionError}
                    </span>
                  )}
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"28rem"}}>
                    <span>Business Description: </span>
                    <span >{businessDescription}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessDescription(true)}
                    >
                      Change Business Description
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3">
              {isEditingBusinessPhone ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessPhone" className="form-label">
                      Business Phone No
                    </label>
                  </div>
                  <input
                    type="tel"
                    className="form-control"
                    id="businessPhone"
                    value={businessPhone}
                    onChange={(e) => {
                      setBusinessPhone(e.target.value);
                      setBusinessPhoneError("");
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessPhone(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessPhone}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessphoneError && (
                    <span className="text-danger">{businessphoneError}</span>
                  )}
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div>
                    <span>Business Phone No: </span>
                    <span>{businessPhone}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessPhone(true)}
                    >
                      Change Phone No
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3">
              {isEditingBusinessEmail ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessEmail" className="form-label">
                      Business Email
                    </label>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="businessEmail"
                    value={businessEmail}
                    onChange={(e) => {
                      setBusinessEmail(e.target.value);
                      setBusinessEmailError("");
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessEmail(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessEmail}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessEmailError && (
                    <span className="text-danger">{businessEmailError}</span>
                  )}
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"28rem"}}>
                    <span>Business Email: </span>
                    <span>{businessEmail}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessEmail(true)}
                    >
                      Change Business Email
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isEditingBusinessLocation ? (
                <div>
                  <label htmlFor="area-dropdown">
                    Select an area in karachi:
                    <select
                      className="form-select"
                      value={businessLocation}
                      onChange={(e) => {
                        setBusinessLocation(e.target.value);
                        setBusinessLocationError("");
                      }}
                      id="area-dropdown"
                      required
                    >
                      <option value="">--Select an area--</option>
                      {karachiAreas.map((area, index) => (
                        <option key={index} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessLocation(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessLocation}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  <div>
                    {businessLocationError && (
                      <span className="text-danger">
                        {businessLocationError}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div>
                    <span>Business Location: </span>
                    <span>{businessLocation}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessLocation(true)}
                    >
                      Change Business Location
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isEditingBusinessAddress ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessAddress" className="form-label">
                      Business Address
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="businessAddress"
                    value={businessAddress}
                    onChange={(e) => {
                      setBusinessAddress(e.target.value);
                      setBusinessAddressError("");
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessAddress(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessAddress}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessAddressError && (
                    <span className="text-danger">{businessAddressError}</span>
                  )}
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"28rem"}}>
                    <span>Business Address: </span>
                    <span>{businessAddress}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessAddress(true)}
                    >
                      Change Business Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isEditingBusinessEstimatedPrice ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessPrice" className="form-label">
                      Business Estimated Price: (in PKR)
                    </label>
                  </div>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="businessPrice"
                    value={businessEstimatedPrice}
                    onChange={(e) => {
                      setBusinessEstimatedPrice(e.target.value);
                      setBusinessEstimatedPriceError("");
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() =>
                            setIsEditingBusinessEstimatedPrice(false)
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessEstimatedPrice}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessEstimatedPriceError && (
                    <span className="text-danger">
                      {businessEstimatedPriceError}
                    </span>
                  )}
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"28rem"}}>
                    <span>Business Estimated Price: </span>
                    <span>{businessEstimatedPrice} PKR</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessEstimatedPrice(true)}
                    >
                      Change Business Price
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isEditingBusinessBookedDates ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessAddress" className="form-label">
                      Business Booked Dates
                    </label>
                  </div>
                  <MultiDatesPicker
                    multiple
                    value={businessBookedDates}
                    minDate={currentDate}
                    onChange={(date) => {
                      if (date) {
                        if(date.length>0){
                        const dates = date.toString().split(",");
                        setBusinessBookedDates(dates);
                        setBusinessBookedDatesError("");
                        }
                        else{
                          setBusinessBookedDates(date);
                          setBusinessBookedDatesError("Booked Dates are required");
                        }
                      } else {
                        setBusinessBookedDates(date);
                        setBusinessBookedDatesError("Booked Dates are required");
                      }
                    
                    }}
                    className="form-control"
                    placeholder="Select booked dates"
                    format="YYYY-MM-DD"
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessBookedDates(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesBusinessBookedDates}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                  {businessBookedDatesError && (
                    <span className="text-danger">
                      {businessBookedDatesError}
                    </span>
                  )}
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Booked Dates</option>
                      {businessBookedDates.map((date, index) => (
                        <option key={index}>{date}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessBookedDates(true)}
                    >
                      Change Booked Dates
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isEditingBusinessFacebookUrl ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessFacebook" className="form-label">
                      Business Facebook Url: (to remove Facebook account just
                      empty the field)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="businessFacebook"
                    value={businessFacebookUrl}
                    onChange={(e) => {
                      setBusinessFacebookUrl(e.target.value);
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessFacebookUrl(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesFacebook}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"30rem"}}>
                    <span>Business Facebook Url: </span>
                    <span>{businessFacebookUrl}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessFacebookUrl(true)}
                    >
                      Change Facebook Url
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-3">
              {isEditingBusinessYoutubeUrl ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessYoutube" className="form-label">
                      Business Youtube Url: (to remove Youtube account just
                      empty the field)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="businessYoutube"
                    value={businessYoutubeUrl}
                    onChange={(e) => {
                      setBusinessYoutubeUrl(e.target.value);
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => setIsEditingBusinessYoutubeUrl(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesYoutube}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"25rem"}}>
                    <span>Business Youtube Url: </span>
                    <span>{businessYoutubeUrl}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessYoutubeUrl(true)}
                    >
                      Change Youtube Url
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {isEditingBusinessInstagramUrl ? (
                <div>
                  <div className="container text-start mb-2">
                    <label htmlFor="businessInstagram" className="form-label">
                      Business Instagram Url: (to remove Instagram account just
                      empty the field)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="businessInstagram"
                    value={businessInstagramUrl}
                    onChange={(e) => {
                      setBusinessInstagramUrl(e.target.value);
                    }}
                  />
                  <div className="container mt-2 ms-3 text-end">
                    {!click ? (
                      <>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() =>
                            setIsEditingBusinessInstagramUrl(false)
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success "
                          onClick={handleSaveChangesInstagram}
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <p>Saving...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-5 d-flex justify-content-between">
                  <div style={{maxWidth:"28rem"}}>
                    <span>Business Instagram Url: </span>
                    <span>{businessInstagramUrl}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditingBusinessInstagramUrl(true)}
                    >
                      Change Instagram Url
                    </button>
                  </div>
                </div>
              )}
            </div>
            {businesstype === "venue" && (
              <>
                <div className="mt-3">
                  {isEditingVenuePersonsCapacity ? (
                    <div>
                      <div className="container text-start mb-2">
                        <label
                          htmlFor="businessCapacity"
                          className="form-label"
                        >
                          Venue Persons Capacity
                        </label>
                      </div>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="businessCapacity"
                        value={venuePersonsCapacity}
                        onChange={(e) => {
                          setVenuePersonsCapacity(e.target.value);
                          setVenuePersonsCapacityError("");
                        }}
                      />
                      <div className="container mt-2 ms-3 text-end">
                        {!click ? (
                          <>
                            <button
                              className="btn btn-danger me-3"
                              onClick={() =>
                                setIsEditingVenuePersonsCapacity(false)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-success "
                              onClick={handleSaveChangesVenuePersonsCapacity}
                            >
                              Save Changes
                            </button>
                          </>
                        ) : (
                          <p>Saving...</p>
                        )}
                      </div>
                      {venuePersonsCapacityError && (
                        <span className="text-danger">
                          {venuePersonsCapacityError}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mt-5 d-flex justify-content-between">
                      <div>
                        <span>Venue Persons Capacity: </span>
                        <span>{venuePersonsCapacity}</span>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => setIsEditingVenuePersonsCapacity(true)}
                        >
                          Change Persons Capacity
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  {isEditingVenueCoverageArea ? (
                    <div>
                      <div className="container text-start mb-2">
                        <label
                          htmlFor="businessCoverageArea"
                          className="form-label"
                        >
                          Venue Coverage Area (in sq ft)
                        </label>
                      </div>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="businessCoverageArea"
                        value={venueCoverageArea}
                        onChange={(e) => {
                          setVenueCoverageArea(e.target.value);
                          setVenueCoverageAreaError("");
                        }}
                      />
                      <div className="container mt-2 ms-3 text-end">
                        {!click ? (
                          <>
                            <button
                              className="btn btn-danger me-3"
                              onClick={() =>
                                setIsEditingVenueCoverageArea(false)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-success "
                              onClick={handleSaveChangesVenueCoverageArea}
                            >
                              Save Changes
                            </button>
                          </>
                        ) : (
                          <p>Saving...</p>
                        )}
                      </div>
                      {venueCoverageAreaError && (
                        <span className="text-danger">
                          {venueCoverageAreaError}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mt-5 d-flex justify-content-between">
                      <div>
                        <span>Venue Coverage Area (in sq ft): </span>
                        <span>{venueCoverageArea}</span>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => setIsEditingVenueCoverageArea(true)}
                        >
                          Change Coverage Area
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {packages.map((pkg) => (
              <div className="mt-3" key={pkg._id}>
                {pkg.name === "Silver Package" ? (
                  <>
                    <div className="mt-3">
                      {isEditingSilverPackage ? (
                        <div>
                          <div className="container text-start mb-2">
                            <label
                              htmlFor="silverPackagePrice"
                              className="form-label"
                            >
                              Silver Package Price:{" "}
                            </label>
                          </div>
                          <input
                            type="number"
                            id="silverPackagePrice"
                            min="0"
                            className="form-control"
                            value={silverPackagePrice}
                            onChange={(e) =>
                              setSilverPackagePrice(e.target.value)
                            }
                          />
                          <div className="container text-start my-2">
                            <label
                              htmlFor="silverPackageDescription"
                              className="form-label"
                            >
                              Silver Package Description:{" "}
                            </label>
                          </div>
                          <textarea
                            rows="3"
                            style={{ resize: "none" }}
                            type="text"
                            id="silverPackageDescription"
                            className="form-control"
                            value={silverPackageDescription}
                            onChange={(e) =>
                              setSilverPackageDescription(e.target.value)
                            }
                          />
                          <div className="text-start mt-2">
                            {packageError && (
                              <span className="text-danger">
                                {packageError}
                              </span>
                            )}
                          </div>
                          <div className="container mt-2 ms-3 text-end">
                            {!click ? (
                              <>
                                <button
                                  className="btn btn-danger me-3"
                                  onClick={() =>
                                    setIsEditingSilverPackage(false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success "
                                  onClick={() =>
                                    handleSavePackage(
                                      pkg._id,
                                      silverPackagePrice,
                                      silverPackageDescription,
                                      pkg.name
                                    )
                                  }
                                >
                                  Save Changes
                                </button>
                              </>
                            ) : (
                              <p>Saving...</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 d-flex justify-content-between">
                          <div className="text-start" style={{ width: "70%" }}>
                            <h5>Silver Package</h5>
                            <span>Silver Package Description: </span>
                            <span>{silverPackageDescription}</span>
                            <br />
                            <br />
                            <span>Silver Package Price: </span>
                            <span>{silverPackagePrice} PKR</span>
                          </div>
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => setIsEditingSilverPackage(true)}
                            >
                              Change Silver Package
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : pkg.name === "Gold Package" ? (
                  <>
                    <div className="mt-3">
                      {isEditingGoldPackage ? (
                        <div>
                          <div className="container text-start mb-2">
                            <label
                              htmlFor="goldPackagePrice"
                              className="form-label"
                            >
                              Gold Package Price:{" "}
                            </label>
                          </div>
                          <input
                            type="number"
                            id="goldPackagePrice"
                            min="0"
                            className="form-control"
                            value={goldPackagePrice}
                            onChange={(e) =>
                              setGoldPackagePrice(e.target.value)
                            }
                          />
                          <div className="container text-start my-2">
                            <label
                              htmlFor="goldPackageDescription"
                              className="form-label"
                            >
                              Gold Package Description:{" "}
                            </label>
                          </div>
                          <textarea
                            rows="3"
                            style={{ resize: "none" }}
                            type="text"
                            id="goldPackageDescription"
                            className="form-control"
                            value={goldPackageDescription}
                            onChange={(e) =>
                              setGoldPackageDescription(e.target.value)
                            }
                          />
                          <div className="text-start mt-2">
                            {packageError && (
                              <span className="text-danger">
                                {packageError}
                              </span>
                            )}
                          </div>
                          <div className="container mt-2 ms-3 text-end">
                            {!click ? (
                              <>
                                <button
                                  className="btn btn-danger me-3"
                                  onClick={() => setIsEditingGoldPackage(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success "
                                  onClick={() =>
                                    handleSavePackage(
                                      pkg._id,
                                      goldPackagePrice,
                                      goldPackageDescription,
                                      pkg.name
                                    )
                                  }
                                >
                                  Save Changes
                                </button>
                              </>
                            ) : (
                              <p>Saving...</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 d-flex justify-content-between">
                          <div className="text-start" style={{ width: "70%" }}>
                            <h5>Gold Package</h5>
                            <span>Gold Package Description: </span>
                            <span>{goldPackageDescription}</span>
                            <br />
                            <br />
                            <span>Gold Package Price: </span>
                            <span>{goldPackagePrice} PKR</span>
                          </div>
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => setIsEditingGoldPackage(true)}
                            >
                              Change Gold Package
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3">
                      {isEditingPlatinumPackage ? (
                        <div>
                          <div className="container text-start mb-2">
                            <label
                              htmlFor="platinumPackagePrice"
                              className="form-label"
                            >
                              Platinum Package Price:{" "}
                            </label>
                          </div>
                          <input
                            type="number"
                            id="platinumPackagePrice"
                            min="0"
                            className="form-control"
                            value={platinumPackagePrice}
                            onChange={(e) =>
                              setPlatinumPackagePrice(e.target.value)
                            }
                          />
                          <div className="container text-start my-2">
                            <label
                              htmlFor="platinumPackageDescription"
                              className="form-label"
                            >
                              Platinum Package Description:{" "}
                            </label>
                          </div>
                          <textarea
                            rows="3"
                            style={{ resize: "none" }}
                            type="text"
                            id="platinumPackageDescription"
                            className="form-control"
                            value={platinumPackageDescription}
                            onChange={(e) =>
                              setPlatinumPackageDescription(e.target.value)
                            }
                          />
                          <div className="text-start mt-2">
                            {packageError && (
                              <span className="text-danger">
                                {packageError}
                              </span>
                            )}
                          </div>
                          <div className="container mt-2 ms-3 text-end">
                            {!click ? (
                              <>
                                {" "}
                                <button
                                  className="btn btn-danger me-3"
                                  onClick={() =>
                                    setIsEditingPlatinumPackage(false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success "
                                  onClick={() =>
                                    handleSavePackage(
                                      pkg._id,
                                      platinumPackagePrice,
                                      platinumPackageDescription,
                                      pkg.name
                                    )
                                  }
                                >
                                  Save Changes
                                </button>
                              </>
                            ) : (
                              <p>Saving...</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 d-flex justify-content-between">
                          <div className="text-start" style={{ width: "70%" }}>
                            <h5>Platinum Package</h5>
                            <span>Platinum Package Description: </span>
                            <span>{platinumPackageDescription}</span>
                            <br />
                            <br />
                            <span>Platinum Package Price: </span>
                            <span>{platinumPackagePrice} PKR</span>
                          </div>
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => setIsEditingPlatinumPackage(true)}
                            >
                              Change Platinum Package
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default EditBusinessProfile;
