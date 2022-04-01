import React, { useEffect, useState } from "react";
import { productType } from "../../type/productType";
import { SubmitHandler, useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getProducts, update } from "../../api/product";
import { getAll } from "../../api/category";
import { getValue } from "@testing-library/user-event/dist/utils";

type category ={
    _id: string,
    name: string
}
type inputs = {
    name: string,
    price: number,
    category: string
}
type ProductEditProps = {
}
function ProductEdit(props: ProductEditProps){

    const { register, handleSubmit, formState:{errors}, reset} = useForm<inputs>();
    //lấy id
    const {id} = useParams();
    
    
    const navigate = useNavigate();
    const [products, setProducts] = useState<productType[]>([]);

    useEffect(()=>{
        const getProductlist = async () => {
            const { data } = await getProducts();
            setProducts(data);
        }
        getProductlist();
    },[]);
    //get product
    const [product, setProduct] = useState<productType>();
    
    useEffect(() => {
        if(id){
            const getProductEdit = async ()=>{
                const { data } = await getProduct(id);
                reset(data);
                setProduct(data);
            }
            getProductEdit();
        }
        
    },[id])
    //get category
    const [category, setCategory] = useState<category[]>([]);

    useEffect(()=>{
        const getCategorylist = async () => {
            const { data } = await getAll();
            setCategory(data);
        }
        getCategorylist();
    },[]);
    
    const onHandleEdit = async (product: any, id: string| undefined) => {
        try {
          const {data} = await update(product, id);
      
          setProducts(products.map(item => item._id === data.id ? product : item))
        } catch (error) {
          
        }
      }
    //submit
    const onSubmit: SubmitHandler<inputs> = (data) => {
        onHandleEdit(data, id);
        navigate("/admin/product")
    }

    return (
        <>
      <form onSubmit={handleSubmit(onSubmit)}>
  <div className="form-group flex flex-col items-start">
    <label htmlFor="exampleInputEmail1" className="">Tên sản phẩm</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name", {required: true})} placeholder="Nhập tên sản phẩm" />
    {errors.name && <span className="color-red-500">Bắt buộc nhập trường này</span>}
  </div>
  <div className="form-group flex flex-col items-start">
    <label htmlFor="exampleInputPassword1">Giá</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Password" {...register("price",{required: true})} />
    {errors.price && <span>Bắt buộc nhập trường này</span>}
  </div>
  <div className="form-group flex flex-col items-start">
    <label htmlFor="exampleFormControlSelect1">Danh mục</label>
    <select className="form-control" id="exampleFormControlSelect1" {...register("category",{required: true})}>
        {category.map((data) => 
            product?.category == data._id ? <option key={data._id} value={data._id}> {data.name} </option> : <option key={data._id} value={data._id}> {data.name} </option>
        )}
    </select>
    {errors.category && <span>Bắt buộc phải chọn trường này</span>}
  </div>
  <button type="submit" className="btn btn-primary bg-orange-500 mt-6 flex justify-start  ">Submit</button>
</form>
          </>
    )
}

export default ProductEdit;