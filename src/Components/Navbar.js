import React from 'react'
import './Navbar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'


const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = (e) => {
      e.preventDefault();
      if (window.confirm('Are you sure you want to logout?')) {
        Cookies.remove("jwtAuth");
        navigate("/login");
      }
    };
  
    const toggleOptions = () => {
      setShowOptions(!showOptions);
    };


// const Navbar = () => {
//     const [darkMode, setDarkMode] = useState(false);   
//     const [showOptions, setShowOptions] = useState(false);

//     const toggleDarkMode = () => {
//         setDarkMode(!darkMode);
//         // Update background color of the body
//         document.body.style.backgroundColor = darkMode ? '#FFFFFF' : '#000000';
//          document.body.style.color = darkMode ? '#000000' : '#FFFFFF';
//     };
//     const navigate = useNavigate()
//     const handleLogout = (e) => {
//         e.preventDefault();
//         Cookies.remove("jwtAuth");
//         navigate("/login");
//         alert('Are you sure you want to logout?');
        
//     }
//     const toggleOptions = () => {
//         setShowOptions(!showOptions);
//     };
    
  return (
    // <div>

    //     <nav class="navbar">
    //         <div className='company d-flex'>
    //             <div className='company_logo'> 
    //                 <img src='../images/download.jpg' alt="Logo" width="160px" height="70px" className="my-logo"/>
    //             </div>
    //             <div className='company_name pt-0 pl-0'>
    //                 <h3 className='logohead'><i class="ri-youtube-line"></i> Watch</h3>
    //             </div>
    //         </div>
    //         <div className="symbols-button-card">
    //             <div className='dark-mode-image'>
    //             {/* <i class="ri-sun-line"></i> */}
    //             <i className={`ri-sun-line icon ${darkMode ? 'hidden' : ''}`} onClick={toggleDarkMode}></i>
    //             <i class="ri-user-3-fill"></i>
            
    //             <button onClick={handleLogout}>Logout <i class="ri-logout-circle-r-line"></i></button>
                
    //             </div>
               
    // </div>
            
    //     </nav>
    // </div>

    // <nav className="navbar navbar-expand-lg navbar-light">
    <nav
      className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark' : 'navbar-light'}`}
      style={{ backgroundColor: darkMode ? '#424242' : 'white' }}
    >
            {/* <a className="navbar-brand" href="#">Navbar</a> */}
            <div> 
                 {/* <img src='/images/nxt-watch-logo-light-theme-img.png' alt="Logo" width="200px"  className="my-logo"/> */}
                 <div className='company d-flex'>
              <div className='company_logo'> 
                   <img src={darkMode ? '../images/nxt-watch-logo-dark-theme-img.png' : '../images/nxt-watch-logo-light-theme-img.png'} 
              alt="Logo" 
              width="160px" 
              height="50px" 
              className="my-logo"/>
                 </div>
                 
             </div>
            </div>
            <button className="navbar-toggler" type="button" onClick={toggleOptions}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${showOptions ? 'show' : ''}`}>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="nav-link " onClick={toggleDarkMode}>
                            <i className={`ri-sun-line ${darkMode ? 'text-white' : 'd-none'}`} style={{ fontSize: "25px" }}></i>
                            <i className={`ri-moon-line ${darkMode ? 'd-none' : ''}`} style={{ fontSize: "25px" }}></i>
                        </div>
                    </li>
                    <li className="nav-item mt-2 pl-2 pr-3">
                    {/* <i class="ri-user-3-fill"></i> */}
                    <img src='../images/passphoto.jpeg' style={{height:"40px",width:"40px",borderRadius:"70px"}}></img>
                    </li>
                    <li className="nav-item mt-2">
                    <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>

   
  )

}
export default Navbar
