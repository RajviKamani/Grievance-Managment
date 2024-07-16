const error = document.getElementById('error');
const success = document.getElementById('success');
const email = document.getElementById('email');
const password = document.getElementById('password');

document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const login = {
        email:email.value,
        password:password.value
    }

    fetch('/api/login',{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(login)
    }).then(res=>res.json())
    .then(data=>{
        if(data.status == "error"){
            error.style.display = "block";
            error.innerText = data.message;
            success.style.display = "none";
        } else{
            error.style.display = "none";
            success.style.display = "block";
            success.innerText = data.message;
            setTimeout(() => {
                window.location.href = '/';
            }, 1000); 
        }

        setTimeout(()=>{
            error.style.display = "none";
            success.style.display = "none";
        },3000)
    })
})