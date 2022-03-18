import React, {useState} from "react"

function Login() {

    const [nameValue, setNameValue] = useState("");
    const [passValue, setPassValue] = useState("");

    const onSubmit = ()=>{
        const data = {
            userName: nameValue,
            password: passValue
        }
    }
    return(
        <form action="">
            <h6>{}</h6>
            <div>
                <label htmlFor="">username</label>
                <input type="text" onChange={(e) => setNameValue(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">password</label>
                <input type="text" onChange={(e) => setPassValue(e.target.value)} />
            </div>
            <button onClick={()=> onSubmit()} >submit</button>
        </form>
    )
}
export default Login;