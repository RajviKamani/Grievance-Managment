
const name = document.getElementById('name');
const email = document.getElementById('email')
const password = document.getElementById('password')
const error = document.getElementById('error');
const success = document.getElementById('success');
const role = document.getElementById('role')
const address = document.getElementById('address')
const skill = document.getElementById('skill')
const image = document.getElementById('image')

document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();

   const formdata = new FormData();
       formdata.append('email',email.value);
        formdata.append('name',name.value)
        formdata.append('password',password.value)
        formdata.append('role',role.value)
        formdata.append('address',address.value)
        formdata.append('skill',skill.value)
        formdata.append('image', image.files[0]);

    fetch('/api/register',{
        method:"POST",
        body:formdata
    })
    .then(res=> res.json())
    .then(data=>{
        if(data.status === "error"){
            error.style.display = "block";
            error.innerText = data.message;
            success.style.display = "none";
        } else{
            error.style.display = "none";
            success.style.display = "block";
            success.innerText = data.message;
        }

        setTimeout(()=>{
            error.style.display = "none";
            success.style.display = "none";
        },3000)

        .catch(error => {
            console.error('Error:', error);
            error.style.display = "block";
            error.innerText = "An error occurred. Please try again later.";
            success.style.display = "none";
        });
})

})
