import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Product from './Product';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import './Bag.css';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRupeeSign } from "react-icons/fa";
import { toast,ToastContainer} from 'react-toastify';
import bill from '../images/bill.png'
import {Link} from 'react-router-dom';
import Footer from './Footer';
import { TfiFaceSad } from "react-icons/tfi";
import { useLocation } from 'react-router-dom';
export default function Bag() {
    const [products, setProducts] = useState([]);
    const { pathname } = useLocation();
    const getProducts = async () => {
        let data;
        let jsonArray;
        const email = localStorage.getItem('email');
        const url = "http://localhost/organicra/check_bag.php";
        const formData = new FormData();
        formData.append('email', email);
        axios.post(url, formData)
            .then(async function (response) {
                let data = response.data
                jsonArray = await Object.keys(data).map(key => ({
                    key: key,
                    value: data[key]
                  }));
                  setProducts(jsonArray);
            })
            .catch(function (error) {
                console.log("Error:", error);
            });
    };
    const getTotalPrice=()=>{
        let totalPrice=0;
        products.map((data)=>{
            totalPrice+=data.value.price*(data.value.selected_qnt/data.value.base_qnt);
        })
        return totalPrice;
    }
    const add_remove_product_number=(opr_type,base_qnt,prev_qnt,product_id)=>{
        const email = localStorage.getItem('email');
        const url = "http://localhost/organicra/manipulate_quantity.php";
        const formData = new FormData();
        formData.append('email', email);
        formData.append(`${opr_type}`,true);
        formData.append('base_qnt',base_qnt);
        formData.append('product_id',product_id);
        formData.append('previous_qnt',prev_qnt);
        axios.post(url, formData)
            .then(function (response) {
                let data = response.data
                if(data){
                    getProducts();
                }
            })
            .catch(function(error) {
                console.log("Error:", error);
            });
    }
    const remove_product=(product_id,product_name)=>{
        const email = localStorage.getItem('email');
        const url = "http://localhost/organicra/remove_from_bag.php";
        const formData = new FormData();
        formData.append('email', email);
        formData.append('product_id',product_id);
        axios.post(url, formData)
        .then(function (response) {
            let data = response.data
            if(data){
                getProducts();
            }
        })
        .catch(function(error) {
            console.log("Error:", error);
        });
    }
    useEffect(() => {
        getProducts();
        window.scrollTo(0, 0); 
    }, [pathname]);

    return (
        <>
            <ToastContainer autoClose={3000}/>
            <Navbar disabled={true}/>
            <div className='bag_products'>
                {products.length>0&&<h1 style={{fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',fontSize:"1.7rem",color:"#333"}}>Total Number of Products in your Bag:{products.length}</h1>}
                {products.length>0&&<div style={{display: 'flex',flexDirection:"row"}}>
                    <div style={{display: 'flex',flexDirection:'column',width:"50%"}}>
                    {products.map((data)=>{
                        return(
                            <div className='Product_container' style={{height:"300px",width:"100%"}}>
                                <img src={`${process.env.PUBLIC_URL}/images/${data.value['image']}`} style={{height:"250px",width:"200px"}} className='product_image'/>
                                <div className='product_information'>
                                    <div style={{display: 'flex',flexDirection:"row",justifyContent:"space-between"}}>
                                        <p>Product: {data.value.name}</p>
                                        <p>quantity: {data.value.selected_qnt}</p>
                                    </div>
                                    <div style={{display: 'flex',flexDirection:"row",justifyContent:"space-between"}}>
                                        <p style={{fontFamily: 'Roboto ,sans-serif'}}>{`Total quantity: ${data.value.selected_qnt} ${data.value.Qnt_type}`}</p>
                                        <p style={{fontFamily: 'Roboto, sans-serif'}}>{`Total price is: ${data.value.price*(data.value.selected_qnt/data.value.base_qnt)}`}</p>
                                    </div>
                                    <div>
                                        <div className="product_num_manager">
                                            <button className='symbols_define' onClick={()=>{add_remove_product_number('add',data.value.base_qnt,data.value.selected_qnt,data.value.id)}} style={{borderTopLeftRadius:"0.3rem",borderBottomLeftRadius:"0.3rem"}}><FaPlus/></button>
                                            <div className='qnt_define'>{data.value.selected_qnt/data.value.base_qnt}</div>
                                            <button className='symbols_define' onClick={()=>{if(data.value.selected_qnt>data.value.base_qnt){add_remove_product_number('sub',data.value.base_qnt,data.value.selected_qnt,data.value.id)}else{remove_product(data.value.id)}}} style={{borderTopRightRadius:"0.3rem",borderBottomRightRadius:"0.3rem"}}><FaMinus/></button>
                                        </div>
                                        <button className='romove_from_bag' onClick={()=>{remove_product(data.value.id,data.value.name)}}>Remove from Bag</button>
                                    </div>
                                </div>
                            </div> 
                    )})}
                    </div>
                    <div style={{display: 'flex',flexDirection: 'column'}}>
                        <div className='price_container'>
                            <img src={bill} style={{height:"300px",width:"280px",borderRadius:"1rem"}}/>
                            <div className='Price_heading'>
                                <h3 style={{fontSize:"1.5rem",color:"#211C6A"}}>Price Summary</h3>
                            </div>
                            <div>
                                <h5  style={{ fontFamily: 'Courier New, Courier, monospace' }}>{`Total Products:${products.length}`}</h5>
                                <h5 style={{ fontFamily: 'Courier New, Courier, monospace' }}>Total Price:<LiaRupeeSignSolid fontSize="1.5rem"/>{getTotalPrice()}</h5>
                                <h5 style={{ fontFamily: 'Courier New, Courier, monospace' }}>{`Delivery charges: free`}</h5>
                                <hr style={{width:"100%"}}/>
                            </div>
                            <h4 style={{display:"flex",alignSelf:"center",fontSize:"1.5rem",fontFamily: 'Courier New, Courier, monospace',fontWeight:"bold"}}>Total Cost:<LiaRupeeSignSolid fontSize="2rem"/>{getTotalPrice()}</h4>
                        </div>
                        <div style={{marginTop:"2rem",marginLeft:"10rem"}}>
                            <Link to='/Address'>
                                <button className='order_now_btn'>ORDER NOW</button>
                            </Link>
                        </div>
                    </div>
                </div>
                }
                {products.length==0&&<div style={{padding:"2rem",color:"#E6D2AA",backgroundColor:"#411530",position:"relative",left:"0rem",top:"10rem",marginBottom:"15rem"}}>
                        <TfiFaceSad fontSize="2rem" color="#F1EFDC"/>
                        {` No products in your bag`}
                    </div>
                }   
            </div>
            <Footer/>
        </>
    );
}