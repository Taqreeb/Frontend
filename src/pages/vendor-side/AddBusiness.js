import React, { useState } from "react";
import MultiDatesPicker from "react-multi-date-picker";
import MyImagePickerAlbum from "../../components/ImagePickers/MyImagePickerAlbum";
import axios from "axios";
import { karachiAreas } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/apiUrl";

const AddBusiness = (props) => {
  const role = localStorage.getItem('role');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [businessDisplayImage, setBusinessDisplayImage] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessEstimatedPrice, setBusinessEstimatedPrice] = useState("");
  const [businessFacebookUrl, setBusinessFacebookUrl] = useState("");
  const [businessYoutubeUrl, setBusinessYoutubeUrl] = useState("");
  const [businessInstagramUrl, setBusinessInstagramUrl] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [venuePersonsCapacity, setVenuePersonsCapacity] = useState("");
  const [venueCoverageArea, setVenueCoverageArea] = useState("");
  const [bookedDates, setBookedDates] = useState(null);
  const [silverPackagePrice, setSilverPackagePrice] = useState();
  const [silverPackageDescription, setSilverPackageDescription] = useState();
  const [goldPackagePrice, setGoldPackagePrice] = useState();
  const [goldPackageDescription, setGoldPackageDescription] = useState();
  const [platinumPackagePrice, setPlatinumPackagePrice] = useState();
  const [platinumPackageDescription, setPlatinumPackageDescription] = useState();
  const [albumImages, setAlbumImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Errors
  const [businessDisplayImageError, setBusinessDisplayImageError] =
    useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessDescriptionError, setBusinessDescriptionError] = useState("");
  const [businessPhoneError, setBusinessPhoneError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  const [businessEmailError, setBusinessEmailError] = useState("");
  const [businessEstimatedPriceError, setBusinessEstimatedPriceError] =
    useState("");
  const [vendorTypeError, setVendorTypeError] = useState("");
  const [venuePersonsCapacityError, setVenuePersonsCapacityError] =
    useState("");
  const [venueCoverageAreaError, setVenueCoverageAreaError] = useState("");
  const [bookedDatesError, setBookedDatesError] = useState("");
  const [silverPackagePriceError, setSilverPackagePriceError] = useState("");
  const [silverPackageDescriptionError, setSilverPackageDescriptionError] = useState("");
  const [goldackagePriceError, setGoldPackagePriceError] = useState("");
  const [goldPackageDescriptionError, setGoldPackageDescriptionError] = useState("");
  const [platinumPackagePriceError, setPlatinumPackagePriceError] = useState("");
  const [platinumPackageDescriptionError, setPlatinumPackageDescriptionError] = useState("");

  const handleVendorTypeChange = (e) => {
    setVendorType(e.target.value);
    // clear venue-specific fields if vendor type is not venue
    if (e.target.value !== "venue") {
      setVenuePersonsCapacity("");
      setVenueCoverageArea("");
    }
  };
  const authtoken = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(silverPackagePrice){
      if(!silverPackageDescription){
      setSilverPackageDescriptionError("Silver Package description is required with its price")
       return;
      }
    }
    if(goldPackagePrice){
      if(!goldPackageDescription){
      setGoldPackageDescriptionError("Gold Package description is required with its price")
       return;
      }
    }
    if(platinumPackagePrice){
      if(!platinumPackageDescription){
      setPlatinumPackageDescriptionError("Platinum Package description is required with its price")
       return;
      }
    }
    if(silverPackageDescription){
      if(!silverPackagePrice){
      setSilverPackageDescriptionError("Silver Package price is required with its description")
       return;
      }
    }
    if(goldPackageDescription){
      if(!goldPackagePrice){
      setGoldPackageDescriptionError("Gold Package price is required with its description")
       return;
      }
    }
    if(platinumPackageDescription){
      if(!platinumPackagePrice){
      setPlatinumPackagePriceError("Platinum Package price is required with its description")
       return;
      }
    }

    
    if (albumImages.length > 0 || name || description) {
      return props.showAlert(
        "Please upload the album by filling all fields or empty the Album fields before submitting",
        "danger"
      );
    }
    setLoading(true);
    setSilverPackageDescriptionError("")
    setPlatinumPackageDescriptionError("")
    setGoldPackageDescriptionError("")
    setSilverPackagePriceError("")
    setPlatinumPackagePriceError("")
    setGoldPackagePriceError("")
    const dates = bookedDates.toString().split(",");
    const businessPackages = [
      {
        name: "Silver Package",
        description: silverPackageDescription,
        price: silverPackagePrice,     
      },
      { name: "Gold Package",description: goldPackageDescription, price: goldPackagePrice },
      {
        name: "Platinum Package",
        description: goldPackageDescription,
        price: platinumPackagePrice,
      }
    ];
   
    try {
      const response = await axios.post(
        `${API_URL}/${role}/addbusiness`,
        {
          business_name: businessName,
          business_description: businessDescription,
          business_email: businessEmail,
          business_phone_number: businessPhone,
          business_type: vendorType,
          estimated_price: businessEstimatedPrice,
          venue_coverage_area: venueCoverageArea,
          venue_persons_capacity: venuePersonsCapacity,
          business_facebook_url: businessFacebookUrl,
          business_instagram_url: businessInstagramUrl,
          business_youtube_url: businessYoutubeUrl,
          business_location: businessLocation,
          business_address: businessAddress,
          business_packages: businessPackages,
          business_albums: albums,
          business_display_picture: businessDisplayImage,
          booked_dates: dates,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      
      if (response.data.success) {
        setLoading(false);
        props.showAlert("Succesfully added a new business", "success");
        navigate("/vendor/viewbusiness");
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBusinessDisplayImage(reader.result);
    };
    reader.readAsDataURL(file);
    setBusinessDisplayImageError("");
  };
  return (
    <>
      <div className="background-top-add-business">
        <div className="container pt-4">
          <h1>Add Business</h1>
          <p className="ms-3">Add a Business to your vendor profile</p>
        </div>
      </div>
      <div className="container mb-5">
        <form onSubmit={handleSubmit}>
          <div className="text-center my-3">
            <img
              src={
                businessDisplayImage
                  ? businessDisplayImage
                  : "https://via.placeholder.com/150"
              }
              alt="Business Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="d-none"
                id="imageUpload"
                name="imageUpload"
                onInvalid={() =>
                  setBusinessDisplayImageError(
                    "Business Display Picture is required"
                  )
                }
                required
              />
              <label htmlFor="imageUpload" className="btn btn-primary mt-2">
                Choose Image
              </label>
            </div>
            {businessDisplayImageError && (
              <span className="text-danger">{businessDisplayImageError}</span>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="businessName" className="form-label">
              Business Name:
            </label>
            <input
              type="text"
              id="businessName"
              className="form-control"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                setBusinessNameError("");
              }}
              onInvalid={() => {
                setBusinessNameError("Business Name is required");
              }}
              required
            />
            {businessNameError && (
              <span className="text-danger">{businessNameError}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="businessDescription" className="form-label">
              Business Description:
            </label>
            <textarea
              type="text"
              style={{ resize: "none" }}
              id="businessDescription"
              rows="3"
              className="form-control"
              value={businessDescription}
              onChange={(e) => {
                setBusinessDescription(e.target.value);
                setBusinessDescriptionError("");
              }}
              onInvalid={() => {
                setBusinessDescriptionError("Business Description is required");
              }}
              required
            />
            {businessDescriptionError && (
              <span className="text-danger">{businessDescriptionError}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="businessPhone" className="form-label">
              Business Phone No: (Whatsapp Number is preferred)
            </label>
            <input
              type="tel"
              id="businessPhone"
              value={businessPhone}
              pattern="^(03|\+923)[0-9]{2}[0-9]{7}$"
              onInvalid={() => {
                if (businessPhone) {
                  setBusinessPhoneError(
                    "Please enter a valid phone number in the format 03XXXXXXXXX or +923XXXXXXXXX"
                  );
                } else {
                  setBusinessPhoneError("Phone Number is required");
                }
              }}
              className="form-control"
              onChange={(e) => {
                setBusinessPhone(e.target.value);
                setBusinessPhoneError("");
              }}
              required
            />
            {businessPhoneError && (
              <span className="text-danger">{businessPhoneError}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="area-dropdown">
              Select an area in karachi:
              <select
                className="form-select"
                value={businessLocation}
                onChange={(e) => {
                  setBusinessLocation(e.target.value);
                  setLocationError("");
                }}
                onInvalid={() => {
                  setLocationError("Business Location is required");
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
            <div>
              {locationError && (
                <span className="text-danger">{locationError}</span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="businessAddress" className="form-label">
              Business Address:
            </label>
            <input
              type="text"
              id="businessAddress"
              value={businessAddress}
              className="form-control"
              onChange={(e) => {
                setBusinessAddress(e.target.value);
                setBusinessAddressError("");
              }}
              onInvalid={() => {
                setBusinessAddressError("Business Address is required");
              }}
              required
            />
            {businessAddressError && (
              <span className="text-danger">{businessAddressError}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="businessEmail" className="form-label">
              Business Email:
            </label>
            <input
              type="email"
              id="businessEmail"
              value={businessEmail}
              className="form-control"
              onChange={(e) => {
                setBusinessEmail(e.target.value);
                setBusinessEmailError("");
              }}
              onInvalid={() => {
                if (businessEmail) {
                  setBusinessEmailError("Business Email is Invalid");
                } else {
                  setBusinessEmailError("Business Email is required");
                }
              }}
              required
            />
            {businessEmailError && (
              <span className="text-danger">{businessEmailError}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="businessEstimatedPrice" className="form-label">
              Business Estimated Price: (in PKR)
            </label>
            <input
              type="number"
              min="0"
              id="businessEstimatedPrice"
              value={businessEstimatedPrice}
              className="form-control"
              onChange={(e) => {
                setBusinessEstimatedPrice(e.target.value);
                setBusinessEstimatedPriceError("");
              }}
              onInvalid={() => {
                if (businessEstimatedPrice) {
                  setBusinessEstimatedPriceError("Price cannot be negative");
                } else {
                  setBusinessEstimatedPriceError("Price is required");
                }
              }}
              required
            />
            {businessEstimatedPriceError && (
              <span className="text-danger">{businessEstimatedPriceError}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="businessFacebookUrl" className="form-label">
              Business Facebook URL: (Optional)
            </label>
            <input
              type="text"
              id="businessFacebookUrl"
              value={businessFacebookUrl}
              className="form-control"
              onChange={(e) => setBusinessFacebookUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="businessYoutubeUrl" className="form-label">
              Business YouTube URL: (Optional)
            </label>
            <input
              type="text"
              id="businessYoutubeUrl"
              value={businessYoutubeUrl}
              className="form-control"
              onChange={(e) => setBusinessYoutubeUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="businessInstagramUrl" className="form-label">
              Business Instagram URL: (Optional)
            </label>
            <input
              type="text"
              id="businessInstagramUrl"
              value={businessInstagramUrl}
              className="form-control"
              onChange={(e) => setBusinessInstagramUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Already Booked Dates:
              <MultiDatesPicker
                multiple
                value={bookedDates}
                onChange={(date) => {
                  setBookedDates(date);
                  setBookedDatesError("");
                }}
                className="form-control"
                placeholder="Select booked dates"
                format="YYYY-MM-DD"
                onInvalid={() => {
                  setBookedDatesError("Booked Dates are required");
                }}
                required
              />
            </label>
          </div>
          {bookedDatesError && (
            <span className="text-danger">{bookedDatesError}</span>
          )}
          <div className="mb-3">
            <label>
              Vendor Type:
              <select
                className="form-select"
                value={vendorType}
                onChange={(e) => {
                  handleVendorTypeChange(e);
                  setVendorTypeError("");
                }}
                onInvalid={() => {
                  setVendorTypeError("Vendor Type is required");
                }}
                required
              >
                <option value="">Select vendor type</option>
                <option value="decorator">Decorator</option>
                <option value="venue">Venue</option>
                <option value="photographer">Photographer</option>
                <option value="music">Music</option>
                <option value="caterer">Caterer</option>
              </select>
            </label>
            <div>
              {vendorTypeError && (
                <span className="text-danger">{vendorTypeError}</span>
              )}
            </div>
          </div>
          {vendorType === "venue" && (
            <div>
              <div className="mb-3">
                <label htmlFor="venuePersonsCapacity" className="form-label">
                  Venue Persons Capacity:
                </label>
                <input
                  type="number"
                  id="venuePersonsCapacity"
                  min="0"
                  value={venuePersonsCapacity}
                  className="form-control"
                  onChange={(e) => {
                    setVenuePersonsCapacity(e.target.value);
                    setVenuePersonsCapacityError("");
                  }}
                  onInvalid={() => {
                    if (venuePersonsCapacity) {
                      setVenuePersonsCapacityError(
                        "Persons Capacity cannot be negative"
                      );
                    } else {
                      setVenuePersonsCapacityError(
                        "Persons Capacity is required"
                      );
                    }
                    setVenuePersonsCapacityError(
                      "Persons Capacity is required"
                    );
                  }}
                  required
                />
                {venuePersonsCapacityError && (
                  <span className="text-danger">
                    {venuePersonsCapacityError}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="venuecoveragearea" className="form-label">
                  Venue Coverage Area: (in Square ft)
                </label>
              </div>
              <input
                type="number"
                id="venuecoveragearea"
                className="form-control"
                min="0"
                value={venueCoverageArea}
                onChange={(e) => {
                  setVenueCoverageArea(e.target.value);
                  setVenueCoverageAreaError("");
                }}
                onInvalid={() => {
                  if (venueCoverageArea) {
                    setVenueCoverageAreaError(
                      "Coverage area cannot be negative"
                    );
                  } else {
                    setVenueCoverageAreaError("Coverage area is required");
                  }
                }}
                required
              />
              {venueCoverageAreaError && (
                <span className="text-danger">{venueCoverageAreaError}</span>
              )}
            </div>
          )}
          <div>
            <h2 className="mt-5 mb-3">Add Your Business Packages (Optional)</h2>
            <div className="mb-3">
              <label htmlFor="silver" className="form-label">
                Silver Package Price: (in PKR)
              </label>
              <input
                type="number"
                id="silver"
                name="silver"
                min="0"
                className="form-control"
                onInvalid={() => {
                  setSilverPackagePriceError("Package Price cannot be negative");
                }}
                onChange={(e) => {
                  setSilverPackagePrice(e.target.value);
                  setSilverPackagePriceError("");
                }}
              />
              {silverPackagePriceError && (
                <span className="text-danger">{silverPackagePriceError}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="silverDescription" className="form-label">
                Silver Package Description: 
              </label>
              <textarea
                type="text"
                rows="3"
                style={{ resize: "none" }}
                id="silverDescription"
                className="form-control"
                onChange={(e) => {
                  setSilverPackageDescription(e.target.value);
                  setSilverPackageDescriptionError("");
                }}
              />
              {silverPackageDescriptionError && (
                <span className="text-danger">{silverPackageDescriptionError}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="gold" className="form-label">
                Gold Package Price: (in PKR)
              </label>
              <input
                type="number"
                id="gold"
                name="gold"
                min="0"
                className="form-control"
                onInvalid={() => {
                  setGoldPackagePriceError("Package price cannot be negative");
                }}
                onChange={(e) => {
                  setGoldPackagePrice(e.target.value);
                  setGoldPackagePriceError("");
                }}
              />
              {goldackagePriceError && (
                <span className="text-danger">{goldackagePriceError}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="goldDescription" className="form-label">
                Gold Package Description: 
              </label>
              <textarea
                type="text"
                rows="3"
                style={{ resize: "none" }}
                id="goldDescription"
                className="form-control"
                onChange={(e) => {
                  setGoldPackageDescription(e.target.value);
                  setGoldPackageDescriptionError("");
                }}
              />
              {goldPackageDescriptionError && (
                <span className="text-danger">{goldPackageDescriptionError}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="platinum" className="form-label">
                Platinum Package Price: (in PKR)
              </label>
              <input
                type="number"
                id="platinum"
                name="platinum"
                min="0"
                className="form-control"
                onInvalid={() => {
                  setPlatinumPackagePriceError("Package price cannot be negative");
                }}
                onChange={(e) => {
                  setPlatinumPackagePrice(e.target.value);
                  setPlatinumPackagePriceError("");
                }}
              />
              {platinumPackagePriceError && (
                <span className="text-danger">{platinumPackagePriceError}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="platinumDescription" className="form-label">
                Platinum Package Description: 
              </label>
              <textarea
                type="text"
                rows="3"
                style={{ resize: "none" }}
                id="platinumDescription"
                className="form-control"
                onChange={(e) => {
                  setPlatinumPackageDescription(e.target.value);
                  setPlatinumPackageDescriptionError("");
                }}
              />
              {platinumPackageDescriptionError && (
                <span className="text-danger">{platinumPackageDescriptionError}</span>
              )}
            </div>
          </div>
          <MyImagePickerAlbum
            showAlert={props.showAlert}
            setAlbums={setAlbums}
            albums={albums}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            albumImages={albumImages}
            setAlbumImages={setAlbumImages}
          />
          <div className="text-center">
            {!loading ? (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            ) : (
              <h5>Uploading...</h5>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBusiness;
