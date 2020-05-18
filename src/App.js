import React from 'react';
import './App.css';
import SeatBooking from './components/SeatBooking';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <React.Fragment>
        <SeatBooking />
      </React.Fragment>
    </Router>
  );
}

export default App;
