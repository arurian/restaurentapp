import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';

function Home () {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    const dispstyle={
        width:'50%',
    };
    useEffect(() => {
        if(!userData.user)
            history.push("/login");

    }, []);
    console.log(history);
    return (
        <div style={dispstyle}>
            {/* <h3>Welcomeoutside {userData.token}</h3> */}
            {userData.user ? (
                <>
                <h3>Welcome {userData.user.displayName}</h3>
                {/* <h3>Welcomebbbbbb {userData.token}</h3> */}
                {/* <p>{userData.user.displayMsg}</p> */}
                <ul>
                    <li><Link className="active" to="/addfood">Add Food</Link></li>
                    <li><Link to="/listfood">List Food</Link></li>                    
                </ul>                

                </>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}

           
        </div>
    );
}
 
export default Home;