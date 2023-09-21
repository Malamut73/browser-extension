// if (message.fill == true) {
//     chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             function: (args) => {
//                 const resumeData = args[0]; // Получение resumeData из аргументов

//                 chrome.storage.local.get('gender', function(result) {
//                     console.log('Gender from local storage1:', result.gender);
//                     console.log('Resume Data:', resumeData.gender);
//                 });
//             },
//             args: [resumeData],
//         });
//     });
// }