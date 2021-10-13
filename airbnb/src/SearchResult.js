import React from 'react';
import "./SearchResult.css";

import StarIcon from "@material-ui/icons/Star"
import { BsBookmarksFill,BsWifi} from 'react-icons/bs';
import {FaRupeeSign, FaParking} from "react-icons/fa"
import {CgSmartHomeRefrigerator} from "react-icons/cg" 

import {GiFirstAidKit} from "react-icons/gi"

import {MdFreeBreakfast} from "react-icons/md"

import "react-icons/fa"

import axios from "axios"
import { useHistory } from 'react-router-dom';

import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function SearchResult({
    img,
    location,
    title,
    description,
    star,
    price,
    total,
    roomId,
    custId,
    startDate,
    endDate

}) {

    const [{token},dispatch] = useStateValue();
    
var history = useHistory()
  

    var booknow = (e)=>{
        // var res = window.confirm("Book the hotel");
        var book = {
            "roomId":e.target.id,
            "custId":custId,
             "bookingDate":Date(),
            "startDate":startDate,
            "endDate":endDate,
            "amount":price
        }

        var formatDate = (date)=>{
            var d =new Date(date);
            return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() )
        }
        var today = formatDate(Date())
     
        dispatch({
            type:actionTypes.BOOK_HOTEL,

            currentBooking:  {
            "img":img,    
            "title":title,
            "desc":description,
            "roomId":parseInt(e.target.id),
            "custId":custId,
            "bookingDate":today,
            "startDate":formatDate(startDate),
            "endDate":formatDate(endDate),
            "amount":price}
        })
        

        history.push("/checkout");        



    //   if(res){

    //     axios.post("http://localhost:8000/reservation",{
    //         data:{"roomId":parseInt(e.target.id),
    //         "custId":custId,
    //         "bookingDate":today,
    //         "startDate":formatDate(startDate),
    //         "endDate":formatDate(endDate),
    //         "amount":price}
    //     },{headers:{
    //         Authorization:"Bearer "+token
    //     }})
    //     .then(result=>{
            
    //         alert(result.data)

    //         history.push("/")
            
    //     })
    //     .catch(err=>{
    //         alert(err);
    //     })

    //   }
    //   else{
    //       console.log("Booking Cancelled !!!")
    //   }
        
    }

   

    return (
      
         <div className="searchResult">
           <img src={img} />
           <BsBookmarksFill  className="searchResult_heart" style={{color:"red",float:"right"}} />
           <div className="searchResult_info">
               <div className="searchResult_infoTop">
               <h3><strong>{title}</strong></h3>
                   <p>{location}</p>
                   <br></br>
                   <div className="amenities">
                   {description==='WI-FI' ? <span className="elements"><BsWifi /> WI-FI</span>: " "  } 
                   {description==='Refrigarator' ? <span className="elements"><CgSmartHomeRefrigerator /> Refrigarator</span>: " "  } 

                   {description==='Breakfast' ? <span className="elements"><MdFreeBreakfast /> Breakfast</span>: " "  } 

               
                   {description!=='WI-FI' &&  description!='Breakfast' && description!='Refrigarator'? <span className="elements">{description}</span>: " "  } 

            
                   
                   <span className="elements"> <FaParking /> Free Parking</span>
               
                   <span className="elements"><GiFirstAidKit /> First Aid</span> 

       
                   </div>
                  
        
                 
               </div>
               <div className="searchResult_infoBottom">
                    <div className="searchResult_stars" >
                      <StarIcon  className="searchResult_star" >

                      </StarIcon>
                      <p><strong style={{ fontSize:"15px"}}>{star}</strong></p>
         
                    </div>
                    <div className="booknow">
                        <button id={roomId} style={{padding:"10px 12px", outline:"none",fontWeight:"600",background:"rgb(230, 30, 77) 0%",border:"none",borderRadius:"55px",color:"white"}} onClick={booknow}>Book Now</button>
                    </div>
                    <div className="searchResult_price">
                        <p><FaRupeeSign />{total}/ night + gst  <FaRupeeSign /> {total*0.01*18}</p>
                        {/* <p ><FaRupeeSign style={{fontSize:"15px !important" }} /> {price+price*0.01*18} total </p> */}
                    </div>
                    <div className="searchResult_price">
                  
                        <p ><FaRupeeSign style={{fontSize:"15px !important" }} /> {price+price*0.01*18} total </p>
                    </div>
               </div>
           </div>
         </div>
         
    )
}

export default SearchResult
