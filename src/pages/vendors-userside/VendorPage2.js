import React, { useEffect, useState } from "react";
import CategoryLayout from "../../components/CategoryLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import { API_URL } from "../../utils/apiUrl";

const VendorPage2 = () => {
  const [loading, setLoading] = useState(false);
  const [businesses, SetBusinesses] = useState([]);
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
  const { vendorType } = useParams();

  const business = businesses.filter(
    (vendor) => vendor.business_type === vendorType
  );

  return (
    <>
    {!loading?<CategoryLayout
      vendorType={vendorType}
      description={`Select any ${vendorType} without any hassle.`}
      business={business}
    />:<LoadingScreen/>}
    </>
  );
};

export default VendorPage2;
