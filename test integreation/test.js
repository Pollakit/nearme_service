// function sub(a, b) {
//     return a - b
// }
// console.log(sub(6, 2))

var URL = "https://nearme-kmitl.herokuapp.com"
fetch(URL + "/api/accounts/customers/2/")
    .then(response => response.json())
    .then(data => console.log(data));