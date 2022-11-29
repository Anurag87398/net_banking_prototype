import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginHome from "../Other Pages/loginHome";
import Login from "../Other Pages/login";
import SignUp from "./SignUp";
import Home from "../Other Pages/home";
import Profile from "../Other Pages/Profile";

function App(){
    return <div>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LoginHome />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/sign-up" element={<SignUp />}></Route>
                <Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/profile" element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;