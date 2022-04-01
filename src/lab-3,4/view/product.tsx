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

function ProductLab(){
    const [sach, setSach] = useState<typeSach[]>([]);

    useEffect(()=>{
        const handleGetSach = async ()=>{
            const {data} = await getProducts();
            setSach(data);
        }
        handleGetSach();
    },[])
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
        
        setSach( sach.filter(item => item.id !== id ));
    }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Danh mục</th>
                        <th>tên sách</th>
                        <th>giá sách</th>
                        <th colSpan={2}>chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {sach.map((data,index)=>
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            {category.map((e)=> e.id == data.category ? <td key={e.id}>{e.name}</td>: null )}
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td> <Link to={`/lab/edit/${data.id}`}> sửa</Link></td>
                            <td onClick={()=>{handleRemove(data.id)}}>xóa</td>
                        </tr>
                    )}
                        
                    
                </tbody>
            </table>
            <button><Link to={"/lab/add"}>thêm sản phẩm</Link></button>
        </>
    )
    
}
export default ProductLab;