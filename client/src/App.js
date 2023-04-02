import { useState } from 'react';
import './App.css';

import MassangerCom from './Components/Message/MassangerCom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Myprofile from './Components/MyProfile'

import GetPassword from './Components/Password/Getpassword'
import CreatPassword from './Components/Password/CreatPassword'
import Login from './Components/Password/login'
import UserProfile from './Components/UserProfile/UserProfile';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ResultSearch from './Components/ResultUser';
import Navbar from './Components/Navbar/navbar'
import Search from './Components/Serach';
import HomePage from './Components/Home/HomePage';
import MobileChat from './Components/Message/Mobile_chat/MobileChat';
import UserConnectedProfile from './Components/UserProfile/UserConnectedProfile';
import UserConnectedEdit from './Components/UserProfile/UserConnectedEdit';
import Footer from './Components/Footer/footer';
import LoginAfterSign from './Components/Password/LoginAfterSign';

function App() {

 

  return (
    <div className="">


      <BrowserRouter>
        <Navbar />
        <Switch>

          <Route exact path="/CreatPassword" component={CreatPassword} />
          <Route exact path="/getpassword" component={GetPassword} />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/api/ResultSearch' component={Search} />
          <Route exact path='/Search' component={ResultSearch} />
          <Route path='/User/:id' exact component={Myprofile} />
          <Route path='/MobileChat' exact component={MobileChat} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/log-in" component={LoginAfterSign} />
          <Route exact path="/UserProfile/:id" component={UserProfile} />
          <Route exact path="/MyProfile" component={UserConnectedProfile} />
          <Route exact path="/MyProfile/edit/:id" component={UserConnectedEdit} />



        </Switch>
        <MassangerCom  />

      </BrowserRouter>


    </div>
  );
}

export default App;
