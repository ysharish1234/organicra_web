import React,{useState} from 'react'
import { toast ,ToastContainer} from 'react-toastify';
import axios from 'axios';
export default function Display_address(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
    const Enable_Address=()=>{
        let data;
        const url="http://localhost/organicra/Address_enable.php"
        const fData=new FormData();
        fData.append('add_id',selectedOption);
        axios.post(url,fData).then(async function(response){
           data=response.data;
        }).catch(function(error){
            console.error(error);
        })
    }
    const add_order=()=>{
        let data;
        let d=new Date();
        let date="";
        let time="";
        date=date+d.getDate()+"-";
        date=date+d.getMonth()+"-";
        date=date+d.getFullYear();
        time=time+d.getHours()+":";
        time=time+d.getMinutes()+":";
        time=time+d.getSeconds();
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/order_setup.php"
        const fData=new FormData();
        fData.append('email', email);
        fData.append('date',date);
        fData.append('time',time);
        axios.post(url,fData).then(function(response){
            data=response.data;
            if(!data){
                toast.error("Incorrect password");
            }
            else
            {
                toast.success("Your order placed successfully!",{autoClose:1000});
                    setTimeout(()=>{
                        toast.success("Redirecting to the home page",{autoClose:1000});
                    },2000)
                    setTimeout(()=>{
                        window.location.href="/";
                    },4000);
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    return (
        <>
            <div className='address_display_format'>
                {props.address.length>0&&props.address.map((add)=>{
                    return(
                        <div className={selectedOption===add.value.id?'selected_box':'adress_gird_style'} onClick={()=>{handleOptionSelect(add.value.id)}}>
                            <h1>Address details</h1>
                            <p>{add.value.cust_name}</p>
                            <p>+91{add.value.mobile_number}</p>
                            <p>{add.value.house_no}</p>
                            <p>{add.value.street_details}</p>
                            <p>{add.value.city_or_district}</p>
                            <p>{add.value.pincode}</p>
                        </div>
                    )
                })
                }
            </div>
            <div style={{marginTop:"5rem",display:"flex",justifyContent:"space-evenly"}}>
                {props.address.length>0&&<button className={selectedOption!==null?"order_now_btn":"order_now_btn2"} disabled={selectedOption!==null?false:true} onClick={()=>{Enable_Address();add_order();}}>Order Now</button>}
                {(!props.add_new_address&&props.address.length>0)&&<button className={selectedOption!==null?"order_now_btn":"order_now_btn2"} onClick={()=>{props.set_new_address(true);}}>Add new address</button>}
            </div>
        </>
    )
}
