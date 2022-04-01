import React, {useState} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/user";
import { userType } from "../../type/productType";


function Signup() {

    const { register, handleSubmit, formState: {errors}} = useForm<userType>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<userType> = (user)=> {
        signup(user);
        navigate("/user/signin");
    } 

    return(
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('userName')} placeholder='Tên sản phẩm' />
                <input type="text" {...register('email')} placeholder='Tên sản phẩm' />
                <input type="text"  {...register('password')} placeholder='Giá sản phẩm' />
                <button>Thêm</button>
            </form>
        </>
    )
}
export default Signup;