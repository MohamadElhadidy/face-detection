import React from "react";
const Rank = ({ user }) => {
     return (
          <>
          <div className="white f3">
               {`${user.name}, your current entry count is....`} 
          </div>
          <div className="white f1">
                    {user.entries === 0 ? ' ' : `# ${user.entries}`}
          </div>
          </>
     )
}

export default Rank