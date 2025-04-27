import React, { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import AllBlogs from './pages/AllBlogs'
import MyBlogs from './pages/MyBlogs';
import NewBlog from './pages/NewBlog';
import UpdateBlog from './pages/UpdateBlog'
import AddCategory from './pages/AddCategory'
import FindBlog from './pages/FindBlog'
import ViewBlogDetails from './pages/ViewBlogDetails'
import Logout from './Component/Logout'
import Home from './pages/Home'
import UpdateCategory from './pages/UpdateCategory'
import PrivateRoute from './Component/PrivateRoute'


export const UserContext = createContext()
export const CatContext = createContext()
export const BlogContext = createContext()


function App() {

  const [user, setUser] = useState({});
  const [catId, setCatId] = useState([])
  const [blogId, setBlogId] = useState([]);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }} >
        <BlogContext.Provider value={{ blogId, setBlogId }} >
          <CatContext.Provider value={{ catId, setCatId }}>

            <Routes>
              <Route path='/reg' element={<Register />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/' element={<Login />}></Route>
              <Route path='/all' element={<AllBlogs />}></Route>


              <Route path='/my' element={<PrivateRoute> <MyBlogs /></PrivateRoute>}  ></Route>
              <Route path='/new' element={<PrivateRoute>  <NewBlog /> </PrivateRoute>}></Route>
              <Route path='/upd' element={<PrivateRoute> <UpdateBlog /></PrivateRoute>}></Route>
              <Route path='/addcat' element={<PrivateRoute> <AddCategory /> </PrivateRoute>}></Route>
              <Route path='/find' element={<PrivateRoute> <FindBlog /> </PrivateRoute>}></Route>
              <Route path='/detail' element={<PrivateRoute><ViewBlogDetails /> </PrivateRoute>}></Route>
              <Route path='/log' element={<PrivateRoute><Logout /> </PrivateRoute>}></Route>
              <Route path='/updcat' element={<PrivateRoute> <UpdateCategory /></PrivateRoute>}></Route>


            </Routes>
          </CatContext.Provider>
        </BlogContext.Provider>
      </UserContext.Provider>
      <ToastContainer />
    </div>

  )
}

export default App
