import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom";
type cartType = {
  _id:string, name:string, price:number, image:string, quantily: number
}
function Card() {
    let sum = 0;
    let result = 0;
    const [carts , setCarts] = useState<cartType[]>([])
    const cart = JSON.parse(localStorage.getItem("cart") as string);
    useEffect(()=>{
      setCarts(cart);
      
    },[])
    useEffect(()=>{
      localStorage.setItem("cart", JSON.stringify(carts));
    },[carts])
    
    const increment = (id :string) => {
      carts.map(item => {
        if(item._id === id){
          item.quantily += 1 ;
        }
      })
      setCarts([...carts])
    }

    const decrement = (id :string) => {
      carts.map(item => {
        if(item._id === id){
          item.quantily == 1 ? item.quantily = 1 : item.quantily -= 1 ;
        }
      })
      setCarts([...carts])
    }

    const removeProduct = ( id: string ) => {
      if(window.confirm("bạn có chắc muốn xóa?"))
      carts.map( (item, index) => {
        if(item._id === id){
          carts.splice(index, 1)
        }
      })
      setCarts([...carts])
    }

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
          <tr key={data._id} className="mt-10">
            <td>{data.name}</td>
            <td className="flex justify-center"><img src={data.image} alt="" className="w-20"/></td>
            <td>{data.price}</td>
            <td>
              <input onClick={() => {decrement(data._id)}} className="btn btn-decrease border border-gray-200 w-6 bg-gray-200" type="button" value="-"/>
              <input className="border border-gray-200 pl-2" type="text" value={data.quantily} id="quantity" name="quantily" min="1"/>
              <input onClick={() => {increment(data._id)}} className="btn btn-increase border border-gray-200 w-6 bg-gray-200" type="button" value="+"/>
            </td>
            <td>{new Intl.NumberFormat("VND", { style: "currency", currency: "VND" }).format(sum = data.price * data.quantily)}</td>
            <div className="hidden"></div>
            <td><input type="button" onClick={()=>{removeProduct(data._id)}} className="btn btn-remove w-16 h-6 border border-red-500 hover:bg-purple-500 pb-4" value="xóa" /></td>
            <div className="hidden">{result += sum}</div>
          </tr>
        )}
        </tbody>
      </table>
      <div className="mt-6 ml-10 font-extrabold flex justify-start"><span>Tổng tiền: </span><span>{new Intl.NumberFormat("VND", { style: "currency", currency: "VND" }).format(result)}</span></div>
      <button className="border-1 border-red-500 w-28 pl-3 h-8 ml-10 mt-6 flex justify-start hover:bg-red-500 hover:text-white"><Link className="hover:text-white ml-2" to="/product/checkOut">Đặt hàng</Link></button>
    </form>
  </div>
        </>
        
    )
}
export default Card;