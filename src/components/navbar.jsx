import { ImportExport } from "@material-ui/icons";
import React from "react";

function Navbar(){
    return <ul className="navBar">
        <li id="logo">ABC BANK</li>
        <li>Home</li>
        <li>Transactions</li>
        <li>About Us</li>
        <li id="profile">Profile</li>
    </ul>
}

export default Navbar;
