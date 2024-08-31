//This Navbar is for the customer
import {useEffect, useState} from 'react'
import "./Navbar.css"
import {FiSearch} from 'react-icons/fi';
import logo from '../images/logo.jpg';
import { CgProfile } from "react-icons/cg";
import { BsBag } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { toast ,ToastContainer} from 'react-toastify';
const Navbar = (props) => {
    const [hover, setHover] = useState({flag:false});
    const [search,setSearch] = useState("");
    const [userIn,setUserIn] = useState({flag:false});
    const capitalize=(str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } 
    const handleOnClick = () => {
        if(hover.flag){
            setHover({flag:false});
        }
        else
        {
            setHover({flag:true});
        }
      };
      const checkUserIn=()=>{
        if(localStorage.getItem('email')!==null){
            return true;
        }
        else{
            return false;
        }
      }
    return (
        <>
            <ToastContainer autoClose={3000}/>
            <div className="Nav">
            <div style={{display: 'flex',justifyContent:'space-between',width:'100%',marginLeft:"0px"}}>
                <div className="container">
                    <Link to='/'>
                        <img src={logo} style={{width:"7rem",height:"7rem",borderRadius:"5rem"}}/>
                    </Link>
                    <div className="categories">
                        <Link to='/products' state={{category:"vegetables"}} style={{textDecoration: 'none',color:" #ffffff"}}>
                            <li style={{marginLeft:"2rem",cursor:"pointer"}} className='Navbar-heading'>VEGETABLES</li>
                        </Link>
                        <Link to='/products' state={{category:"fruits"}} style={{textDecoration: 'none',color:" #ffffff"}}>
                            <li style={{marginLeft:"2rem",cursor:"pointer"}} className='Navbar-heading'>FRUITS</li>
                        </Link>
                        <Link to='/products' state={{category:"milk products"}} style={{textDecoration: 'none',color:" #ffffff"}}>
                            <li style={{marginLeft:"2rem",cursor:"pointer"}} className='Navbar-heading'>MILK PRODUCTS</li>
                        </Link>
                        <Link to='/products' state={{category:"meat"}} style={{textDecoration: 'none',color:" #ffffff"}}>
                            <li style={{marginLeft:"2rem",cursor:"pointer"}} className='Navbar-heading'>MEAT</li>
                        </Link>
                        <Link to='/products' state={{category:"grains"}} style={{textDecoration: 'none',color:" #ffffff"}}>
                            <li style={{marginLeft:"2rem",cursor:"pointer"}} className='Navbar-heading'>GRAINS</li>
                        </Link>
                    </div>
                    <div className="search_bar">
                        <input onFocus={(e)=>e.target.style.backgroundColor="white"} onBlur={(e)=>e.target.style.backgroundColor="#EEEDEB"} placeholder=" search for organic products" type="text" className='input_search' onChange={(event)=>{props?.setSearch(capitalize(event.target.value))}} disabled={props.disabled}/>
                        <div style={{marginLeft:"0rem",width:"10%",height:"105.5%",backgroundColor:"#96B85D",borderRadius:"0rem 0.5rem 0.5rem 0rem",paddingTop:"0.13rem"}}>
                            <FiSearch fontSize="2rem"/>
                        </div>
                    </div>  
                </div>
                <div style={{marginLeft:"0rem",width:"5%",height:"100%",marginTop:"2.3rem",marginRight:"2rem"}} onClick={handleOnClick}>
                        <CgProfile fontSize="2rem" cursor="pointer" color=" #ffffff"/>
                        <li className="item_text" style={{color:" #ffffff"}}>profile</li>
                        {hover.flag&&<Profile/>}
                </div> 
                {checkUserIn()?<Link to="/bag" style={{textDecoration:"none",color:" #ffffff"}}>
                    <div style={{marginLeft:"0rem",width:"5%",height:"100%",marginTop:"2.3rem",marginRight:"1rem"}}>
                        <BsBag fontSize="2rem"/>
                        <li className="item_text">Bag</li>
                    </div>
                </Link>:
                <div style={{marginLeft:"0rem",width:"5%",height:"100%",marginTop:"2.3rem",marginRight:"1rem",color:" #ffffff"}} onClick={()=>{toast.error('Please Login or signup')}}>
                        <BsBag fontSize="2rem"/>
                        <li className="item_text">Bag</li>
                </div>}
            </div>
            <div style={{width:"100%",height:"0.25rem",backgroundColor:"#EEEDEB"}}></div>
            </div>
        </>
    )
}
export default Navbar;
