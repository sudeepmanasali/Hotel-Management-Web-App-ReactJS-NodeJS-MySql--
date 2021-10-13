import React,{useState,useEffect} from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";
import {MdEmail} from "react-icons/md"
import {RiLockPasswordFill} from "react-icons/ri" 
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import { Link } from 'react-router-dom';



function Login() {
    const [{}, dispatch] = useStateValue();
    var [email,setEmail]=useState('');


    var [password,setPassword]=useState('');
    
  var history = useHistory();

        function login_in(){
            if(email.trim()!==" "&& password.trim()!==" "){
                axios.get(`http://localhost:8000/login/${email}/${password}`)
            .then(res=>{
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('details', JSON.stringify(res.data.rowData[0]));
                localStorage.setItem('isAuth', true);

                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                  new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                        console.log(JSON.stringify(res.data.rowData[0]));
                    dispatch({
                        type:actionTypes.SET_USER,
                        user:res.data.rowData[0].cust_name,
                        token: res.data.token,
                        isAuth: true
                    })
              
                dispatch({
                    type:actionTypes.USER_INFO,
                    user_details:res.data.rowData[0]
                })
                    alert("Successfully loggedIn ..!")
                    history.push("/");
            })
            .catch(err=>{
                console.log(err);
               
            });

            }
            else{
                alert("Enter the valid credentials..");
            }
            


            }
    return (
        <div style={{backgroundColor:"#ff3f6c",position:'relative'}}>
        <div className="box" >
        <div className="box-fluid">
           
                    <h2 style={{textAlign:"center"}}>Login</h2>
                    <div className="group">
                        <label for="user" className="label" style={{paddingLeft:"0px"}}><MdEmail /> E-mail</label>
                        <input id="user" type="email" className="input"  onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="group">
                        <label for="pass" className="label" style={{paddingLeft:"0px"}}><RiLockPasswordFill />Password</label>
                        <input id="pass" type="password" className="input" onChange={(e)=>{setPassword(e.target.value)}} data-type="password" />
                    </div>
                    <div className=" ">
                        <input id="check" type="checkbox" className="check" />
                        <label for="check" style={{cursor:"pointer"}}><span className="icon"></span> Keep me Signed in</label>
                    </div>
                    <div className="actions">
                            <button className="actionButton" onClick={login_in}>Sign In</button>
                             <Link to="/user_register" className="actionButton">Register</Link>          
                    </div>
                    <div className="foot-lnk">
                        <Link to="#forgot">Forgot Password?</Link>
                    </div>
                </div>
               
                </div>
            </div>
      

    )
}

export default Login

