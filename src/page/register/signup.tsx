import React, {useState} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
        <div className=" relative" style={{height:'650px',backgroundColor:'red',backgroundSize:'100%',backgroundImage:'url("https://preview.colorlib.com/theme/bootstrap/login-form-20/images/xbg.jpg.pagespeed.ic.tiVxeakBSd.webp")'}}>
                <div className="bg-[#12111159] flex justify-center items-center w-full h-full">
                <div className="absolute h-auto w-80">
                    <h4 className="text text-[#fbfff2] text-2xl pb-10 font-bold">Đăng Nhập Tài Khoản</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="flex"><input className="mb-5 text-white placeholder:text-[#fbfff2] py-3 bg-[#f7f4f40d] w-80 pl-5 rounded-3xl outline-none" type="text" placeholder="username" {...register('userName')}/></p>
                        <p className="flex"><input className="mb-5 text-white placeholder:text-[#fbfff2] py-3 bg-[#f7f4f40d] w-80 pl-5 rounded-3xl outline-none" type="email" placeholder="Email" {...register('email')}/></p>
                        <p><input className="mb-5 text-white placeholder:text-[#fbfff2] py-3 bg-[#f7f4f40d] w-80 pl-5 rounded-3xl outline-none" type="password" placeholder="Mật khẩu"{...register('password')}/></p>
                        <p className="mb-3 text-[#fbfff2] font-medium">Bạn đã có tài khoản ? <Link to={"/signin"}>Đăng Nhập Ngay</Link></p>
                        <p><button className="mb-5 font-medium text-[#00000e] py-3 w-80 bg-[#fbceb5] rounded-3xl" type="submit">Đăng nhập</button></p>
                    </form>
                </div>
                </div>
            </div>
    )
}
export default Signup;