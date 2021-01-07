import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import {FaHotel} from "react-icons/fa"
import axios from "axios"

import { useStateValue } from './StateProvider';
import { Link, useHistory } from "react-router-dom";



function Bookings() {
   
    var [booking_details,setBookings]=useState([]);
    var [book_details,setBook]=useState([{
        "room_id" : "123",
        "booking_date" : "20/11/2020",
        "start_date" : "12/12/2020",
        "end_date" : "15/11/2020",
        "amount" : 100 
    },{
        "room_id" : "123",
        "booking_date" : "20/11/2020",
        "start_date" : "12/12/2020",
        "end_date" : "15/11/2020",
        "amount" : 100 
    }]);

    var [arr,setArr]=useState([]);


    // var bookingsurl="http://localhost:8000/customer"

  


    
  

    var fetchbookings = "http://localhost:8000/bookings";

    useEffect(()=>{
   
        async function bookings(){
            var request = await axios.get(fetchbookings);
         
       
          
          setBookings(request.data);

        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings]);
  
    var history = useHistory()

    var renderTableHeader =()=> {
        let header =[
            "RoomID","Booking_date","Start_Date","End_Date","Amount"
        ];

        return header.map((key_) => {
           return <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">{key_}</a></div>
        })
     }

     var formatDate = (date)=>{
         var d =new Date(date);
         return (d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear() )
     }
  

    var renderTable = () => {
        return booking_details.map(item=> {
            var { room_id, booking_date, start_date, end_date, amount } = item
            return (
              
                <div className="table-row">
                    
                  
                    <div className="table-data">{room_id}</div>
				<div className="table-data">{formatDate(booking_date)}</div>
				<div className="table-data">{formatDate(start_date)}</div>
				<div className="table-data">{formatDate(end_date)}</div>
				<div className="table-data">{amount}</div>
				
                </div>
         
            )
        })
    }
    
    
    return (

    
        
        <div className="container">
            
            <h4 style={{"textAlign":"left","color":""}}><FaHotel />  Reservation Details</h4>

            <div className="table">
            <div className="table-header">
               {renderTableHeader()}
            </div>

            <div className="table-content">
          
         
                   {
                       renderTable()
                   }  
                 
            </div>
                
             
            </div>
           

         
            
                
            
           
                 
                
                 
              {/* {
                  book_details?.map((item)=>(
                            <div className="data">
                       <p>RoomId : {item.room_id} </p>
                       <p>Bookingdate : {item.booking_date} </p>
                       <p>Start Date : {item.start_date} </p>
                       <p>End Date : {item.end_date} </p>
                       <p>Amount : {item.amount} </p>
                            </div>
                  ))
                     
                } */}
             
          
             
          
            
       
        </div>
    )
}

export default Bookings