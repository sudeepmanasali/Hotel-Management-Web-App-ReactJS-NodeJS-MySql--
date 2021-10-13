import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'

import {FaHotel} from "react-icons/fa"
import axios from "axios"

import { useStateValue } from './StateProvider';

function Bookings() {
    const [{user,token,isAuth}] = useStateValue();
    var [booking_details,setBookings]=useState([]);


    var formatDate = (date)=>{
        var d =new Date(date);
        return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() )
    }

    var fetchbookings = `http://localhost:8000/reservations/${user}`; 
  
    async function cancelReservation(e){
        var d = e.target.id.split(',')
        var cancelresUrl=`http://localhost:8000/cancelReserve/${d[0]}`;
        axios.delete(cancelresUrl,
        {   
            headers:{
                Authorization:"Bearer "+token
            }
        }
        )
        .then(res=>{alert(res.data);
            axios.get(fetchbookings,{},{headers:{
                Authorization:"Bearer "+token
            }}).then(res=>{
                setBookings(res.data);
            }).catch(err=>{
                alert(err);
            })
        }).catch(err=>alert(err));      
    } 

    
  




    useEffect(()=>{
        axios.get(fetchbookings,{},{headers:{
            Authorization:"Bearer "+token
        }}).then(res=>{
 
            setBookings(res.data);
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })

        // axios.get(fetchbookings,{},{headers:{
        //     Authorization:"Bearer "+token
        // }}).then(res=>{
        //     setBookings(res.data);
        // }).catch(err=>{
        //     alert(err);
        // })
      
    },[])
    

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
            var { r_id,room_id, booking_date, start_date, end_date, amount } = item
            return (
              
                <div className="table-row">
                    
                  
                    <div className="table-data">{room_id}</div>
				<div className="table-data">{formatDate(booking_date)}</div>
				<div className="table-data">{formatDate(start_date)}</div>
				<div className="table-data">{formatDate(end_date)}</div>
				<div className="table-data">{amount}</div>
				<div className="table-data">{!(formatDate(start_date) < formatDate(new Date())) ? <button style={{backgroundColor:"#C52184",color:"white",fontWeight:"600px",padding:"3px 8px",border:"none"}} id={[r_id,room_id,booking_date]} onClick={cancelReservation}>Cancel</button> : <button style={{backgroundColor:"#C52184",color:"white",fontWeight:"600px",padding:"3px 8px",border:"none"}}>View</button>}</div>

				
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