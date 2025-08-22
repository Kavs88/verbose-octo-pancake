import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './screens/Homepage';
import Directory from './screens/Directory';
import Deals from './screens/Deals';
import Events from './screens/Events';
import BusinessDetail from './screens/BusinessDetail';
import UserProfile from './screens/UserProfile';
import AboutUs from './screens/AboutUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-gray">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
