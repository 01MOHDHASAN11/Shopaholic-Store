import Navbaar from './components/header/Navbaar';
import './App.css';
import Newnav from './components/header/newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignIn from './components/signup_sign/SignIn';
import SignUp from './components/signup_sign/SignUp';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import {Routes,Route} from "react-router-dom"
import { useEffect } from 'react';
import { useState } from 'react';
import  CircularProgress  from '@mui/material/CircularProgress';


function App() {
  const [data,setData] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setData(true)
    }, 2000);
  },[])

  return (
    <>
    {
      data ? (
        <>
    
      <Navbaar/>
      <Newnav/>
      <Routes>
        <Route path='/' element={<Maincomp />}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/register' element={<SignUp />}/>
        <Route path='/getproductsone/:id' element={<Cart />}/>
        <Route path='/buynow' element={<Buynow />}/>
      </Routes>
      <Footer/>
      
    </>
  
  ):(
    <div className='circle'>
      <CircularProgress/>
      <h2>Loading...</h2>
    </div>
  )
}
</>
)
}

export default App;
