// const add = document.getElementById('add');
const complain = document.getElementById('text')
const inputfile = document.getElementById('inputGroupFile01')
const error = document.getElementById('error');
const success = document.getElementById('success');

document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const formData = new FormData();

        formData.append('complain',complain.value);
        // const files = inputfile.files;

        // for(let i=0;i<files.length;i++){
        //     formData.append('doc',files[i]);
        // }

        formData.append('doc',inputfile.files[0]);

    fetch('/api/add',{
        method:"POST",
        body:formData
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