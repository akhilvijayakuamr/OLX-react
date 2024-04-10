import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../Context/Context';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom'


const Create = () => {
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const data = new Date()

  const handleSumit = async (e) => {
    e.preventDefault()
    console.log("hai")
   
    try {
      const storage = getStorage();
      const fileRef = ref(storage, `/image/${image.name}`);
      await uploadBytes(fileRef, image);
      console.log("hai")

      const url = await getDownloadURL(fileRef);
        const db = getFirestore();
        console.log("hai2")
        addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt: data.toDateString()
        }).then(()=>{
          console.log("hai3")
          navigate('/');
        })
  
   
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            id="fname" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input type="file" 
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <br />
            <button onClick={handleSumit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
