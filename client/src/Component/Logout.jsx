import React from 'react'
import { Link } from 'react-router-dom'

function Logout() {
  return (
    <div >
      <div className="container  ">
        <div className="row m-5">
            <div className="col"></div>
            <div className="col-4  border rounded  ">
                <h2 style={{ textAlign:'center' ,color:'#512888'}}>BlogExpress</h2>
                <p>Thank you for using our BlogExpress App</p>
                <p>Do visit Again  <Link to='/'>Login here</Link> </p>
            </div>
            <div className="col"></div>
        </div>
      </div>
    </div>
  )
}

export default Logout
