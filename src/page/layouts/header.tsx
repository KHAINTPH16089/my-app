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
          <div className="text-black pl-10 h-8 pt-1 flex justify-between">
          <p className="mr-48">HOTLINE: 0352606412</p> 
          <div className=" flex mr-12 text-gray-400">
          <ul className="flex">
                  <li><Link to="/product/cart" className="px-4 hover:text-orange-300 border-r-2">giỏ hàng</Link></li>
                </ul>
            { user ? <ul className="flex">
              <li><Link to={"/"} onClick={checkLogOut}  id="logout" className="px-4  hover:text-orange-300 cursor-pointer border-r-2">Đăng xuất</Link></li>
                {users.user.role != 0 ? <li><Link to={"/admin/product"}  id="logout" className="px-4 py-5 hover:text-orange-300 cursor-pointer">Admin</Link></li>: null}
              </ul>
              : <ul className="flex">
                  <li><Link to="/user/signin" className="px-4 hover:text-orange-300 border-r-2">Đăng Nhập</Link></li>
                  <li><Link to="/user/signup" className="px-4 hover:text-orange-300">Đăng ký</Link></li>
                </ul>
            }

          </div>
      </div>
      <hr />
      <div className="bg-white-100 px-4 h-12 flex justify-between pb-20 mr-6">
        <div className="">
            <img className="w-48" src="https://shopdidong.vn/profiles/shopdidongvn/uploads/attach/1615355226_686868.jpg" alt="" />
        </div>
        <div className="ml-80">
          <ul className="flex mt-2 pt-3">
            <li className="ml-4 mr-4 pb-3 hover:text-red-400 hover:border-b-4 border-purple-400 font-semibold"><Link className="hover:text-red-400" to="/">Trang chủ</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-red-400 hover:border-b-4 border-purple-400 font-semibold"><Link className="hover:text-red-400" to="product">Sản phẩm</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-red-400 hover:border-b-4 border-purple-400 font-semibold"><Link className="hover:text-red-400" to="about">Blog</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-red-400 hover:border-b-4 border-purple-400 font-semibold"><Link className="hover:text-red-400" to="introduce">Giới thiệu</Link></li>
            <li className="ml-4 mr-4 pb-3 hover:text-red-400 hover:border-b-4 border-purple-400 font-semibold"><Link className="hover:text-red-400" to="contact">Liên hệ</Link></li>
          </ul>
        </div>
      </div>
        </>
    )
}

export default Header;