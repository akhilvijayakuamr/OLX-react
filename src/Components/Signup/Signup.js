import React, { useState, useContext, } from 'react';
import { getAuth,  createUserWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
import { getFirestore, addDoc, collection } from 'firebase/firestore';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Context/Context';
import { firebase } from '../../Firebase/config';

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(true)
  const [msg, setMsg] = useState('')
  const {Firebase} = useContext(FirebaseContext)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errorstyle = {
    color:'red'
  }
  
 

  const handleSubmit = (e) =>{
    e.preventDefault()
    const use = username.trim()
    const em = email.trim()
    const ph = phone.trim()
    const pas = password.trim()
    setUsername(use)
    setEmail(em)
    setPhone(ph)
    setPassword(pas)
    const v = re.test(email)
    setValid(v)

    if (username === '' || email === '' || phone === '' || password === '' || valid === false){
        setMsg("Please enter valid fields")
        navigate('/signup' )
    }else{
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
    
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
          const db = getFirestore();
          addDoc(collection(db, 'users'), {
            id: user.uid,
            userName: username, 
            phoneNo: phone
          }).then(()=>{
            setMsg('')
            navigate('/login');
          }).catch((error)=>{
  
            console.log(error.message)
          })
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ..
    });
      
    }


  
  }
  const log =()=>{
    navigate('/login')
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="passwprd"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
          <br/>
          
          {
            msg?<h6 style={errorstyle}>{msg}</h6>:<h6></h6>
            
          }
        </form>
        <a onClick={log}>Login</a>
      </div>
    </div>
  );
}
