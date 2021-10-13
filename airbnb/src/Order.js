import React, {useState} from "react"
import "./Order.css";
import {IoIosArrowForward} from "react-icons/io" 
// import Card from "./Card";
import "./Card.css";
import axios from "axios"
import { useHistory } from 'react-router-dom';

import { useStateValue } from './StateProvider';
// import { actionTypes } from './reducer';
function Order(){

    const [{currentBooking,token}] = useStateValue();
    const [disable, setDisable] = useState('False');
    const [cardNum, setcardNum] = useState("");


    const ToogleDisable = ()=>{
        // disable&&cardNum!="" ? setDisable('True') : setDisable('False');
        // if(cardNum==""){
        //     alert("valid card number");
        // }
    }
const history = useHistory();
    const orderConfirm = ()=>{


        var res = window.confirm("Book the hotel");

     

      if(res){
        //   console.log("success");

        axios.post("http://localhost:8000/reservation",{
            data:{"roomId":parseInt(currentBooking.roomId),
            "custId":currentBooking.custId,
            "bookingDate":currentBooking.bookingDate,
            "startDate":currentBooking.startDate,
            "endDate":currentBooking.endDate,
            "amount":currentBooking.amount}
        },{headers:{
            Authorization:"Bearer "+token
        }})
        .then(result=>{
            
            alert(result.data)

            history.push("/")
            
        })
        .catch(err=>{
            alert(err);
        })

      }
      else{
          console.log("Booking Cancelled !!!")
      }
    }
    return (
        <div className="checkout">        
            <div className="hotelInfo">
            < div className="paymentDetails_top">
                    1. Review Trip details <IoIosArrowForward style={{color:"rgba(211,211,211)"}} /> 2.Conform And Pay
                </div>
                <div className='card'>
                    <img src={currentBooking.img} alt="" />
                    <div className="card__info">
                        <h2>{currentBooking.title}</h2>
                        <h3>{currentBooking.desc}</h3>
                        <h3>Start Date : {currentBooking.startDate}</h3>
                        <h3>End Date : {currentBooking.endDate}</h3>

                        <h3>Total : {currentBooking.amount}</h3>

                    </div>
                </div>
            </div>
            <div className="paymentDetails">
               
                <div className="paymentContent">
                    <h3 className="title">Confirm And Pay</h3>
                    <div className="cardInput">
                        {/* <div className="cardLabel">Pay with</div> */}
                        <input type="text" className="cardNum" onChange={(e)=>{setcardNum(e.target.value)}} placeholder = "cardNumber"/>
                    </div>
                    <div className="cancellation">
                        <h2>Cancellation Policy :   Flexible  -- free cancellation</h2>
                        <div className="cancel">
                            Cancel upto 24hours befor check in and get full refund (minus service fee)
                            .Cancel within 24 hours of check in and first night is not refundable.Service fees
                            are refunded if cancellation happens before check in and within 24hrs of booking.


                        </div>
                        <div className="cancel">
                            <input type="checkbox" style={{marginRight:"10px"}} onClick={ToogleDisable} />I agree to the  <span>House rules, Cancellation Policy, </span>
                            and to the Guest Refund Policy, agree to pay the total amount shown,
                            which includes Services fees.
            
                       </div>
                        <button className="confirm_button"  onClick={()=>orderConfirm()} >
                            Conform And Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order 