import React ,{useState} from 'react';

import {AiFillPhone} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from "axios"

import { useStateValue } from './StateProvider';
import "./AdminRegister.css"



function Edituser() {
    

    const [{user_details,token}] = useStateValue();
    

    var [edit_email,setEditEmail]=useState(user_details.cust_email);
    var [edit_password]=useState(user_details.cust_password);
    
    var [edit_name,setEditName]=useState(user_details.cust_name);
    var [edit_phone,setEditPhone]=useState(user_details.cust_phone);

    var editUrl = `http://localhost:8000/editcustomer`

    function edit(){
      axios.post(editUrl,{
        
        data : JSON.stringify({    "username":edit_name,
            "useremail":edit_email,
            "phone":edit_phone,
            "password":edit_password,
            "custid":user_details.cust_id}),


    },{
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
    }).then(res=>{
    
        alert(res.data)

    }).catch(err=>{alert(err);});
    }
    return (

    
        
        <div  className="container">
              
        <div className="container-fluid">   
       
         <h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Edit Profile</h2>
                 
                     <label className="label" style={{paddingLeft:"0px"}}><BsFillPersonFill /> Full Name</label>
                     <input type="text" className="p_input" placeholder={user_details.cust_name} onChange={(e)=>{setEditName(e.target.value)}}/>
                 
                 <label className="label" style={{paddingLeft:"0px"}}><AiFillPhone /> Number</label>
                     <input type="number" className="p_input" placeholder={user_details.cust_phone} onChange={(e)=>{setEditPhone(e.target.value)}}/>
                     <label className="label" style={{paddingLeft:"0px"}}><MdEmail /> EmailID</label>
                   <input type="text" className="p_input" placeholder={user_details.cust_email} onChange={(e)=>{setEditEmail(e.target.value)}} />
   
         
             <button className="button" onClick={edit}> <MdEdit />Save</button>
       
             </div>
        </div>
    )
}

export default Edituser