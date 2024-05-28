import React,{useContext, useEffect} from 'react';
import Login from '../Components/Login/Login';
import { MyCache } from '../App';
import { useNavigate } from 'react-router-dom';



function LoginPage() {

  const navigate = useNavigate()
  const {cache, setCache} = useContext(MyCache)

  useEffect(()=>{
    const set = localStorage.getItem('cache');
    if (set == "true"){
      setCache(true)
    }
    if(cache === true){
      navigate('/')
    }
  })

  return (
    <div>
      
        <Login />
  
    </div>
  );
}

export default LoginPage;
