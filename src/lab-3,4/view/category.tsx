import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../api/category";
import { getProducts, removeProducts } from "../api/product";

type typeSach = {
    id: number| string
    name: string,
    price: number,
    category: number | string
}
type typeCategory = {
    id: string | number,
    name: string
}

function CategoryLab(){
    const [category, setCategory] = useState<typeCategory[]>([]);

    useEffect(()=>{
        const handleGetSach = async ()=>{
            const {data} = await getCategory();
            setCategory(data);
        }
        handleGetSach();
    },[])

    const handleRemove = (id:any)=>{
        const check = window.confirm("bạn có muốn xóa");
        if(check){
            removeProducts(id);
        }
        
        setCategory( category.filter(item => item.id !== id ));
    }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>tên Danh mục</th>
                        <th colSpan={2}>chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {category.map((data,index)=>
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td> <Link to={`/lab/editCate/${data.id}`}> sửa</Link></td>
                            <td onClick={()=>{handleRemove(data.id)}}>xóa</td>
                        </tr>
                    )}
                        
                    
                </tbody>
            </table>
            <button><Link to={"/lab/addCate"}>thêm danh mục</Link></button>
        </>
    )
    
}
export default CategoryLab;