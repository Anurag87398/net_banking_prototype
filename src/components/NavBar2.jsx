import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { motion } from 'framer-motion';



function NavBarTwo() {
  const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
  })

  function profileHandler(){
    window.location.replace('/profile');
  }
  return (
    <motion.ul className='navBarTwo' 
    animate={{y:0}} 
    initial={{y:-200}} 
    transition={{duration: 1, delay: 0}}>
        <li id='logo'>ABC BANK</li>
        <Link to="/">
          <li className='navTwo'>Home</li>
        </Link>
        <Link to="/search">
          <li className='navTwo'>Search</li>
        </Link>
        <li className='navTwo'>New</li>
        <a onClick={profileHandler}><li className='navTwo' id="account">{user.displayName}</li></a>
    </motion.ul>
  )
}

export default NavBarTwo