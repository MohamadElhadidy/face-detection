import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css'

const Logo = () => {
     return (
       <div className="ma4 mt0">
               <Tilt className="Tilt br2 shadow-2" style={{ height: 150, width: 150 }} >
                    <img style={{ paddingTop:'20px' }} width='100' src={brain} alt="logo" />
               </Tilt>
       </div>
     )
}

export default Logo