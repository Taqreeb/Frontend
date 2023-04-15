import React from "react";
import CategoryLayout from "../../components/CategoryLayout";
import { vendors } from "../../utils/constants";
import { useParams } from "react-router-dom";

const VendorPage2 = () => {
  const { vendorType } = useParams();

  const vendor = vendors.filter((vendor) => vendor.vendor_type === vendorType);

  return (
    <CategoryLayout
      vendorType={vendorType}
      description={`Select any ${vendorType} without any hassle.`}
      vendorCards={vendor}
    />
  );
};

export default VendorPage2;
