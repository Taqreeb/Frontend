import React,{ useEffect, useState} from 'react'
import BusinessLayout from '../../components/BusinessLayout'
import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
import LoadingScreen from '../../components/LoadingScreen';
const ViewBusiness = ({showAlert}) => {
  const [business,setBusiness ] = useState([]);
  const [deletedBusiness,setDeletedBusiness] = useState(false);
  const [loading,setLoading ] = useState(false);
  const authtoken = localStorage.getItem('authtoken')

  const getVendorBusiness = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/vendor/businesses`,
        {
          headers: {
            "Content-Type": "application/json",
            'auth-token': authtoken
          },
        }
      );
      if (response.data.success) {
        setBusiness(response.data.business);
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };
  useEffect(()=>{
   getVendorBusiness();
  },[deletedBusiness])
  return (
    <>
    {!loading?<div>
       <BusinessLayout business={business} showAlert={showAlert} setDeletedBusiness={setDeletedBusiness}/>
    </div>: <LoadingScreen/>}
    </>
  )
}

export default ViewBusiness
