import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/product";

type productDetail = {
    _id: number | string,
    name: string,
    price: number
}

function ProductDetail(){
    const {id} = useParams<string>();
    
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
        <div className="w-full grid grid-cols-5 gap-4 mx-4">
        <div className="col-span-3 px-12">
            <img className="w-full" src="${productDetail?.img}" alt=""/>
        </div>
        
        <div className="col-span-2">
            <h1 className="font-medium text-xl my-2">${productDetail?.name}</h1>
            <hr/>
            <p className="font-medium my-1">${productDetail?.price}<u>đ</u></p>
            <hr/>
            <div className="flex my-3">
            <input className="border border-gray-200 w-6 bg-gray-200" type="button" value="-" />
            <input className="border border-gray-200 pl-2" type="text" value="1" id="quantity" name="quantily" min="1" />
            <input className="border border-gray-200 w-6 bg-gray-200" type="button" value="+" />
            </div>
            <div>
            <button className="border border-gray-300 mt-4 w-40 h-10 bg-black text-white">CÒN HÀNG</button>
            <button id="addToCart" className="border border-gray-300 mt-4 w-40 h-10 bg-purple-400 hover:bg-red-600 ml-2">MUA NGAY</button>
            </div>
            <div>
            
            </div>
        </div>
        </div>
        <div className="px-4 mt-12">
        <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-purple-400 border-b-4 border-purple-300 pb-2 font-medium">SẢN PHẨM LIÊN QUAN</a><br/><br/>
            <a href="#" className="hover:text-purple-400 mt-4">Xem thêm</a>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-4">
            <div className="">
            <img className="w-full" src="../../img/img1.jpg" alt=""/><br/>
            <div className="text-center">
                <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                <p className="text-sm font-medium">600.000<u>đ</u></p>
            </div>
            </div>
            <div className="">
            <img className="" src="../../img/1E435B63-A31E-4A11-BABB-5F969117DC61.jpg" alt=""/><br/>
            <div className="text-center">
                <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                <p className="text-sm font-medium">600.000<u>đ</u></p>
            </div>
            </div>
            <div className="">
            <img className="" src="../../img/1E435B63-A31E-4A11-BABB-5F969117DC61.jpg" alt=""/><br/>
            <div className="text-center">
                <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                <p className="text-sm font-medium">600.000<u>đ</u></p>
            </div>
            </div>
        </div>
        </div>
    </div>
        
    )
}
export default ProductDetail;