import React, {useState} from "react";
import {Link} from "react-router-dom";
import { auth } from "../firebase-config.js";
import { onAuthStateChanged, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import { db } from "../firebase-config.js";
function SignUp(){

    // for inputs
    const [userInputs, setUserInputs]= useState({
        name: "",
        username: "",
        password: "",
        phone: "",
        email: ""
    })

    const [signUpStat, setSignUpStat]= useState(false);

    function inputChangeHandler(event){
        const {name, value}= event.target;
        setUserInputs(()=>{
            return {
                ...userInputs,
                [name]: value 
            }
        })
    }
    const [user, setUser] = useState({})
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })
    const signUpTemp= async (event)=> {
        event.preventDefault();
        try{
            const userNew= await createUserWithEmailAndPassword(auth, userInputs.email, userInputs.password);
            // userNew.user.displayName= userInputs.name;
            //userNew.user.phoneNumber= userInputs.phone;
            console.log(userNew);
            try {
                updateProfile(auth.currentUser, {
                displayName : userInputs.name,
                // phoneNumber: userInputs.
                });
            } catch (error){
                console.log(error.message);
            }
        }
        catch(error){
            alert("Bank mein daaka dalne aaya hai kya bhai? :'))");
        }

        
    }

    function signUpClickHandler(event){
        console.log(userInputs);
        setUserInputs(()=>{
            return {
                name: "",
                username: "",
                password: "",
                phone: "",
                email: ""
            }
        })
        event.preventDefault();
    }

    async function addToDB(event){
        event.preventDefault();
        const docref= await setDoc(doc(db, "Clients", user.uid),
        {
            name: userInputs.name,
            userName: userInputs.username,
            phone: userInputs.phone,
            email: userInputs.email,
        })
        window.location.replace('/home');
    
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
    <div className="signUp-content">
            <h1>Join<br /><span>Our Family</span><br /></h1>
            <p className="signUp-para">Begin your journey of comfortable<br />
            and easy financial access to your all your bank accounts<br />
            and with the latest security measures in place,<br />
            We'll take care of the rest!<br />
            <br />
            Become a member now!</p>

        {/* <!--Login form--> */}
        <div className="form2">
            <form className="signUp-form" >
                <p style={{color: "#ff8c00"}}>SIGN UP</p><br />
                <hr style={{position: "relative", top: "20px", height: "1px",
                backgroundColor: "rgb(117, 117, 117)", border: "none"}} />
                {/* <!--inputs--> */}
                <div className="signUp-data">
                    <input className="signUp-inputs" value={userInputs.name} onChange={inputChangeHandler} type="text" placeholder="Name" name="name"/>
                    <br />
                    <input className="signUp-inputs" value={userInputs.username} onChange={inputChangeHandler} type="text" placeholder="Username" name="username"/>
                    <br />
                    <input className="signUp-inputs"value={userInputs.password} onChange={inputChangeHandler} type="password" placeholder="Password" name="password"/>
                    <br />
                    <input className="signUp-inputs"value={userInputs.phone} onChange={inputChangeHandler}  type="text" placeholder="Ph no." name="phone"/>
                    <br />
                    <input className="signUp-inputs" value={userInputs.email} onChange={inputChangeHandler} type="email" placeholder="Email" name="email"/>
                    <br />
                    {user? <button  onClick={addToDB} className="subtn">Proceed</button>: <button  className="subtn" onClick={signUpTemp}>SIGN UP</button>}
        
                    
                    <p className="para">Already a member? <Link to="/login" style={{color: "#ff8c00"}}>Login</Link> here!</p>
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

export default SignUp;