import React, { useEffect, useState } from "react";
import { productType } from "../../type/productType";
import { SubmitHandler, useForm} from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getProducts, removeFile, update, upload } from "../../api/product";
import { getAll } from "../../api/category";
import { getValue } from "@testing-library/user-event/dist/utils";

type category ={
    _id: string,
    name: string
}
type inputs = {
    name: string,
    price: number,
    desc: string,
    image: string,
    status: number,
    category: string,
    public_id: string
}
type ProductEditProps = {
}
function ProductEdit(props: ProductEditProps){

    const { register, handleSubmit, formState:{errors}, reset} = useForm<inputs>();
    const [reviewSource, setReviewSource] = useState<string>();
    const [product, setProduct] = useState<productType>();
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
    
    
    
    useEffect(() => {
        if(id){
            const getProductEdit = async ()=>{
                const { data } = await getProduct(id);
                reset(data);
                setProduct(data);
            }
            console.log(product?.image);
            
            setReviewSource(product?.image);
            
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
      const handleImage = (e: any) => {
        const file = e.target.files[0]
        reviewFile(file)
        
    }
    const reviewFile = (file:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setReviewSource(reader.result as string)
            console.log(reviewSource);
            
        }
    }
    //submit
    const onSubmit: SubmitHandler<inputs> = async (data) => {
        removeFile(product?.public_id)
        const { url, public_id } = await (await upload(reviewSource)).json();
        data.public_id = public_id;
        data.image = url;
        onHandleEdit(data, id);
        navigate("/admin/product")
    }

    return (
        <>
        
        <button className="w-28 h-8 mb-3 pl-6 border-1 rounded flex justify-start bg-indigo-500 hover:bg-indigo-800 text-white "><Link className="hover:text-white" to={"/admin/product"}>Quay về</Link></button>
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
        <label htmlFor="exampleInputPassword1">Giá</label>
        <input type="text" className="form-control" id="exampleInputPassword1" {...register("desc",{required: true})} placeholder="Nhập mô tả sản phẩm"/>
        {errors.desc && <span>Bắt buộc nhập trường này</span>}
    </div>
    <div className="form-group flex flex-col items-start">
        <label htmlFor="exampleInputPassword1">Giá</label>
        <input type="file" className="form-control" id="exampleInputPassword1" {...register("image",{required: true})} onChange={handleImage} placeholder="thêm ảnh sản phẩm"/>
        {errors.image && <span>Bắt buộc nhập trường này</span>}
    </div>
    <div className="form-group flex flex-col items-start my-4 ">
        { reviewSource ? <img width={300} src={reviewSource} alt="" /> : <img width={300} src="https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg" alt="" />}
    </div>
    <div className="form-group flex flex-col items-start">
        <label htmlFor="exampleInputPassword1">Giá</label>
        <input type="number" className="form-control" id="exampleInputPassword1" {...register("status",{required: true})} placeholder="thêm ảnh sản phẩm"/>
        {errors.status && <span>Bắt buộc nhập trường này</span>}
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