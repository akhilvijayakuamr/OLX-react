import React,{useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Context/Context';
import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";
function Header() {
  const {user} =  useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const signout =()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login')
     // Sign-out successful.
    }).catch((error) => {
    // An error happened.
});
  }

  const signin=()=>{
    navigate('/login')
  }

  const creForm=()=>{
    user ? navigate('/create') : alert("Please Login")
    
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" >
          {user?<span onClick={()=>signout()} >Logout</span>:<span onClick={signin} >Login</span>}
          
          <hr />
        </div>
        

        <div className="sellMenu" onClick={creForm}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
