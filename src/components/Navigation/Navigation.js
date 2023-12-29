import React from "react";

const Navigation = ({ onRouteChange, isSignedIn })=>{
        if(isSignedIn){
             return (
             <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                       <p onClick={() => onRouteChange('login')} className="f3 link dim black underline pa3 pointer">LogOut</p>
             </nav>
             )
        }else{
          //    return (
          //         <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          //              <p onClick={() => onRouteChange('login')} className="f3 link dim black underline pa3 pointer">Login</p>
          //              <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
          //         </nav>
          //    )   
        }
     
     
         
}

export default Navigation