import React from 'react'
import "./AdminRegister.css"
import {FaHotel,FaBed} from "react-icons/fa"
import {BsFillPersonLinesFill} from "react-icons/bs" 

import {MdEmail} from "react-icons/md"
import {AiFillPhone} from "react-icons/ai" 

import {RiLockPasswordFill} from "react-icons/ri" 


function AdminRegister() {
    return (
        <div  className="container">
              
 <div className="container-fluid">   
	<form >
<h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Register ADMIN</h2>

<label><BsFillPersonLinesFill /> Owner/Manager name:</label>
<input type="text" name="oname" required />

<label><MdEmail /> E-mail</label>
<input type="email" name="email"required />

<label><AiFillPhone /> Phone number:</label>
<input type="number" name="phone" required /> 

<label><RiLockPasswordFill /> Password:</label>
<input type="password" name="pass" required /> <br/>


<input type="submit" name="register" value="Register" className="btn" style={{background:"#ff3e6c",fontSize:"12px",fontWeight:"600",textAlign:"center"}} />






</form>

<div className="signin">
    <p>Already have an account? <a href="login.php">Sign in</a>.</p>
  </div>
        </div>
        </div>
    )
}

export default AdminRegister
