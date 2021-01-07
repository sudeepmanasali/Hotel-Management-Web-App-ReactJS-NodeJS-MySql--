import React,{useState,useEffect} from 'react'

import axios from "axios"
import { useHistory } from "react-router-dom";


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
                  
                    dispatch({
                        type:actionTypes.USER_INFO,
                        user_details:request.data[0]
                        })
                 
               }
            
            }

              
    
      
  
    
    return (
        <div style={{backgroundColor:"#ff3f6c"}}>
        <div className="container" style={{width:"500px",position:"relative",left:"150px",top:"100px"}}>
        <div className="container-fluid">
           
                    <h2 style={{textAlign:"center",}}>Login</h2>
                    <div className="group">
                        <label for="user" className="label" style={{paddingLeft:"0px"}}><MdEmail /> E-mail</label>
                        <input id="user" type="email" className="input" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="group">
                        <label for="pass" className="label" style={{paddingLeft:"0px"}}><RiLockPasswordFill />Password</label>
                        <input id="pass" type="password" className="input" onChange={(e)=>{setPassword(e.target.value)}} data-type="password" />
                    </div>
                    <div className="group">
                        <input id="check" type="checkbox" className="check" />
                        <label for="check"><span className="icon"></span> Keep me Signed in</label>
                    </div>
                    <div className="group">
                        <button className="" style={{padding:"10px 20px",outline:"none",border:"none",backgroundColor:"orange",color:"white",position:"relative",left:"200px"}} value="Sign In" onClick={()=>{
                            console.log(email);
                            console.log(password);
                            admin_login_in();
                        }}>Sign In</button>
                    </div>
                    <div className="hr"></div>
                    <div className="foot-lnk">
                        <a href="#forgot">Forgot Password?</a>
                    </div>
                </div>
               
                </div>
            </div>
      

    )
}

export default Login
