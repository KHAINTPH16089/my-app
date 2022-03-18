import React, {useState} from "react"

function Product() {
    const [avatar, setAvatar] = useState();
    const handleAvatar = (e: any)=> {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        setAvatar(file);        
    }

    return(
        <div>
            <input type="file" onChange={handleAvatar} />
            {avatar && <img src={avatar} alt="" width="50%"></img>}
        </div>
    )
}
export default Product;