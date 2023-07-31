import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import About from './About';
import './App.css';

function App() {
   return (
      <div className='App'>
         <Router>
            <Routes>
               <Route path='/' element={<Dashboard />} />
               <Route path='/about' element={<About />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
