import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory } from "../api/category";
import { updateProducts, getProduct } from "../api/product";

type typeCategory = {
    id: string | number,
    name: string
}
type typeSach = {
    name: string,
    price: number,
    category: number | string
}
function ProductEditLab(){
    //get category
    const [category, setCategory] = useState<typeCategory[]>([]);

    const {id} = useParams();

    useEffect(()=>{
        const handleGetSach = async ()=>{
            const {data} = await getCategory();
            setCategory(data);
        }
        handleGetSach();
    },[])
    //get book
    const [product, setProduct] = useState<typeSach>();
    
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
    //req data

    const navigate = useNavigate()
    const { register, handleSubmit , formState: {errors}, reset} = useForm<typeSach>();

    const onHandleAdd = async (product: any) =>{
        const {data} = await updateProducts(id, product);
    }

    const onSubmit: SubmitHandler<typeSach> = (data) => {
        onHandleAdd(data);
        navigate("/lab");
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">tên sản phẩm</label>
                    <input type="text" {...register("name", {required: true})}/>
                    {errors.name && <span>bắt buộc nhập trường này</span>}
                </div>
                <div>
                    <label htmlFor="">giá sản phẩm</label>
                    <input type="text" {...register("price", {required: true})}/>
                    {errors.price && <span>bắt buộc nhập trường này</span>}
                </div>
                <div>
                    <label htmlFor="">danh mục sản phẩm</label>
                    <select id="" {...register("category", {required: true})}>
                        {category.map((data)=>
                            <option key={data.id} value={data.id}>{data.name}</option>
                        )}
                    </select>
                    {errors.category && <span>bắt buộc nhập trường này</span>}
                </div>
                <button>submit</button>
            </form>
        </>
    )
}
export default ProductEditLab;