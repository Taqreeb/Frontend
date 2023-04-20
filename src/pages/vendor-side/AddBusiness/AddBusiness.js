import React from 'react'
import BusinessPage1 from './BusinessPage1'
import BusinessPage2 from './BusinessPage2'





const AddBusiness = (props) => {
  return (
    <div>
         <BusinessPage1 />
         <BusinessPage2 showAlert={props.showAlert}/>
    </div>
  )
}

export default AddBusiness
