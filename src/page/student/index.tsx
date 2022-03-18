import React, {useState} from "react";
import "./Student.css";

type row = {
    key: string,
    name: string
}

type rows = {
    name: string,
    tuoi: string,
    phone: string,
    email: string,
}

type tableProps = {
    data: rows[],
    head: row[]
}
function Students({data, head}: tableProps){
    const [SV, setSV] = useState([
        {
            name: "nguyễn trần khải",
            tuoi: "20",
            phone: "0352606412",
            email: "khai@gmail.com",
        }
    ]);
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    
    const handleSV = () => {
        const newSV = [
            ...SV,
            {
                name: name,
                tuoi: age,
                phone: phone,
                email: email,
            }
        ]
        
        setSV(newSV);
        setName('');
        setAge('');
        setPhone('');
        setEmail('');
        console.log(SV);
        
    }
      
    return (
        <div>
            <table className="bang">
                <thead className="tieuDe">
                    <tr>
                        {head.map( e=> 
                            <th key={e.key}>{e.name}</th>
                        )}
                    </tr>
                </thead>
                <tbody className="content">
                    {data.map( (e, index) => 
                        <tr key={index}>
                            <td>{e.name}</td>
                            <td>{e.tuoi}</td>
                            <td>{e.phone}</td>
                            <td>{e.email}</td>
                            <td><button className="button">xóa</button></td>
                        </tr>
                    )}
                    {SV.map( (e, index) => 
                        <tr key={index}>
                            <td>{e.name}</td>
                            <td>{e.tuoi}</td>
                            <td>{e.phone}</td>
                            <td>{e.email}</td>
                            <td><button className="button">xóa</button></td>
                        </tr>
                    )}

                </tbody>
            </table>
            <form>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
            </div>
            <br/>
            <div>
                <label htmlFor="">Age</label>
                <input type="text" value={age} onChange={(e) => {setAge(e.target.value)}}/>
            </div>
            <br/>
            <div>
                <label htmlFor="">Phone</label>
                <input type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
            </div>
            <br/>
            <div>
                <label htmlFor="">email</label>
                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <br/>
            <button type="button" onClick={() => {handleSV()}}>thêm sinh viên</button>
            </form>
        </div>
    )
}
export default Students;