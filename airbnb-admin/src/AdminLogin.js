import React,{useState,useEffect} from 'react'

import axios from "axios"
import { useHistory } from "react-router-dom";
import "./AdminLogin.css"

import {MdEmail} from "react-icons/md"
import {RiLockPasswordFill} from "react-icons/ri" 
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {

    const [{}, dispatch] = useStateValue();

    var [email,setEmail]=useState("");
    var [password,setPassword]=useState("");

  
  var history = useHistory();

        async function admin_login_in(){
                var request = await axios.get(`http://localhost:8000/adminlogin/${email}/${password}`);
               if(request.data.length >0){
                   console.log("Logged IN!!!")
                   console.log(request.data)
                   dispatch({
                    type:actionTypes.SET_ADMIN,
                    admin:request.data[0].admin_name
                    })
                }
                if(request.data.length == 0){
                    alert ("username or Password is incorrect ")
                }
            }
    return (
        <div className="loginContainer" style={{backgroundColor:"#F9DC5C"}} >
        <div className="login" >

                    <h2 style={{textAlign:"center",}}>Admin Login</h2>
                    
                    <div className="group">
                        <label for="user" className="label" style={{paddingLeft:"0px"}}><MdEmail /> E-mail</label>
                        <input id="user" type="email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="group">
                        <label for="pass" className="label" style={{paddingLeft:"0px"}}><RiLockPasswordFill />Password</label>
                        <input id="pass" type="password"   onChange={(e)=>{setPassword(e.target.value)}} data-type="password" />
                    </div>
                    
                    <div className="group">
                        <button className="" style={{padding:"10px 20px",outline:"none",border:"none",backgroundColor:"orange",color:"white",cursor:"pointer",fontWeight:"600"}} value="Sign In" onClick={admin_login_in}>Sign In</button>
                    </div>
           
                </div>
               <br></br>
                </div>
           

    )
}

export default Login
