import React ,{useState,useEffect} from 'react';

import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from "axios"

import { useStateValue } from './StateProvider';
import "./AdminRegister.css"
import { useHistory } from 'react-router-dom';


function Edituser() {
    var [customer,setCustomer]=useState([]);
  var history = useHistory();
    const [{user_details}, dispatch] = useStateValue();
    

    var [edit_email,setEditEmail]=useState(user_details.cust_email);
    var [edit_password,setEditPassword]=useState(user_details.cust_password);
    
    var [edit_name,setEditName]=useState(user_details.cust_name);
    var [edit_phone,setEditPhone]=useState(user_details.cust_phone);
          

    console.log(user_details)
 
  

    var editUrl = `http://localhost:8000/editcustomer`

     async function edit(){
        // setDisable(!disable);
        var request = await axios.put(editUrl,{
        
            "username":edit_name,
            "useremail":edit_email,
            "phone":edit_phone,
            "password":edit_password,
            "custid":user_details.cust_id

          
        });

        history.push("/profile")
       
       
    }
    return (

    
        
        <div  className="container">
              
        <div className="container-fluid">   
           <form method="post" action="" enctype="multipart/form-data">
         <h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Edit Profile</h2>
                 
                     <label className="label" style={{paddingLeft:"0px"}}><BsFillPersonFill /> Full Name</label>
                     <input type="text" className="p_input" placeholder={user_details.cust_name} onChange={(e)=>{setEditName(e.target.value)}}/>
                 
                 <label className="label" style={{paddingLeft:"0px"}}><AiFillPhone /> Number</label>
                     <input type="number" className="p_input" placeholder={user_details.cust_phone} onChange={(e)=>{setEditPhone(e.target.value)}}/>
                     <label className="label" style={{paddingLeft:"0px"}}><MdEmail /> EmailID</label>
                   <input type="text" className="p_input" placeholder={user_details.cust_email} onChange={(e)=>{setEditEmail(e.target.value)}} />
                     <label className="label" style={{paddingLeft:"0px"}}><AiFillCreditCard /> Password</label>
                     <input type="text" className="p_input" placeholder={user_details.cust_password} onChange={(e)=>{setEditPassword(e.target.value)}} />
      
         
             <button className="button" onClick={edit}> <MdEdit />Save</button>
            </form>
             </div>
        </div>
    )
}

export default Edituser