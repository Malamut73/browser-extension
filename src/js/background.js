const resumeData = {}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.resumeData) {
        resumeData.gender = message.resumeData.gender;
        resumeData.birthday = message.resumeData.birthday;
  
        chrome.storage.local.set({ 'gender': resumeData.gender }, function() {
            console.log('Gender saved:', resumeData.gender);
        });

        chrome.storage.local.set({ 'birthday': resumeData.birthday }, function() {
            console.log('Birthday saved:', resumeData.birthday);
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
});