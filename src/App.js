import React from  'react';
import Layout from './core/Layout';
import 'bootswatch/dist/united/bootstrap.min.css';
import './App.css';
import loginImg from './assets/mernauth-logo.png';
// import loginProcess from './assets/login-process.png';

const App = ()=> {  
  return (
    <Layout>
      <div className="justify-content-center text-center m-3 p-3">
        <div className="col-sm-9 offset-sm-2">
          <h1>React, Node, MongoDB Authentocation Biolerplate</h1>
          <h2>  MERN Stack   </h2>
          <p> MERN stack login, Register system with account activation, Forgot Password, Reset Password, login with facebook, Login with google as well as private and protected routes for authenticated user and users with the role od admin  </p>
          <h3>Bonus</h3>
          <p>Profile Update, Deploy to Digital Ocean Cloud server</p>
        </div>
          <img src={loginImg} alt="this is car image" className="col-sm-3 offset-sm-1 p-3" />
          {/* <img src={loginImg} alt="this is car image" className="col-sm-7 offset-sm-1" /> */}
      </div>
    </Layout>
  );
}

export default App;
