import React,{useState} from 'react'
import axios from "axios"
import "./AdminRegister.css"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail} from "react-icons/md"
import {AiFillPhone} from "react-icons/ai" 
import {RiLockPasswordFill} from "react-icons/ri" 


function Rsgister() {

    async function adduser(){
        var request = await axios.post("http://localhost:8000/addcustomer",{
        
          "username":reg_name,
          "useremail":reg_email,
          "phone":reg_phone,
          "password":reg_password
        
      });
       
      console.log(request.data)
    }

      
    var [reg_email,setRegEmail]=useState("");
    var [reg_password,setRegPassword]=useState("");
    
    var [reg_name,setRegName]=useState("");
    var [reg_phone,setRegPhone]=useState("");
          
        
    return (
        
        <div  className="container">
              
        <div className="container-fluid">   
           <form method="post" action="" enctype="multipart/form-data">
         <h2 style={{float:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Register</h2>
         <label for="user" className="label" style={{paddingLeft:"0px"}}><BsFillPersonFill /> Username</label>
         <input id="user" type="text" className="input" onChange={(e)=>{setRegName(e.target.value)}}/>
         <label for="pass" className="label"> <MdEmail /> Email Address</label>
                                <input id="pass" type="text" className="input" onChange={(e)=>{setRegEmail(e.target.value)}}/>
                                <label for="pass" className="label"><AiFillPhone /> Phone Number</label>
                                <input id="pass" type="number" className="input" data-type="password" onChange={(e)=>{setRegPhone(e.target.value)}}/>
                           
                                <label for="pass" className="label"> <RiLockPasswordFill />Password</label>
                                <input id="pass" type="password" className="input" data-type="password" onChange={(e)=>{setRegPassword(e.target.value)}}/>
                            
        
                                <input type="submit" className="button" value="Sign Up" onClick={adduser}/>
        
        
        
        
         <div class="signin">
         <div class="foot-lnk">
                                <label for="tab-1">Already Member?</label>
                            </div>
         </div>
        
        </form>
               </div>
               </div>



    )
}

export default Rsgister
