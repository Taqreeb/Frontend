import React from 'react'

const NoLogin = ({role}) => {
  return (
  
    <div className="text-center" style={{marginTop:"30vh"}} >    
       <h1>Sorry You are not authorized to access this page</h1>  
      {role?<p>{`Please Login as a ${role} to view the requested page`}</p>:
      <p>Please Login to view the requested page</p>}
    </div>
  )
}

export default NoLogin
