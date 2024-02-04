const errorBtn = document.querySelector('.btn-error');
const successBtn = document.querySelector('.btn-success');
const warningBtn = document.querySelector('.btn-warning');
const infoBtn = document.querySelector('.btn-info');

const errorMessageDuplicates = document.getElementById('errorMessageDuplicates');


errorBtn.addEventListener('click', ()=>{
    snackbar('error', '<b>Error: </b>  Duplicate order found. Order not placed.', 3000);
})
successBtn.addEventListener('click', ()=>{
    snackbar('success', '<b>Success: </b>  Form validation error', 3000);
})

infoBtn.addEventListener('click', ()=>{
    snackbar('info', '<b>Info: </b>  Duplicate Order Placed', 3000);
})


function snackbar(type, msg, time){
    const para = document.createElement('P');
    para.classList.add('snackbar');
    para.innerHTML = `${msg} <span> &times </span>`;

    if(type === 'error'){
        para.classList.add('error');
    }
    else if(type ==='success'){
        para.classList.add('success');
    }
    else if(type ==='warning'){
        para.classList.add('warning');
    }
    else if(type ==='info'){
        para.classList.add('info');
    }

    errorMessageDuplicates.appendChild(para);
    para.classList.add('fadeout');

    setTimeout(()=>{
            errorMessageDuplicates.removeChild(para)
    }, time)

}