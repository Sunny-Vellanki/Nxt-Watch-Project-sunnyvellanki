import './App.css';
import Login from './Components/Login';
import Signupdetails from './Components/Signupdetails';
import {BrowserRouter,  Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import IndividualVideo from './Components/IndividualVideo';
import GamingVideos from './Components/GamingVideos';
import TrendingVideos from './Components/TrendingVideos';
import SavedVideos from './Components/SavedVideos';
import LikedVideos from './Components/LikedVideos';
import Forgetpassword from './Components/Forgetpassword';
import NotFound from './Components/NotFound';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/forgotpassword" element={<Forgetpassword/>}></Route>
    <Route path="/signup" element={<Signupdetails/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/" element={<Home/>}></Route>
    <Route exact path="/video/:id" element={<IndividualVideo />}></Route>
    <Route exact path="/gaming" element={<GamingVideos />}></Route>
    <Route exact path="/trending" element={<TrendingVideos />}></Route>
    <Route exact path="/saved-videos" element={<SavedVideos />}></Route>
    <Route exact path="/liked" element={<LikedVideos />}></Route>
    <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
  


    </Routes>
    </BrowserRouter>
  
    </>
  );
}

export default App;