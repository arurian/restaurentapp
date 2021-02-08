import React, {  useEffect,useState, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";


function Addfood () {
    const [foodname, setName] = useState();
    const [foodprice, setPrice] = useState();
    const [foodqty, setQty] = useState();
    const [fooddesc, setDesc] = useState();
    
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);

    const {userData} = useContext(UserContext);
    const history = useHistory();
   
    // useEffect(() => {
    //     if(!userData.user)
    //         history.push("/login");
    //     else
    //     history.push("/");

    // }, []);
    // console.log(history);

    const submit = async (e) => {
        e.preventDefault();
        try{
            // const foodItems = {foodname};
            const foodItems = {foodname, foodprice, foodqty, fooddesc};
            console.log("foodItems"+foodItems);            
            const loginResponse = await axios.post("http://localhost:5010/users/addfood", foodItems);
            history.push("/");
            // console.log("loginresponse"+loginResponse);
            // setUserData({
            //     token: loginResponse.data.token,
            //     user: loginResponse.data.user
            // });
            // localStorage.setItem("auth-token", loginResponse.data.token);
            // history.push("/");
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
             {userData.user ? (
                <>
                <div style={ setwidth }>
                <h3>Add Food</h3>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input type="text" id="foodname" className="form-control" onChange={e => setName(e.target.value)}  />
                    </div> 
                    <div className="form-group"> 
                        <label>Price: </label>
                        <input type="text" id="foodprice" className="form-control" onChange={e => setPrice(e.target.value)}  />
                    </div> 
                    <div className="form-group"> 
                        <label>Quantity: </label>
                        <input type="text" id="foodqty" className="form-control" onChange={e => setQty(e.target.value)}  />
                    </div> 
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input type="text" id="fooddesc" className="form-control" onChange={e => setDesc(e.target.value)}  />
                    </div>                  
                    
                    <input type="submit" value="Submit" className="btn btn-clr" />
                </form>
            </div>
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
 
export default Addfood;


// import React, { Component } from 'react';
// import axios from 'axios';

// import { useState, useContext } from 'react';
// import { useHistory, Link } from "react-router-dom";
// import UserContext from "../../context/userContext";
// import ErrorNotice from "../../components/misc/ErrorNotice";

// export default class Addfood extends Component {
//     constructor(props) {
//         super(props);

//         this.onChangeFoodName = this.onChangeFoodName.bind(this);
//         this.onChangeFoodPrice = this.onChangeFoodPrice.bind(this);
//         this.onChangeFoodQty = this.onChangeFoodQty.bind(this);
//         this.onChangeFoodDesc = this.onChangeFoodDesc.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             foodname: '',
//             foodprice: '',
//             foodqty: '',
//             fooddesc: '',
//             // userData : useContext(UserContext),
//             // history : useHistory()
//         }        
//     } 
    
//     // var setwidth = {
//     //     width:'60%',
//     //     marginTop:'20px'
//     // };  

//     onChangeFoodName(e) {
//         this.setState({
//             foodname: e.target.value
//         });
//     }

//     onChangeFoodPrice(e) {
//         this.setState({
//             foodprice: e.target.value
//         });
//     }

//     onChangeFoodQty(e) {
//         this.setState({
//             foodqty: e.target.value
//         });
//     }
    
//     onChangeFoodDesc(e) {
//         this.setState({
//             fooddesc: e.target.value
//         });
//     }

//     onSubmit(e) {
//         e.preventDefault();
        
//         console.log(`Form submitted:`);
//         // console.log(`Food Name: ${this.state.foodname}`);
//         // console.log(`Food Price: ${this.state.foodprice}`);
//         // console.log(`Food Qty: ${this.state.foodqty}`);
//         // console.log(`Food Description: ${this.state.fooddesc}`);
     
//         const newFood = {
//             foodname: this.state.foodname,
//             foodprice: this.state.foodprice,
//             foodqty: this.state.foodqty,
//             fooddesc: this.state.fooddesc
//         };



//         axios.post('http://localhost:5015/users/addfood', newFood)
//             .then(res => console.log(res.data));

//         this.setState({
//             foodname: '',
//             foodprice: '',
//             foodqty: '',
//             fooddesc: '',
//         })
//     }

//     render() {
//         const {userData} = useContext(UserContext);
//         const history = useHistory();

//         return (
//             <div className="container">
//               <div style={{ width:'60%', marginTop:'20px' }}>
//               {userData.user ? (
//                    <>
//                 <h3>Add Food</h3>
//                 <form onSubmit={this.onSubmit}>                
//                     <div className="form-group">                        
//                         <label>Name: </label>
//                         <input type="text" id="foodname" className="form-control" value={this.state.foodname} onChange={this.onChangeFoodName}  />
//                     </div>
//                     <div className="form-group"> 
//                          <label>Price: </label>
//                       <input type="text" id="foodprice" className="form-control"  value={this.state.foodprice} onChange={this.onChangeFoodPrice}  />
//                      </div> 
//                     <div className="form-group"> 
//                          <label>Quantity: </label>
//                          <input type="text" id="foodqty" className="form-control" value={this.state.foodqty} onChange={this.onChangeFoodQty}  />
//                      </div> 
//                      <div className="form-group"> 
//                         <label>Description: </label>
//                          <input type="text" id="fooddesc" className="form-control" value={this.state.fooddesc} onChange={this.onChangeFoodDesc}  />
//                     </div>                  
                    
//                     <input type="submit" value="Submit" className="btn btn-clr" />
//                 </form>
//                  </>
//                  ) : (
//                     <>
//                         <h2>You are not logged in</h2>
//                         <Link to="/login">Login</Link>
//                     </>
//                 )}
//             </div>
//         </div>
//         )
//     }


// }