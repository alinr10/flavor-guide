import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Homepage from './pages/homepage/homepage';
import Profile from './pages/profile/index';
import LoadingProfile from './pages/loading/index';
import UpdateUser from './pages/profile/tabs/profile/personal/profile';
import Showprofile from './pages/profile/tabs/profile/personal/showProfile';
import ShowAI from "./pages/profile/tabs/search-job/showAI";
import Order from "./pages/profile/order"
import Food from "./pages/profile/tabs/food"
import Personalized from "./pages/profile/personalized"

function App() {
  const navigate = useNavigate();

  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Kullanıcının ID'sini saklamak için

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const storedUserToken = localStorage.getItem('userToken');
        const expirationTime = localStorage.getItem('tokenExpiration');

        const currentTime = new Date().getTime();

        if (storedUserToken && expirationTime && currentTime < expirationTime) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('userToken');
          localStorage.removeItem('tokenExpiration');
        }
      } catch (error) {
        console.error('Oturum kontrol hatası:', error);
        setIsLoggedIn(false);
      }
    };

    checkUserToken();
  }, [navigate]);

  if (isLoggedIn === null) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/personal/update" element={isLoggedIn ? <UpdateUser /> : <Navigate to="/" />} />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            userId ? (
              <Navigate to={`/profile/${userId}`} replace={true} />
            ) : (
              <LoadingProfile />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/loading/profile" element={<LoadingProfile />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/showProfile" element={<Showprofile />} />
      <Route path="/showAI" element={<ShowAI />} />
      <Route path="/order" element={<Food />} />
      <Route path="/personalized" element={<Personalized />} />

      {/* <Route path="/food" element={<Food />} /> */}

    </Routes>
  );
}

export default App;
