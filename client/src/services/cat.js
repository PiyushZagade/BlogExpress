import { toast } from "react-toastify";
import { config } from './config';
import axios from "axios"


export async function CatToAdd(title,description){
    try {
        const url=`${config.serverUrl}/category/add-category`
        const body={
            title,description
        }
    
        const token=sessionStorage.getItem('token')
    
        const resp=await axios.post(url,body,{
            headers:{
                token
            }
        })

        return resp.data
    } catch (err) {
        toast.error(err)
    }
}


export async function catToGet(){
    try {
        const url=`${config.serverUrl}/category/`

        const token=sessionStorage.getItem('token')
        const resp=await axios.get(url,{
            headers:{
                token
            }
        })
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

export async function catToDelete(id){
    try {
        const url=`${config.serverUrl}/category/${id}`
        
        const token=sessionStorage.getItem('token')
        const resp=await axios.delete(url,{
            headers:{
                token
            }
        })
        
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}




export async function updateCat(id,title, description){
    try {
    
        const url=`${config.serverUrl}/category/update/${id}`

        const body={
            title, description
        }
        
        const token=sessionStorage.getItem('token')

        const resp=await axios.put(url,body,{
            headers:{
                token
            }
        })
        console.log(resp)
        console.log(body)
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}


