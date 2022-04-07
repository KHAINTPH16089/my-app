import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { create, createOrderDetail } from "../../api/order";
type cartType = {
    _id:string, name:string, price:number, image:string, quantily: 1
  }
type orderType = {
    name: string,
    email: string,
    phone: number,
    address: string,
    total: number
}
function CheckOut(){
    let sum = 0;
    let result = 0;
    const [carts , setCarts] = useState<cartType[]>([])
    const cart = JSON.parse(localStorage.getItem("cart") as string);

    const {register, handleSubmit, formState: {errors}} = useForm<orderType>();

    const navigate = useNavigate()
    useEffect(()=>{
      setCarts(cart);
    },[])

    const onSubmit: SubmitHandler<orderType> = async(dataOrder) => {
        const {data} = await create(dataOrder);
        carts.map((e)=>{
            const datas = {
                name: e.name,
                price: e.price,
                image: e.image ,
                quantily: e.quantily,
                order: data._id
            }
            createOrderDetail(datas);
        })
        localStorage.removeItem("cart");
        navigate("/");
    }
    return(
        <>
            <h4 className="mr-6 ml-16 text-xl font-extrabold mb-2">Chi tiết đơn hàng</h4>
        <hr/>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-2 ml-16 mt-3 mr-6">
            <div>
              <div>
                <label  className="font-semibold">Họ tên*</label><br/>
                <input id="hoTen" className="border border-gray-400 h-8 rounded-lg pl-1 w-full mt-3 mb-2" {...register("name")} type="text" placeholder="nhập họ tên"/>
              </div>
              <div>
                <label  className="font-semibold">Địa chỉ*</label><br/>
                <input id="diaChi" className="border border-gray-400 h-8 rounded-lg pl-1 w-full mt-3 mb-2" {...register("address")} type="text" placeholder="nhập địa chỉ"/>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label  className="font-semibold">Email*</label><br/>
                  <input id="email" className="border border-gray-400 h-8 rounded-lg pl-1 w-full mt-3 mb-2" {...register("email")} type="text" placeholder="nhập email"/>
                </div>
                <div>
                  <label  className="font-semibold">Số điện thoại*</label><br/>
                  <input id="phone" className="border border-gray-400 h-8 rounded-lg pl-1 w-full mt-3 mb-2" {...register("phone")} type="text" placeholder="nhập số điện thoại"/>
                </div>
              </div>
             
            </div>
            <div className="ml-36">
              <div className="w-60 bg-gray-100 p-3">
                <h4 className="font-extrabold mb-3">Sản phẩm của bạn</h4>
                <hr/>
                <div className="my-3 mb-3"> <span className="float-left font-extrabold">Sản phẩm</span>  <span className="float-right">Giá</span> </div><br/>
                <ul>
                    {carts.map((item)=>
                        <>
                            <li className="mt-1"> <span className="float-left">{item.name}</span>  <span className="float-right">{new Intl.NumberFormat("VND", { style: "currency", currency: "VND" }).format(sum = item.price * item.quantily)}</span></li><br/>
                            <div className="hidden">{result += sum}</div>
                        </>
                    )}
                  
                </ul>
                <input type="number" hidden value={result} {...register("total")} />
                <div className="my-2"> <span className="float-left font-extrabold">Tổng thành tiền</span> <span className="float-right">{new Intl.NumberFormat("VND", { style: "currency", currency: "VND" }).format(result)}</span> </div>
                <button id="datHang" className="bg-purple-400 mt-4 w-full h-10 text-white font-extrabold">ĐẶT HÀNG</button>
              </div>
              
            </div>
          </div>
        </form>
        </>
    )
}
export default CheckOut;