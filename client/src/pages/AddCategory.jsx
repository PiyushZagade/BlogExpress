import React, { useEffect } from 'react'
import SlideBar from '../Component/SlideBar'
import DisplayCategory from './DisplayCategory'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { CatToAdd } from '../services/cat'
import { catToGet } from '../services/cat'


function AddCategory() {
    const [data,setData] =useState([])
    const[cat,setCat]=useState({
        title:'',
        description:''
    })

        async function displayCat() {
            const result = await catToGet()
            if (result.status == 'success') {
                
                setData(result.data)
            } else {
                toast.error(result.data)
            }
        }   
    
        useEffect(() => {
            displayCat()
        }, [])



     async function onAddCategory(){
        //validation part 
        if(cat.title.length==0){
            toast.error('Title cannot be empty')
        }else if(cat.description.length==0){
            toast.error('Description cannot be empty')
        }else{
            //validation part here
            const {title,description}=cat
            const result=await CatToAdd(title,description)
            if(result.status=='success'){
                displayCat()
                toast.success("Category Added Successfully")

            }else{
                toast.error(result.error)
            } 
        }
     }

     

    return (
        <div>
            <SlideBar />
            <div className="container">
                <h1 style={{ textAlign: 'center ', margin: '10px', color:'#27727D' }}>Add Category </h1>
                <hr />
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">

                        <div className="form-group">
                            <label >Category Title</label>
                            <input type="text" className="form-control" placeholder="Enter Category Title"
                            onChange={(e)=>{
                                setCat({...cat, title:e.target.value})
                            }}
                            />
                        </div>

                        <div className="form-group">
                            <label >Category Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" 
                            onChange={(e)=>{
                                setCat({...cat, description:e.target.value})
                            }}
                            ></textarea>
                        </div>

                        <div className='d-flex justify-content-center align-items-center'>
                            <button type="button" className="btn btn-primary m-1" onClick={onAddCategory}>Add Category</button>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>

            <DisplayCategory/>

        </div>
    )
}

export default AddCategory
