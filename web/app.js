var email = document.getElementById('email')
var password = document.getElementById('password')

function signIn() {
    var obj = {
        method:'POST',
        headers:{"Content-Type":'application/json'},
        data:{ email: email.value, password: password.value },
        url:'http://localhost:5000/auth/signin'
    }
    axios(obj)
        .then((value) => {
            var data = value.request.response;
            console.log('Message=======>', value)
            console.log('Data=======>', data)
        })
        .catch((value) => {
            console.log('Error=======>', value)
        })
}

