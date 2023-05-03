import React from 'react'
import pic from "../../img/vendor-layout.png";
import CardOverlay from '../../components/CardOverlay';
const VendorPage1 = () => {
  return (
    <div className="background-vendor-cards-overlay">
    <div className="card text-bg-dark rounded-0">
      <img
        src={pic}
        className="card-img"
        style={{ height: "30vh", objectFit: "cover" }}
        alt="..."
      />
      <div className="card-img-overlay">
        <h1 className="card-title ms-5 mt-5">Vendors</h1>
        <p className="card-text ms-5">Select any vendor from the categories below</p>
      </div>
    </div>
    <div className='d-flex flex-wrap'>
    <div className='my-3 w-25 mx-5'>
      <CardOverlay title="Photographers" vendorType="photographer" imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories%2Fmedium%2Fu_1636922726681"/>
      </div>
      <div className='my-3 w-25 mx-5'>
      <CardOverlay title="Venues" vendorType="venue" imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories/venue.jpg"/>
      </div>
      <div className='my-3 w-25 mx-5'>
      <CardOverlay title="Decorators" vendorType="decorator" imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories%2Fmedium%2Fu_1629362006361"/>
      </div>
      <div className='my-3 w-25 mx-5'>
      <CardOverlay title="Caterers" vendorType="caterer" imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories%2Fmedium%2Fu_1629363594624"/>
      </div>
      <div className='my-3 w-25 mx-5'>
      <CardOverlay title="Music" vendorType="music" imageUrl="https://theceremonio.blob.core.windows.net/theceremonio-container/categories%2Fmedium%2Fu_1632909619435"/>
      </div>
    </div>
   
    </div>
  )
}

export default VendorPage1
