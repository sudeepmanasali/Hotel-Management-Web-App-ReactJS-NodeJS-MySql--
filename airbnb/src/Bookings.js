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


    var formatDate = (date)=>{
        var d =new Date(date);
        return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() )
    }
 
  
    async function cancelReservation(e){
        var d = e.target.id.split(',')
               var cancelresUrl=`http://localhost:8000/cancelReserve/${d[0]}/${formatDate(d[1])}`;
               const request = await axios.delete(cancelresUrl);
               alert(request.data)
          
    } 

    
  

    var fetchbookings = "http://localhost:8000/bookings";

    useEffect(()=>{
   
        async function bookings(){
            var request = await axios.get(fetchbookings);
         
       
          
          setBookings(request.data);

        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings, cancelReservation]);
  
    var history = useHistory()

    var renderTableHeader =()=> {
        let header =[
            "RoomID","Booking_date","Start_Date","End_Date","Amount","Actions"
        ];

        return header.map((key_) => {
           return <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">{key_}</a></div>
        })
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
				<div className="table-data">{!(formatDate(start_date) < formatDate(new Date())) ? <button style={{backgroundColor:"#C52184",color:"white",fontWeight:"600px",padding:"3px 8px",border:"none"}} id={[room_id,booking_date]} onClick={cancelReservation}>Cancel</button> : <button style={{backgroundColor:"#C52184",color:"white",fontWeight:"600px",padding:"3px 8px",border:"none"}}>View</button>}</div>

				
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
           

         
            
                
            
           
                 
                
         
             
          
             
          
            
       
        </div>
    )
}

export default Bookings