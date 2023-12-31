import React from "react";
import './FaceRecognition.css';
const FaceRecognition = ({ imageUrl, boxes }) => {
     return (
          <div className="center ma mb-4">
          <div className="absolute mt2">
                    <img id='imageInput' src={imageUrl} alt='' width='500px' height='auto' className=" mb-2"/>
                    {boxes.map((box, index) => {
                         return <div key={index} className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>

               })}
          </div>
          </div>
     )
}

export default FaceRecognition 