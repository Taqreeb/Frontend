import React from "react";

const Alert = (props) => {
  let alertType="";
  if(props.alert){
  if(props.alert.type==="danger"){
    alertType="Warning"
  }
  else{
    alertType="Success"
  }
}

  return (
    <div className="alertmessage">
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alertType}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
