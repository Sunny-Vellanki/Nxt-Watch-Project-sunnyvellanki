import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from 'js-cookie';

//import Cookies from "cookie";
import {useNavigate} from 'react-router-dom'
import allapilist from '../apilist/allapilist';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);
  const navigate = useNavigate()
  const token = Cookies.get("jwtAuth");
  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    }
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4545/login"
        // allapilist.login
        , {
        email,
        password,
      });
      const data = response.data;
      console.log(data);
      Cookies.set('jwtAuth', data.token);

      // sessionStorage.setItem("jwtToken" , data.token)
      // Cookies.set("jwtToken", data.token, { expires: 1 });
      
      setTimeout(() => {
        navigate("/")
      }, 1500);

    } catch (error) {
      console.log(error);
     
    }
  };
  return (
    <>
    
    {/* <div id='bdl'>
    <div className="form-container" id='fcl'>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}> */}
      <div class="containers">
      <img src='./images/nxt-watch-logo-light-theme-img.png' alt="Logo"  height="50px" style={{marginLeft:"120px"}} className="my-logo"/>
      
    <form id="registration-form" onSubmit={handleLogin}>
        
{/*       
        <label id='lb'><i class="fas fa-envelope"></i> E-mail:</label>
        <input type="email" name="email"placeholder='Enter E-mail........'onChange={(e) => setEmail(e.target.value)} required /> */}
        <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
            <i class="fas fa-envelope"></i>
        </div>
        
        {/* <label id='lb'><i class="fas fa-lock"></i> Password:</label>
        <input type="password" name="password"placeholder='Enter Password........' onChange={(e) => setPassword(e.target.value)} required /> */}
        <div class="form-group">
            <label for="password">Password :</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
            <i class="fas fa-lock"></i>
        </div >
        <Link to={'/forgotpassword'}>
          
        <p style={{marginLeft:"340px"}}>Forgot Password</p>
        </Link>
        <Link to={'/signup'}>
          
        <p>Don't have account ?<spam> Register here</spam></p>
        </Link>
        {/* <button type="submit" >Login</button> */}
        <div class="form-group">
            <input type="submit" value="Submit"/>
        </div>
      </form>


    
        



    </div>
    </>
  );
}

export default Login;