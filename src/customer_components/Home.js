import React, { useEffect, useState } from 'react'
import banner1 from "../images/banner1.png"
import banner5 from "../images/banner2.png"
import banner6 from "../images/banner3.png"
import banner2 from "../images/vegetables.png"
import banner3 from "../images/fruits.png"
import slide_banner from "../images/slide_banner.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import './Home.css';
import Product_search from './product_search';
import Image_filter_home_page from './Image_filter_home_page';
export default function Home(props) {
    const [products,setProducts]=useState([]);
    const getProducts=async ()=>{
        let jsonArray;
        let data;
        let url="http://localhost/organicra/fetch_sample_product_details.php";
        let fData=new FormData();
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
        getProducts();
    })
    return (
        <>  
        {!props.search&&<div className="Container" >
                <div style={{display: 'flex',justifyContent:'space-evenly',width:"100%"}}>
                    <div>
                        <Carousel showThumbs={false} width="67rem" autoPlay={true} infiniteLoop={true}> 
                            <div >
                                <img src={banner1} style={{width:'100%',height:"70%"}}/>
                            </div> 
                             <div >
                                <img src={banner2} style={{width:'100%'}}/>
                            </div>
                             <div >
                                <img src={banner3} style={{width:'100%'}}/>
                            </div>
                            <div >
                                <img src={banner5} style={{width:'100%'}}/>
                            </div>
                            <div >
                                <img src={banner6} style={{width:'100%'}}/>
                            </div>
                        </Carousel>
                    </div>
                    <div style={{height:"60%"}}>
                        <img src={slide_banner} style={{height:"37.5rem"}}/>
                    </div>
                </div>
                <div className="sample_products">
                    <div>
                        <h2 style={{display: 'flex',alignSelf:"flex-start",marginLeft:"4.5rem"}} className='category_name'>Vegetables</h2>
                        <Image_filter_home_page products={products} category={"vegetables"}/>
                    </div>
                    <div>
                        <h2 style={{display: 'flex',alignSelf:"flex-start",marginLeft:"5rem",marginTop:"4rem"}} className='category_name'>Fruits</h2>
                        <Image_filter_home_page products={products} category={"fruits"}/>
                    </div>
                    <div>
                        <h2 style={{display: 'flex',alignSelf:"flex-start",marginLeft:"4.5rem",marginTop:"4rem"}} className='category_name'>Milk products</h2>
                        <Image_filter_home_page products={products} category={"milk products"}/>
                    </div>
                    <div>
                        <h2 style={{display: 'flex',alignSelf:"flex-start",marginLeft:"4.5rem",marginTop:"4rem"}} className='category_name'>Meat</h2>
                        <Image_filter_home_page products={products} category={"Meat"}/>
                    </div>
                    <div>
                        <h2 style={{display: 'flex',alignSelf:"flex-start",marginLeft:"4.5rem",marginTop:"4rem"}} className='category_name'>Grains</h2>
                        <Image_filter_home_page products={products} category={"grains"}/>
                    </div>
                </div>
            </div>}
            {props.search&&<Product_search products={products} search={props.search}/>
            }
        </>
    )
}
