import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import Navbar from './Navbar'
import './Sidebar.css'
import Sidebar from "./Sidebar";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link } from "react-router-dom";
import './Home.css'
import Cookies from "js-cookie";
import {useNavigate} from 'react-router-dom'
//import { ToastContainer, toast } from "react-toastify";
import allapilist from "../apilist/allapilist";

const IndividualVideo = () => {
  const [darkMode, setDarkMode] = useState(false);
    const navigate =  useNavigate()    
    //subscribe
    const handleButtonClick = () => {
      
    //   toast.success("Subscribed");
      setSubscribed(prevState => !prevState);
    };
    //video saved
    const [videoDetails, setVideoDetails] = useState({
      savedStatus: "Not saved"
    });
//subscribed
    const [subscribed, setSubscribed] = useState(false);
//liked
    const [liked, setLiked] = useState(false);


    const handleLikeClick = () => {
      setLiked(!liked);
    
    };
  //disliked
    const [disliked, setDisliked] = useState(false);
const handleDislikeClick = () => {
    setDisliked(!disliked);
  };
    const[videosArray, setVideoarray] =useState([]);
    const fetchDetails =async () => {

        try {
        
        const response =await axios.get(
        
        "http://localhost:4545/get-video-details"
        // allapilist.getvideodetails
      
        );
        
        setVideoarray(response.data); 
        } catch (error) {
          
        
        console.log(error);
        }
        };
        
        useEffect(()=>{ 
        
        fetchDetails();
        },[]);
        
        const token = Cookies.get("jwtAuth");
          console.log(token);
        
          useEffect(() => {
            if (token === undefined) {
              navigate("/login");
            }
          },  []);
        console.log(videosArray);





    const { id } = useParams();
    console.log(id);
    const fetchIindividualVideo = async (req, res) => {
        try {
           
            const response = await axios.get(
              `http://localhost:4545/individualvideo/${id}`
            //  `${allapilist.individualvideo}/${id}`
            );
            setVideoDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleSavedStatus = async () => {
      // it checks videoDetails.savedStatus of respective video of if it is saved it changes to not saved, if it is npt saved it changes to saved
      const newStatus =
        videoDetails.savedStatus === "Saved" ? "Save" : "Saved";
        
      setVideoDetails({ ...videoDetails, savedStatus: newStatus });
      try {
        const response = await axios.put(`http://localhost:4545/videos/${id}/save`, { savedStatus: newStatus });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const toggleLikedStatus = async () => {
        // it checks videoDetails.savedStatus of respective video of if it is saved it changes to not saved, if it is npt saved it changes to saved
        const newStatus =
          videoDetails.likedStatus === "Liked" ? "Like" : "Liked" ;
        
        setVideoDetails({ ...videoDetails, likedStatus: newStatus });
        try {
          const response = await axios.put(`http://localhost:4545/videos/${id}/like`, { likedStatus: newStatus });
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        fetchIindividualVideo()
    },[]) 
    console.log(videoDetails); 
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      document.body.style.backgroundColor = darkMode ? '#FFFFFF' : '#000000';
      document.body.style.color = darkMode ? '#000000' : '#FFFFFF';
    };
  return (
    
    <div>
       {/* <ToastContainer /> */}
      <section className="Nav_bar_component">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/> 
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </div>
          <div className="col-md-9 container ">
            <div className="col-12">
              {/* <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="475px"
                className="mt-4"
              /> */}
                          
                          <ReactPlayer url={videoDetails.video_url} width={"100%"} height={"400px"} style={{marginTop:"100px"}} />
            </div>
            <div className="col-12">
              <p className="mt-3 col-md-12 col-sm-6">
                {videoDetails.title}
              </p>
            </div>
            {/* <hr></hr> */}
            <div className="col-12">
              <div className="d-flex">
                              <p>{ videoDetails.view_count} views</p>
                              <p style={{marginLeft:"15px"}}>{videoDetails.video_published_date}</p>

                <div className="d-flex" style={{marginLeft:"65%"}}>
                
                  {/* <span className="mx-2 d-flex flex-column">
                  <i class="ri-thumb-up-fill pl-1"></i>
                  <span>Like</span>
                  </span> */}
                   {/* <span className="mx-2 d-flex flex-column" onClick={toggleLikedStatus}>
                   <i className={`ri ${liked ? 'ri-thumb-up-fill' : 'ri-thumb-up-line'}`} style={{ paddingLeft: '1px',marginLeft:"4px" }}></i> */}
      {/* <span>{liked ? 'Liked' : 'Like'}</span> */}
      {/* <span>{videoDetails.likedStatus}</span>
    </span> */}
    <span className="mx-2 d-flex flex-column" onClick={toggleLikedStatus}>
                    <i className={`ri ${videoDetails.likedStatus === 'Liked' ? 'ri-thumb-up-fill' : 'ri-thumb-up-line'}`} style={{ paddingLeft: '1px', marginLeft: "4px" }}></i>
                    <span>{videoDetails.likedStatus}</span>
                  </span>
                  {/* <span className="mx-2 d-flex flex-column">
                  <i class="ri-thumb-down-fill pl-2"></i>
                  <span>DisLike</span>
                  </span> */}
                  <span className="mx-2 d-flex flex-column" onClick={handleDislikeClick}>
      <i className={`ri ${disliked ? 'ri-thumb-down-fill' : 'ri-thumb-down-line'}`} style={{ paddingLeft: '2px',marginLeft:"8px" }}></i>
      <span>{disliked ? 'Disliked' : 'Dislike'}</span>
    </span>
                  
                  {/* <span className="mx-2 d-flex flex-column">
                  <i class="ri-save-line pl-2"onClick={toggleSavedStatus}></i> 
                    <span>{videoDetails.savedStatus}</span>
                  </span> */}
                  <span className="mx-2 d-flex flex-column" onClick={toggleSavedStatus}>
                    <i className={`ri ${videoDetails.savedStatus === 'Saved' ? 'ri-save-fill' : 'ri-save-line'}`} style={{ paddingLeft: '2px' }}></i>
                    <span>{videoDetails.savedStatus}</span>
                  </span>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="col-12">
              <div className="d-flex">
                <div>
                  <img style={{width:'70px'}} src={videoDetails.channel_logo} />
                </div>
                <div className="channel_description pl-3 d-flex">
                    <div>
                                  <p className="m-0">{ videoDetails.channel_name}</p>
                 <p>{ videoDetails.channel_subscribers} Subscribers</p>
                  <p className="m-0">
                   
                  </p>
                  
                  </div>
                  
                  {/* <div className="sub_logo mt-3 " style={{color:"white",backgroundColor:"black",padding:"5px",borderRadius:"15px",paddingBottom:"0px",marginBottom:"15px",marginLeft:"3px"}}> */}
                    {/* <button style={{backgroundColor:"black",color:"white",border:"1px black"}} onClick={handleButtonClick}>Subscribe <i class="ri-notification-4-fill"></i></button> */}
                    {/* <button 
      style={{ backgroundColor: "black", color: "white", border: "1px solid black" }} 
      onClick={handleButtonClick}
    >
      {subscribed ? (
        <>
          Subscribed <i className="ri-check-fill"></i>
        </>
      ) : (
        <>
          Subscribe <i className="ri-notification-4-fill"></i>
        </>
      )}
    </button>
            </div> */}
            </div>
            
            </div>
            <div style={{marginLeft:"90px"}}>
                  <p>{videoDetails.video_description}</p>
                  </div>
            </div>

{/* <marquee>More Suggested Videos Below</marquee> */}
            <section className="thumbnails_layout pt-0">        
<div classttane="container ">
<div className="row">
{videosArray.map((videoDetails)=>(
    <div className="col-md-4 pt-4">
       <Link to={`/video/${videoDetails._id}`}>

    <div className="thumbnail_image">
    <img className='thumbimg' src={videoDetails.thumbnail_url}/>
    </div>
    <div classNames="home_thumbnail_title"style={{ color: darkMode ? 'white' : 'black' }}>
    
    <h6 className="my-3 col-md-12 col-sm-6">
    {videoDetails.title}
    </h6>
    
    </div>
    
    <div className="home_channel_description d-flex">
    
    <div className="channel_logo">
    
    <img style={{width:'70px'}} src={videoDetails.channel_logo}/>
    
    </div>
    
    <div className="channel_description pl-3">
    
    <p style={{ color: darkMode ? 'white' : 'black' }}>{videoDetails.channel_name}</p>
    
    <p style={{ color: darkMode ? 'white' : 'black' }}>{videoDetails.channel_subscribers}</p>
    
    <p style={{ color: darkMode ? 'white' : 'black' }}>{videoDetails.video_published_date}</p>
    </div>
    </div>
    </Link>
    </div>
))}
</div>
</div>
</section>
          </div>
        </div>
      </section>
    </div>
  );
};
export default IndividualVideo;
