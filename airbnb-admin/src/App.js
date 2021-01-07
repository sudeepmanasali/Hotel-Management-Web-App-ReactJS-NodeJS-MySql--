import React from 'react';
import Footer from './Footer';
import Header from './Header';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import AdminRegister from "./AdminRegister";
import Hoteldetails from "./Hoteldetails";

// import AdminHeader from "./AdminHeader";
import AdminLogin from "./AdminLogin";

import { useStateValue } from './StateProvider';
import Home from './Home';
import Bookings from "./Bookings"
import Edithotel from "./Edithotel"
import EditRoomPrice from './EditRoomPrice';
import AddDetails from "./AddDetails"

function App() {
  const [{admin}, dispatch] = useStateValue();

  
  return (
    <div className="app">

   {
     !(admin) ? 
     <AdminLogin /> 
     :
   
    <Router>

   
        <Switch>
        
       

          <Route path="/adminregister">
            
              <AdminRegister />
           
          </Route>

    

          <Route path="/edithotel">
            
              <Edithotel />
           
          </Route>

          <Route path="/bookings">
            <Header />
              <Bookings />
           <Footer />
          </Route>


          <Route path="/addDetails">
            <Header />
              <AddDetails />
           <Footer />
          </Route>

         
          <Route path="/hotel_details">
            <Header />
              <Hoteldetails/>
           <Footer />
          </Route>

          <Route path="/adminlogin">
            
            <AdminLogin />
         
        </Route>

        <Route path="/">
            <Header />
            <Home />
          <Footer />
        </Route>

 

    
        </Switch>
      
    </Router>

   }
    
    </div>
  );
}

export default App;
