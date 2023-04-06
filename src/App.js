import "./App.css";
import React from 'react';
import {Routes,Route,Navbar,PageNotFound,Home,Contact,Signup,Login} from './imports'
import 'bootstrap/dist/css/bootstrap.css'
import "@fontsource/public-sans"; 
import Vendor from "./pages/vendors/Vendor";
import ScrollToTop from "./components/ScrollToTop";
import VendorProfile from "./pages/vendors/VendorProfile";
function App() {
  return (
    <>
      <Navbar title="Taqreeb"/>
      <Routes>
        <Route exact path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home/>} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/vendor/:vendorType" element={<Vendor/>} />   
        <Route exact path="/vendor/:vendorType/:vendorName/:vendorId" element={<VendorProfile/>} />
      </Routes>
      <ScrollToTop/>
    </>
  );
}

export default App;
