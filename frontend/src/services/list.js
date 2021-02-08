export function getList() {
    return fetch('http://localhost:5010/users/listfood')
      .then(data => data.json())
  }
  
//   export function setItem(item) {
//    return fetch('http://localhost:3333/list', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({ item })
//    })
//      .then(data => data.json())
//   }