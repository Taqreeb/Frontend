import "./App.css";
import React from 'react';
import {Routes,Route,Navbar,PageNotFound,Home,About,Contact,SignupUser,Login, SignupVendor} from './imports'
import 'bootstrap/dist/css/bootstrap.css'
import "@fontsource/public-sans"; 
function App() {
  return (
    <>
      <Navbar title="Taqreeb"/>
      <Routes>
        <Route exact path="*" element={<PageNotFound />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/signupvendor" element={<SignupVendor />} />
        <Route exact path="/signupuser" element={<SignupUser />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
