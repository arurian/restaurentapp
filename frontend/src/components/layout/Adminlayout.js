import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import AuthOptions from '../auth/AuthOptions';


import { useHistory, Switch, Route } from 'react-router-dom';
import UserContext from '../../context/userContext';

// import Login from '../../components/auth/Login';
// import Truelogin from './components/pages/Truelogin';
import Addfood from '../../components/pages/Addfood';
import Listfood from '../../components/pages/Listfood'

// import Home from '../pages/Home';

class Adminlayout extends Component {
   
    
    render() { 
        return ( 
            <header className="header">
                <Link to="/"><h1 className="title">Resturant App</h1></Link>
                <Home />
            </header>
         );
    }
}
 
export default Adminlayout;