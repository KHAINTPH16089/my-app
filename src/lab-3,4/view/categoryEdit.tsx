import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getCategorys , updateCategory } from "../api/category";
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
function CategoryEditLab(){
    //get category
    const [category, setCategory] = useState<typeCategory[]>([]);

    const {id} = useParams();

    useEffect(()=>{
        const handleGetSach = async ()=>{
            const {data} = await getCategorys(id);
            setCategory(data);
            reset(data)
        }
        handleGetSach();
    },[])
    //req data

    const navigate = useNavigate()
    const { register, handleSubmit , formState: {errors}, reset} = useForm<typeCategory>();

    const onHandleAdd = async (product: any) =>{
        const {data} = await updateCategory(id, product);
    }

    const onSubmit: SubmitHandler<typeCategory> = (data) => {
        onHandleAdd(data);
        navigate("/lab/category");
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">tên sản phẩm</label>
                    <input type="text" {...register("name", {required: true, minLength: 6})}/>
                    {errors.name && <span>bắt buộc nhập trường này và nhiều hơn 6 kí tự</span>}
                </div>
                <button>submit</button>
            </form>
        </>
    )
}
export default CategoryEditLab;