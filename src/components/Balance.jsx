import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {arrayUnion, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "../firebase-config.js";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Style } from '@material-ui/icons';


function Balance(props) {

  const [user, setUser] = useState({})
  onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
  })
  const [amt, setAmt]= useState("");
  const [accList, setAccList]= useState();
  const [disp, setDispState]= useState(false);

  async function AccChoiceClickHandler(){
    const docRef= await getDoc(doc(db, "Clients", user.uid));
    // console.log(docRef.data().accNo);
    setAccList(docRef.data().accNo);
    // console.log(accList);
    setDispState(!disp);
  }
  async function accChooser(event){
    const {id}= event.target;
    const docRef= await getDoc(doc(db, "Accounts", id));
    // console.log(docRef.data().amount);
    props.func(id);
    setAmt("Balance: " + docRef.data().amount);
  }
  return (
    <motion.div className='balanceCard' animate={{opacity:1}} initial={{opacity:0}} transition= {{duration: 1, delay: 3}} >
        {/* <img src="https://media.istockphoto.com/id/1190475811/photo/rush-in-the-city.jpg?s=612x612&w=0&k=20&c=PKpWSnamJ8tjwCcRE1xFnc8n14Pv0u3ahDzNFuGIPa4=" alt="image" /> */}
        <i className="fa-solid fa-indian-rupee-sign"></i>
        {/* <hr id='iski'/> */}
        {disp?<h1>{amt}</h1>:null}
        {/* {(disp==="Choose")? */}
        {disp?<button className='choice' onClick={AccChoiceClickHandler}>Hide accounts</button> : <button className='choice' onClick={AccChoiceClickHandler}>Show all accounts</button>}
        {disp?
        <div className='accContainer'>
          {accList.map((acc, index)=>{
            return <button onClick={accChooser} key= {index} id={acc} className='acc'>{acc}</button>
          })}
        </div>: null}
        <div>

        </div>
    </motion.div>
  )
}

export default Balance