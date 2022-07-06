import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get } from "../../api/category";
import { getProduct } from "../../api/product";

type productDetail = {
    _id: number | string,
    name: string,
    price: number,
    desc: string,
    status: number,
    image: string,
    category: string
}
type cartType = {
    _id:string, name:string, price:number, image:string, quantily: number
}
function ProductDetail(){
    const {id} = useParams<string>();
    const [count ,setCount] = useState<number>(1);
    const [productDetail, setProductDetail] = useState<productDetail>();
    const [categoryDetail, setCategoryDetail] = useState<productDetail[]>([]);

    const navigate = useNavigate()
    const handleSetProductDetail = async () => {
        const response = await getProduct(id);
        setProductDetail(response.data);
    }
    
    const handleCategory = async () => {
        const {data} = await get(productDetail?.category);
        setCategoryDetail(data.product);
    }
    useEffect(() => {
        if (id) {
            handleSetProductDetail();
        }
        if(productDetail?.status == 1){
            navigate("/");
        }
    },[id])
    useEffect(() => {
        if(productDetail?.category) handleCategory();
    },[productDetail])

    //add to cart
    const [carts, setCart] = useState<cartType[]>([])
    const handleAddToCart = async (_id: any) => {
      const {data} = await getProduct(_id);
      var cart = JSON.parse(localStorage.getItem("cart") as string);
      setCart(cart);
        if (cart == null){
            cart = [];
            cart.push({_id:data._id, name:data.name, price:data.price, image:data.image, quantily: count});
        }else{
            let item = carts.find(item => item._id == _id );
            if(item) item.quantily++;
            else cart.push({_id:data._id, name:data.name, price:data.price, image:data.image, quantily: count});
            console.log(item);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return(

        <div className="container-2xl mx-auto mt-12">
            <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-red-400 border-b-4 border-red-400 pb-2 font-medium">CHI TIẾT SẢN PHẨM</a><br/><br/>
          </div>
        <div className="w-full grid grid-cols-5 gap-4 mx-4 mt-4">
        <div className="col-span-3 px-12">
            <img className="w-full" src={productDetail?.image} alt=""/>
        </div>
        
        <div className="col-span-2 mr-20">
            <h1 className="font-medium text-2xl my-2 flex justify-start mb-4">{productDetail?.name}</h1>
            <hr/>
            <p className=" text-xl my-2 font-semibold text-red-500 flex justify-start">{productDetail?.price}<u>đ</u></p>
            <hr/>
            <div className="my-3 flex justify-start">
                <input className="border border-gray-200 w-6 bg-gray-200" type="button" value="-" onClick={()=>{count != 1 ? setCount(count - 1) : setCount(1)}} />
                <input className="border border-gray-200 pl-2" type="text" value={count} id="quantity" name="quantily" min="1" />
                <input className="border border-gray-200 w-6 bg-gray-200" type="button" value="+" onClick={()=>{setCount(count + 1)}}/>
            </div>
            <div className="flex justify-start">
                { productDetail?.status == 1 ? <button className="border border-gray-300 mt-4 w-40 h-10 bg-black text-white">CÒN HÀNG</button> : <button className="border border-gray-300 mt-4 w-40 h-10 bg-black text-white">HẾT HÀNG</button>}
                
                <button id="addToCart" className="border border-1 border-red-600 mt-4 w-40 h-10  hover:bg-red-600 hover:text-white ml-2" onClick={() => {handleAddToCart(productDetail?._id)}}>MUA NGAY</button>
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
            {categoryDetail.map((data)=>
                <div className=" border border-r-gray-900 border-l-gray-900 relative" key={data._id}>
                <div className="absolute ml-60 mt-1 w-8 h-6 pt-1 rounded-lg bg-red-600 text-white font-medium text-xs">30%</div>
                <img className="w-full px-2" src={data.image} alt=""/><br/>
                <div className="">
                  <p className="flex items-start mb-2 ml-5 text-red-500 font-bold  ">{new Intl.NumberFormat("VND", { style: "currency", currency: "VND" }).format(data.price)}</p>
                  <Link to={`/product/${data._id}`} className="flex font-semibold text-xl items-start ml-5 hover:text-orange-600">{data.name}</Link>
                </div>
                <hr className="ml-6 w-60 my-3 " />
                <div className="flex">
                  <button className="ml-5 mb-3 h-9 w-28 pl-6 pt-1 rounded-full flex items-start  border text-white border-red-500 bg-blue-500 hover:bg-red-500 hover:text-white" > <Link className="hover:text-white" to={`/product/${data._id}`}>Chi tiết</Link> </button>
                  <button className="ml-9 mb-3 h-9 w-24 rounded-full border border-red-500   hover:bg-orange-600 hover:text-white" onClick={() => {handleAddToCart(data._id)}}>MUA</button>
                </div>
              </div>
            )}
            
            
        </div>
        </div>
    </div>
        
    )
}
export default ProductDetail;