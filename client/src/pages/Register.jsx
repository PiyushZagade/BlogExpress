import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { RegisterBody } from '../services/user';
import { UserContext } from './../App';

function Register() {



    const [info,setInfo]=useState({
        full_name:'',
        email:'',
        password:'',
        phone_no:''
    })

    const navigate=useNavigate()

    async function onRegister(){
        if(info.full_name.length==0){
            toast.error("Name cannot be Empty")
        }else if(info.email.length==0){
            toast.error("Email cannot be Empty")
        }
        else if(info.password.length==0){
            toast.error("Password cannot be Empty")
        }
        else if(info.phone_no.length==0){
            toast.error("Phone Num cannot be Empty")
        }else{
            const {full_name,email,password,phone_no}=info
            const result=await RegisterBody(full_name,email,password,phone_no);
        
            if(result.status=='success'){
                toast.success("Registered Successfully!")
                navigate('/')
            }else{
                toast.error(result.error)
            }
            
        }
    }


    return (
        <div>
            <div className="container">
                <br />
                <h1 style={{ textAlign: 'center ', margin: '10px' }}>User Registration</h1>

                <hr />
                <br />
                <div className="row">
                    <div className="col"></div>
                   
                    <div className="col">

                        <div className="form-group">
                            <label >Full Name </label>
                            <input type="text" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, full_name:e.target.value})
                            }}
                            placeholder="Enter Full name " />
                        </div>

                        <div className="form-group">
                            <label >Email </label>
                            <input type="email" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, email:e.target.value})
                            }}
                            placeholder="Enter Email " />
                        </div>

                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, password:e.target.value})
                            }}
                            placeholder="Enter Password" />
                        </div>

                        <div className="form-group">
                            <label >Phone Number </label>
                            <input type="tel" className="form-control"
                            onChange={(e)=>{
                                setInfo({...info, phone_no:e.target.value})
                            }}
                            placeholder="Enter Phone Number " />
                        </div>

                        <div>
                            <h6>Already Registered ? <Link to='/'>Login here</Link></h6>
                            <button type="button"  className="btn btn-success btn-block" onClick={onRegister}>Register</button>
                        </div>


                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}

export default Register
