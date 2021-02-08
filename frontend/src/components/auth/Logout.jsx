import React, { useState, useContext } from 'react';
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import UserContext from "../../context/userContext";
// import ErrorNotice from "../../components/misc/ErrorNotice";

function Logout () {
    // const { userData, setUserData } = useContext(UserContext);
    // const history = useHistory();

    // const logout = () => {
    //     setUserData({
    //         token: undefined,
    //         user: undefined
    //     })
    //     localStorage.setItem("auth-token","");
    //     history.push("/logout");
    // };

    const setwidth = {
        width:'60%',
        marginTop:'20px'
    };

    return (        
        <div className="container">            
            <>
            <div style={ setwidth }>
                <h3>Logout Sucessfully</h3>                
            </div>
            </>           
            
        </div>
    );
}
 
export default Logout;
