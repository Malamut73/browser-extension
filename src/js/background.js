const resumeData = {}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if(message.down == true){
        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const resume = {}
                    const res = document.querySelector('.resume-applicant')

                    const genderElement = res.querySelector('[data-qa="resume-personal-gender"]');
                    resume.gender = genderElement ? genderElement.innerText : "Unknown";

                    const birthdayElement = res.querySelector('[data-qa="resume-personal-birthday"]');
                    resume.birthday = birthdayElement ? birthdayElement.innerText : "Unknown";
                    
                    return { resume };
                }
            }).then((result) => {

                chrome.storage.local.set({ 'gender': result[0].result.resume.gender });
                chrome.storage.local.set({ 'birthday': result[0].result.resume.birthday });

            });
        });
    }
    if(message.fill == true){
        chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: (args) => {
                    
                    chrome.storage.local.get('gender', function(result) {

                        const genderInput = document.querySelector('.gender');
                        genderInput.value = result.gender;

                    });

                    chrome.storage.local.get('birthday', function(result) {

                        const birthdayInput = document.querySelector('.birthday');
                        birthdayInput.value = result.birthday;

                    });
                    // chrome.storage.local.clear();
                },
                args: [resumeData],
            })

        });
    }
    if(message.clear == true){
        chrome.storage.local.clear();
    }
    if(message.page == true){
        const url = "http://127.0.0.1:5500/src/html/form.html"                
        chrome.tabs.create({ url });
    }
});

chrome.runtime.onInstalled.addListener(function() {
    chrome.commands.onCommand.addListener(function(command) {
      if (command === "downloadCommand") {
        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const resume = {}
                    const res = document.querySelector('.resume-applicant')

                    const genderElement = res.querySelector('[data-qa="resume-personal-gender"]');
                    resume.gender = genderElement ? genderElement.innerText : "Unknown";

                    const birthdayElement = res.querySelector('[data-qa="resume-personal-birthday"]');
                    resume.birthday = birthdayElement ? birthdayElement.innerText : "Unknown";
                    
                    return { resume };
                }
            }).then((result) => {

                chrome.storage.local.set({ 'gender': result[0].result.resume.gender });
                chrome.storage.local.set({ 'birthday': result[0].result.resume.birthday });

            });
        });
      } else if (command === "pageCommand"){

        const url = "http://127.0.0.1:5500/src/html/form.html"                
        chrome.tabs.create({ url });

      } else if (command === "fillCommand") {

        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: (args) => {
                    
                    chrome.storage.local.get('gender', function(result) {

                        const genderInput = document.querySelector('.gender');
                        genderInput.value = result.gender;

                    });

                    chrome.storage.local.get('birthday', function(result) {

                        const birthdayInput = document.querySelector('.birthday');
                        birthdayInput.value = result.birthday;

                    });
                    // chrome.storage.local.clear();
                },
                args: [resumeData],
            })

        });
      } else if (command === "clearCommand") {
        chrome.storage.local.clear();
      }
    });
  });
