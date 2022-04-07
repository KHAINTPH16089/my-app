import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { getProduct, getProductsPage } from "../../api/product";
import { productType } from "../../type/productType";

type cartType = {
  _id:string, name:string, price:number, image:string, quantily: 1
}
function Product() {
    const [product, setProduct] = useState<productType[]>([]);
    const [so, setSo] = useState<number>(1);
    const [count, setCount] = useState<number>();
    const countSP = 8;
    const [sort , setSort] = useState<string>();
    const sortBy = sort ? sort : null;
    const [search , setSearch] = useState<string>();
    const tim = search ? search : null;
    const [price , setPrice] = useState<string>("1");
    const gia = price ? price : null;
    const [value , setValue] = useState<any>();
    const values = value ? value : null;

    useEffect(()=>{
      const handleGetProduct = async ()=> {
          const { data } = await getProductsPage(so, countSP, sortBy, tim, gia);
          setProduct(data[0].value);
          setCount(Math.ceil(data[1].value / countSP));
          setSo(1);
      }
      
      handleGetProduct();
  },[search, sort, price])

    useEffect(()=>{
        const handleGetProduct = async ()=> {
            const { data } = await getProductsPage(so, countSP, sortBy, tim, gia);
            setProduct(data[0].value);
            setCount(Math.ceil(data[1].value / countSP));
        }
        
        handleGetProduct();
    },[so])
    
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
    // (item.price * item.sale / 100) sale
    return(
        <div className="mx-6">  
            <div className="text-center mt-4">
            <a href="#" className="text-2xl pt-8 hover:text-red-400 border-b-4 border-red-400 pb-2 font-medium">SẢN PHẨM</a><br/><br/>
          </div>
          <div className="bg-gray-100 h-10 flex justify-between rounded-full">
            <div className=" ml-12 mt-1 ">
              <input className="w-48 h-8 pl-4 border-1 border-red-500 hover:border-red-500 hover:border-1" placeholder="Tìm kiếm..." type="text" onChange={(e)=> {setValue(e.target.value)}}/>
              <button className="w-20 h-8 bg-red-500 text-white" onClick={()=>{setSearch(values)}}>search</button>
            </div>
            <div className="mt-1">
                <label htmlFor="" className="mr-2 font-semibold ">sắp xếp</label>
                <select className=" w-40 h-8 border-1 border-red-500 mr-4 bg-red-500 text-white rounded-full pl-2" name="" id="" onChange={(e) => {setPrice(e.target.value)}}>
                    <option value="2000000">giá lớn hơn 2tr</option>
                    <option value="4000000">giá lớn hơn 4tr</option>
                    <option value="10000000">giá lớn hơn 10tr</option>
                    <option value="20000000">giá lớn hơn 20tr</option>
                </select>
            </div>
            <div className="mt-1">
                <label htmlFor="" className="mr-2 font-semibold ">sắp xếp</label>
                <select className=" w-40 h-8 border-1 border-red-500 mr-4 bg-red-500 text-white rounded-full pl-2" name="" id="" onChange={(e) => {setSort(e.target.value)}}>
                    <option value="price">giá tăng dần</option>
                    <option value="-price">giá giảm dần</option>
                    <option value="name">từ A đến Z</option>
                    <option value="-name">từ Z đến A</option>
                </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {
              product.map((data) => 
                <div className=" border border-r-gray-900 border-l-gray-900 relative" key={data._id}>
                  <div className="absolute ml-60 mt-1 w-8 h-6 pt-1 rounded-lg bg-red-600 text-white font-medium text-xs">30%</div>
                  <img className="w-full px-2  " src="https://th.bing.com/th/id/R.85c5b8c2edbddfc1cf8d9bae61c065e2?rik=G8ASwy0iqPvAcQ&pid=ImgRaw&r=0" alt=""/><br/>
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
              )
            }
          </div>
          <div className="mt-4">
            <button className="border w-10 h-10 mx-2 bg-blue-500 text-white hover:bg-red-500 hover:text-white" onClick={()=> {
                if(so != 1) setSo(so - 1);}
            }>pre</button>
            {so != 1 ? <input className="border w-10 h-10 mx-2 bg-blue-500 text-white hover:bg-red-500 hover:text-white" type="button" value={so-1} onClick={()=> {
                if(so != 1) setSo(so - 1);}} /> : null}
             
            <input className="border w-10 h-10 mx-2 bg-blue-500 text-white hover:bg-red-500 hover:text-white" type="button" value={so} />
            {so != count ? <input className="border w-10 h-10 mx-2 bg-blue-500 text-white hover:bg-red-500 hover:text-white" type="button" value={so + 1} onClick={()=> {setSo(so + 1)}}/> : null}
            
            <button className="border w-10 h-10 mx-2 bg-blue-500 text-white hover:bg-red-500 hover:text-white" onClick={()=> { if(so != count) setSo(so + 1)}}>next</button>
            </div>
            <div className="px-4 mt-10">
            <div className="text-center mt-4">
              <a href="#" className="text-2xl pt-8 hover:text-red-500 border-b-4 border-red-500 pb-2 font-medium">SẢN PHẨM LIÊN QUAN</a><br/><br/>
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
        </div>
        
        
    )
}
export default Product;