import React from 'react'
import 'remixicon/fonts/remixicon.css'
import './Sidebar.css'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from 'react';



const Sidebar = () => {
    // sidebar
  const navigate = useNavigate();
  

  
  
  

  return (
    <div>

<section className="sidebar_component">

<div className="container-fluid pt-2 pl-0" >

<div className='sidebar_content'>
<NavLink exact to={"/"}>
<p className='sidebar_bgchange'>

<i class="ri-home-3-fill pr-3"></i> Home

</p>
</NavLink>
</div>

<div className='sidebar_content'>
<NavLink exact to={"/trending"}>
                {" "}
<p className='sidebar_bgchange'>

<i class="ri-fire-fill pr-3"></i> Trending

</p>
</NavLink>

</div>

<div className='sidebar_content'>
<NavLink exact to={"/gaming"}>
                {" "}
<p className='sidebar_bgchange'>

                <i class="ri-gamepad-fill pr-3"></i> Gaming

</p>
</NavLink>
    </div>
    <div className='sidebar_content'>
    <NavLink exact to={"/saved-videos"}>
                {" "}
    <p className='sidebar_bgchange'>
    
<i class="ri-save-fill pr-3"></i> Saved

</p>
</NavLink>
</div>
<div className=' sidebar_content'>
    <NavLink exact to={"/liked"}>
                {" "}
    <p className='sidebar_bgchange'>
    

    < i class="ri-thumb-up-fill pr-3"></i> Liked

</p>
</NavLink>
</div>

<div className='Down_header'>
    <p>CONTACT US</p>
        <div>
            <img src='../images/nxt-watch-facebook-logo-img.png' style={{width:"40px"}}></img>
            <img src='../images/nxt-watch-twitter-logo-img.png' style={{width:"40px",marginLeft:"15px",marginRight:"15px"}}></img>
            <img src='../images/nxt-watch-linked-in-logo-img.png' style={{width:"40px"}}></img>
            
        </div>
        
        <p style={{marginTop:"15px"}}>Enjoy! Now to see your<br />channels and<br />recommendations!</p>
    </div>
    
    </div>
    
    </section>
    
    {/* <section className="sidebar_component">

<div className="container-fluid pt-5 pl-5">
    <u><h3>Contact</h3></u>
    <h3><i class="ri-mail-add-fill"> <span style={{fontSize:"20px"}}><a href='https://mail.google.com/mail/u/0/#inbox?compose=new'>E-mail</a></span></i></h3>
    
    </div>
    <div className="container-fluid  pl-5">
    <h3><i class="ri-customer-service-line"> <span style={{fontSize:"20px"}}><a href=''>Cust-Service</a></span></i></h3>
    
    </div>
    <div className="container-fluid  pl-5">
    <h3><i class="ri-robot-2-line"> <span style={{fontSize:"20px"}}><a href=''>Chat-Bot</a></span></i></h3>
    
    </div>
    
    </section> */}


      
    </div>

  )
}

export default Sidebar
