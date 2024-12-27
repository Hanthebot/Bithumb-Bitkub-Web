document.getElementById("apply_btn")
.addEventListener("click", applyData);

document.getElementById("crawl_btn")
.addEventListener("click", crawlRepeat);
        
getList().then((data) => {
document.cryptoList = data;
}).then(() => {
document.cryptoList.forEach((sym) => {
    document.cryptoData[sym] = {
        upbit: [0, 0, 0, 0],
        bitkub: [0, 0, 0, 0],
        kim: 0,
        rev: 0
    };
});
});

getSettings();