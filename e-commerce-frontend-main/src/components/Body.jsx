import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import NivzoneFooter from "./NivzoneFooter";
import { useEffect, useState } from "react";
import { homeImage } from "../utils/data";
import { useCart } from "./context/CartContext";


const Body = () => {
    const { cartSize } = useCart();

    const [bgImage, setBgImage] = useState(homeImage) 
    const location = useLocation()
    useEffect(() => {
      window.scrollTo(0,0)
    }, [location])
    useEffect(() => {
        
    },[])
    return <>
    <header  style={{'backgroundImage': `url(${bgImage})`}} className=" bg-cover bg-center md:h-[320px] h-[200px] max-w-[1450px] mx-auto ">
        <NavBar bgImage = {bgImage} setBgImage= {setBgImage} cartSize ={cartSize}/>
    </header>
    <main >
        <Outlet/>
    </main>
    <footer>
        <NivzoneFooter/>
    </footer>
    </>
}

export default Body;