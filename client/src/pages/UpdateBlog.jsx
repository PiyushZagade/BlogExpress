import React, { useContext } from 'react'
import SlideBar from '../Component/SlideBar'
import { useNavigate } from 'react-router-dom'
import { updateBlog } from '../services/blog'
import { useState, useEffect } from 'react'
import { catToGet } from '../services/cat'
import { BlogContext } from '../App'
import { toast } from 'react-toastify'

function UpdateBlog() {
  const [data, setData] = useState([])
    const [blog, setBlog] = useState({
        title: '',
        category_id: '',
        contents: ''
      })

      const {blogId}=useContext(BlogContext);

    
    const navigate=useNavigate()

    async function onCancel(){
        navigate(-1)
    }

    
    
       async function displayCat() {
              const result = await catToGet()
              if (result.status == 'success') {
                  
                  setData(result.data)
              } else {
                  toast.error(result.data)
              }
          }   
      
          useEffect(() => {
            console.log(blogId)
              displayCat()
          }, [])


            async function onUpdBlog() {
              //validation
              if (blog.title.length == 0) {
                toast.error("Title cannot be empty")
              } else if (blog.category_id.length == 0) {
                toast.error("Select one category")
              }
              else if (blog.contents.length == 0) {
                toast.error("contents cannot be empty")
              } else {
                // axios code
      
                const { category_id,title,contents} = blog
                const result = await updateBlog(blogId.blog_id,category_id,title,contents)
                
                if (result.status == 'success') {
                  toast.success("Blog Updated Successfully")
                  navigate('/all')
                } else {
                  toast.error(result.error)
                }
                
              }
          
            }

    return (
        <div>
            <SlideBar />
      <div className="container">
        <h1 style={{ textAlign: 'center ', margin: '10px' }}>Create New Blog</h1>
        <hr />
        <div className="row">
          <div className="col"></div>
          <div className="col-6">

            <div className="form-group">
              <label >Blog Id and Title</label>
              <input type="text" className="form-control" placeholder={blogId.blog_id + "  " + blogId.title} readOnly/>
            </div>
            <div className="form-group">
              <label >Title</label>
              <input type="text" className="form-control" placeholder={blogId.title}
              value={blog.title}
                onChange={(e) => {
                  setBlog({ ...blog, title: e.target.value })
                }}
              />
            </div>

            

            <div className="form-group">
              <label >Category</label>
              <select className="form-control"
              value={blog.category_id}
              onChange={(e) => {
                setBlog({ ...blog, category_id: e.target.value })
              }}  >
                <option>  --Select below--  </option>
                {data.map((e,i)=>{
                  return (
                    <option key={i+1} value={e.category_id}>{e.title}</option>
                  )
                })}
              </select>
            </div>

            <div className="form-group">
              <label >Content</label>
              <textarea className="form-control" rows="4"
                onChange={(e) => {
                  setBlog({ ...blog, contents: e.target.value })
                }}
              ></textarea>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
              <button type="button" className="btn btn-primary m-1" onClick={onUpdBlog} >Update Blog</button>
              <button type="button" className="btn btn-danger m-1" onClick={onCancel}>Cancel</button>

            </div>


          </div>
          <div className="col"></div>
        </div>

      </div>
        </div>
    )
}

export default UpdateBlog
