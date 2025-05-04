import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateAccount from './pages/CreateAccount';
import SponsorsList from './components/SponsorsList';
import Login from './pages/Login';

import SponsorListing from './pages/SponsorListing';
import EventList from './pages/EventListing';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App max-w-screen">
        <Routes>
          <Route path='/Create' element={<CreateAccount />} />
          <Route path="/" element={<LandingPage />} />
          <Route path='/home' element={<SponsorsList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sponsor' element={<SponsorListing />} />
          <Route path='/events' element={<EventList />} />
      
        </Routes>
      </div>
    </Router>
  );
};

export default App;
