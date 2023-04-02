import React, { useState } from 'react'
import VendorCard from './VendorCard';
import Pagination from './Pagination';

const VendorLayout = ({title,recordsPerPage,vendorCards,vendorType}) => {
 const [currentRecords,setCurrentRecords] = useState([]);
  
 const sendRecords = (records) => {
      setCurrentRecords(records)
    }
  return (
    <div>
       <div className="overflow-x-hidden">
      <h1 className="mx-5 mt-5">{title}</h1>
      <div className="row">
        <div className="col-3">
          <div
            className="card mx-5 my-5"
            style={{ width: "300px", height: "800px" }}
          >
            Advanced filtering
          </div>
        </div>
        <div className="col my-5">
          <VendorCard cards={currentRecords} vendorType={vendorType}/>
          <Pagination
            cards={vendorCards}
            setRecords={sendRecords}
            recordsPerPage = {recordsPerPage}
          />
          
        </div>
      </div>
     
    </div>
    </div>
  )
}

export default VendorLayout
