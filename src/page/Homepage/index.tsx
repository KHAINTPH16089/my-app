import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getProduct, getProducts, getProductsPage } from "../../api/product";

type productType = {
  _id: number | string,
  name: string,
  price: number,
  status: number,
  image: string
}
type cartType = {
  _id:string, name:string, price:number, image:string, quantily: number
}
function HomePage(){
    const [products, setProducts] = useState<productType[]>([]);

    const handleSetProducts = async () => {
      const response = await getProductsPage(1, 8, null, null, null);
      setProducts(response.data[0].value);
    }
    
    useEffect(()=>{
      handleSetProducts();
    },[])

    const [carts, setCart] = useState<cartType[]>([])
    const handleAddToCart = async (_id: any) => {
      const {data} = await getProduct(_id);
      var cart = JSON.parse(localStorage.getItem("cart") as string);
      setCart(cart);
        if (cart == null){
            cart = [];
            cart.push({_id:data._id, name:data.name, price:data.price, image:data.image, quantily: 1});
        }else{
            let item = carts.find(item => item._id == _id );
            
            if(item) item.quantily++;
            else cart.push({_id:data._id, name:data.name, price:data.price, image:data.image, quantily: 1});
            console.log(item);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return(
        <>
        <div className="bg-[url('https://th.bing.com/th/id/R.fb58f2b4c29d7c48fba860ec4996fbc9?rik=k9KcUv3c0PjoEg&pid=ImgRaw&r=0&sres=1&sresct=1')] w-full bg-no-repeat bg-cover relative h-96">
                <div className="text-center pt-20 text-white font-medium">
                    <p>DI ĐỘNG VIỆT</p>
                    <h1 className="text-3xl my-2">ĐIỆN THOẠI ĐẸP, PHỤ KIỆN XỊN<br/>GHÉ QUA DI ĐỘNG VIỆT VÀ XÁCH ĐỒ VỀ.</h1>
                    <p>Sản phẩm chất lượng cao, chăm sóc khách hàng tận tình chu đáo</p>
                    <button className="mx-4 border border-black rounded-2xl bg- bg-red-500 h-10 px-4  mt-3 roundef-full hover:bg-transparent hover:border-white transition-all"><Link className=" hover:text-white" to={"product"}>Xem sản phẩm</Link> </button>
                </div>
            </div>
            <div className="px-4">
          <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-red-600 border-b-4 border-red-600 pb-2 font-medium">SẢN PHẨM BÁN CHẠY</a><br/><br/>
            <a href="#" className="hover:text-red-600 mt-4"><Link className="hover:text-red-600" to={"/product"}>Xem thêm</Link></a>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {
              products.map((data) => 
                data.status == 1 ?
                <div className=" border border-r-gray-900 border-l-gray-900" key={data._id}>
                  <img className="w-full px-2" src={data.image} alt=""/><br/>
                  <div className="">
                    <p className="flex items-start mb-2 ml-5 text-red-500 font-bold  ">{data.price}<u>đ</u></p>
                    <Link to={`/product/${data._id}`} className="flex font-semibold text-xl items-start ml-5 hover:text-orange-600">{data.name}</Link>
                  </div>
                  <hr className="ml-6 w-60 my-3 " />
                  <div className="flex">
                    <button className="ml-5 mb-3 h-9 w-28 pl-6 pt-1 rounded-full flex items-start  border text-white border-red-500 bg-blue-500 hover:bg-red-500 hover:text-white" > <Link className="hover:text-white" to={`/product/${data._id}`}>Chi tiết</Link> </button>
                    <button className="ml-9 mb-3 h-9 w-24 rounded-full border border-red-500   hover:bg-orange-600 hover:text-white" onClick={() => {handleAddToCart(data._id)}} >MUA</button>
                  </div>
                </div> 
                : null
              )
            }
          </div>
        </div>

          <div className="grid grid-cols-3 gap-0.5 mt-12">
            <div className="bg-[url('https://th.bing.com/th/id/R.fb58f2b4c29d7c48fba860ec4996fbc9?rik=k9KcUv3c0PjoEg&pid=ImgRaw&r=0&sres=1&sresct=1')] w-full bg-no-repeat bg-cover relative h-60" >
              <div className="text-center mt-28">
                <a href="#" className="text-3xl text-white hover:text-purple-400">GIẢM GIÁ</a>
                <hr className="w-28 mx-auto"/>
              </div>
            </div>
            <div className="bg-[url('https://th.bing.com/th/id/R.fb58f2b4c29d7c48fba860ec4996fbc9?rik=k9KcUv3c0PjoEg&pid=ImgRaw&r=0&sres=1&sresct=1')] w-full bg-no-repeat bg-cover relative h-60" >
              <div className="text-center mt-28">
                <a href="#" className="text-3xl text-white hover:text-purple-400">FIGURE</a>
                <hr className="w-28 mx-auto"/>
              </div>
            </div>
            <div className="bg-[url('https://th.bing.com/th/id/R.fb58f2b4c29d7c48fba860ec4996fbc9?rik=k9KcUv3c0PjoEg&pid=ImgRaw&r=0&sres=1&sresct=1')] w-full bg-no-repeat bg-cover relative h-60" >
              <div className="text-center mt-28">
                <a href="#" className="text-3xl text-white hover:text-purple-400">PHỤ KIỆN</a>
                <hr className="w-28 mx-auto"/>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="text-center mt-4">
              <a href="#" className="text-2xl pt-8 hover:text-red-600 border-b-4 border-red-600 pb-2 font-medium">SẢN PHẨM MỚI</a><br/><br/>
              <a href="#" className="hover:text-red-600 mt-4">Xem thêm</a>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="">
                <img className="" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
                <div className="text-center">
                  <Link to="/product/1" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </Link>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
              <div className="">
                <img className="w-full" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
                <div className="text-center">
                  <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
              <div className="">
                <img className="" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
                <div className="text-center">
                  <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
              <div className="">
                <img className="" src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
                <div className="text-center">
                  <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="text-center mt-4">
              <a href="#" className="text-2xl pt-8 hover:text-purple-400 border-b-4 border-purple-300 pb-2 font-medium">BÀI VIẾT MỚI</a><br/><br/>
              <a href="#" className="hover:text-purple-400 mt-4">Xem thêm</a>
            </div>
          </div>
        </>
    )
}
export default HomePage;