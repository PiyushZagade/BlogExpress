import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState,useEffect } from 'react'
import { catToGet , catToDelete} from '../services/cat'
import { CatContext } from '../App'

function DisplayCategory() {

    const [data, setData] = useState([])
    const {setCatId}=useContext(CatContext)
    const navigate = useNavigate()

    
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


    function onUpdate(id,title,description) {
        setCatId({id,title,description})       

        navigate('/updcat')
    }

    async function onDelete(id) {
        const result =await catToDelete(id)
        if(result.status=='success'){
            displayCat()
            toast.success("Deleted Successfully")
        }else{
            toast.error(result.error)
        }
    }

    return (
        <div>
            <div className="container">
                {data.length == 0 && (
                    <h3 style={{ textAlign: 'center ', margin: '10px', color: '#27727D' }}> Empty Add to view Category  </h3>
                )}

                {data.length > 0 && (
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-8">
                            <hr />
                            <table className="table table-hover">

                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((e, index) => {
                                        return (
                                            <tr key={e.category_id}>
                                                <th scope="row" >{index+1}</th>
                                                <td>{e.title}</td>
                                                <td>{e.description}</td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-warning m-1" onClick={()=>{
                                                        onUpdate(e.category_id,e.title,e.description)
                                                    }}>Update</button>
                                                    <button type="button" className="btn btn-outline-danger m-1" onClick={()=>{
                                                        onDelete(e.category_id)
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <div className="col"></div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default DisplayCategory
