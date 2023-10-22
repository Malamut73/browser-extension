// const resumeData = {};

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.resumeData) {
//         resumeData.gender = message.resumeData.gender;
//         resumeData.birthday = message.resumeData.birthday;
//     }
// });


// const genderInput = document.querySelector('.gender');
// const birthdayInput = document.querySelector('.birthday');

// genderInput.value = resumeData.gender;
// birthdayInput.value = resumeData.birthday;

// document.addEventListener('DOMContentLoaded', function() {
    // ваш JavaScript-код здесь



const asideCta = document.querySelector('.aside-cta');
if (asideCta) {
    const link = document.createElement('a');
    link.href = '#'; 
    link.innerText = 'Моя ссылка'; 

    link.classList.add('ws-nowrap', 's-btn', 's-btn__primary');

    asideCta.appendChild(link);
}


const blockButton = document.querySelector('.bloko-button-group');
if (blockButton) {
    const button = document.createElement('button');
    button.innerText = 'Моя кнопка'; 

    button.classList.add('bloko-button');

    blockButton.appendChild(button);
}

// });