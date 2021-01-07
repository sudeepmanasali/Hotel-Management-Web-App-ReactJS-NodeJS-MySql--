// import { Card } from '@material-ui/core'
import React , {useEffect,useState} from 'react'
import Banner from './Banner'
import "./Home.css"
import ProgressBar from 'react-bootstrap/ProgressBar'

// import Card from "./Card"
import axios from "axios"
// rfce is a ES7 code snippet
function Home() {



    return (
        <div className="home">
            {/* <h1>HOme</h1> */}
            <Banner />
            <div className='home_section'>
        
            </div>
           

        </div>
    )
}

export default Home
