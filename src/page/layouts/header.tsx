import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { isAuthenticate } from "../../utils/localstorage"

function Header() {
    let users;
    const user = localStorage.getItem("user");
    if(localStorage.getItem("user")){
      users = isAuthenticate();
    }
    
    const navigate = useNavigate();
    const checkLogOut = () => {
     
      const check = window.confirm("bạn có muốn đăng xuất");
      if(check){
        localStorage.removeItem("user");
        navigate("/");
      }
    }
    
    return(
        <>
            <div className="bg-blue-600 pl-10 text-white flex h-8 pt-1">
      RIKKA SHOP - cung cấp đồ phụ kiện anime, cosplay chất lượng
        <div className="flex ml-96">
         
          { user ? <ul className="flex">
            <li><Link to={"/"} onClick={checkLogOut}  id="logout" className="px-4 py-5 hover:text-white cursor-pointer">Đăng xuất</Link></li>
              {users.user.role != 0 ? <li><Link to={"/admin/product"}  id="logout" className="px-4 py-5 hover:text-white cursor-pointer">Admin</Link></li>: null}
            </ul>
            : <ul className="flex">
                <li><Link to="/user/signin" className="px-4 hover:text-white">Đăng Nhập</Link></li>
                <li><Link to="/user/signup" className="hover:text-white">Đăng ký</Link></li>
              </ul>
          }
          
      
          
      
        </div>
      </div>
      <div className="bg-white-100 px-4 h-12 flex">
        
        <div>
          <ul className="flex mt-2 ml-40">
            <li className="ml-4 mr-4 pb-3 hover:text-purple-400 hover:border-b-4 border-purple-400 font-medium"><Link to="/">Trang chủ</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-purple-400 hover:border-b-4 border-purple-400 font-medium"><Link to="product">Sản phẩm</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-purple-400 hover:border-b-4 border-purple-400 font-medium"><Link to="about">Blog</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-purple-400 hover:border-b-4 border-purple-400 font-medium"><Link to="contact">Giới thiệu</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-purple-400 hover:border-b-4 border-purple-400 font-medium"><Link to="">Liên hệ</Link></li>
          </ul>
        </div>
        <div className="flex ml-20 mt">
          <Link to="/product/card">giỏ hàng</Link>
          <i className="fas fa-phone-alt header__call-icon mt-4 ml-4">  -0352606412</i>
          <a href="/cart"><i className="fa-solid fa-cart-plus mt-4 ml-8"></i></a> 
        </div>
      </div>
        </>
    )
}

export default Header;