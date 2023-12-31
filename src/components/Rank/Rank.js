import React from "react";
const Rank = ({ user }) => {
     return (
          <>
               <div className="white f3 font-bold">
                   Hi {`${user.name}, Your current usage is`} <span className=" text-4xl text-yellow-400">{user.entries}</span>
          </div>
          {/* <div className="white f1">
                    {user.entries === 0 ? ' ' : `# ${user.entries}`}
          </div> */}
          </>
     )
}

export default Rank