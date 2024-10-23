document.getElementById('login-btn').addEventListener('click', function () {
    window.location.href = "/index.html";
});

let navbar = document.querySelector('.header .navbar');
document.querySelector('#menu-btn').addEventListener('click',function(){
    navbar.classList.toggle('active');
})

window.onscroll=()=>{
    navbar.classList.remove('active');
    if(window.scrollY>0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}
window.onload=()=>{
    if(window.scrollY>0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}