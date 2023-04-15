import "./App.css";
import React from 'react';
import {Routes,Route,Navbar,PageNotFound,Home,Contact,Signup,Login} from './imports'
import 'bootstrap/dist/css/bootstrap.css'
import "@fontsource/public-sans"; 
import ScrollToTop from "./components/ScrollToTop";
import VendorDetails from "./pages/vendors-userside/VendorDetails";
import AlbumDetails from "./pages/vendors-userside/AlbumDetails";
import VendorPage2 from "./pages/vendors-userside/VendorPage2";
import VendorPage1 from "./pages/vendors-userside/VendorPage1";
import ProfilePage from "./pages/ProfilePage";
import AddBusiness from "./pages/vendor-side/AddBusiness/AddBusiness";
import ViewBusiness from "./pages/vendor-side/ViewBusiness";
import EditBusiness from "./pages/vendor-side/EditBusiness";

function App() {
  return (
    <>
    <div className="overflow-x-hidden overflow-y-hidden">
      <Navbar title="Taqreeb"/>
      <Routes>
        <Route exact path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home/>} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/category" element={<VendorPage1/>} />  
        <Route exact path="/category/:vendorType" element={<VendorPage2/>} />   
        <Route exact path="/category/:vendorType/:vendorName/:vendorId" element={<VendorDetails/>} />
        <Route exact path="/category/:vendorType/:vendorName/:vendorId/:albumName" element={<AlbumDetails/>} />
        <Route exact path="/vendor/addbusiness" element={<AddBusiness/>} />  
        <Route exact path="/vendor/viewbusiness" element={<ViewBusiness/>} />  
        <Route exact path="/vendor/viewbusiness/edit" element={<EditBusiness/>} />  
      </Routes>
      <ScrollToTop/>
    </div>
    </>
  );
}

export default App;
