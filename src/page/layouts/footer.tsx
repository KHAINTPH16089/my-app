import React from "react";

function Footer() {
    return(
        <>
            <div className="grid grid-cols-3 gab-4 px-20 pb-8 mt-8 bg-red-100 border border-t-2 border-purple-300 pt-4">
        <div className="flex flex-col items-start">
          <h1 className="font-medium">PHÁP LÝ & CÂU HỎI</h1>
          <ul className="pr-20 flex flex-col items-start">
            <li className="hover:text-red-400 hover:border-b border-red-400"><a href="#">Tìm kiếm</a></li>
            <li className="hover:text-red-400 hover:border-b border-red-400"><a href="#">Giới thiệu</a></li>
            <li className="hover:text-red-400 hover:border-b border-red-400"><a href="#">Chính sách đổi trả</a></li>
            <li className="hover:text-red-400 hover:border-b border-red-400"><a href="#">Chính sách bảo mật</a></li>
            <li className="hover:text-red-400 hover:border-b border-red-400"><a href="#">Điều khoản dịch vụ</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-start">
          <h1>THÔNG TIN LIÊN HỆ</h1>
          <ul className="flex flex-col items-start">
            <li>Địa chỉ ...</li>
            <li>Điện thoại: 0352606412</li>
            <li>Mail: rikkashop@gmail.com</li>
          </ul>
        </div>
        <div>

        </div>
      </div>
      <div className="bg-black">
        <p className="text-center text-white">Copyright © 2022 Rikka shop. Powered by kazuo</p>
      </div>
        </>
    )
}

export default Footer;