import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from '../imports'

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Taqreeb</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item"> 
          <NavLink className="nav-link active" to="/about">About Us</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="/event" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Events
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to="/signup">Action</NavLink></li>
            <li><NavLink className="dropdown-item" to="/signup">Another action</NavLink></li>
            <li><hr className="dropdown-divider"/></li>
            <li><NavLink className="dropdown-item" to="/signup">Something else here</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" to="/login" >Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" to="/signup" >Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" to="/contact" >Contact Us</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar