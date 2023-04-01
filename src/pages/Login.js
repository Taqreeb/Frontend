import React,{useState} from "react";
import "../styles.css";
import {FaGoogle,FaEye,FaEyeSlash } from "react-icons/fa";
import { NavLink} from "react-router-dom";
const eye = <FaEye/>
const eyeSlash = <FaEyeSlash/>

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeShown, seteyeShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = event => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleRememberMeChange = event => {
    setRememberMe(event.target.checked);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    if (event.target.value.trim().length > 0) {
      seteyeShown(true);
      
    } else {
      seteyeShown(false);
      setPasswordShown(false);
    }
  };
  const togglePasswordVisiblity = () => {
    console.log("togglePasswordeventtriggered");
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login button clicked")

    // Email validation
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }

    // If there are no errors, submit the form
    if (!emailError && !passwordError) {
      console.log("successful");
      // axios.post("/api/login", { email, password, rememberMe })
      // .then((response) => {
      //   console.log(response.data);
      //   if (response.data.token) {
      //     // authentication successful, store the token in local storage or cookies
      //     localStorage.setItem('token', response.data.token);

      //     // redirect to the dashboard or the desired page
      //     const navigate = useNavigate();
      //     navigate('/');
      //   }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
  };
  
  
 

//   useEffect(() => {
//     const keyPressHandler = (event) => {

// };
//     document.addEventListener('keydown', keyPressHandler);

//     return () => {
//       document.removeEventListener('keydown', keyPressHandler);
//     };
//   }, []);

   

 



  return (
    <div className="background-login-signup d-flex align-items-center">
      <div
        className="mx-auto card rounded-4 mt-4 px-5 py-4"
        style={{width:"40vw"}}
      >
        <h4 className="text-start font fontweight-700">Login</h4>
        <p>Welcome to Login</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
              id="email"
              aria-describedby="emailHelp"  
              value={email}
              onChange={handleEmailChange}
              onBlur={(e) => {
                if (e.target.value.length===0) {
                  setEmailError("Email is required");
                } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                  setEmailError("Email is invalid");
                } else {
                  setEmailError("");
                }
              }}
              required
            /> 
             {emailError && <span className="position-absolute text-danger">{emailError}</span>} 
          </div>
          <NavLink
            to="/"
            className="text-decoration-none text float-end opacity-75 font fontweight-700">
            Forgot Password?
          </NavLink>
          <div className="mb-3 ">
            <input
              name="current-password"
              autoComplete="current-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Password"            
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => {
                if (!password) {
                  setPasswordError("Password is required");
                } else if (password.length < 8) {
                  setPasswordError("Password must be at least 8 characters");
                } else {
                  setPasswordError("");
                }
              }}
              type={passwordShown ? "text" : "password"}
              className="form-control shadow-none my-2 text-black border-top-0 border-end-0 border-start-0 border-dark black rounded-0 font fontweight-400"
              id="password"
              required
            />      
            <i id="eye-icon-login-password" className="opacity-75"onClick={togglePasswordVisiblity}>{eyeShown? passwordShown? eye:eyeSlash:null }</i>
          </div>
          {passwordError && <span className="position-absolute text-danger">{passwordError}</span>}
          <div className="my-4 form-check ">
            <input
              type="checkbox"
              className="form-check-input shadow-none rounded-0 " 
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
             <label className="form-check-label opacity-75 font fontweight-400" htmlFor="rememberMe">
              Remember me
            </label>     
          </div>     
          <button
            type="submit"
            className="btn btn-primary rounded-4 bg-black border-0 my-2 w-100 font fontweight-600"
            onClick={handleSubmit}
          >
            Login
          </button>   
          
          <p className="text-secondary text-center mt-2 opacity-75 font fontweight-500">Or Login with</p>
          <button
            type="button"
            className="btn btn-outline w-100 my-2 rounded-4 font fontweight-400"
          >
            <FaGoogle
          
              style={{
                color: "black",
                marginRight: "13px",
                alignItems: "center",
                fontSize: "1.2rem",
                fontFamily:'Public Sans',
                fontWeight:'400'
              }}
            />
            Continue with Google
          </button>
        </form>
        <p className="float-end mt-2 mx-auto text-dark font fontweight-500">New to Taqreeb? <NavLink
            to="/signup"
            className="text-decoration-none text opacity-75 font fontweight-700">
            Create an account
          </NavLink> </p>
         
      
      </div>
    </div>
  );
};

export default Login;
