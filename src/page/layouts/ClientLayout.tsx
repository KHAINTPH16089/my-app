import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

type propsType={}

function ClinetLayout(props: propsType){
    return(
        <>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
export default ClinetLayout;