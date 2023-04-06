import React from 'react'
import { useLocation } from 'react-router-dom'

const VendorProfile = () => {
  
  const location = useLocation();
  
 const card=location.state.cards;
 
  return (
    <div>   
    <div className='background-top-specific-vendor'>
    </div>
    <div className='background-body-specific-vendor'>
      
    
    </div>   
    </div>
  )
}

export default VendorProfile
