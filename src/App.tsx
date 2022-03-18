import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './page/login';
import Students from './page/student';
import Product from './page/product/product';
import Logins from './page/register/login';


function App() {
  const heads = [
    {
        key: "name",
        name: "tên",
    },
    {
        key: "age",
        name: "tuổi",
    },
    {
        key: "phone",
        name: "số điện thoại",
    },
    {
        key: "email",
        name: "email",
    },
    {
        key: "edit",
        name: "chỉnh sửa",
    }
]

  const datas = [
      {
          name: "nguyễn trần khải",
          tuoi: "20",
          phone: "0352606412",
          email: "khai@gmail.com",
      },
      {
          name: "nguyễn trần khải",
          tuoi: "20",
          phone: "0352606412",
          email: "khai@gmail.com",
      }
]
type rows = {
  name: string,
  tuoi: string,
  phone: string,
  email: string,
}
  const [show, setShow] = useState(false);


  return (
    <div className="App">
      <Login />
      <Logins />
      <button onClick={()=>{setShow(!show)}} >{show === true ? "unshow": "show"} danh sách sinh viên</button>< br/>


      <header className="App-header">
        
        {/* {show && <Product />} */}
        {show && <Students data={datas} head={heads}/>}
      </header>
    </div>
  );
}

export default App;
