import React,{useState} from 'react'
import axios from "axios"

import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail} from "react-icons/md"
import {AiFillPhone} from "react-icons/ai" 
import {RiLockPasswordFill} from "react-icons/ri" 
import "./AdminRegister.css"

import {Link,  useHistory} from "react-router-dom"

function Rsgister() {

  const history = useHistory();

    function adduser(){
        axios.post("http://localhost:8000/addcustomer",{
        
          "username":reg_name,
          "useremail":reg_email,
          "phone":reg_phone,
          "password":reg_password
        
      }).then(res=>{
        
          alert(res.data);
          history.push("/login");
          
      })
      .catch(err=>{
        alert(err);
        
      })

    }

    
      
    var [reg_email,setRegEmail]=useState("");
    var [reg_password,setRegPassword]=useState("");
    
    var [reg_name,setRegName]=useState("");
    var [reg_phone,setRegPhone]=useState("");
          
        
    return (
        
        <div  className="registerBox" style={{width:"auto 50%"}}>
              
        <div className="register">   
        
         <h2 style={{fontSize:"30px",textAlign:"center",marginBottom:"10px",color:"white"
        ,fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>Register</h2>
          <div className="registerInputs">
          <label for="username" className="label" style={{color:"black",fontSize:"18px",fontWeight:"500"}} ><BsFillPersonFill /> Username</label>
         <input  type="text" className="input" id="username" onChange={(e)=>{setRegName(e.target.value)}}/>
         <label for="email" className="label" style={{color:"black",fontSize:"18px",fontWeight:"500"}}> <MdEmail /> Email Address</label>
        <input id="email" type="email" className="input" onChange={(e)=>{setRegEmail(e.target.value)}}/>
        <label style={{color:"black",fontSize:"18px",fontWeight:"500"}} for="phone" className="label"><AiFillPhone /> Phone Number</label>
        <input id="phone" type="number" className="input" data-type="password" onChange={(e)=>{setRegPhone(e.target.value)}}/>
    
        <label style={{color:"black",fontSize:"18px",fontWeight:"500"}} for="password" className="label"> <RiLockPasswordFill />Password</label>
        <input id="password" type="password" className="input" data-type="password" onChange={(e)=>{setRegPassword(e.target.value)}}/>
    

        <input type="submit" className="button" value="Sign Up" onClick={adduser}/>


        <Link to="/" class="signin">
      
      Already Member?

</Link>

          </div>
        
    
               </div>
               </div>



    )
}

export default Rsgister
