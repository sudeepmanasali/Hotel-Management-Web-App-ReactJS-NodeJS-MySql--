import React,{Suspense} from 'react';
import Footer from './Footer';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import Reloader from "./Reloader"
import { useStateValue } from './StateProvider';
import "./Bookings.css"


const Edithotel = React.lazy(()=>import('./Edithotel'));
const AddDetails = React.lazy(()=>import('./AddDetails'));
const Home = React.lazy(()=>import('./Home'));
const Bookings = React.lazy(()=>import('./Bookings'));
const EditRoomPrice = React.lazy(()=>import('./EditRoomPrice'));
const Hoteldetails = React.lazy(()=>import('./Hoteldetails'));

function App() {
  const [{admin}, dispatch] = useStateValue();

  
  return (
    <div className="app">


    <Router>
      <Suspense fallback={Reloader}>
    {
     !(admin) ? 
     <AdminLogin /> 
     :
   
   
        <Switch>
          <Route path="/edithotel"><Edithotel /></Route>

          <Route path="/bookings"> <Header /> <Bookings /> <Footer /></Route>


          <Route path="/addDetails"><Header /><AddDetails /><Footer /></Route>

         
          <Route path="/hotel_details"><Header /><Hoteldetails/><Footer /></Route>

          <Route path="/adminlogin"><AdminLogin /></Route>

        <Route path="/" exact><Header /><Home /><Footer /></Route>    
        </Switch>
}
</Suspense>
<Route path="/adminregister"><AdminRegister /></Route>

    </Router>

 
    
    </div>
  );
}

export default App;
