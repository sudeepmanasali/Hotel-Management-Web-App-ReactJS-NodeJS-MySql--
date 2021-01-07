import React from 'react'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"



function Hoteldetails() {
    return (
        <div>
            <div className='profile'>
             <h4>Profile Details</h4>
             
             <table>
                 <tr>
                     <td><BsFillPersonFill /> Full Name</td>
                     <td>Sudeep</td>
                 </tr>
                 <tr>
                     <td><AiFillPhone /> Number</td>
                     <td>9380216994</td>
                 </tr>
                 <tr>
                     <td><MdEmail /> EmailID</td>
                     <td>sudeepmanasali@gmail.com</td>
                 </tr>
                 <tr>
                     <td><AiFillCreditCard /> Adhar Number</td>
                     <td>5568 8573 2096</td>
                 </tr>
             </table>
             <button className="button"> <MdEdit /> Edit</button>
             <h4>Booking Details</h4>
             
             <table>
                 <tr>
                     <td>Full Name</td>
                     <td>Sudeep</td>
                 </tr>
                 <tr>
                     <td>Mobile Number</td>
                     <td>9380216994</td>
                 </tr>
                 <tr>
                     <td>EmailID</td>
                     <td>sudeepmanasali@gmail.com</td>
                 </tr>
                 <tr>
                     <td>Adhar Number</td>
                     <td>5568 8573 2096</td>
                 </tr>
             </table>
           
        </div>
        </div>
    )
}

export default Hoteldetails
