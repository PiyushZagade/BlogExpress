import { toast } from "react-toastify";
import { config } from './config';
import axios from "axios"


//remaining
export async function blogToAdd(title, category_id,contents){
    try {
        const url=`${config.serverUrl}/blog/add-blog`
        const body={
            title, category_id,contents
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



export async function viewMyBlogs(){
    try {
        const url=`${config.serverUrl}/blog/`

        const token=sessionStorage.getItem('token')
    
        const resp=await axios.get(url,{
            headers:{
                token
            }
        })

        // console.log(resp)
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

export async function viewAllBlogs(){
    try {
        const url=`${config.serverUrl}/blog/all`

        const token=sessionStorage.getItem('token')
    
        const resp=await axios.get(url,{
            headers:{
                token
            }
        })

        // console.log(resp)
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

export async function getByTitle(title){
    try {
        const url=`${config.serverUrl}/blog/title?title=${title}`

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



export async function viewMySpecificBlog(id){
    try {
        const url=`${config.serverUrl}/blog/${id}`

        const token=sessionStorage.getItem('token')
    
        const resp=await axios.get(url,{
            headers:{
                token
            }
        })

        // console.log(resp)
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

export async function blogToDelete(id){
    try {
        const url=`${config.serverUrl}/blog/${id}`
        
        const token=sessionStorage.getItem('token')
        const resp=await axios.delete(url,{
            headers:{
                token
            }
        })
        // console.log(resp.data)   
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

export async function updateBlog(blogId, category_id,title,contents){
    try {
    

        const url=`${config.serverUrl}/blog/update/${blogId}`

        const body={
            category_id,title, contents
        }
        
        const token=sessionStorage.getItem('token')

        const resp=await axios.put(url,body,{
            headers:{
                token
            }
        })
        
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}

