import React,{useState,useEffect} from 'react'
import axios from "axios"


function EditRoomPrice() {
    var [types,setTypes]=useState([])


    var fetchRoomType = "http://localhost:8000/room_types"

    useEffect(()=>{

        async function fetch_type(){
        var request =await axios.get(fetchRoomType);
        console.log(request.data);
        
        setTypes(request.data);


        }
        fetch_type()
     

    },[fetchRoomType])

  

    return (
        <div className="container">

{
               types.map((item)=>(
           <div >
                    <h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Edit Hotel</h2>
                 
                 <label className="label" style={{paddingLeft:"0px"}}>{item.type_name} </label>
           
        </div>
               ))
             }
      
      <button className="button" > Save</button>
            
        </div>
    )
}

export default EditRoomPrice
