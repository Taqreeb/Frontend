import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navbar,
  PageNotFound,
  Home,
  Contact,
  Signup,
  Login,
  useNavigate,
} from "./imports";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/public-sans";
import ScrollToTop from "./components/ScrollToTop";
import VendorDetails from "./pages/vendors-userside/VendorDetails";
import AlbumDetails from "./pages/vendors-userside/AlbumDetails";
import VendorPage2 from "./pages/vendors-userside/VendorPage2";
import VendorPage1 from "./pages/vendors-userside/VendorPage1";
import ProfilePage from "./pages/ProfilePage";
import AddBusiness from "./pages/vendor-side/AddBusiness";
import ViewBusiness from "./pages/vendor-side/ViewBusiness";
import EditBusiness from "./pages/vendor-side/EditBusiness";
import Alert from "./components/Alert";
import NoLogin from "./pages/NoLogin";
import BusinessDetails from "./pages/vendor-side/BusinessDetails";
import BusinessApprovals from "./pages/admin-side/BusinessApprovals";

function App() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  function checkTokenExpiration() {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      return;
    }

    const { exp } = JSON.parse(window.atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    if (now >= exp) {
      localStorage.clear();
      navigate("/");
      showAlert("Logged out because Json Web Token expired", "danger");
    }
  }

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const isLogin = localStorage.getItem("isLogin") === "true";
  return (
    <>
      <div className="overflow-x-hidden overflow-y-hidden">
        <Navbar title="Taqreeb" showAlert={showAlert} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route
            exact
            path="/contact"
            element={<Contact showAlert={showAlert} />}
          />
          <Route
            exact
            path="/profile"
            element={
              isLogin ? <ProfilePage showAlert={showAlert} /> : <NoLogin />
            }
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route exact path="/category" element={<VendorPage1 />} />
          <Route exact path="/category/:vendorType" element={<VendorPage2 />} />
          <Route
            exact
            path="/category/:vendorType/:vendorName/:vendorId/:businessId"
            element={<VendorDetails showAlert={showAlert} />}
          />
          <Route
            exact
            path="/category/:vendorType/:vendorName/:vendorId/:albumName/:albumId"
            element={<AlbumDetails />}
          />
          
          {/* Vendor Side */}
          <Route
            exact
            path="/vendor/addbusiness"
            element={<AddBusiness showAlert={showAlert} />}
          />
          <Route
            exact
            path="/vendor/viewbusiness"
            element={<ViewBusiness showAlert={showAlert} />}
          />
          <Route
            exact
            path="/vendor/viewbusiness/edit"
            element={<EditBusiness />}
          />
          <Route
            exact
            path="/businessdetails/:vendorType/:vendorName/:vendorId/:businessId"
            element={<BusinessDetails />}
          />
          
          {/* Admin Side */}
          <Route
            exact
            path="/admin/businessapprovals"
            element={<BusinessApprovals showAlert={showAlert}/>}
          />
        </Routes>
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
