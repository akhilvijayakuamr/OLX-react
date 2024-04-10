
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup'
import LoginPage from './pages/Login';
import ViewPost from './pages/ViewPost'
import React,{useState, useContext, useEffect} from 'react';
import { AuthContext } from './Context/Context';
import { FirebaseContext } from './Context/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from './pages/Create'
import Post from './Context/PostContext';


function App() {
  const {user, setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      // ...
    } else {
      console.log("user is not login")
  }
});
  })
  return (
    <div >
      <Post>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/view' element={<ViewPost/>}/>
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
