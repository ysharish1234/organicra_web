import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../images/logo.jpg';
import { TfiFaceSad } from "react-icons/tfi";
import { BsBag } from "react-icons/bs";
import './Product.css';
import { FaRupeeSign } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import axios from 'axios';
import { toast,toastContainer } from 'react-toastify';
import Footer from './Footer';
export default function Product() {
    const location = useLocation();
    const [search,setSearch]=useState("");
    const [products,setProducts] = useState([]);
    const [price,setPrice] = useState();
    const add_product_to_bag=(Qnt,product_id,product_name)=>{
        let data;
        if(localStorage.getItem('email')==null){
            toast.warning(`Please Login or SignUp to add products to your bag`);
        }
        else{
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/add_to_bag.php"
        const fData=new FormData();
        fData.append('email',email);
        fData.append('qnt',Qnt);
        fData.append('product_id',product_id);
        axios.post(url, fData).then(function(response){
            data=response.data
            if(data){
                toast.success(`${product_name} added successfully to your bag`)
            }
            else{
                toast.info(`${product_name} are already exists in your bag`)
            }
        }).catch(function(error){
            console.log(`unable to coonnect to axios ${error}`);
        })
    }
    }
    const getProducts=async ()=>{
        let jsonArray;
        let data;
        let url="http://localhost/organicra/fetch_product_details.php";
        let fData=new FormData();
        fData.append('category',location.state.category);
        axios.post(url,fData).then(async (response)=>{
            data=response.data;
            jsonArray = await Object.keys(data).map(key => ({
                key: key,
                value: data[key]
              }));
              setProducts(jsonArray);
        }).catch(function(error){
            console.log("Something error occured");
        })
    }
    useEffect(()=>{
        window.scrollTo(0, 0); 
        getProducts();
    },[location.state.category,location])
    return (
        <>
            <toastContainer autoClose={3000}/>
            <Navbar setSearch={setSearch} disabled={false}/>
            <div style={{marginTop:"10rem"}}>
            {location.state?.category&&<h2 style={{textAlign: 'left',marginLeft:"5rem",marginTop:"5px"}} className='category_name'>fresh {location.state?.category??"No products"}</h2>}
            <div className="products">
                {!search&&products?.map((data)=>{
                return(
                    <div className='product_container' style={{height:"500px",border:"1px soild green",borderRadius:"1rem",textDecoration:"none"}}>
                            <Link to='/details' state={{product:data}} style={{textDecoration:"none"}}>
                                <div style={{height:"300px",width:"210px",paddingLeft:"0.3rem"}}>
                                    <img src={logo} className="brand-logo" alt="Logo"/>
                                    <img src={`${process.env.PUBLIC_URL}/images/${data.value['image1']}`} style={{height:"300px",width:"270px",borderRadius:"1rem"}}/>
                                </div>
                            </Link>
                        <h3 style={{marginLeft:"1rem",color: "#35374B",margin:"0px",marginTop:"2px",fontFamily:'Roboto,sans-serif',fontSize:"1.5rem",color:"#333",fontWeight:"500"}}>{data.value.name}</h3>
                        {data.value.Qnt_type!="pcs"&&<div className="Pack_ind">
                            <span style={{fontWeight:"bold"}}>1kg-<FaRupeeSign />{data.value.price}</span>(<LiaRupeeSignSolid />{data.value.price} per {data.value.Qnt} {data.value.Qnt_type})
                        </div>}
                        {data.value.Qnt_type=="pcs"&&<div className="Pack_ind">
                            <span style={{fontWeight:"bold"}}>1Pack-<FaRupeeSign />{data.value.price}</span>(<LiaRupeeSignSolid />{data.value.price} per {data.value.Qnt} pcs)
                        </div>}
                        <button className="add_to_bag" style={{width:"17rem",marginBottom:"0.5rem"}} onClick={()=>{add_product_to_bag(data.value.Qnt,data.value.id,data.value.name)}}><BsBag/>  Add to bag</button>
                    </div>
                    )
                })}
                {search&&products?.filter((data)=>data.value.name.includes(search)).map((data)=>{
                return(
                    <div className='product_container' style={{height:"500px",border:"1px soild green",borderRadius:"1rem",textDecoration:"none"}}>
                    <Link to='/details' state={{product:data}} style={{textDecoration:"none"}}>
                                <div style={{height:"300px",width:"200px",paddingLeft:"0.3rem"}}>
                                    <img src={logo} className="brand-logo" alt="Logo"/>
                                    <img src={`${process.env.PUBLIC_URL}/images/${data.value['image1']}`} style={{height:"300px",width:"270px",borderRadius:"1rem"}}/>
                                </div>
                    </Link>
                        <h3 style={{marginLeft:"1rem",color: "#35374B",margin:"0px",marginTop:"2px"}}>{data.value.name}</h3>
                        {data.value.Qnt_type!="pcs"&&<div className="Pack_ind">
                            <span style={{fontWeight:"bold"}}>1kg-<FaRupeeSign />{data.value.price}</span>(<LiaRupeeSignSolid />{data.value.price} per {data.value.Qnt} {data.value.Qnt_type})
                        </div>}
                        {data.value.Qnt_type=="pcs"&&<div className="Pack_ind">
                            <span style={{fontWeight:"bold"}}>1Pack-<FaRupeeSign />{data.value.price}</span>(<LiaRupeeSignSolid />{data.value.price} per {data.value.Qnt} pcs)
                        </div>}
                        <button className="add_to_bag" style={{width:"17rem",marginBottom:"0.5rem"}} onClick={()=>{add_product_to_bag(data.value.Qnt,data.value.id,data.value.name)}}><BsBag/>  Add to bag</button>
                    </div>
                )
                })}
                {
                    search&&products?.filter((data)=>data.value.name.includes(search)).length===0&&
                    <div style={{padding:"2rem",color:"#E6D2AA",backgroundColor:"#411530",position:"relative",left:"30rem",top:"5rem",marginBottom:"7rem"}}>
                        <TfiFaceSad fontSize="2rem" color="#F1EFDC"/>
                        {`  Sorry No such ${location.state?.category} available at present`}
                    </div>
                }
            </div>
            </div>
            <Footer/>
        </>
    )
}
