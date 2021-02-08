import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("http://localhost:5010/users/login", loginUser);
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
    const setwidth = {
        width:'60%',
        marginTop:'20px'
    };
    
    return (        
        <div className="container">
                <div style={ setwidth }>
                <h3>Login</h3>
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
                    
                    <input type="submit" value="Login" className="btn btn-clr" />
                </form>
            </div>
            </div>
    );
}
 
export default Login;