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
export default function Image_filter_home_page(props) {
    let count=0;
    const location = useLocation();
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
            console.log(`unable to connect to axios ${error}`);
        })
    }
    }
    return (
        <>
        <div className="products" style={{width:"95%"}}>
            {props.products?.filter((data)=>data.value.category.includes(props.category)).map((data)=>{
                count=count+1;
                if(count>4){
                    return;
                }
                return(
                    <div className='product_container' style={{height:"500px",border:"1px soild green",borderRadius:"1rem",textDecoration:"none",marginTop:"0rem"}}>
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
        </div>
        </>
    )
}
