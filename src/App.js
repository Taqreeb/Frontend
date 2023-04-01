import "./App.css";
import React from 'react';
import {Routes,Route,Navbar,PageNotFound,Home,Contact,Signup,Login} from './imports'
import 'bootstrap/dist/css/bootstrap.css'
import "@fontsource/public-sans"; 
import Photgrapher from "./pages/vendors/Photgrapher";
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
        <Route exact path="/vendors/photographer" element={<Photgrapher />} />   
      </Routes>
    </>
  );
}

export default App;
