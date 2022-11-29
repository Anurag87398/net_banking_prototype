import { updateDoc, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase-config';

function FundTransfer(props) {
  const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })
  const [transferDeets, setTransferDeets]= useState({
    accNo: "",
    amount: "",
    pin: "",
  })

  function TransferInputHandler(event){
    const {name, value}= event.target;
    setTransferDeets({
      ...transferDeets,
      [name]: value,
    })
  }
  async function TransferClickHandler(event){
    event.preventDefault();
    if(transferDeets.accNo.length===0 || transferDeets.amount.length===0 || transferDeets.pin.length===0){
      alert("Please fill all the fields!");
    }
    const senderAccRefInit= await getDoc(doc(db, "Accounts", props.sender));
    // console.log(senderAccRefInit.data());
    // console.log("Sender pin:"+ senderAccRefInit.data().pin);

    const receiverAccRefInit= await getDoc(doc(db, "Accounts", transferDeets.accNo));
    // console.log(typeof(receiverAccRefInit.data()));
    if(receiverAccRefInit.data()===undefined){
      alert("Incorrect Acc No.!!!");
      setTransferDeets({
        accNo: "",
        amount: "",
        pin: "",
      })
      return
    }
    if(transferDeets.amount<1){
      alert("Sahi amount daal bhai!!");
      setTransferDeets({
        accNo: "",
        amount: "",
        pin: "",
      })
      return
    }
    if(transferDeets.pin!==senderAccRefInit.data().pin){
      alert("Invalid PIN!!!");
      setTransferDeets({
        accNo: "",
        amount: "",
        pin: "",
      })
      return
    }
    if(transferDeets.amount>senderAccRefInit.data().amount){
      alert("Insufficient Balance!!!");
      setTransferDeets({
        accNo: "",
        amount: "",
        pin: "",
      })
      return
    }

    // console.log("Sender:"+props.sender);
    // console.log("Receiver:"+transferDeets.accNo); 
    
    // console.log(receiverAccRefInit.data());

    
    // console.log(Number(transferDeets.pin));
    const senderBal= senderAccRefInit.data().amount - Number(transferDeets.amount);
    const receiverBal= receiverAccRefInit.data().amount + Number(transferDeets.amount);
    //console.log(senderBal);
    //console.log(receiverBal);
    const senderRef= await updateDoc(doc(db, "Accounts", props.sender),{
      amount: senderBal,
    });

    const receiverRef= await updateDoc(doc(db, "Accounts", transferDeets.accNo),{
      amount: receiverBal,
    });
  
    setTransferDeets({
      accNo: "",
      amount: "",
      pin: "",
    })

    alert("Transaction Successful");
    // console.log(props.sender);  
  }

  return (
    <form className="fundTransferCard">
        <h1>TRANSFER</h1>
        <input type="text" placeholder='A/C No.' value={transferDeets.accNo} name="accNo" onChange={TransferInputHandler}/>
        <input type="number" placeholder='Amount (₹)' value={transferDeets.amount} name="amount" onChange={TransferInputHandler}/>
        <input type="password" maxLength="4" placeholder='PIN' value={transferDeets.pin} name="pin" onChange={TransferInputHandler}/>
        <button onClick={TransferClickHandler}  >Transfer</button>
    </form>
  )
}

export default FundTransfer