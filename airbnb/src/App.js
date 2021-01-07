import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import SearchPage from './SearchPage';
import Profile from "./Profile"

import Login from "./Login"
import Rsgister from "./Rsgister"

import Bookings from "./Bookings";
import { useStateValue } from './StateProvider';
import Edituser from './Edituser';

function App() {
  const [{user,admin}, dispatch] = useStateValue();

  console.log(user);
  return (
    <div className="app">

   {!user ? (
          
                
                  <Login />

          
          ):(
    <Router>

   
        <Switch>
        
          <Route path="/search/:startdate/:enddate/:persons">
            <Header />
              <SearchPage />
            <Footer />    
          </Route>


          <Route path="/edituser">
            <Header />
              <Edituser />
            <Footer />    
          </Route>
          
      

          <Route path="/login">
            <Header />
              <Login />
            <Footer />    
          </Route>

          <Route path="/user_register">
            <Header />
              <Rsgister />
            <Footer />    
          </Route>


          <Route path="/profile">
            <Header />
              <Profile />
            <Footer />    
          </Route>
          <Route path="/bookings">
            <Header />
              <Bookings />
            <Footer />    
          </Route>
        
          <Route path="/">
            <Header />
             <Home />
            <Footer /> 
          </Route>
        </Switch>
      
    </Router>)
}
    
    
    </div>
  );
}

export default App;
