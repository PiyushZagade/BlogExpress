import React, { useContext } from 'react'
import SlideBar from '../Component/SlideBar'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BlogContext } from '../App'
import { useState } from 'react'
import { useEffect } from 'react'
import { blogToDelete } from '../services/blog'



function ViewBlogDetails() {

  
    const { blogId } = useContext(BlogContext);
    const navigate = useNavigate()

    async function onUpdate() {
        navigate('/upd')
    }

    async function onDelete(blog_id) {
            const result = await blogToDelete(blog_id);
        
            if(result.status=='success'){
                navigate(-1)
                toast.success("Deleted Successfully")
                
            }else{
                toast.error(result.error)
            }
            
        }

    function onPrevious(){
        navigate(-1);
    }

   
    useEffect(() => {
        console.log(blogId)
        
    }, [])

    return (
        <div>
            <SlideBar />
            <div className="container">

                <h1 style={{ textAlign: 'center ', margin: '10px' }}>Blog Details</h1>
                <hr />
                <div className="row m-4">

                    <div className="col"></div>


                    {/* {data.map((e, i) => {
                        return (
                            
                        )
                    })} */}

                    <div className="col-8 border border-primary rounded p-4">
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <h5 className='m-1 w-25'>Blog Title : </h5>
                            <p className='m-1 w-100'>{blogId.title} </p>
                        </div>

                        <div className="form-group d-flex justify-content-center align-items-center">
                            <h5 className='m-1 w-25'>Category : </h5>
                            <p className='m-1 w-100'>{blogId.cattitle}  </p>
                        </div>

                        <div className="form-group d-flex justify-content-center align-items-center">
                            <h5 className='m-1 w-25'>Content :</h5>
                            <p className='m-1 w-100'>{blogId.contents} </p>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-outline-warning m-1" onClick={onUpdate}>Update</button>
                            <button type="button" className="btn btn-outline-danger m-1" onClick={()=>{
                                onDelete(blogId.blog_id)
                            }}>Delete</button>
                            <button type="button" className="btn btn-danger m-1" onClick={onPrevious}>Go Back</button>
                        </div>
                    </div>

                    <div className="col"></div>

                </div>

            </div>
        </div>
    )
}

export default ViewBlogDetails
