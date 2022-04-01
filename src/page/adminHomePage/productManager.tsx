import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productType } from "../../type/productType";
import { getProducts, remove, update} from "../../api/product";

type productMAnagerProps = {}

function ProductManager(props: productMAnagerProps){
    const [products, setProduct] = useState<productType[]>([]);

    useEffect(()=>{
        const getProductlist = async () => {
            const { data } = await getProducts();
            setProduct(data);
        }
        getProductlist();
    },[]);

    const onHandleRemove = async (id: string | undefined) => {
        const check = window.confirm("bạn có chắc muốn xóa");
        if(check){
            remove(id);
        }
        setProduct( products.filter(item => item._id !== id ));
      }
    
    return(
        <>
            
                <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full  divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STT
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      tên sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      mô tả sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ảnh
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      giá
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">chỉnh sửa</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                { products.map((item,index) =>
                <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                          {}
                      </div>
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <img src=" ${post.img}" width="100px" />
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                        {item.price}
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                        {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                        <button className="btn-edit mr-2 h-10 inline-block px-4 py-2 text-white rounded bg-indigo-500 hover:bg-indigo-800"><Link to={`/admin/product/${item._id}/edit`}>Edit</Link></button>
                        <button onClick={() => onHandleRemove(item._id)} className="btn h-10 btn-remove inline-block px-4 py-2 text-white rounded bg-indigo-500 hover:bg-indigo-800">DELETE</button>
                    </td>
                  </tr>
                  
                )}

                </tbody>
              </table>
              
            </div>
            <button className=" btn-edit flex justify-start mt-6 px-4 py-2 text-white rounded bg-indigo-500 hover:bg-indigo-800"><Link to={"/admin/product/add"}> thêm sản phẩm mới</Link></button>
          </div>
        </div>
      </div>
                
            
        </>
    )
}

export default ProductManager;