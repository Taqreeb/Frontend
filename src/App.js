import "./App.css";
import React, { useState } from "react";
import {
  Routes,
  Route,
  Navbar,
  PageNotFound,
  Home,
  Contact,
  Signup,
  Login,
} from "./imports";
import "bootstrap/dist/css/bootstrap.css";
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
import Alert from "./components/Alert";
import NoLogin from "./pages/NoLogin";
import BusinessDetails from "./pages/vendor-side/BusinessDetails";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const isLogin = localStorage.getItem('isLogin')==="true"
  // const role = localStorage.getItem('role')
  return (
    <>
      <div className="overflow-x-hidden overflow-y-hidden">
        <Navbar title="Taqreeb" showAlert={showAlert} />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact showAlert={showAlert}/>} />
          <Route exact path="/profile" element={isLogin?<ProfilePage showAlert={showAlert} />:<NoLogin/>} />
          <Route exact path="/signup" element={<Signup  showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/category" element={<VendorPage1 />} />
          <Route exact path="/category/:vendorType" element={<VendorPage2 />} />
          <Route
            exact
            path="/category/:vendorType/:vendorName/:vendorId"
            element={<VendorDetails />}
          />
          <Route
            exact
            path="/category/:vendorType/:vendorName/:vendorId/:albumName"
            element={<AlbumDetails />}
          />
          <Route exact path="/vendor/addbusiness" element={<AddBusiness showAlert={showAlert} />} />
          <Route exact path="/vendor/viewbusiness" element={<ViewBusiness />} />
          <Route
            exact
            path="/vendor/viewbusiness/edit"
            element={<EditBusiness />}
          />
           <Route
            exact
            path="/businessdetails/:vendorType/:vendorName/:vendorId"
            element={<BusinessDetails/>}
          />
        </Routes>
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
