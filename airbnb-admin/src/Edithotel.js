import React ,{useState,useEffect} from 'react';

import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from "axios"
import {FaHotel} from "react-icons/fa"
import {MdLocationOn} from "react-icons/md"
import { useStateValue } from './StateProvider';
import "./AdminRegister.css"
import { useHistory } from 'react-router-dom';


function Edithotel() {
  
  var history = useHistory();
    const [hotel_details,setHotelDetails] = useState([]);
    var fetchUrl = "http://localhost:8000/hotel/details";
  
   
    var [edit_email,setEditEmail]=useState('');
    var [edit_name,setEditName]=useState('');
    
    var [edit_addr,setEditAddr]=useState('');
    var [edit_phone,setEditPhone]=useState('');
    
  
     useEffect(()=>{
          
          async function fetchData(){
              var request = await axios.get(fetchUrl);

              setHotelDetails(request.data)

              setEditEmail(request.data.hotel_email)      
               setEditName(request.data.hotel_name)
               setEditAddr(request.data.hotel_addr)
  
               setEditPhone(request.data.hotel_phone)
  
        }
          fetchData();
        },[fetchUrl]);   
 
  

    var editUrl = `http://localhost:8000/edithotel`

     async function edit(){
        console.log([edit_name,edit_email,edit_phone,edit_addr])
        var request = await axios.put(editUrl,{
        
            "hotelname":edit_name,
            "hotelemail":edit_email,
            "phone":edit_phone,
           "addr":edit_addr,
          
        });
          alert(request.data)
    }
    return (

    
        
        <div  className="container">
              
       
             {
               hotel_details.map((item)=>(
           <form >
                    <h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Edit Hotel</h2>
                 
                 <label className="label" style={{paddingLeft:"0px"}}><FaHotel /> HotelName</label>
                 <input type="text" className="p_input" placeholder={item.hotel_name} onChange={(e)=>{setEditName(e.target.value)}}/>
             
             <label className="label" style={{paddingLeft:"0px"}}> Number</label>
                 <input type="text" className="p_input" placeholder={item.hotel_phone} onChange={(e)=>{setEditPhone(e.target.value)}}/>
                 <label className="label" style={{paddingLeft:"0px"}}> EmailID</label>
               <input type="text" className="p_input" placeholder={item.hotel_email} onChange={(e)=>{setEditEmail(e.target.value)}} />
                 <label className="label" style={{paddingLeft:"0px"}}> Address</label>
                 <input type="text" className="p_input" placeholder={item.hotel_addr} onChange={(e)=>{setEditAddr(e.target.value)}} />
  
     
         <button className="button" onClick={edit}> <MdEdit />Save</button>
        </form>
               ))
             }
      
           
        </div>
    )
}

export default Edithotel