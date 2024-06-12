import React from 'react';


const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src="../images/nxt-watch-not-found-light-theme-img.png" alt="No Such URL" style={{height:"500px",marginLeft:"400px"}} />
      <h1 style={{marginLeft:"550px"}}>Page Not Found</h1>
      <p style={{marginLeft:"550px"}}>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;