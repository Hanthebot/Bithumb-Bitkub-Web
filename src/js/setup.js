const CURRENT_COINS = `Current coins: {0}`;
const DEFAULT = {
    coins: ['BTC', 'ETH', 'XRP'],
    rate: DEFAULT_RATE,
    fee: 0.9974,
    delay: 500,
    delay_total: 1000,
    sound: false,
    alert: {
        kim: 0.0,
        rev: 0.0,
        dif: 0.0
    }
};
const DEFAULT_BASE64 = window.btoa(JSON.stringify(DEFAULT));
const PRICE_TEMPLATE = {
    base: [0, 0, 0, 0],
    foreign: [0, 0, 0, 0],
    kim: 0,
    rev: 0
};

var state = {};
var data = {
    count: 0,
    lastUpdate: "",
    cryptoData: {},
    best: {},
    execute_continue: true,
    available: [],
    timeoutId: null,
    timeoutCrawls: []
}

async function getList() {
    let foreign_list = await getListForeign();
    let base_list = await getListBase();
    return foreign_list.filter(value => base_list.includes(value));
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] == 'undefined' ? match : args[index];
    });
};

function loadState() {
    const params = new URLSearchParams(window.location.search);
    let state_base = params.get("state") || DEFAULT_BASE64;
    state = JSON.parse(window.atob(state_base));
    document.getElementById("rate_val").value = state.rate;
    document.getElementById("fee_val").value = state.fee;
    document.getElementById("delay_input").value = state.delay / 1000;
    document.getElementById("delay_input_num").value = state.delay / 1000;
    document.getElementById("delay_total_input").value = state.delay_total / 1000;
    document.getElementById("delay_total_input_num").value = state.delay_total / 1000;
    if (state.sound) {
        document.getElementById("sound_toggle_btn").innerText = SOUND_ON;
    } else {
        document.getElementById("sound_toggle_btn").innerText = SOUND_OFF;
    }
    document.getElementById("kim_val").value = state.alert.kim;
    document.getElementById("rev_val").value = state.alert.rev;
    document.getElementById("dif_val").value = state.alert.dif;
    document.getElementById("current").innerText = CURRENT_COINS.format(state.coins.join(', '));
}

function getSettings() {
    state.rate = parseFloat(document.getElementById("rate_val").value);
    state.alert.fee = parseFloat(document.getElementById("fee_val").value);
    state.alert.kim = parseFloat(document.getElementById("kim_val").value);
    state.alert.rev = parseFloat(document.getElementById("rev_val").value);
    state.alert.dif = parseFloat(document.getElementById("dif_val").value);
}

function saveUrl() {
    const state_base = window.btoa(JSON.stringify(state));
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("state", state_base);
    window.history.replaceState(null, '', newUrl);
}
