import React from "react";
import {Link} from "react-router-dom";

function LoginHome(){
    return <div className="main">
    {/* <!--Navigation bar--> */}
    <div className="nav-bar">
        {/* <!--Icon on top left--> */}
        <div className="icon">
            <h2 className="logo">ABC BANK</h2>
        </div>
        {/* <!--Menu items in nav bar--> */}
        <div className="menu-bar">
            <ul className="oldUL">
                <li className="oldLI"><a className="oldLIa" href="#">HOME</a></li>
                <li className="oldLI"><a className="oldLIa" href="#">SERVICES</a></li>
                <li className="oldLI"><a className="oldLIa" href="#">ABOUT</a></li>
                <li className="oldLI"><a className="oldLIa" href="#">CONTACT US</a></li>
            </ul>
        </div>            
        {/* <!--search bar--> */}
        <div className="search">
            <input className="srch" type="search" name="" placeholder="Loans, A/C info..." />
            <a href="#"><button className="btn">Search</button></a>
        </div>
    </div>

    {/* <!--Some content--> */}
    <div className="content">
        <h1>Banking<br /><span>Made Easier & Safer</span><br /></h1>
        <p className="para">Want to transfer funds?
        or just check your balance?<br />Be it managing
        your credit cards or requesting a new chequebook,<br />
        paying your taxes or updating your current information.<br />
        All your banking needs in one place. Faster, secure and<br />
        more effective than ever before.</p>

        {/* <!--Login form--> */}
        <div className="form1">
            <p>Welcome!</p><br />
            <hr style={{position: "relative", top: "30px", height: "1px",
            backgroundColor: "rgb(117, 117, 117)", border: "none"}} />
            <Link to="/login"><button className="cbtn">LOGIN</button></Link>
            <br />
            <hr style={{position: "relative", top: "90px", height: "1px",
            backgroundColor: "rgb(38, 38, 38)",border: "none"}} />
            <Link to="/sign-up"><button className="cbtn">Sign Up</button></Link> 
        </div>
    </div>

</div>
}

export default LoginHome;