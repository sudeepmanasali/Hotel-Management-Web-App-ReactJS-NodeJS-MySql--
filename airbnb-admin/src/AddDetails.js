import React,{useState,useEffect} from 'react'
import axios from "axios"
import "./adddetails.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';
function AddDetails() {
    var [price , setPrice]=useState('')
    var [roomType , setRoomType]=useState('')

    var [roomFacility , setRoomFacility]=useState('')
    var [roomImage , setRoomImage]=useState('')


    var [facility, setFacility]=useState("")
    var [facility_details, setFacilityDetails]=useState([])
    var fetchRoomfacilities = "http://localhost:8000/facilities";
    


        
var [uploadPercentage,setPercent] = useState(0);

  async function addfacility(){
    var request = await axios.post("http://localhost:8000/addfacility",{
    
      "facility":facility,
      "facility_cost":price,
   
    
  });
   setFacility('')
   setPrice('')
   ToastsStore.success(`New Facility added successfully `); 

}


var [avatar,setAvatar] = useState() ;


var uploadFile = ({target : { files }})=>{
    // console.log(files[0])
    let data = new FormData();
    data.append('profile', files[0])

    const options = {
        onUploadProgress : (progressEvent)=>{

            console.log(progressEvent)
            const {loaded, total} = progressEvent;
            let percent = Math.floor( (loaded * 100)/total);
            console.log(percent);

            if(percent < 100){
                   setPercent(percent)
            }

            
        }
    }

   
    axios.post("http://localhost:8000/upload",data, options).then(res =>{
        console.log(res.data.profile_url)
        setRoomImage(res.data.profile_url)
        setPercent(100)
        setTimeout(()=>{setPercent(0)},2000)
        ToastsStore.success(`Uploaded Successfully `); 

    })

}

useEffect(()=>{
    async function fetchFacility(){
        var request = await axios.get(fetchRoomfacilities);
       setFacilityDetails(request.data)
    }
        
             fetchFacility();
            
          },[fetchRoomfacilities,addfacility]);

async function addnewroom(){
    var request = await axios.post("http://localhost:8000/addnewroom",{
        roomtype: roomType,
        roomimage:roomImage,
        roomfacility:roomFacility,
        hotelid:1,statusid:2

    });
    ToastsStore.success(`Roon Added Successfully ${request.data}`); 
}



    return (
        <div className="container">
         <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />

              <h4 style={{"textDecoration":"underline"}}>Add New Facility </h4>
              <br></br>
            <div className="add" style={{"marginTop":"15px"}}>
                  
                <label className="label" style={{paddingLeft:"0px"}}> Facility  : </label>
                <input type="text" className="p_input" value={facility} onChange={(e)=>{setFacility(e.target.value)}}/>
                            
                <label className="label" style={{paddingLeft:"0px"}}> Facility  Cost  : </label>
                <input type="text" className="p_input"  value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                        
                <button style={{"backgroundColor":"#392F5A","color":"white","padding":"3px 15px","marginLeft":"10px"}} onClick={addfacility} > Add</button>
            </div>
        <br/>
   
              <br></br>
          	<div className="container-fluid add">
<h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Add New Room</h2>


<label>Room Type</label>
<br></br>
<select onChange={(e)=>setRoomType(parseInt(e.target.value))}>
    <option value={1}>A/c</option>
    <option value={2}>Non A/c</option>

</select>
<br></br>
<label>Room Facilities</label>
<br></br>
<select onChange={(e)=>{setRoomFacility(parseInt(e.target.value))}}>
  {
      facility_details.map((item)=>(
          <option value={item.facility_id}>{item.facility}</option>
      ))
  }
</select>
<br></br>

<label> Upload the Room image </label>

<input type="file" name="profile" onChange={uploadFile} /> 
{uploadPercentage>0 &&  <ProgressBar striped variant="success" now={uploadPercentage} label={`${uploadPercentage}%`} style={{background:"#EFE9AE",color:"black", fontWeight:"800"}} />}

<button  onClick={addnewroom} style={{background:"#5E239D",color:"white",padding:"5px 15px"}}>AddRoom</button>






</div>
        </div>
    )
}

export default AddDetails
