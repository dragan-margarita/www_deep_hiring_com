// Валідація форм

"use strict"

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form-pcv');
  form.addEventListener('submit',formSend);

async function formSend(e){
  e.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(form);
  // formData.append('file', formUpload.files[0]);  


  if (error === 0) {
    form.classList.add('_sending');
    setTimeout(function(){
       form.classList.remove('_sending');
    },3000)
     let response = await fetch('postcvmail.php', {
            method: 'POST',
            body: formData
        })
         if (response.ok) {            
            form.reset(); 
        } else {
          alert('Error');
          form.classList.remove('_sending');
        } 
  }else{
    alert('Заполните обязательные поля');
  }
}
function formValidate(form){
  let error = 0;
  let formReq = document.querySelectorAll('._req2');

  for (let index = 0; index < formReq.length; index++){
    const input  = formReq[index];
    formRemoveError(input);

    if (input.getAttribute("type") === "checkbox" && input.checked === false){
      formAddError(input);
      error++;
    } else {
      if(input.value ===''){
        formAddError(input);
        error++;
      }
    }
  }
  return error;
}
function formAddError(input){
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
}
function formRemoveError(input){
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');  
}



// const formUpload = document.getElementById('upload-button');
// formUpload.addEventListener('change',() =>  {
//   uploudFile(formUpload.files[0]);
// });

// function uploudFile(file){
//   if(file.size > 10 * 1024 * 1024){
//     alert('Файл должен быть менее 10МБ.');
//     return;
//   }
// }

});





















