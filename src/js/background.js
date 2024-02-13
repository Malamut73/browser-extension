const resumeData = {}

const Resumer = {
    download: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const resume = {}
                    const res = document.querySelector('.resume-applicant')

                    const fioElement = res.querySelector('[data-qa="resume-personal-name"]');
                    resume.fio = fioElement ? fioElement.innerText : "Unknown";

                    const genderElement = res.querySelector('[data-qa="resume-personal-gender"]');
                    resume.gender = genderElement ? genderElement.innerText : "Unknown";

                    const birthdayElement = res.querySelector('[data-qa="resume-personal-birthday"]');
                    resume.birthday = birthdayElement ? birthdayElement.innerText : "Unknown";

                    const phoneElement = res.querySelector('[data-qa="resume-contacts-phone"] a');
                    resume.phone = phoneElement ? phoneElement.innerText : "Unknown";

                    const emailElement = res.querySelector('[data-qa="resume-contact-email"] a');
                    resume.email = emailElement ? emailElement.innerText : "Unknown";

                    const cityElement = res.querySelector('[data-qa="resume-personal-address"]');
                    resume.city = cityElement ? cityElement.innerText : "Unknown";

                    const moveoutElement = res.querySelector('.bloko-translate-guard p');
                    resume.move = moveoutElement ? moveoutElement.innerText : "Unknown";

                    const wishPositionElement = res.querySelector('[data-qa="resume-block-title-position"]');
                    resume.wishPosition = wishPositionElement ? wishPositionElement.innerText : "Unknown";

                    const expiriensElement = res.querySelector('[data-qa="resume-block-experience"]');

                    const consoleBlock = expiriensElement.querySelector('.resume-block-item-gap')
                    const consoleBlock2 = consoleBlock.querySelectorAll('.resume-block-item-gap')

                    const allWorks = {}

                    for (let j = 0; j < consoleBlock2.length; j++) {

                        const expiriens = {}

                        const blocks = consoleBlock2[j].querySelectorAll('.bloko-column');


                        for (let i = 0; i < blocks.length; i++) {
                            if (i == 0) {
                                expiriens.duration = blocks[0] ? blocks[0].innerText : "Unknown";
                            } else if (i == 1) {
                                const companyName = blocks[1].querySelector('.bloko-text')
                                expiriens.companyName = companyName ? companyName.innerText : "Unknown";

                                const companyCity = blocks[1].querySelector('.resume-block-container p');
                                let cleanedText = "Unknown";
                                if (companyCity) {
                                    const text = companyCity.innerText;
                                    cleanedText = text.replace("... Показать еще", "");
                                }
                                expiriens.companyCity = cleanedText;

                                // const companyIndustries = blocks[1].querySelector('.resume-block__experience-industries')
                                // expiriens.companyIndustries = companyIndustries ? companyIndustries.innerText : "Unknown";

                                const position = blocks[1].querySelector('[data-qa="resume-block-experience-position"]')
                                expiriens.position = position ? position.innerText : "Unknown";

                                const descriptionElements = blocks[1].querySelectorAll('[data-qa="resume-block-experience-description"] span');
                                let description = "";
                                descriptionElements.forEach((span, index) => {
                                    description += span.innerText.trim();
                                    if (index < descriptionElements.length - 1) {
                                        description += " ";
                                    }
                                });
                                expiriens.description = description || "Unknown";


                                const links = blocks[1].querySelectorAll('[data-qa="resume-block-experience-description"] a')
                                if (links.length > 0) {
                                    const linkList = Array.from(links).map(link => link.getAttribute('href'));
                                    expiriens.linkList = linkList
                                }
                            }
                        }
                        allWorks[j] = expiriens;
                    }
                    resume.allWorks = allWorks;

                    const skilsElement = res.querySelector('.bloko-tag-list');
                    const allSkilsElement = skilsElement.querySelectorAll('[data-qa="bloko-tag__text"] span')
                    const allSkils = {}
                    for (let i = 0; i < allSkilsElement.length; i++) {
                        allSkils[i] = allSkilsElement[i].innerText
                    }
                    resume.allSkils = allSkils;

                    const keySkillsElement = res.querySelectorAll('.resume-key-skills-verification-methods');
                    const allKeySkills = {}
                    let counter = 1;
                    for (let i = 0; i < keySkillsElement.length; i++) {
                        const allKeySkillsElement = keySkillsElement[i].querySelectorAll('.resume-key-skills-verification-flex')
                        for (let j = 0; j < allKeySkillsElement.length; j++) {
                            allKeySkills[counter] = allKeySkillsElement[j].innerText
                            counter += 1;
                        }
                    }
                    resume.allKeySkills = allKeySkills

                    const driverBlockElement = res.querySelector('[data-qa="resume-block-driver-experience"]');
                    const driverUnderBlockElement = driverBlockElement.querySelector('.resume-block-item-gap')
                    resume.driver = driverUnderBlockElement ? driverUnderBlockElement.innerText : "Unknown";

                    const aboutElement = res.querySelector('[data-qa="resume-block-skills-content"]')
                    resume.about = aboutElement ? aboutElement.innerText : "Unknown";

                    const recomendationsElement = res.querySelectorAll('[data-qa="recommendation-item-title"]')
                    const recomedtations = {};
                    for (let i = 0; i < recomendationsElement.length; i++) {
                        const recomendation = {}
                        const nameRecomendator = recomendationsElement[i].nextElementSibling;
                        recomendation.company = recomendationsElement[i].innerText
                        recomendation.name = nameRecomendator.innerText
                        recomedtations[i] = recomendation
                    }
                    resume.recomedtations = recomedtations;

                    const educationBlockElement = res.querySelector('[data-qa="resume-block-education"]')
                    const educationInnerBlockElement = educationBlockElement.querySelector('.resume-block-item-gap')
                    const educationListElement = educationInnerBlockElement.querySelectorAll('.resume-block-item-gap')
                    const educations = {}
                    let educationCounter = 1;
                    for (let i = 0; i < educationListElement.length; i++) {
                        const educationItemsElement = educationListElement[i].querySelectorAll('.bloko-column');
                        const education = {}
                        for (let j = 0; j < educationItemsElement.length; j++) {
                            if (j == 0) {
                                education.year = educationItemsElement[j].innerText
                            } else if (j == 1) {
                                education.name = educationItemsElement[j].querySelector('[data-qa="resume-block-education-name"]').innerText
                                education.course = educationItemsElement[j].querySelector('[data-qa="resume-block-education-organization"]').innerText
                                educations[educationCounter] = education;
                                educationCounter += 1
                            }
                        }
                    }
                    resume.educations = educations;

                    const languages = {};
                    const languageBlocks = document.querySelectorAll('[data-qa="resume-block-language-item"]');
                    languageBlocks.forEach((block, index) => {
                        const language = block.innerText;
                        languages[index + 1] = language.trim();
                    });
                    resume.languages = languages;

                    const additionalEducationBlockElement = res.querySelector('[data-qa="resume-block-additional-education"]')
                    const additionalEducationInnerBlockElement = additionalEducationBlockElement.querySelector('.resume-block-item-gap')
                    const additionalEducationListElement = additionalEducationInnerBlockElement.querySelectorAll('.resume-block-item-gap')
                    const additionalEducations = {}
                    let additionalEducationCounter = 1;
                    for (let i = 0; i < additionalEducationListElement.length; i++) {
                        const additionalEducationItemsElement = additionalEducationListElement[i].querySelectorAll('.bloko-column');
                        const additionalEducation = {}
                        for (let j = 0; j < additionalEducationItemsElement.length; j++) {
                            if (j == 0) {
                                additionalEducation.year = additionalEducationItemsElement[j].innerText
                            } else if (j == 1) {
                                additionalEducation.name = additionalEducationItemsElement[j].querySelector('[data-qa="resume-block-education-name"]').innerText
                                additionalEducation.course = additionalEducationItemsElement[j].querySelector('[data-qa="resume-block-education-organization"]').innerText
                                additionalEducations[additionalEducationCounter] = additionalEducation;
                                additionalEducationCounter += 1
                            }
                        }
                    }
                    resume.additionalEducations = additionalEducations;

                    const additionalBlockElement = res.querySelector('[data-qa="resume-block-additional"]')
                    const innerAdditionalBlockElement = additionalBlockElement.querySelector('.resume-block-item-gap')

                    const additionalListElements = innerAdditionalBlockElement.querySelectorAll('.resume-block-container p');
                    const additionalData = {};

                    additionalListElements.forEach(element => {
                        const text = element.innerText;

                        if (text.startsWith('Гражданство:')) {
                            const value = text.slice(12).trim();
                            additionalData['Гражданство'] = value;
                        } else if (text.startsWith('Разрешение на работу:')) {
                            const value = text.slice(22).trim();
                            additionalData['Разрешение на работу'] = value;
                        } else if (text.startsWith('Желательное время в пути до работы:')) {
                            const value = text.slice(36).trim();
                            additionalData['Желательное время в пути до работы'] = value;
                        }
                    });

                    // console.log(resume);


                    // var resumeStr = JSON.stringify(resume);
                    // console.log(resumeStr);

                    // return { resumeStr };
                    return { resume };
                }
            }).then((result) => {

                chrome.storage.local.set({ 'resumeStr': result[0].result.resume });
                // chrome.storage.local.set({ 'resume': result[0].result.resume });

            });
        });
    },

    fill: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: (args) => {

                    chrome.storage.local.get('resume', function (result) {
                        // chrome.storage.local.get('resumeStr', function (result) {

                        // const resumeStr = result.resumeStr || '';
                        const resume1 = result.resume || '';
                        const resumerStr = JSON.stringify(resume1);
                        console.log(resumerStr)

                        document.getElementById('resumeStr').value = resumerStr;


                        // const fio = result.resume.fio || "";
                        // const gender = result.resume.gender || "";
                        // const birthday = result.resume.birthday || "";
                        // const phone = result.resume.phone || "";
                        // const email = result.resume.email || "";
                        // const city = result.resume.city || "";

                        // const moveAndTrips = result.resume.move || "";
                        // const { move, trip } = splitMoveText(moveAndTrips);

                        // const wishPosition = result.resume.wishPosition || "";
                        // const expiriens = result.resume.expiriens || "";


                        // document.querySelector('.file').value = result.resume

                        // if (document.getElementById('resume-form')) {

                        //     document.getElementById('fio').value = fio;
                        //     document.getElementById('gender').value = gender;
                        //     document.getElementById('birthday').value = parseBirthday(birthday);
                        //     document.getElementById('phone').value = phone;
                        //     document.getElementById('email').value = email;
                        //     document.getElementById('city').value = city;
                        //     document.getElementById('move').value = move;
                        //     document.getElementById('trip').value = trip;
                        //     document.getElementById('wishPosition').value = wishPosition;


                        // }


                        // function parseBirthday(birthdayString) {
                        //     const months = {
                        //         'января': '01',
                        //         'февраля': '02',
                        //         'марта': '03',
                        //         'апреля': '04',
                        //         'мая': '05',
                        //         'июня': '06',
                        //         'июля': '07',
                        //         'августа': '08',
                        //         'сентября': '09',
                        //         'октября': '10',
                        //         'ноября': '11',
                        //         'декабря': '12'
                        //     };

                        //     const pattern = /(\d+)\s+(\S+)\s+(\d+)/;
                        //     const matches = birthdayString.match(pattern);

                        //     if (matches) {
                        //         const day = matches[1];
                        //         const month = months[matches[2]];
                        //         const year = matches[3];

                        //         return `${year}-${month}-${day}`;
                        //     }

                        //     return "";
                        // }

                        // function splitMoveText(moveText) {
                        //     const moveArray = moveText.split(',');

                        //     let move = "";
                        //     let trip = "";

                        //     if (moveArray.length >= 1) {
                        //         move = moveArray[1].trim(); // Получение текста после первой запятой
                        //     }

                        //     if (moveArray.length >= 2) {
                        //         trip = moveArray[2].trim(); // Получение текста после второй запятой
                        //     }

                        //     return { move, trip };
                        // }



                    });


                },
                args: [resumeData],
            })

        });
    },


    clear: function () {
        chrome.storage.local.clear();
    },

    page: function () {


        // const url = "http://127.0.0.1:5500/src/html/form.html"
        const url = "http://localhost:4200/employee/resumes/create"
        chrome.tabs.create({ url });
    }
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.down == true) {
        Resumer.download();
        // chrome.runtime.sendMessage({});
        Resumer.page();
        // Resumer.fill();
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (changeInfo.status === 'complete') {
                Resumer.fill();
                chrome.tabs.onUpdated.removeListener(this);

            }
        });
    }



    if (message.fill == true) {
        Resumer.fill();
    }
    if (message.clear == true) {
        Resumer.clear();
    }
    if (message.page == true) {
        Resumer.page();
    }
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.commands.onCommand.addListener(function (command) {
        if (command === "downloadCommand") {
            Resumer.download();
            Resumer.page();
            Resumer.fill();
        } else if (command === "pageCommand") {

            const url = "http://127.0.0.1:5500/src/html/form.html"
            chrome.tabs.create({ url });

        } else if (command === "fillCommand") {

            chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {

                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: (args) => {

                        chrome.storage.local.get('gender', function (result) {

                            const genderInput = document.querySelector('.gender');
                            genderInput.value = result.gender;

                        });

                        chrome.storage.local.get('birthday', function (result) {

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



// function parseBirthday(birthdayString) {
//     const months = {
//         'января': '01',
//         'февраля': '02',
//         'марта': '03',
//         'апреля': '04',
//         'мая': '05',
//         'июня': '06',
//         'июля': '07',
//         'августа': '08',
//         'сентября': '09',
//         'октября': '10',
//         'ноября': '11',
//         'декабря': '12'
//     };

//     const pattern = /(\d+)\s+(\S+)\s+(\d+)/;
//     const matches = birthdayString.match(pattern);

//     if (matches) {
//         const day = matches[1];
//         const month = months[matches[2]];
//         const year = matches[3];

//         return `${year}-${month}-${day}`;
//     }

//     return "";
// }

// function splitMoveText(moveText) {
//     const moveArray = moveText.split(',');

//     let move = "";
//     let trip = "";

//     if (moveArray.length >= 1) {
//         move = moveArray[1].trim(); // Получение текста после первой запятой
//     }

//     if (moveArray.length >= 2) {
//         trip = moveArray[2].trim(); // Получение текста после второй запятой
//     }

//     return { move, trip };
// }