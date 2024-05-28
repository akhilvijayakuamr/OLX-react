import React,{useState, useContext, useEffect,} from 'react';
import { FirebaseContext } from '../../Context/Context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import {useNavigate} from 'react-router-dom'
import './Login.css';
import { MyCache } from '../../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('')
  const [valid, setValid] = useState(true)
  const {firebase} = useContext(FirebaseContext)
  const {cache, setCache} = useContext(MyCache)
  const navigate = useNavigate()
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

  const errorstyle = {
    color:'red'
  }

  
    


  const handleLogin =(e)=>{
    e.preventDefault()
    const ml = email.trim()
    const ps = password.trim()
    setEmail(ml)
    setPassword(ps)
    const vald = re.test(email)
    setValid(vald)

    if (email === '' || password === '' || valid === false){
      setMsg("please enter proper email and password")
      navigate('/login')
    }
    else{
      
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password).then(()=>{
        setMsg('')
        setCache(true)
        localStorage.setItem('cache', 'true');
        navigate('/')
      })
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
    });
    }
   
  }

  const navSign =()=>{
    navigate('/signup')
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>

          <br/>
          
          {
            msg?<h6 style={errorstyle}>{msg}</h6>:<h6></h6>
            
          }

        </form>
        <a onClick={navSign}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
