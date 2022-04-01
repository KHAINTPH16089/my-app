import React, {useEffect, useState} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAll, signin } from "../../api/user";

type users = {
    name: string
    email: string,
    password: string
}


function Signin() {
    
    const { register, handleSubmit, formState: {errors}} = useForm<users>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<users> = async (data) => {
        const { data: user } = await signin(data);
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/");
    }

    return(
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('email')} placeholder='Tên sản phẩm' />
                <input type="text"  {...register('password')} placeholder='Giá sản phẩm' />
                <button>Thêm</button>
            </form>
        </>
    )
}
export default Signin;