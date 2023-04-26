import React, { useState } from "react";
import MultiDatesPicker from "react-multi-date-picker";
import MyImagePickerAlbum from "../../components/ImagePickers/MyImagePickerAlbum";
import axios from "axios";
import { karachiAreas } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const AddBusiness = (props) => {
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
  const [goldPackagePrice, setGoldPackagePrice] = useState();
  const [platinumPackagePrice, setPlatinumPackagePrice] = useState();
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
  const [silverPackageError, setSilverPackageError] = useState("");
  const [goldackageError, setGoldPackageError] = useState("");
  const [platinumPackageError, setPlatinumPackageError] = useState("");

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
    setLoading(true);
    e.preventDefault();
    if (albumImages.length > 0 || name || description) {
      return props.showAlert(
        "Please upload the album by filling all fields or empty the Album fields before submitting",
        "danger"
      );
    }
    const dates = bookedDates.toString().split(",");
    const businessPackages = [];
    if (silverPackagePrice) {
      businessPackages.push({
        name: "Silver Package",
        price: silverPackagePrice,
      });
    }
    if (goldPackagePrice) {
      businessPackages.push({ name: "Gold Package", price: goldPackagePrice });
    }
    if (platinumPackagePrice) {
      businessPackages.push({
        name: "Platinum Package",
        price: platinumPackagePrice,
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/vendor/addbusiness",
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

      console.log(response.data);
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
                setLocationError("Vendor Type is required");
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
            type="Number"
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
                type="Number"
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
                  setVenuePersonsCapacityError("Persons Capacity is required");
                }}
                required
              />
              {venuePersonsCapacityError && (
                <span className="text-danger">{venuePersonsCapacityError}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="venuecoveragearea" className="form-label">
                Venue Coverage Area: (in Square ft)
              </label>
            </div>
            <input
              type="Number"
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
                  setVenueCoverageAreaError("Coverage area cannot be negative");
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
              type="Number"
              id="silver"
              name="silver"
              min="0"
              className="form-control"
              onInvalid={() => {
                setSilverPackageError("Package Price cannot be negative");
              }}
              onChange={(e) => {
                setSilverPackagePrice(e.target.value);
                setSilverPackageError("");
              }}
            />
            {silverPackageError && (
              <span className="text-danger">{silverPackageError}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="gold" className="form-label">
              Gold Package Price: (in PKR)
            </label>
            <input
              type="Number"
              id="gold"
              name="gold"
              min="0"
              className="form-control"
              onInvalid={() => {
                setGoldPackageError("Package price cannot be negative");
              }}
              onChange={(e) => {
                setGoldPackagePrice(e.target.value);
                setGoldPackageError("");
              }}
            />
            {goldackageError && (
              <span className="text-danger">{goldackageError}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="platinum" className="form-label">
              Platinum Package Price: (in PKR)
            </label>
            <input
              type="Number"
              id="platinum"
              name="platinum"
              min="0"
              className="form-control"
              onInvalid={() => {
                setPlatinumPackageError("Package price cannot be negative");
              }}
              onChange={(e) => {
                setPlatinumPackagePrice(e.target.value);
                setPlatinumPackageError("");
              }}
            />
            {platinumPackageError && (
              <span className="text-danger">{platinumPackageError}</span>
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
