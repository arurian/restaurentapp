import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    // const [usertype] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const setwidth = {
        width:'60%',
        marginTop:'20px'
    };

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post("http://localhost:5010/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5010/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
            // history.push("/adminlayout");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        // <div className="register">
        //     <h2>Register</h2>
        //     {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
        //     <form onSubmit={submit}>
        //         <label>Email: </label>
        //         <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
        //         <label>Password: </label>
        //         <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
        //         <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
        //         <label>Display name </label>
        //         <input type="text" id="dsplay-name" onChange={e => setDisplayName(e.target.value)}/>
        //         <input type="submit" value="Register" className="btn btn-primary" />
        //     </form>
        // </div>
        <div className="container">
            <div style={ setwidth }>
                <h2>Registration</h2>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                    <div className="form-group"> 
                        <label>Email: </label>
                        <input type="email" id="email" className="form-control" onChange={e => setEmail(e.target.value)}  />
                    </div> 
                    <div className="form-group"> 
                        <label>Password: </label>
                        <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
                    </div> 
                    <div className="form-group"> 
                        <label>Password Confirmation: </label>
                        <input type="password" className="form-control" onChange={e => setPasswordCheck(e.target.value)}/>
                    </div> 
                    
                    <div className="form-group"> 
                        <label>Display Name: </label>  
                        <input type="text" id="dsplay-name" className="form-control" onChange={e => setDisplayName(e.target.value)}/>                 
                    </div> 
                    {/* <div className="form-group"> 
                    <label>User type: </label> 
                    <select id="usertype" className="form-control">
                        <option>Admin</option>
                        <option>User</option>
                    </select>
                    </div> */}
                    
                    <input type="submit" value="Login" className="btn btn-clr" />
                </form>
            </div>
            </div>
        );
}
 
export default Register;