import { useEffect, useState, Fragment } from "react";
import { useParams, NavLink} from "react-router-dom";
import axios from "axios";
import success from "../img/success.png";
import { API_URL } from "../utils/apiUrl";



const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

    

	useEffect(() => {
        
		const verifyEmailUrl = async () => {
			try {
                const data = await axios.get(
                    `${API_URL}/auth/${param.id}/verify/${param.token}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
				console.log(data);
				setValidUrl(true);
			} catch (error) {
                setValidUrl(false);
				if (error.response) {
                    console.log(error.response);
                  } else if (error.request) {
                    console.log("network error");
                  } else {
                    console.log(error);
                  }
				
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div className="verifyEmailContainer">
					<img src={success} alt="success_img" />
					<h1>Email verified successfully</h1>
					<NavLink to="/login">
						<button className="verifyEmailSuccessBtn">Login</button>
					</NavLink>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;