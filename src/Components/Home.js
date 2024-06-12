import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './Home.css'
import './Searchbar.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import allapilist from '../apilist/allapilist'
const Home = () => {
    
  const navigate =  useNavigate()
  const [darkMode, setDarkMode] = useState(false);
  const[videosArray, setVideoarray] =useState([]);
  const [search, setSearch] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [showBanner, setShowBanner] = useState(true); // State to manage banner visibility
  const [isServerConnected, setIsServerConnected] = useState(true); // State to manage server connection status
//"No Search Found" image URL
const noSearchFoundImageUrl = './images/nxt-watch-no-search-results-img.png'; // Update with your actual image path
const noServerConnectedImageUrl = './images/nxt-watch-failure-view-light-theme-img.png'; // Update with your actual image path


const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  document.body.style.backgroundColor = darkMode ? '#FFFFFF' : '#000000';
  document.body.style.color = darkMode ? '#000000' : '#FFFFFF';
};

  // Initialize speech recognition
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = handleSpeechRecognitionResult;
    setSpeechRecognition(recognition);

    return () => {
      // Cleanup function to stop speech recognition when component unmounts
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, []);

  // Handle speech recognition result and
  const handleSpeechRecognitionResult = (event) => {
    const transcript = event.results[0][0].transcript;
    const filteredTranscript = transcript.replace(/[.,?\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    setSearch(filteredTranscript);
    speakOut(filteredTranscript);
  };
  const speakOut = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  // Start speech recognition
  const startSpeechRecognition = () => {
    if (speechRecognition && !isSpeechRecognitionActive) {
      setIsSpeechRecognitionActive(true);
      speechRecognition.start();
    }
  };

  
   const handleSearch = (e) => {
         setSearch(e.target.value);
      };
    
     const filteredVideos = videosArray.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );

const fetchDetails =async () => {

try {

const response =await axios.get(

"http://localhost:4545/get-video-details"
// allapilist.getvideodetails
);

setVideoarray(response.data); 
setIsServerConnected(true);
} catch (error) {

console.log(error);
setIsServerConnected(false);
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
  }, [token, navigate]);


console.log(videosArray);


const closeBanner = () => {
    setShowBanner(false);
  };
  return (
    <div>
        <section className='Nav_bar_component'>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        </section>
        <section className="container-fluid"> 
<div className="row">
<div className="col-sm-12 col-md-3">
<Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
</div>
<div className="col-6 col-md-9">
    {/* <section className='banner_component '>
    <figure>
  <img id="imgd" src="./images/car7.jpg" alt="Example Image"/>
  <figcaption>
    
<p id="pps"><h4>Synergy Watch</h4></p>
<button id="btp">Get In Touch</button>
</figcaption>
</figure>
    </section> */}
    {showBanner && (
<section className='banner_component'>
      <div className='banner_content'>
        <div className='banner_image'>
        <img 
                      src={darkMode ? '../images/nxt-watch-logo-light-theme-img.png' : '../images/nxt-watch-logo-light-theme-img.png'} 
                      alt='Banner Logo' 
                      style={{ width: "250px", height: "40px" }} 
                    />
          <div className='banner_text' style={{ color: darkMode ? 'black' : 'black' }}>
          <h4 >Buy Nxt Watch Premium prepaid plans with</h4><h4>UPI</h4>
        
          <button id="btp">GET IT NOW</button>
        </div>
        </div>
        <button className='close_button' onClick={closeBanner}>X</button>
      </div>
    </section>
                )}


    <section className='searchbar'>
    <div class="container h-100">
      <div class="d-flex justify-content-left h-100 pt-5">
        <div class="search">
          <input class="search_input" type="text" name="" placeholder="Search here..." value={search}
                      onChange={handleSearch}/>
          <a href="#" class="search_icon"><i class="ri-search-eye-line "></i></a>
          <i class="ri-mic-line pl-2 pr-2" style={{color:"white"}} onClick={startSpeechRecognition}></i>
          
        </div>
      </div>
    </div>

    </section>
    <section className="thumbnails_layout pt-2">

<div classNane="container ">

<div className="row">


 {isServerConnected ? (
filteredVideos.length > 0 ? (
filteredVideos.map((video)=>(
    <div className="col-md-4 mt-3">
       <Link to={`/video/${video._id}`}>

    <div className="thumbnail_image" >
    <img className='thumbimg my-3' src={video.thumbnail_url} style={{width:"350px"}} />
    </div>
    
    
    <div className="home_channel_description d-flex">
    
    <div className="channel_logo">
    
    <img style={{width:'70px'}} src={video.channel_logo}/>
    
    </div>
    
    <div className="channel_description pl-3">
    <div classNames="home_thumbnail_title "style={{ color: darkMode ? 'white' : 'black' }}>
    
    <h6>
    {video.title}
    </h6>
    
    </div>
    
    <p style={{ color: darkMode ? 'white' : 'black' }}>{video.channel_name}</p>
    
    <p style={{ color: darkMode ? 'white' : 'black' }}>{video.channel_subscribers}</p>
    
    <p style={{ color: darkMode ? 'white' : 'black' }}>{video.video_published_date}</p>
    </div>
    </div>
    </Link>
    </div>
))
) : (
  <div className="col-12 text-center">
    <img src={noSearchFoundImageUrl} alt="No Search Found" style={{ width: "200px" }} />
    <h5>No Search Results Found</h5>
    <p>Try different key words or remove search filter</p>
    <button style={{backgroundColor:"blue",borderRadius:"4px",color:"white"}}>Retry</button>

  </div>
)
) : (
  <div className="col-12 text-center">
    <img src={noServerConnectedImageUrl} alt="No Server Connected" style={{ width: "200px" }} />
    <h5>Oops! Something Went Wrong</h5>
    <p>We are having some trouble to complete your request</p>
    <p>Please try again</p>
    <button style={{backgroundColor:"blue",borderRadius:"4px",color:"white"}}>Retry</button>

  </div>
)


}
</div>
</div>
</section>










     </div>

</div>

</section>
      
    </div>
  )
}

export default Home





