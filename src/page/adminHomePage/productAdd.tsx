import axios from "axios";
import React, {useState, useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getAll } from "../../api/category";
import { createProduct, getProducts, upload } from "../../api/product";
import { productType } from "../../type/productType";

type inputs ={
    name: string,
    price: number,
    desc: string,
    image: any,
    category: string,
    public_id: string
}
type category ={
    _id: string,
    name: string
}
type productAddProps= {
    
}
function ProductAdd(props: productAddProps){
    const { register, handleSubmit , formState: {errors}} = useForm<inputs>();
    const navigate = useNavigate();
    const [fileInput, setFileInput] = useState('');
    const [reviewSource, setreviewSource] = useState<string>('')

    const [products, setProducts] = useState<productType[]>([]);

    //upload ảnh
    const handleImage = (e: any) => {
        const file = e.target.files[0]
        reviewFile(file)
        
    }
    const reviewFile = (file:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setreviewSource(reader.result as string)
            console.log(reviewSource);
            
        }
    }


    useEffect(()=>{
        const getProductlist = async () => {
            const { data } = await getProducts();
            setProducts(data);
        }
        getProductlist();
    },[]);
    
    const onHandleAdd = async (product: any) =>{
        const {data} = await createProduct(product);
        setProducts([...products, data])
    }
    
    const onSubmit: SubmitHandler<inputs> = async (dataInputs) => {
        if(!reviewSource) return;
        const { url, public_id } = await (await upload(reviewSource)).json();
        dataInputs.public_id = public_id;
        console.log(dataInputs.public_id);
        
        dataInputs.image = url;
        onHandleAdd(dataInputs);
        navigate("/admin/product");
    }

    const [category, setCategory] = useState<category[]>([]);

    useEffect(()=>{
        const getProductlist = async () => {
            const { data } = await getAll();
            setCategory(data);
        }
        getProductlist();
    },[]);

    return(
        <>
        
        <button className="w-28 h-8 mb-3 pl-6 border-1 rounded flex justify-start bg-indigo-500 hover:bg-indigo-800 text-white "><Link className="hover:text-white" to={"/admin/product"}>Quay về</Link></button>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group flex flex-col items-start">
                <label htmlFor="exampleInputEmail1" className="">Tên sản phẩm</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name", {required: true})} placeholder="Nhập tên sản phẩm" />
                {errors.name && <span className="color-red-500">Bắt buộc nhập trường này</span>}
            </div>
            <div className="form-group flex flex-col items-start">
                <label htmlFor="exampleInputPassword1">Giá</label>
                <input type="number" className="form-control" id="exampleInputPassword1" {...register("price",{required: true, valueAsNumber: true})} placeholder="Nhập giá sản phẩm"/>
                {errors.price && <span>Bắt buộc nhập trường này</span>}
            </div>
            <div className="form-group flex flex-col items-start">
                <label htmlFor="exampleInputPassword1">mô tả</label>
                <input type="text" className="form-control" id="exampleInputPassword1" {...register("desc",{required: true})} placeholder="Nhập mô tả sản phẩm"/>
                {errors.price && <span>Bắt buộc nhập trường này</span>}
            </div>
            <div className="form-group flex flex-col items-start">
                <label htmlFor="exampleInputPassword1">Thêm ảnh</label>
                <input type="file" className="form-control" id="exampleInputPassword1" {...register("image",{required: true})} onChange={handleImage} placeholder="thêm ảnh sản phẩm"/>
                {errors.price && <span>Bắt buộc nhập trường này</span>}
            </div>
            <div className="form-group flex flex-col items-start my-4 ">
                { reviewSource ? <img width={300} src={reviewSource} alt="" /> : <img width={300} src="https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg" alt="" />}
            </div>
            <div className="form-group flex flex-col items-start">
                <label htmlFor="exampleFormControlSelect1">Danh mục</label>
                <select className="form-control" id="exampleFormControlSelect1" {...register("category",{required: true})}>
                    {category.map((data) => <option key={data._id} value={data._id}> {data.name} </option>)}
                </select>
                {errors.category && <span>Bắt buộc phải chọn trường này</span>}
            </div>
            <button type="submit" className="btn btn-primary bg-orange-500 mt-6 flex justify-start  ">Submit</button>
                
            </form>
        </>
    )
}
export default ProductAdd;