import React from 'react';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
  <LoginPage/>
    <BrowserRouter>
    <Routes>
      <Route path ='/Dashboard' element={<Dashboard/>}/> 
    </Routes>
    </BrowserRouter>
    </>
    // <Dashboard/>
  );
}

export default App;
