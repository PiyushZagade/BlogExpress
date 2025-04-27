import { toast } from "react-toastify";
import { config } from "./config";
import axios from "axios"

export async function RegisterBody(full_name,email,password,phone_number){
    try {
        const url=`${config.serverUrl}/user/register`
        const body={
            full_name,email,password,phone_number
        }
        
        const resp=await axios.post(url,body)
        console.log(resp.data)
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

export async function LoginBody(email,password){
    try {
        const url=`${config.serverUrl}/user/login`
        const body={
            email,password
        }
        const token = sessionStorage.getItem('token')
    
        const resp=await axios.post(url,body)
        console.log(resp.data)
        return resp.data
        
    } catch (er) {
        toast.error(er)
    }
}