import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase-config.js";

function Profile(){
    const signOutHandler= async (event)=> {
        event.preventDefault();
        signOut(auth);
        window.location.replace('/login');
    }
    return <div>
        <Header />
        <div className="dabbaHolder" id="profileHolder">
            <div className="dabba" id="profile">
                <button onClick={signOutHandler} className="subtn" >SIGN OUT</button>

            </div>

        </div>
        <Footer />
    </div>
}

export default Profile;