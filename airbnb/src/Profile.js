import React  from 'react';
import './Profile.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"

import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";



function Profile() {


    const [{user_details}] = useStateValue();


  
    return (

    
        
        <div className='profile container'>
            
             <h4>Profile Details</h4>
            
             
             <table>
                 <tr>
                     <td><BsFillPersonFill /> Full Name</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_name}  disabled={true}/></td>
                 </tr>
                 <tr>
                     <td><AiFillPhone /> Number</td>
                     <td><input type="number" className="p_input" placeholder={user_details.cust_phone}  disabled={true}/></td>
                 </tr>
                 <tr>
                     <td><MdEmail /> EmailID</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_email}  disabled={true}/></td>
                 </tr>
                 <tr>
                     <td><AiFillCreditCard /> Password</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_password}  disabled={true}/></td>
                 </tr>
             </table>
             <button className="button" ><Link to="/edituser" style={{textDecration:"none",color:"white"}}> <MdEdit /> Edit </Link></button>
          
            
       
        </div>
    )
}

export default Profile