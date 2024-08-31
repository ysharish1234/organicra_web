import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar';
import Product from './Product';
import Home from './Home';
import Footer from './Footer';
export default function Main() {
    const [search,setSearch]=useState("");
    const [product,setProduct] = useState([]);
    const [menu,setMenu] = useState("");
    return (
        <>
            <div>
                <Navbar setSearch={setSearch} disabled={false}/>
                <Home search={search}/>
                <Footer/>
            </div>
        </>
    )
}
