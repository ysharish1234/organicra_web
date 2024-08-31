import React,{useState} from 'react'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
export default function Add_address_details(props) {
    const[name,setName]=useState("");
    const[phone,setPhone]=useState("");
    const[house_no,SetHouse_no]=useState("");
    const[street,setStreet]=useState("");
    const[city_dist,SetCity_dist]=useState("");
    const[pincode,SetPincode]=useState("");
    const addAddress = ()=>{
        let data;
        let email=localStorage.getItem('email');
        const url="http://localhost/organicra/add_address.php"
        const fData=new FormData();
        fData.append('email',email);
        fData.append('name',name);
        fData.append('phone_num',phone);
        fData.append('house_no',house_no);
        fData.append('street_details',street);
        fData.append('city_or_dist',city_dist);
        fData.append('pincode',pincode);
        axios.post(url,fData).then(function(response){
            data=response.data;
            if(data){
                toast.success('Successfully added the address');
            }
        }).catch(function(error){
            console.error(error);
        })
    }
    return (
        <>
        <div>
            <div className="Address">
                    <div>
                    <h1 className="category_name" style={{display:"flex",alignSelf:"flex-start",marginLeft:"8rem",color:"#31363F",fontSize:"1.2rem",marginTop:"1rem"}}> Add Address</h1>
                        <h1 className="category_name" style={{display:"flex",alignSelf:"flex-start",marginLeft:"8rem",color:"#31363F",fontSize:"1.2rem",marginTop:"1rem"}}>Personal details</h1>
                        <div className="add_row">
                            <div style={{width: '100%'}}>
                                <label for="name" style={{color:"#979797",marginRight:"11rem"}}>Full Name</label><br/>
                                <input type="text" name="name" required className='input_line' onChange={(event)=>{setName(event.target.value)}}/>
                            </div>
                            <div style={{width: '100%'}}>
                                <label for="ph_number" style={{color:"#979797",marginRight:"9rem"}}>Mobile number</label><br/>
                                <input type="text" name="ph_number" required className='input_line' onChange={(event)=>{setPhone(event.target.value)}}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="category_name" style={{display:"flex",alignSelf:"flex-start",marginLeft:"8rem",color:"#31363F",fontSize:"1.2rem",marginTop:"1rem"}}>Address details</h1>
                        <div className="add_row">
                            <div style={{width: '100%'}}>
                                <label for='house_no' style={{color:"#979797",marginRight:"11rem"}}>House no</label><br/>
                                <input id="house_no" type="text" name="house_no" required className='input_line' onChange={(event)=>{SetHouse_no(event.target.value)}}/>
                            </div>
                            <div style={{width: '100%'}}>
                                <label for="street_details" style={{color:"#979797",marginRight:"4rem"}}> street details to locate you</label><br/>
                                <input id="street_details" type="text" name="street_details" required className='input_line'  onChange={(event)=>{setStreet(event.target.value)}}/>
                            </div>
                        </div>
                        <div className="add_row">
                            <div style={{width: '100%'}}>
                                <label for="city_dist" style={{color:"#979797",marginRight:"10rem"}}>City/District</label><br/>
                                <input id="city_dist" type="text" name="city_dist" required className='input_line' onChange={(event)=>{SetCity_dist(event.target.value)}}/>
                            </div>
                            <div style={{width: '100%'}}>
                                <label for="pincode" style={{color:"#979797",marginRight:"11rem"}}>Pincode</label><br/>
                                <input for="pincode" type="text" name="pincode" required className='input_line' onChange={(event)=>{SetPincode(event.target.value)}}/>
                            </div>
                        </div>
        
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-end",marginRight:"7rem",marginTop:"2rem"}}>
                        <button className='add_address_btn' onClick={(event)=>{event.preventDefault(); addAddress();props.set_new_address(false);}}>Add Address</button>
                    </div>
                </div>
        </div>
        </>
    )
}
