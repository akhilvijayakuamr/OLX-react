import React,{useEffect,useContext} from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { MyCache } from '../App';
import { useNavigate } from 'react-router-dom';

function Home(props) {

  const {cache, setCache} = useContext(MyCache)

  const navigate = useNavigate()

  useEffect(()=>{
    if (cache === false){
        navigate('/login')
    }
  })

  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 