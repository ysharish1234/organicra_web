import React, { useEffect,useState } from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRupeeSign } from "react-icons/fa";
import { toast,ToastContainer} from 'react-toastify';
import bill from '../images/bill.png'
import axios from 'axios';
import deliveryBoy from '../images/delivery_boy.png'
export default function Fetch_address(props) {
    const [address,setAddress]=useState([]);
    const get_address_details = async (add_id) => {
        const url = "http://localhost/organicra/fetch_address.php";
        const fData = new FormData();
        let data;
        let Array;
        fData.append('add_id', add_id);
        try {
            const response = await axios.post(url, fData);
            data = response.data;
        } catch (error) {
            console.error("Error:", error);
        }
        let jsonArray = await Object.keys(data).map(key => ({
            key: key,
            value: data[key]
          }));
        setAddress(jsonArray);
    };
    const get_total_cost = () => {
        let total_cost = 0.0;
        props.order
            .filter((orders) => orders.value.ord_unq_id.includes(props.ordKey))
            .map((orders) => {
                total_cost = total_cost + parseFloat(orders.value['cost']);
                console.log(total_cost);
            });
        return total_cost;
    };
    useEffect(()=>{
        get_address_details(props.add_id);
    },[])
    return (
        <div>
            {address.length>0&&address.map((add)=>{
                return(
                    <div style={{display:"flex",flexDirection:"row",fontFamily:'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
                        <div className='price_container' style={{height:"40rem",margin:"0rem"}}>
                        <img src={deliveryBoy} style={{height:"300px",width:"280px",borderRadius:"1rem"}}/>
                            <div style={{display:"flex",flexDirection:"column",align:"center",alignSelf:"center",color:"#7D7C7C",fontWeight:"bold"}}>
                                <h1 style={{fontSize:"1.5rem",color:"#211C6A"}}>Address details</h1>
                                <p>{add.value.cust_name}</p>
                                <p>+91{add.value.mobile_number}</p>
                                <p>{add.value.house_no}</p>
                                <p>{add.value.street_details}</p>
                                <p>{add.value.city_or_district}</p>
                                <p>{add.value.pincode}</p>
                            </div>
                        </div>
                        <div style={{display: 'flex',flexDirection: 'column'}}>
                            <div className='price_container' style={{height:"40rem",margin:"0rem",marginLeft:"2rem"}}>
                                <img src={bill} style={{height:"300px",width:"280px",borderRadius:"1rem"}}/>
                                <div className='Price_heading'>
                                    <h3 style={{fontSize:"1.5rem",color:"#211C6A"}}>Price Summary</h3>
                                </div>
                                <div>
                                    <h5  style={{ fontFamily: 'Courier New, Courier, monospace' }}>{`Total Products:${props.order.length}`}</h5>
                                    <h5 style={{ fontFamily: 'Courier New, Courier, monospace' }}>Total Price:<LiaRupeeSignSolid fontSize="1.5rem"/>{get_total_cost()}</h5>
                                    <h5 style={{ fontFamily: 'Courier New, Courier, monospace' }}>{`Delivery charges: free`}</h5>
                                    <hr style={{width:"100%"}}/>
                                </div>
                                <h4 style={{display:"flex",alignSelf:"center",fontSize:"1.5rem",fontFamily: 'Courier New, Courier, monospace',fontWeight:"bold"}}>Total Cost:<LiaRupeeSignSolid fontSize="2rem"/>{get_total_cost()}</h4>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
