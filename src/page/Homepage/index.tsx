import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getProducts, getProductsLimit } from "../../api/product";

type productType = {
  _id: number | string,
  name: string,
  price: number
}

function HomePage(){
    const [products, setProducts] = useState<productType[]>([]);

    const handleSetProducts = async () => {
      const response = await getProductsLimit(8);
      setProducts(response.data);
    }
    
    useEffect(()=>{
      handleSetProducts();
    },[])

    return(
        <>
        <div className="bg-[url('https://th.bing.com/th/id/R.fb58f2b4c29d7c48fba860ec4996fbc9?rik=k9KcUv3c0PjoEg&pid=ImgRaw&r=0&sres=1&sresct=1')] w-full bg-no-repeat bg-cover relative h-96">
                <div className="text-center pt-20 text-white font-medium">
                    <p>RIKKA SHOP</p>
                    <h1 className="text-3xl my-2">FIGURE ĐẸP, PHỤ KIỆN XỊN<br/>GHÉ QUA RIKKA SHOP VÀ XÁCH ĐỒ VỀ.</h1>
                    <p>Hàng chất lượng cao, chăm sóc khách hàng tận tình chu đáo</p>
                    <button className="mx-4 border border-black rounded-2xl bg- bg-red-500 h-10 px-4  mt-3 roundef-full hover:bg-transparent hover:border-white transition-all">Xem sản phẩm</button>
                </div>
            </div>
            <div className="px-4">
          <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-purple-400 border-b-4 border-purple-300 pb-2 font-medium">SẢN PHẨM BÁN CHẠY</a><br/><br/>
            <a href="#" className="hover:text-purple-400 mt-4">Xem thêm</a>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {
              products.map((data) => 
                <div className="" key={data._id}>
                  <img className="w-full" src="https://th.bing.com/th/id/OIP.hibjiV2CetzQc-fxEyxsxgHaGo?pid=ImgDet&w=3229&h=2894&rs=1" alt=""/><br/>
                  <div className="text-center">
                    <Link to={`/product/${data._id}`} className="hover:text-purple-400">{data.name}</Link>
                    <p className="text-sm font-medium">{data.price}<u>đ</u></p>
                  </div>
                </div>
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
              <a href="#" className="text-2xl pt-8 hover:text-purple-400 border-b-4 border-purple-300 pb-2 font-medium">SẢN PHẨM MỚI</a><br/><br/>
              <a href="#" className="hover:text-purple-400 mt-4">Xem thêm</a>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="">
                <img className="" src="./img/1E435B63-A31E-4A11-BABB-5F969117DC61.jpg" alt=""/><br/>
                <div className="text-center">
                  <Link to="/product/1" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </Link>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
              <div className="">
                <img className="w-full" src="./img/img1.jpg" alt=""/><br/>
                <div className="text-center">
                  <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
              <div className="">
                <img className="" src="./img/1E435B63-A31E-4A11-BABB-5F969117DC61.jpg" alt=""/><br/>
                <div className="text-center">
                  <a href="#" className="hover:text-purple-400">Mô hình figure Takanashi Rikka... </a>
                  <p className="text-sm font-medium">600.000<u>đ</u></p>
                </div>
              </div>
              <div className="">
                <img className="" src="./img/1E435B63-A31E-4A11-BABB-5F969117DC61.jpg" alt=""/><br/>
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