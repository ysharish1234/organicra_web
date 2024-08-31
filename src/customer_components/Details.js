import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { FaRupeeSign } from "react-icons/fa";
import Navbar from './Navbar';
import './Details.css'
import { BsBag } from "react-icons/bs";
import { LiaRupeeSignSolid } from "react-icons/lia";
import logo from '../images/logo.jpg';
import axios from 'axios';
import { toast,toastContainer } from 'react-toastify';
import Footer from './Footer';
export default function Details() {
    const location = useLocation();
    const [data,setData]=useState();
    const [quantity,setQuantity] = useState(1);
    const [price,setPrice] = useState("");
    const add_product_to_bag=()=>{
        let data;
        if(localStorage.getItem('email')==null){
            toast.warning(`Please Login or SignUp to add products to your bag`);
        }
        else{
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/add_to_bag.php"
        const fData=new FormData();
        fData.append('email',email);
        fData.append('qnt',quantity);
        fData.append('product_id',location.state.product.key);
        axios.post(url, fData).then(function(response){
            data=response.data
            if(data){
                toast.success(`${location.state.product.name} added successfully to your bag`)
            }
            else{
                toast.info(`${location.state.product.name} are already exists in your bag`)
            }
        }).catch(function(error){
            console.log(`unable to coonnect to axios ${error}`);
        })
    }
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
        setData(location?.state?.product);
    },[location])
    return (
        <>
            <toastContainer autoClose={3000}/>
            <Navbar disabled={true}/>
            <div>
            <div style={{marginTop:"10rem",marginLeft:"30px"}} className='detail_container'>
                <div style={{height:"400px",width:"400px",position:"relative"}}>
                    <h4>{`Fresh ${location?.state?.product.value.category}/${location?.state?.product.value.name}`}</h4>
                    <Carousel autoPlay={true}>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/${location?.state?.product.value['image1']}`} style={{position:"relative"}}/> 
                        </div>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/${location?.state?.product.value['image2']}`} />
                        </div>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/${location?.state?.product.value['image3']}`} />
                        </div>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/${location?.state?.product.value['image4']}`} />
                        </div>
                    </Carousel>
                </div>
                <div className="product_details">
                        <h2 style={{fontFamily:'Roboto,sans-serif'}}>{`Fresh ${location?.state?.product.value.name} - Loose (${quantity}${location?.state?.product.value.Qnt_type})`}</h2>
                        <div style={{display: 'flex',fontFamily:'Roboto,sans-serif'}}>
                            <h4>Price :<FaRupeeSign />{quantity*location?.state?.product.value.price} </h4>
                            <p style={{display: 'inline-block'}}> (<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt} {location?.state?.product.value.Qnt_type})</p>
                        </div>
                        <p style={{fontFamily:'Roboto,sans-serif'}}>(Inclusive of al taxes)</p>
                        <div>
                            <button className="add_to_bag" onClick={()=>{add_product_to_bag()}}><BsBag/>  Add to bag</button>
                        </div>
                        <div className="pack">
                            <div>
                                <h4 style={{fontFamily:'Roboto,sans-serif'}}>Packs for delivery</h4>
                            </div>
                            <div className="pack_item" style={{fontFamily:'Roboto,sans-serif'}}>
                                {location?.state?.product.value.Qnt_type!="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(0.5)}}>
                                    <span style={{fontWeight:"bold"}}>{`${location?.state?.product.value.Qnt/2} ${location?.state?.product.value.Qnt_type}`}-<FaRupeeSign />{location?.state?.product.value.price/2}</span>(<LiaRupeeSignSolid fontWeight="normal"/>{location?.state?.product.value.price} per {location?.state?.product.value.Qnt_type})
                                </div>}
                                {location?.state?.product.value.Qnt_type=="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(location?.state?.product.value.Qnt)}}>
                                    <span style={{fontWeight:"bold"}}>{`${location?.state?.product.value.Qnt} ${location?.state?.product.value.Qnt_type}`}-<FaRupeeSign />{location?.state?.product.value.price}</span>(<LiaRupeeSignSolid fontWeight="normal"/>{location?.state?.product.value.price} per {location?.state?.product.value.Qnt} {location?.state?.product.value.Qnt_type})
                                </div>}
                                {location?.state?.product.value.Qnt_type!="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(1)}}>
                                    <span style={{fontWeight:"bold"}}>1kg-<FaRupeeSign />{location?.state?.product.value.price}</span>(<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt_type})
                                </div>}
                                {location?.state?.product.value.Qnt_type=="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(2*location?.state?.product.value.Qnt)}}>
                                    <span style={{fontWeight:"bold"}}>{`${2*location?.state?.product.value.Qnt} ${location?.state?.product.value.Qnt_type}`}-<FaRupeeSign />{2*location?.state?.product.value.price}</span>(<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt}pcs)
                                </div>}
                            </div>
                            <div className="pack_item" style={{fontFamily:'Roboto,sans-serif'}}>
                                {location?.state?.product.value.Qnt_type!="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(2)}}>
                                    <span style={{fontWeight:"bold"}}>2kg-<FaRupeeSign />{2*location?.state?.product.value.price}</span>(<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt_type})
                                </div>}
                                {location?.state?.product.value.Qnt_type=="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(3*location?.state?.product.value.Qnt)}}>
                                    <span style={{fontWeight:"bold"}}>{`${3*location?.state?.product.value.Qnt} ${location?.state?.product.value.Qnt_type}`}-<FaRupeeSign />{3*location?.state?.product.value.price}</span>(<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt}pcs)
                                </div>}
                                {location?.state?.product.value.Qnt_type!="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(3)}}>
                                    <span style={{fontWeight:"bold"}}>3kg-<FaRupeeSign />{3*location?.state?.product.value.price}</span>(<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt_type})
                                </div>}
                                {location?.state?.product.value.Qnt_type=="pcs"&&<div className="pack_ind" onClick={()=>{setQuantity(5*location?.state?.product.value.Qnt)}}>
                                    <span style={{fontWeight:"bold"}}>{`${5*location?.state?.product.value.Qnt} ${location?.state?.product.value.Qnt_type}`}-<FaRupeeSign />{5*location?.state?.product.value.price}</span>(<LiaRupeeSignSolid />{location?.state?.product.value.price} per {location?.state?.product.value.Qnt}pcs)
                                </div>}
                            </div>
                        </div>
                </div>
            </div>
            </div>
            <div style={{marginTop:"7rem"}}>
                <Footer/>
            </div>
        </>
    )
}