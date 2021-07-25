import React,{useState} from 'react'
import "./Search.css"
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import {DateRangePicker} from "react-date-range"
import PeopleIcon from "@material-ui/icons/People"
import { Button } from '@material-ui/core';
import {useHistory} from "react-router-dom"



function Search() {
    const history=useHistory()
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    var [input_value,setInput] = useState("");


    const selectionRange = {
        startDate:startDate,
        endDate:endDate,
        key:"selection",
    }


    function handleSelect(ranges){
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
 

    }

    function handleInput(e){
        setInput(e.target.value);
    }



    return (
        <div className="search">
            <DateRangePicker ranges={[selectionRange]}  onChange={handleSelect} />
            <h2>Number of guests    <PeopleIcon /></h2>
         
            <input type="number" min={0} defaultValue={2} onChange={handleInput}/>
            <Button onClick = {()=>{ history.push("/search/"+startDate+"/"+endDate+"/"+input_value)}}>SearchAirbnb</Button>
        </div>
    )
}

export default Search
