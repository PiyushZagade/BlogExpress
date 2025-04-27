import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { toast } from 'react-toastify';


function SlideBar() {

    const navigate = useNavigate();
    const fullname =sessionStorage.getItem('full_name')
   

    function onLogout() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('full_name')
        sessionStorage.removeItem('phone_no')
        toast.success('Logout Successful')
        navigate('/log')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <Link className='navbar-brand' to='/home' style={{ color: '#512888' }}>BlogExpress App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item active">
                        <Link className='nav-link' to='/new'>New Blog</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/all'>All Blogs</Link>
                    </li>

                    <li className="nav-item">
                        <Link className='nav-link' to='/my'>My Blogs</Link>
                    </li>

                    <li className="nav-item">
                        <Link className='nav-link' to='/find'>Find Blog</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/addcat' >Categories</Link>
                    </li>


                </ul>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 style={{ margin: '5px', padding: '5px', color: '#0000D7' }}> Hello,  {fullname}</h6>
                <button type="button" className="btn btn-outline-info " onClick={onLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default SlideBar
