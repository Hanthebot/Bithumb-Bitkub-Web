document.getElementById("apply_btn")
.addEventListener("click", applyData);

document.getElementById("coin_btn")
.addEventListener("click", addCoin);

document.getElementById("coin_delete_btn")
.addEventListener("click", removeCoin);

document.getElementById("execute_toggle_btn")
.addEventListener("click", toggleExecute);

loadState();

saveUrl();

getList().then((data) => {
available = data;
}).then(() => {
    state.coins = state.coins.filter((sym) => available.includes(sym));
    let coin_select = document.getElementById("coin_select");
    let coin_delete = document.getElementById("coin_delete");
    available = available.sort();
    available.forEach((sym) => {
        if (state.coins.includes(sym)) {
            addOption(coin_delete, sym);
            state.coins.forEach((sym) => {
                data.cryptoData[sym] = {
                    base: [0, 0, 0, 0],
                    foreign: [0, 0, 0, 0],
                    kim: 0,
                    rev: 0
                };
            });
        } else {
            addOption(coin_select, sym);
        }
    });
});

getSettings();
crawlRepeat();