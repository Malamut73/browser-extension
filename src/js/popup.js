document.addEventListener('DOMContentLoaded', function () {

    const download = document.querySelector('.download');
    const fill = document.querySelector('.fill');
    const page = document.querySelector('.page');
    const clear = document.querySelector('.clear');

    if(download){
        download.addEventListener('click', async (e) => {
            chrome.runtime.sendMessage({ down: true });
        });
    }
    if(fill){
        fill.addEventListener('click', async (e) => {
            chrome.runtime.sendMessage({ fill: true });

        });
    }

    if(page){
        page.addEventListener('click', function() {
            chrome.runtime.sendMessage({ page: true });
        })
    }

    if(clear){
        clear.addEventListener('click', function () {
            chrome.runtime.sendMessage({clear: true})
        })
    }
})






