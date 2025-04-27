import React, { useContext } from 'react'
import SlideBar from '../Component/SlideBar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { CatContext } from '../App'
import { updateCat } from '../services/cat'

function UpdateCategory() {

    const { catId } = useContext(CatContext)
    console.log(catId)
    
    const [cat, setCat] = useState({
        title: '',
        description: ''
    })

    const navigate = useNavigate()

    async function onUpdateCategory() {
        //validation part 
        if (cat.title.length == 0) {
            toast.error('Title cannot be empty')
        } else if (cat.description.length == 0) {
            toast.error('Description cannot be empty')
        } else {
            //validation part here
            const { title, description } = cat
            const result = await updateCat(catId,   title, description)
            
            if (result.status == 'success') {
                navigate('/addcat')
                toast.success("Category Updated Successfully")
            } else {
                toast.error(result.error)
            }
        }
    }

    async function onCancelCategory() {
        navigate(-1)
    }


    return (
        <div>

            <SlideBar />
            <div className="container">
                <h1 style={{ textAlign: 'center ', margin: '10px', color: '#E5770B' }}>Update Category </h1>
                <hr />
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">

                        <div className="form-group">
                            <label >Category Id</label>
                            <input type="text" className="form-control" readOnly placeholder={catId.id}
                            />
                        </div>
                        <div className="form-group">
                            <label >Category Title</label>
                            <input type="text" className="form-control" placeholder="Enter category"

                            value={cat.title}   
                             onChange={(e) => {
                                    setCat({ ...cat, title: e.target.value })
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label >Category Description</label>
                            <textarea className="form-control" 
                            value={cat.description}
                            id="exampleFormControlTextarea1" rows="4"
                                onChange={(e) => {
                                    setCat({ ...cat, description: e.target.value })
                                }}
                            ></textarea>
                        </div>

                        <div className='d-flex justify-content-center align-items-center'>
                            <button type="button" className="btn btn-primary m-1" onClick={onUpdateCategory}>Update</button>
                            <button type="button" className="btn btn-danger m-1" onClick={onCancelCategory}>Cancel</button>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>


        </div>
    )
}

export default UpdateCategory
