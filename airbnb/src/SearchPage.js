
import React,{useState,useEffect} from 'react'
import "./SearchPage.css"
import SearchResult from './SearchResult'
import axios from "axios"

import { useParams } from 'react-router-dom'

import { useStateValue } from './StateProvider';

function SearchPage() {
    
  var [details,setDetails] = useState([]);
  const [{user_details}] = useStateValue();
    
    var [hotelRooms,setRooms] = useState([]);
    var [hoteldetails,setHotelDetails] = useState({});

    var [aminities,setAminities] = useState([]);
    var [types,setTypes] = useState([]);
    var filters = [];

    let [filter_category,setFilter] = useState([]);

    useEffect(()=>{
      filters = filter_category;

      if (filter_category.length>0){
        let temp=[]
        for(let i=0;i<filter_category.length;i++){
          hotelRooms.map((item)=>{
            if(item.facility === filter_category[i])
              {
                      temp.push(item);
              }
          }) 
        }

        for(let i=0;i<filter_category.length;i++){
          hotelRooms.map((item)=>{
            if(item.type_name === filter_category[i])
              {
                      temp.push(item);
              }
          }) 
        }

          
          setRooms(temp);
      }
      else if(filter_category.length===0){
         setRooms(details)
      }
      
     
    },[filter_category])


    var  { startdate, enddate, persons } = useParams();
 

    startdate=new Date(startdate)
    enddate = new Date(enddate)

    var Difference_In_Time = startdate.getTime() - enddate.getTime(); 
    
    var numberOfDays = Difference_In_Time / (1000 * 3600 * 24); 
    var months = ["January","Febrauary","March","April","May","June","July","August","September","October","November","December"]

    function formatedate(date){

      return(date.getFullYear() +"-"+(date.getMonth()+1) +"-"+date.getDate()) 
    }
  
    var start_date=formatedate(startdate);
    var end_date =formatedate(enddate);

    var rooms=`http://localhost:8000/rooms/details/${start_date}/${end_date}`;
    var aminitiesUrl="http://localhost:8000/rooms/aminities";
    var typesUrl = "http://localhost:8000/room/types";
    var hotel="http://localhost:8000/hotel/details";

    useEffect(()=>{


          axios.get(hotel)
          .then(res=>{
            
            setHotelDetails(res.data)
          })
          .catch((err)=>{
            alert(err);
          })
  },[hotel])





    useEffect(()=>{
   

            axios.get(rooms)
            .then(res=>{
              setRooms(res.data);
              setDetails(res.data);
            })
            .catch((err)=>{
              alert(err);
            })


    },[rooms])

    useEffect(()=>{

            axios.get(aminitiesUrl)
            .then(res=>{
              
              setAminities(res.data)
            })
            .catch((err)=>{
              alert(err);
            })
    },[aminitiesUrl])


    useEffect(()=>{
             axios.get(typesUrl)
            .then(res=>{
              
              setTypes(res.data)
            })
            .catch((err)=>{
              alert(err);
            })
            
    },[typesUrl])
    
 



    var add_filter = (e)=>{
         
         if(e.target.checked === true){
             if(filter_category.indexOf(e.target.id)<0){
               setFilter([...filter_category,e.target.id]);
             }
             
         
            
         }
         else if(e.target.checked == false){
            if(filters.indexOf(e.target.id)>=0){
              filter_category.splice(filters.indexOf(e.target.id),1);
              setFilter(filter_category);
            }
           
        }
       
      
        
    }


    return (
        <div className="searchPage">
            <div className="searchPage_info">
                 <p>{numberOfDays} stays- {startdate.getDate()}th {months[startdate.getMonth()]} to {enddate.getDate()}th {months[enddate.getMonth()]} - {persons} guests</p>
                 <h1>Stays nearby  </h1>
               <div className="categories">
               
                 {
             
  
               filter_category.map((fil)=>(
             
                <span className="chip">
                    {fil} 
                   
                    </span> ))
               
           }
    
           </div>
     
                 
            </div>

<div className="contents">
            <div className="sidebar">
                <div className="title">
                   <span className="name">
                        FILTERS
                   </span>
                   <button className="name2" onClick={()=>{
                       setFilter([])
                       setRooms(details);
                       const d = document.querySelectorAll("input");
                       
                       let z=0
                       for(z=0;z<d.length;z++){
                          d[z].checked = false;
                       }
                  
                   }}>
                      CLEAR ALL
                   </button>

                </div>

                <div className="title" style={{border:"none"}}>
                   <span className="name" style={{fontSize:"13px",border:"none"}}>
                        AMINITIES
                   </span>
                
                </div>
                <div className="search_categories">
                {
                       aminities.map((item)=>(
                           <div >
                        <input type="checkbox" id={item.facility} value={item.facility_id} className="checkbox" onChange={add_filter}></input>
                         <label for={item.facility} id={item.facility} className="label" onclick={add_filter}>{item.facility}</label>
                           </div>
    ))
                   }
                 
                </div>

                <div className="title" style={{border:"none"}}>
                   <span className="name" style={{fontSize:"13px",border:"none"}}>
                        ROOM TYPES
                   </span>
                
                </div>
                <div className="search_categories">
                {
                       types.map((item)=>(
                           <div>
                        <input type="checkbox" id={item.type_name} value={item.type_id} className="checkbox" onChange={add_filter}></input>
                         <label for={item.type_name} className="label">{item.type_name}</label>
                           </div>
    ))
                   }
                 
                </div>
               
            </div>
            <div className="main_content">

              {


hotelRooms.length >0?
                  hotelRooms.map((item)=>(
                    

                    
                    <SearchResult
                    img={item.images}
                    location={hoteldetails[0].hotel_addr}
                    title={hoteldetails[0].hotel_name}
                    description={item.facility}
                    star={4.23}
                    price={(item.cost+item.facility_cost)*persons}
                    total={item.cost+item.facility_cost}
                    roomId={item.room_id}
                    hotelId={hoteldetails.hotel_id}
                    startDate={startdate}
                    endDate={enddate}
                    custId={user_details.cust_id}
                />
                  
                  
                  ))
                  :   <h2 style={{textAlign:"center",color:"red"}}>No Results</h2> 
              }
            </div>
</div>
            
        </div>
    )
}

export default SearchPage
