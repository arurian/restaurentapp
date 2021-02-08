import React, { useState, useEffect, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';

import axios from 'axios';

// import DataTable from 'react-data-table-component';

function Listfood () {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    // const [data, setData] = useState();
    
    
    // const { setUserData } = useContext(UserContext);
    const [error, setError] = useState();

    const dispstyle={
        width:'50%',margin:'20px 20px'
    };
   

    // const [isLoading,setLoading] = useState();
    // const [foodlist, setFoodlist] = useState([]);

    // useEffect(() => {
    //     console.log("userdata"+userData.user)
    //     if(!userData.user){
    //         history.push("/login");
    //     }    
    //     axios.get("http://localhost:5010/users/listfood")
    //         .then(response => {
    //             setFoodlist(response.data);
    //             setLoading(true);
    //         }); 
    //   }, []);
    // const [countries, setCountries] = useState({ hits: [] });
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!userData.user){
            console.log("nnnn");
            history.push("/login");
        }else{ 
            console.log("yyyyyyyyy"); 
            (async () => {
                axios.get('http://localhost:5010/users/listfood')
                .then(res => {
                    console.log("kkkkkkkk"+res.data)
                    setData(res.data);
                    setLoad(true);
                })
                .catch(err => {
                    setError(err.message);
                    setLoad(false)
                })

            })();
            
        // axios.get('https://restcountries.eu/rest/v2/all')
        
        }
    }, []);

console.log("mesage------"+data.message)
console.log("posts------"+data.posts)
// posts.forEach( result => {
//     console.log(result.foodname)
//     console.log(result.foodprice)
//     console.log(result.foodqty)
// })


// let result = Object.entries(data);
// let listval = result.map((item, index)=>{
//       console.log('key is:- ', item[0], ' and value is:- ', item[1]);
//     // console.log(item[1].foodname)
//     // data.posts..forEach( result => {
//     //     console.log(result)
    
//     // })
       
// });

// let items = result.map((item) =>
//     <li key={item[1].id}>{item[1].foodname}</li>
// );
// const listItems = result.map((item) =>
// // Correct! Key should be specified inside the array. 
//     <li>{item[1]}</li>
//     );

    // const listItems =  listval.map((myList) =>  
    //     <li>{myList}</li>  
    // ); 
    const foodlist = data.posts;
     
      if (load) {
        return (
            <div> 
               
                    <p>Food List</p>
                    
                    <ul>                  
                    
                    {/* {data.posts.forEach( result => {
                        console.log(result['foodname'])
                        // return <li >{result['foodname']}</li>
                        return (<li >jjjjjjjjjjjjjj</li>)
                    })}   */}
                    {/* {
                     data.posts.map((item, key) =>    <li key={item.foodprice}>{item.foodname}</li>)              
                    } */}
                       
                </ul> 

                 <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                            
                            <th scope="col">Food Name</th>
                            <th scope="col">Price</th>
                                                   
                            </tr>
                    </thead>
                    <tbody>
                    {
                     data.posts.map((item, key) =>   
                     <tr>
                        
                        <td>{item.foodname}</td>
                        <td>{item.foodprice}</td>
                       
                        </tr>
                     )              
                    }
                    {/* <tr>
                <th scope="row">1</th>
                    <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr> */}
                           
                        
                    </tbody>
                </table>
                                    

            </div>
        );

    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }

    // return (
    //     <div className="app">
    //     <h1>List food page</h1>,
    //     <div style={dispstyle}>
    //         {userData.user ? (
    //             <p>List food page jjjjjjjj</p>,
    //             <p>{foodlist.foodname}</p>
    //             // {data}
    //             //   <h1>My Grocery List</h1>,
    //             // <ul>
    //             //   {list.map(item => <li key={item.item}>{item.item}</li>)}
    //             // </ul>
                
    //             // <ul>
    //             //     {data.map(foodinfo => (
    //             //     <li key={foodinfo.id}>
                        
    //             //         <span>{foodinfo.foodname}</span>
    //             //         {/* <button onClick={() => removeTodo(todo.id)}>X</button> */}
    //             //     </li>
    //             //     ))}
    //             // </ul>
              
                
    //                 // <table className="table table-hover">
    //                 //     <thead className="thead-light">
    //                 //         <tr>
    //                 //         <th scope="col">#</th>
    //                 //         <th scope="col">Food Name</th>
    //                 //         <th scope="col">Price</th>
    //                 //         <th scope="col">Quantity</th>                       
    //                 //         </tr>
    //                 //     </thead>
    //                 //     <tbody>
    //                 //         <tr>
    //                 //         <th scope="row">1</th>
    //                 //         <td>Mark</td>
    //                 //         <td>Otto</td>
    //                 //         <td>@mdo</td>
    //                 //         </tr>
    //                 //         <tr>
    //                 //         <th scope="row">2</th>
    //                 //         <td>Jacob</td>
    //                 //         <td>Thornton</td>
    //                 //         <td>@fat</td>
    //                 //         </tr>
    //                 //         <tr>
    //                 //         <th scope="row">3</th>
    //                 //         <td>Larry</td>
    //                 //         <td>the Bird</td>
    //                 //         <td>@twitter</td>
    //                 //         </tr>
    //                 //     </tbody>
    //                 // </table>
                      
    //         ) : (
    //             <>
    //                 <h2>You are not logged in</h2>
    //                 <Link to="/login">Login</Link>
    //             </>
    //         )}
    //     </div>
    //     </div>
    // );

    }
 
export default Listfood;


