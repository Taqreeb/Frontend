import React from "react";
import VendorLayout from "../../components/VendorLayout";
import pic from "../../img/vendor-layout.png";
import { vendors } from "../../components/constants";
import { useParams } from "react-router-dom";

const Vendor = () => {
  const { vendorType } = useParams();

  const vendor = vendors.filter((vendor) => vendor.vendorType === vendorType);

  return (
    <VendorLayout
      pic={pic}
      vendorType={vendorType}
      description={`Select any ${vendorType} without any hassle.`}
      vendorCards={vendor}
    />
  );
};

export default Vendor;
