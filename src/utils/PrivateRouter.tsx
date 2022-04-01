import react from "react";
import { Navigate } from "react-router-dom";
import {isAuthenticate} from "./localstorage";

type privateRouterProps = {
    children: JSX.Element
}
function PrivateRouter(props: privateRouterProps){
    const users = isAuthenticate();
    if(!users){
        return <Navigate to={"/user/signin"}/>
    } else if(users.user.role == 0){
        return <Navigate to={"/user/signin"}/>
    }
    return props.children
}

export default PrivateRouter;