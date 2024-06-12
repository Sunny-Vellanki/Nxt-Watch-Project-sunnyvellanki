import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import "./Signup.css"

import {useNavigate } from 'react-router-dom'
import allapilist from '../apilist/allapilist';
const Signupdetails = () => {
  const [formData, setFormData] = useState({
    UserName: "",
    confirmpassword: "",
    email: "",
    password: "",
    
  });
  const navigate = useNavigate()
  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData)

  //  Submit the form data to the server
  const submitForm = (event) => {
    event.preventDefault();
    //fetch takes two parameters 1. api, 2. object which contains additional config
    fetch(
     "http://localhost:4545/signup"
      // allapilist.signup
      , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) =>response.json())
      .then((data) =>  {
        console.log(data);
        
        setTimeout(() => {
          navigate("/")
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .post("http://localhost:4444/signup", formData)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    
    
  };

  

  return (
<>  

<div class="containers">
    <img src='./images/nxt-watch-logo-light-theme-img.png' alt="Logo"  height="50px" style={{marginLeft:"120px"}} className="my-logo"/>
    <form id="registration-form" onSubmit={submitForm}>
        <div class="form-group">
            <label for="firstName">UserName</label>
            <input type="text" id="UserName" name="UserName" value={formData.UserName} onChange={handleFormData} required/>
            <i class="fas fa-user"></i>
        </div>
        
        
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleFormData}  required/>
            <i class="fas fa-envelope"></i>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleFormData} required/>
            <i class="fas fa-lock"></i>
        </div>
        <div class="form-group">
            <label for="confirmpassword">Confirm Password</label>
            <input type="password" id="confirmpassword" name="confirmpassword" value={formData.confirmpassword} onChange={handleFormData} required/>
            <i class="fas fa-lock"></i>
        </div>
        
        <Link to={'/login'}>
        <p>Already have an account ?<spam> Login here</spam></p>
        </Link>
        <div class="form-group">
            <input type="submit" value="Submit"/>
        </div>
    </form>
</div>
</> 
  );
}

export default Signupdetails;