document.addEventListener('DOMContentLoaded', function () {


    const download = document.querySelector('.download');
    const fill = document.querySelector('.fill');
    const page = document.querySelector('.page');
    const clear = document.querySelector('.clear');

    const resumeData = {};

    if(download){
        download.addEventListener('click', async (e) => {
            chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: (resume) => {
                        const res = document.querySelector('.resume-applicant')

                        const genderElement = res.querySelector('[data-qa="resume-personal-gender"]');
                        resume.gender = genderElement ? genderElement.innerText : "Unknown";

                        const birthdayElement = res.querySelector('[data-qa="resume-personal-birthday"]');
                        resume.birthday = birthdayElement ? birthdayElement.innerText : "Unknown";
                        
                        
                        
                        // console.log('Полученные данные со страницы:' + resume.gender)

                        return { resume };
                    },
                    args: [resumeData],
                }).then((result) => {
                    resumeData.gender = result[0].result.resume.gender;
                    resumeData.birthday = result[0].result.resume.birthday;

                    chrome.runtime.sendMessage({ resumeData: resumeData });
                    
                });
            });
        });
    }

    fill.addEventListener('click', async (e) => {
        chrome.runtime.sendMessage({ fill: true });

    });

    page.addEventListener('click', function() {
        const url = "http://127.0.0.1:5500/src/html/form.html"                
        chrome.tabs.create({ url });
    })

    clear.addEventListener('click', function () {
        chrome.runtime.sendMessage({clear: true})
    })

})






