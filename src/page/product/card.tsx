import React, {useState} from "react"

function Cart() {
    return(
        <>
            <div className="mx-6 mt-6">
            <h4 className="mt-2 mb-6 font-extrabold">GIỎ HÀNG CỦA BẠN </h4>
  <hr/>
    <form action="">
    
      <table className="w-full text-center">
        <thead>
          <tr className="mt-4 font-extrabold">
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>tổng giá sản phẩm</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody className="mt-6">
        
          <tr className="mt-6">
            <td></td>
            <td><img src="${item.img}" alt="" className="w-12"/></td>
            <td></td>
            <td>
              <input data-id="${item.id}" className="btn btn-decrease border border-gray-200 w-6 bg-gray-200" type="button" value="-"/>
              <input className="border border-gray-200 pl-2" type="text" value="${item.quantity}" id="quantity" name="quantily" min="1"/>
              <input data-id="${item.id}" className="btn btn-increase border border-gray-200 w-6 bg-gray-200" type="button" value="+"/>
            </td>
            <td></td>
            <div className="hidden"></div>
            <td><button className="btn btn-remove w-16 h-6 border border-red-500 hover:bg-purple-500">xóa</button></td>
          </tr>

        </tbody>
      </table>
      <div className="mt-6 font-extrabold"><span>Tổng tiền: </span><span></span></div>
      <button className="border border-red-500 w-28 h-8 ml-10 mt-6 hover:bg-purple-500"><a href="/#/cart/checkout">Đặt hàng</a></button>
    </form>
  </div>
        </>
        
    )
}
export default Cart;