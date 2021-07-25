import React ,{useState,useEffect} from 'react';
import './Profile.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from "axios"

import { useStateValue } from './StateProvider';


function Profile() {
    var [customer,setCustomer]=useState([]);
    var customerUrl="http://localhost:8000/customer"
    const [{user_details}, dispatch] = useStateValue();

    var [edit_email,setEditEmail]=useState(user_details.cust_email);
    var [edit_password,setEditPassword]=useState(user_details.cust_password);
    
    var [edit_name,setEditName]=useState(user_details.cust_name);
    var [edit_phone,setEditPhone]=useState(user_details.cust_phone);

    useEffect(()=>{
        async function fetchCustomer(){
                var request = await axios.get(customerUrl);
               setCustomer(request.data)
            console.log(request.data)
            }

            fetchCustomer();
    },[customerUrl])

    var [disable,setDisable] = useState(true)

    var editUrl = "http://localhost:8000/editcustomer"

     async function edit(){
        setDisable(!disable);
        axios.post(editUrl,{
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token
            },
            body : JSON.stringify({    "username":edit_name,
                "useremail":edit_email,
                "phone":edit_phone,
                "password":edit_password,
                "custid":user_details.cust_id}),


        }).then(res=>{
            alert(res)
        }).catch(err=>{alert(err);});

    }
    return (

    
        
        <div className='profile'>
            
             <h4>Profile Details</h4>
            
             
             <table>
                 <tr>
                     <td><BsFillPersonFill /> Full Name</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_name} onChange={(e)=>{setEditName(e.target.value)}} disabled={disable}/></td>
                 </tr>
                 <tr>
                     <td><AiFillPhone /> Number</td>
                     <td><input type="number" className="p_input" placeholder={user_details.cust_phone} onChange={(e)=>{setEditPhone(e.target.value)}} disabled={disable}/></td>
                 </tr>
                 <tr>
                     <td><MdEmail /> EmailID</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_email} onChange={(e)=>{setEditEmail(e.target.value)}} disabled={disable}/></td>
                 </tr>
                 <tr>
                     <td><AiFillCreditCard /> Password</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_password} onChange={(e)=>{setEditPassword(e.target.value)}} disabled={disable}/></td>
                 </tr>
             </table>
             <button className="button" onClick={edit}> {(disable) ? ( <MdEdit /> ): "Save"}</button>
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
    )
}

export default Profile