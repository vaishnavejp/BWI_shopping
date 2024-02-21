import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Auth from './components/Auth';
import { createContext, useContext, useState } from 'react';
import Nav from './components/Nav';
import AuthWrapper from './components/AuthWrapper';


function App() {

  return (
      <div className='app' style={{ backgroundImage: "url(/assets/bg.jpg)", backgroundSize: "cover", backgroundRepeat: 'no-repeat'}}>
        <AuthWrapper />
      </div>
  );
}

export default App;
