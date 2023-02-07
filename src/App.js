import "./App.css";
import React from 'react';
import {Routes,Route,Navbar,PageNotFound,Home,About,Contact,Signup,Login} from './imports'
 
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
