import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Product from './components/product/Product'
import Cart from './components/cart/Cart'
import Header from './components/header/Header'
import Productpiechart from './components/productPieChart/Productpiechart'

const App = () => {
  const PrivateRoute = ({ children }) => {
    return localStorage.getItem('token') ? <> <Header /> {children} </> : <Navigate to="/" />
  }
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><Product/></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} />
        <Route path="/pichart" element={<PrivateRoute><Productpiechart/></PrivateRoute>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App