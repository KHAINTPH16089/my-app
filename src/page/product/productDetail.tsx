import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/product";

type productDetail = {
    _id: number | string,
    name: string,
    price: number,
    desc: string,
    status: number
}

function ProductDetail(){
    const {id} = useParams<string>();
    const [count ,setCount] = useState<number>(1);

    const [productDetail, setProductDetail] = useState<productDetail>();

    const handleSetProductDetail = async () => {
        const response = await getProduct(id);
        setProductDetail(response.data);
    }
    useEffect(() => {
        if (id) {
            handleSetProductDetail();
        }
    },[id])

    return(

        <div className="container-2xl mx-auto mt-12">
            <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-red-400 border-b-4 border-red-400 pb-2 font-medium">CHI TIẾT SẢN PHẨM</a><br/><br/>
          </div>
        <div className="w-full grid grid-cols-5 gap-4 mx-4 mt-4">
        <div className="col-span-3 px-12">
            <img className="w-full" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/>
        </div>
        
        <div className="col-span-2 mr-20">
            <h1 className="font-medium text-2xl my-2 flex justify-start mb-4">{productDetail?.name}</h1>
            <hr />
            <p className=" text-xl my-2 font-semibold text-red-500 flex justify-start">{productDetail?.price}<u>đ</u></p>
            <hr/>
            <div className="my-3 flex justify-start">
                <input className="border border-gray-200 w-6 bg-gray-200" type="button" value="-" onClick={()=>{count != 1 ? setCount(count - 1) : setCount(1)}} />
                <input className="border border-gray-200 pl-2" type="text" value={count} id="quantity" name="quantily" min="1" />
                <input className="border border-gray-200 w-6 bg-gray-200" type="button" value="+" onClick={()=>{setCount(count + 1)}}/>
            </div>
            <div className="flex justify-start">
                { productDetail?.status == 1 ? <button className="border border-gray-300 mt-4 w-40 h-10 bg-black text-white">CÒN HÀNG</button> : <button className="border border-gray-300 mt-4 w-40 h-10 bg-black text-white">HẾT HÀNG</button>}
                
                <button id="addToCart" className="border border-1 border-red-600 mt-4 w-40 h-10  hover:bg-red-600 hover:text-white ml-2">MUA NGAY</button>
            </div>
            <div>
                <p className=" mt-4 font-semibold text-xl flex justify-start">Mô tả sản phẩm:</p>
                <div className="flex justify-start">
                    {productDetail?.desc}
                </div>
            </div>
        </div>
        </div>
        <div className="px-4 mt-12">
        <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-red-400 border-b-4 border-red-300 pb-2 font-medium">SẢN PHẨM LIÊN QUAN</a><br/><br/>
            <a href="#" className="hover:text-red-500 mt-4">Xem thêm</a>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-4">
            <div className="">
            <img className="w-full" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
            <div className="text-center">
                <a href="#" className="hover:text-red-500">Mô hình figure Takanashi Rikka... </a>
                <p className="text-sm font-medium">600.000<u>đ</u></p>
            </div>
            </div>
            <div className="">
            <img className="" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
            <div className="text-center">
                <a href="#" className="hover:text-red-500">Mô hình figure Takanashi Rikka... </a>
                <p className="text-sm font-medium">600.000<u>đ</u></p>
            </div>
            </div>
            <div className="">
            <img className="" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
            <div className="text-center">
                <a href="#" className="hover:text-red-500">Mô hình figure Takanashi Rikka... </a>
                <p className="text-sm font-medium">600.000<u>đ</u></p>
            </div>
            </div>
        </div>
        </div>
    </div>
        
    )
}
export default ProductDetail;