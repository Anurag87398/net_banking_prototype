import React, {useState} from "react";
import customerData from "../Data.js";
import {Link} from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config.js";

function Login(){
    // for inputs
    const [userInputs, setUserInputs]= useState({
        uid: "",
        pass: ""
    })

    const [loginStat, setloginStat]= useState(false);

    function inputChangeHandler(event){
        const {name, value}= event.target;
        setUserInputs(()=>{
            return {
                ...userInputs,
                [name]: value 
            }
        })
    }

    // function loginClickHandler(event){
    //     console.log(userInputs);
    //     setUserInputs(()=>{
    //         return {
    //             uid: "",
    //             pass: "" 
    //         }
    //     })
    //     event.preventDefault();
    // }

    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    const loginTemp= async (event)=> {
        event.preventDefault();
        try{
            const userNew= await signInWithEmailAndPassword(auth, userInputs.uid, userInputs.pass);
            console.log(userNew);
            // window.location.replace('/home');
        }
        catch(error){
            alert("Bank mein daaka dalne aaya hai kya bhai? :'))");
        }
        
    }
    const signOutHandler= async (event)=> {
        event.preventDefault();
        signOut(auth);
        
    }
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
    <div className="login-content">
            <h1>Upcoming<br /><span>Services</span><br /></h1>
            <p className="para">Along with fast transfers we are now offering<br />
            fastag services, which is now in the beta phase<br />
            and soon will be rolled out to all our customers.<br />
            Loans and insurances are under the testing phase currently<br />
            and will be made available in due time<br />
            Thank you for trusting us!</p>

        {/* <!--Login form--> */}
        <div className="form1">
            <form className="login-form" >
                <p style={{color: "#ff8c00"}}>LOGIN</p><br />
                <hr style={{position: "relative", top: "20px", height: "1px",
                backgroundColor: "rgb(117, 117, 117)", border: "none"}} />
                {/* <!--inputs--> */}
                <div className="login-data">
                    <input className="login-inputs" value={userInputs.uid} onChange={inputChangeHandler} type="text" placeholder="Email" name="uid"/>
                    <br />
                    <input className="login-inputs" value={userInputs.pass} onChange={inputChangeHandler} type="password" placeholder="Password/OTP" name="pass"/>
                    <br />
                   {/* {user? <button onClick={signOutHandler} className="lbtn">Sign Out</button>:  <button onClick={loginTemp} className="lbtn">Login</button>} */}
                   {user? null:  <button onClick={loginTemp} className="lbtn">Login</button>}
                   {user? <Link to="/home"><button  className="lbtn">Proceed</button></Link>: null}
                   {/* {user? window.location.replace('/home'): null} */}
                    <p className="para">New member? <Link to="/sign-up" style={{color: "#ff8c00"}}>Sign Up</Link> here!</p>
                </div>
                <br />
                
                {/* <!-- <hr style="position: relative; top: 90px; height: 1px;
                background-color: rgb(38, 38, 38);
                border: none;"> -->
                <!-- <a href="#"><button class="cbtn">Sign Up</button></a> --> */}
            </form>
            </div>
    </div>

</div>
}

export default Login;