import React from 'react'
import SlideBar from '../Component/SlideBar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { viewAllBlogs } from '../services/blog'
import { useState } from 'react'
import { useEffect } from 'react'
import { BlogContext } from '../App'
import { useContext } from 'react'
import { blogToDelete } from '../services/blog'
import { viewMySpecificBlog } from '../services/blog'

function AllBlogs() {
    const [data, setData] = useState([])
    const { setBlogId } = useContext(BlogContext)
    const navigate = useNavigate()
    const fname = sessionStorage.getItem('full_name');

    async function onView(blog_id) {
        const result = await viewMySpecificBlog(blog_id);
        if (result.status == 'success') {
            const mydata = result.data[0]
            setBlogId(mydata)
            navigate('/detail')
        } else {
            toast.error(result.error);
        }

    }

    async function onUpdate() {
        navigate('/upd')
    }

    async function onDelete(blog_id) {
        const result = await blogToDelete(blog_id);

        if (result.status == 'success') {
            getMyBlogs()
            toast.success("Deleted Successfully")
        } else {
            toast.error(result.error)
        }

    }

    async function getMyBlogs() {
        const result = await viewAllBlogs()
        if (result.status == 'success') {

            setData(result.data)
        } else {
            toast.error(result.data)
        }
    }
    useEffect(() => {
        getMyBlogs()
    }, [])

    return (

        <div>
            <SlideBar />
            <div className="container">
                <h1 style={{ textAlign: 'center ', margin: '10px', color: '#27727E' }}>All Blogs</h1>

                <div className="row">
                    <div className="col"></div>
                    <div className="col-12">
                        <hr />
                        {data.length == 0 && (
                            <h3 style={{ textAlign: 'center ', margin: '10px', color: '#27727D' }}> Empty Blogs add to view Blogs</h3>
                        )}

                        {data.length > 0 && (
                            <table className="table table-hover">

                                <thead className="thead-light text-center">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Author</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((e, index) => {
                                        return (
                                            <tr key={index + 1} className='text-center'>
                                                <th scope="row" >{index + 1}</th>
                                                <td className='w-25'>{e.title}</td>
                                                <td>{e.cattitle}</td>
                                                <td>{
                                                    e.created_time.slice(0, 10) + "  " + e.created_time.slice(11, 19)
                                                } </td>
                                                <td>{e.full_name}</td>
                                                <td>
                                                    {e.full_name === fname && (
                                                        <>
                                                            <button type="button" className="btn btn-outline-success m-1" onClick={() => {
                                                                onView(e.blog_id)
                                                            }}>View</button>
                                                            <button type="button" className="btn btn-outline-warning m-1" onClick={() => {
                                                                onUpdate()
                                                            }}>Update</button>
                                                            <button type="button" className="btn btn-outline-danger m-1" onClick={() => {
                                                                onDelete(e.blog_id)
                                                            }}>Delete</button>
                                                        </>
                                                    )}

                                                </td>
                                            </tr>
                                        )
                                    })}


                                </tbody>
                            </table>
                        )}

                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div >
    )
}

export default AllBlogs
