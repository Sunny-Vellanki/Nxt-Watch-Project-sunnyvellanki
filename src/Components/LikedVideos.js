import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import allapilist from "../apilist/allapilist";   
 
const LikedVideos = () => {
    const [likedVideos, setLikedVideos] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const getLikedVideos = async () => {
      try {
        const response = await axios.get(
            "http://localhost:4545/likedvideos"
        // allapilist.savedvideos
        );
        setLikedVideos(response.data.likedVideos);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getLikedVideos();
    }, []);
  
    console.log(likedVideos);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      document.body.style.backgroundColor = darkMode ? '#FFFFFF' : '#000000';
      document.body.style.color = darkMode ? '#000000' : '#FFFFFF';
    };
    return (
      <div>
        <section>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        </section>
        <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <Sidebar darkMode={darkMode} />
              </div>
  
              <div className="col-md-9">
              
                <div className="container-fluid">
                <div style={{marginTop:"80px",backgroundColor:darkMode ? 'white' : 'black',color:darkMode ? 'black' : 'white',padding:"10px",borderRadius:"5px",fontSize:"20px"}}>< i class="ri-thumb-up-fill pr-3"></i> Liked Videos</div>
                  <div className="row">
                    
                    {likedVideos.map((video) => (
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
                      <div className="col-md-9" style={{marginTop:"20px"}}>
         <Link to={`/video/${video._id}`} className="d-flex align-items-start">
  
      <div className="thumbnail_image mr-3" >
      <img className='thumbimg' src={video.thumbnail_url}/>
      </div>
      <div classNames="home_thumbnail_title "style={{ color: darkMode ? 'white' : 'black' }}>
      
      <h6 className="my-3">
      {video.title}
      </h6>
      
      
      
      <div className="channel_description"style={{ color: darkMode ? 'white' : 'black' }}>
      
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
    )
  }
export default LikedVideos;
