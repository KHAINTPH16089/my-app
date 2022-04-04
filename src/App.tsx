import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from "react-router-dom";

import './App.css';
import Signin from './page/register/signin';
import Signup from './page/register/signup';
import Product from './page/product/product';
import HomePage from './page/Homepage';
import AdminHomePage from './page/adminHomePage';
import AdminLayout from './page/layouts/AdminLayout';
import ClientLayout from './page/layouts/ClientLayout';
import ProductDetail from './page/product/productDetail';
import ProductForm from './page/adminHomePage/productEdit';
import ProductAdd from './page/adminHomePage/productAdd';
import ProductManager from './page/adminHomePage/productManager';
import Cart from './page/product/card';
import PrivateRouter from './utils/PrivateRouter';
import Contact from './page/contact/contact';
import Introduce from './page/introduce/introduce';
import About from './page/about/about';

function App() {
  return (
    <div className="App">
        {/* {show && <Product />} */}
        <Routes>
          <Route path='/' element={<ClientLayout />}>
            <Route index element={<HomePage />} />
            <Route path='product' >
              <Route index element={<Product />} />
              <Route path=':id' element={<ProductDetail />} />
              <Route path='card' element={<Cart />} />
            </Route>
            <Route path='introduce' element={<Introduce />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />
          </Route>
          <Route path='user'>
            <Route path='signup' element={<Signup />}/>
            <Route path='signin' element={<Signin />}/>
          </Route>
          <Route path='admin' element={<PrivateRouter><AdminLayout /></PrivateRouter>}>
            <Route index element={<AdminHomePage />} />
            <Route path='product' >
              <Route index element={<ProductManager />} />
              <Route path='add' element={<ProductAdd />} />
              <Route path=':id/edit' element={<ProductForm/>} />
            </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
