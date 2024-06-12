import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import allapilist from "../apilist/allapilist";

const GamingVideos = () => {
  const [gamingVideos, setGamingVideos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const getGamingVideos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4545/gamingvideos"
        // allapilist.gamingvideos
    );
      setGamingVideos(response.data.gamingVideos);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#FFFFFF' : '#000000';
    document.body.style.color = darkMode ? '#000000' : '#FFFFFF';
  };
  useEffect(() => {
    getGamingVideos();
  }, []);

  console.log(gamingVideos);

  return (
    <div>
      <section>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      </section>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar darkMode={darkMode}/>
            </div>

            <div className="col-md-9">
              <div className="container-fluid">
              <div style={{marginTop:"80px",backgroundColor:darkMode ? 'white' : 'black',color:darkMode ? 'black' : 'white',padding:"10px",borderRadius:"5px",fontSize:"20px"}}><i class="ri-gamepad-fill pr-3"></i> Gaming Videos</div>
                <div className="row">
                  {gamingVideos.map((video) => (
                    // <div className="col-md-4 my-3">
                    //   <Link to={`/video/${video._id}`}>
                    //     <div className="thumbnail_image">
                    //       <img src={video.thumbnail_url} />
                    //     </div>

                    //     <div className="home_thumbnail_title">
                    //       <h6 className="my-3">{video.title}</h6>
                    //     </div>

                    //     <div className="home_channel_description d-flex">
                    //       <div className="channel_logo">
                    //         <img src={video.channel_logo} className="w-75 " />
                    //       </div>

                    //       <div className="channel_description">
                    //         <p>{video.channel_name}</p>
                    //         <p>{video.channel_subscribers}</p>
                    //         <p>{video.video_published_date}</p>
                    //       </div>
                    //     </div>
                    //   </Link>
                    // </div>
                    <div className="col-md-3" style={{marginTop:"30px"}}>
       <Link to={`/video/${video._id}`}>

    <div className="thumbnail_image" >
    <img className='thumbimg' style={{height:"350px",width:"240px"}} src={video.thumbnail_url}/>
    </div>
    <div classNames="home_thumbnail_title "style={{ color: darkMode ? 'white' : 'black' }}>
    
    <h6 className="my-3">
    {video.title}
    </h6>
    
    </div>
    
    <div className="home_channel_description d-flex">
    
    {/* <div className="channel_logo">
    
    <img style={{width:'70px'}} src={video.channel_logo}/>
    
    </div> */}
    
    <div className="channel_description pl-3" style={{ color: darkMode ? 'white' : 'black' }}>
    
    <p>{video.channel_name}</p>
    
    <p>{video.channel_subscribers}</p>
    
    <p>{video.video_published_date}</p>
    </div>
    </div>
    </Link>
    </div>
                  ))}
                  <div className="col-md-3"></div>
                  <div className="col-md-9"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamingVideos;
