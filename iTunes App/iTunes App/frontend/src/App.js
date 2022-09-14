import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from './components/landing/Landing';
import Favourites from './components/favourites/Favourites';

function App() {
  const [favourites, setFavourites] = useState();// useState to save the list of favourites

  // Function to fetch the list of favourites
  const fetchFavourites = async () => {
    const result = await fetch('/api/getFavourites');// Make the API call
    const data = await result.json();// Change the result into json format
    setFavourites(data.favourites);// Save the data in 'favourites'
  }

  return (
    <div className="App green-background">
      <Router>
        <div className='App'>
          <Routes>
            {/* Define routes */}
            {/* Route to go to 'Home' */}
            <Route path='/' element={<Landing fetchFavourites={fetchFavourites}
              favourites={favourites} />}>
            </Route>
            {/* Route to go to 'Favourites' */}
            <Route path='/favourites' element={<Favourites fetchFavourites={fetchFavourites}
              favourites={favourites} />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
