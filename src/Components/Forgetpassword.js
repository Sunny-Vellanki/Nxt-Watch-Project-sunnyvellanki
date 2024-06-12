import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    return true;
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    fetch(
      "http://localhost:4545/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage("");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  return (
    <>  
      <div className="containers">
        <img src='./images/nxt-watch-logo-light-theme-img.png' alt="Logo" height="50px" style={{ marginLeft: "120px" }} className="my-logo"/>
        <form id="forgot-password-form" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="email">Registered Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleFormData} required />
            <i className="fas fa-envelope"></i>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleFormData} required />
            <i className="fas fa-lock"></i>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleFormData} required />
            <i className="fas fa-lock"></i>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <input type="submit" value="Update Password" />
          </div>
        </form>
      </div>
    </> 
  );
}

export default Forgetpassword;