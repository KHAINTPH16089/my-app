import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { getProductsPage } from "../../api/product";
import { productType } from "../../type/productType";

function Product() {
    const [product, setProduct] = useState<productType[]>([]);
    const [so, setSo] = useState<number>(1);
    let count;
    useEffect(()=>{
        const handleGetProduct = async ()=> {
            const { data } = await getProductsPage(so);
            setProduct(data[0].value);
            count = Math.ceil(data[1].value / so);
            console.log(data[1].value);
            
        }
        
        handleGetProduct();
    },[so])
    console.log(count);
    
    return(
        <>
            {product.map((data)=>
                <p key={data._id}>{data.name}</p>
            )}
            <button onClick={()=> {
                if(so != 1) setSo(so - 1);}
            }>pre</button>
            {so != 1 ? <input type="button" value={so-1} onClick={()=> {
                if(so != 1) setSo(so - 1);}} /> : null}
             
            <input type="button" value={so} />
            <input type="button" value={so + 1} onClick={()=> {setSo(so + 1)}}/>
            <button onClick={()=> {setSo(so + 1)}}>next</button>
        </>
        
    )
}
export default Product;