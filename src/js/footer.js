document.getElementById("apply_btn")
.addEventListener("click", applyData);

document.getElementById("coin_btn")
.addEventListener("click", addCoin);

document.getElementById("coin_delete_btn")
.addEventListener("click", removeCoin);

document.getElementById("execute_toggle_btn")
.addEventListener("click", toggleExecute);

document.getElementById("sound_toggle_btn")
.addEventListener("click", toggleSound);

const delay_input = document.getElementById("delay_input");
const delay_input_num = document.getElementById("delay_input_num");
delay_input.addEventListener("input", (event) => {
    state.delay = event.target.value * 1000;
    delay_input_num.value = event.target.value;
    saveUrl();
});
delay_input_num.addEventListener("input", (event) => {
    state.delay = event.target.value * 1000;
    delay_input.value = event.target.value;
    saveUrl();
});

const delay_total_input = document.getElementById("delay_total_input");
const delay_total_input_num = document.getElementById("delay_total_input_num");
delay_total_input.addEventListener("input", (event) => {
    state.delay_total = event.target.value * 1000;
    delay_total_input_num.value = event.target.value;
    saveUrl();
});
delay_total_input_num.addEventListener("input", (event) => {
    state.delay_total = event.target.value * 1000;
    delay_total_input.value = event.target.value;
    saveUrl();
});

loadState();

saveUrl();

getList().then((available) => {
    data.available = available;
}).then(() => {
    state.coins = state.coins.filter((sym) => data.available.includes(sym));
    let coin_select = document.getElementById("coin_select");
    let coin_delete = document.getElementById("coin_delete");
    data.available = data.available.sort();
    data.available.forEach((sym) => {
        if (state.coins.includes(sym)) {
            addOption(coin_delete, sym);
            state.coins.forEach((sym) => {
                data.cryptoData[sym] = structuredClone(PRICE_TEMPLATE);
            });
        } else {
            addOption(coin_select, sym);
        }
    });
});

getSettings();
crawlRepeat();