import React from 'react'
import image from "./new-logo.jpg"
import "./reloader.css"
function Fallback() {
    return (
        <div className="reloader">
            <img src={image} className="reloader_image" />
        </div>
    )
}

export default Fallback



