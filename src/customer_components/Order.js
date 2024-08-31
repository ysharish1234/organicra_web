import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Order.css';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Navbar from './Navbar';
import Fetch_address from './Fetch_address';
import { TfiFaceSad } from "react-icons/tfi";
import Footer from './Footer';
export default function Order() {
    const [ord_add_id,setOrd_add_id]=useState([]);
    const [orders,setOrders]=useState([]);
    const [address,setAddress]=useState([]);
    const get_ord_add_id=async ()=>{
        let data;
        let jsonArray;
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/fetch_OrdId_AddId.php"
        const fData=new FormData();
        fData.append('email',email);
        axios.post(url,fData).then(async function(response){
            data=response.data;
            jsonArray = await Object.keys(data).map(key => ({
                key: key,
                value: data[key]
              }));
            setOrd_add_id(jsonArray);
        }).catch(function(error){
            console.error(error);
        })
    }
    const get_order_details = async ()=>{
        let data;
        let jsonArray;
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/fetch_order_details.php"
        const fData=new FormData();
        fData.append('email',email);
        axios.post(url,fData).then(async function(response){
            data=response.data;
            jsonArray = await Object.keys(data).map(key => ({
                key: key,
                value: data[key]
              }));
              setOrders(jsonArray);
        }).catch(function(error){
            console.error(error);
        })
    }
    useEffect(()=>{
        get_ord_add_id();
        get_order_details();
    },[])
    return (
        <>
            <Navbar disabled={true}/>
            <div style={{marginTop:"7rem"}}>
                {ord_add_id.length>0&&<div>
                <div className="order_nav">
                    <div style={{display:"flex",justifyContent:"space-evenly",width:"50%",fontFamily:'Open Sans, sans-serif'}}>
                        <li>products</li>
                        <li>product details</li>
                        <li>order date</li>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-evenly",width:"50%",fontFamily:'Roboto,sans-serif'}}>
                        <li style={{marginRight:"10rem"}}>Address information</li>
                        <li style={{marginRight:"3rem"}}>Bill details</li>
                    </div>
                </div>
                <div>
                    {ord_add_id.map((ordId)=>{
                        return(
                        <div style={{display:"flex",marginBottom:"2rem"}}>
                        <div className="ord_container">
                            <div className='order_details'>{
                            ordId.key&&orders.filter((order)=>order.value.ord_unq_id.includes(ordId.key)).map((order)=>{
                                return(
                                        <div className="order_item">
                                            <div>
                                                <img src={`${process.env.PUBLIC_URL}/images/${order.value['product_image']}`} style={{width:"200px",height:"200px",borderRadius:"0.5rem"}}/>
                                            </div>
                                            <div className="order_info">
                                                <p style={{fontFamily: 'Playfair Display,serif',color:"#001f3f"}}>{order.value['product_name']}</p>
                                                <p style={{fontFamily: 'Playfair Display,serif',color:"#001f3f"}}>Cost:<LiaRupeeSignSolid />{order.value['cost']}</p>
                                                <p style={{fontFamily: 'Playfair Display,serif',color:"#001f3f"}}>quantity:{`${order.value['ord_qnt']} ${order.value['ord_qnt_type']}`}</p>
                                            </div>
                                            <div className="order_info">
                                                <p style={{fontFamily: 'Playfair Display,serif',color:"#001f3f"}}>Ordered on:{order.value['ord_date']}</p>
                                                <p style={{fontFamily: 'Playfair Display,serif',color:"#001f3f"}}>Ordered at:{order.value['ord_time']}</p>
                                            </div>
                                        </div>
                                )
                            })
                            }
                            </div>
                        </div>
                            <div style={{marginLeft:"10rem"}}>
                                    <Fetch_address add_id={ordId.value} order={orders} ordKey={ordId.key}/>
                            </div>
                        </div>
                        )
                        })
                    }
                </div>
                </div>}
                {
                    ord_add_id.length==0&&<div style={{padding:"2rem",color:"#E6D2AA",backgroundColor:"#411530",position:"relative",left:"0rem",top:"10rem",marginBottom:"20rem"}}>
                        <TfiFaceSad fontSize="2rem" color="#F1EFDC"/>
                        {` No orders at present`}
                    </div>
                }
            </div>
            <Footer/>
        </>
    )
}