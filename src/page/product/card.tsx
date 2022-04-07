import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom";
type cartType = {
  _id:string, name:string, price:number, image:string, quantily: 1
}
function Card() {
    const [carts , setCarts] = useState<cartType[]>([])
    const [total ,setTotal] = useState(0);
    const cart = JSON.parse(localStorage.getItem("cart") as string);
    useEffect(()=>{
      const getTotal = () => {
        
      }

      
      setCarts(cart);
      getTotal()
    },[])
    
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
          {carts.map((data)=>
          <tr key={data._id} className="mt-6">
            <td>{data.name}</td>
            <td><img src="${data.img}" alt="" className="w-12"/></td>
            <td>{data.price}</td>
            <td>
              <input data-id="${data.id}" className="btn btn-decrease border border-gray-200 w-6 bg-gray-200" type="button" value="-"/>
              <input className="border border-gray-200 pl-2" type="text" value={data.quantily} id="quantity" name="quantily" min="1"/>
              <input data-id="${data.id}" className="btn btn-increase border border-gray-200 w-6 bg-gray-200" type="button" value="+"/>
            </td>
            <td>{data.price * data.quantily}</td>
            <div className="hidden"></div>
            <td><button className="btn btn-remove w-16 h-6 border border-red-500 hover:bg-purple-500">xóa</button></td>
          </tr>
        )}
        </tbody>
      </table>
      <div className="mt-6 font-extrabold"><span>Tổng tiền: </span><span>{total}</span></div>
      <button className="border border-red-500 w-28 h-8 ml-10 mt-6 hover:bg-purple-500"><Link to="/product/checkOut">Đặt hàng</Link></button>
    </form>
  </div>
        </>
        
    )
}
export default Card;