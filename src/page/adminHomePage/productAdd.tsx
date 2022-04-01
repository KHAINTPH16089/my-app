import React, {useState, useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../api/category";
import { createProduct, getProducts } from "../../api/product";
import { productType } from "../../type/productType";

type inputs ={
    name: string,
    price: number,
    category: string
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

    const [products, setProducts] = useState<productType[]>([]);

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

    const onSubmit: SubmitHandler<inputs> = (dataInputs) => {
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
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('name', { required: true})} placeholder='Tên sản phẩm' />
                {errors.name && <span>Bắt buộc phải nhập trường này!</span>}<br />
                <input type="number"  {...register('price', { required: true})} placeholder='Giá sản phẩm' />
                {errors.price && <span>Bắt buộc phải nhập trường này!</span>}<br />
                <select  {...register('category', { required: true})}>
                    {category.map((data) => <option key={data._id} value={data._id}> {data.name} </option>)}
                </select>
                {errors.category && <span>Bắt buộc phải nhập trường này!</span>}<br />
                <button>Thêm</button>
            </form>
        </>
    )
}
export default ProductAdd;