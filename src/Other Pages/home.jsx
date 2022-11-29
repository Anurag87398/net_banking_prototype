import React, { useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import Balance from "../components/Balance";
import FundTransfer from "../components/FundTransfer";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import {arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";
import { db } from "../firebase-config.js";

function Home(){
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    //making DATABASE:


    const [dMoney, setDMoney]= useState();
    const [pin, setPin]= useState("");

    function moneyInputHandler(event){
        const value= event.target.value;
        setDMoney(value);
    }

    function pinInputHandler(event){
        const value= event.target.value 
        setPin(value);
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    //console.log(makeid(5));

    async function createAccClicktHandler(event){
        event.preventDefault();
        const rand= makeid(10);
        //console.log(dMoney);
        const clientDocRef= await updateDoc(doc(db, "Clients", user.uid), {				//await
            accNo : arrayUnion(rand),
            // regions: arrayUnion("greater_virginia"),
        })
        const accDocRef= await setDoc(doc(db, "Accounts", rand), {				//await
            amount: Number(dMoney),
            pin: pin, 
        })

        setDMoney("");
        setPin("");
    }

    const [senderAccount, setSenderAccount]= useState("");
    
    function getSenderAcc(senderAcc){
        setSenderAccount(senderAcc);
    }
    
    return <div>
        <Header />
        <div className="dabbaHolder">
            <motion.div className="dabba" animate={{scale:1}} initial={{scale: 0}} transition= {{duration: 1, delay: 2}} id="one">
                <Balance func= {getSenderAcc}/>
            </motion.div>
            <motion.div className="dabba" animate={{opacity:1}} initial={{opacity: 0}} transition= {{duration: 1, delay: 2.5}} id="two">
                <FundTransfer sender={senderAccount}/>
            </motion.div>
            <motion.div className="dabba" animate={{x:0}} initial={{x: 1000}} transition= {{duration: 1, delay: 3}} id="three">
                <div className="fundTransferCard">
                <h1>CREATE ACCOUNT</h1>
                <input placeholder='Deposit money (₹)' type="number" value= {dMoney} onChange={moneyInputHandler}/>
                <input placeholder="Enter PIN" type="password" value= {pin} onChange={pinInputHandler} maxLength="4"/>
                <button onClick={createAccClicktHandler}>Create Account</button>
                </div>
                {/* <motion.button onMouseOver={hoverHandler} animate={{x: hover?100:0}}>Scam</motion.button> */}
            </motion.div>
        </div>
        <Footer />
    </div>
}

export default Home;