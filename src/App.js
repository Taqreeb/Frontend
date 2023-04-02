import "./App.css";
import React from 'react';
import {Routes,Route,Navbar,PageNotFound,Home,Contact,Signup,Login} from './imports'
import 'bootstrap/dist/css/bootstrap.css'
import "@fontsource/public-sans"; 
import Photographer from "./pages/vendors/Photographer";
import ScrollToTop from "./components/ScrollToTop";
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
        <Route exact path="/vendors/photographer" element={<Photographer />} />   
      </Routes>
      <ScrollToTop/>
    </>
  );
}

export default App;
