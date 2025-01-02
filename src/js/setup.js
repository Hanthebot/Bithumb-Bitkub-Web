const EXCHANGE_BASE = "Bithumb";
const EXCHANGE_FOREIGN = "Bitkub";
const DEFAULT = {
    coins: ['BTC', 'ETH', 'XRP'],
    rate: 42.15,
    fee: 0.9974,
    alert: {
        kim: 0.0,
        rev: 0.0,
        dif: 0.0
    }
};
const DEFAULT_BASE64 = window.btoa(JSON.stringify(DEFAULT));
var state = {};
var data = {
    count: 0,
    lastUpdate: "",
    cryptoData: {},
    best: []
}
var available = [];
var execute_continue = true;

async function getListBk(cur="THB") {
    let avail_list = [];
    await $.getJSON("https://api.bitkub.com/api/market/symbols",
        (data) => {
            pairs = data.result.map(pair => pair.symbol);
            pairs = pairs.filter(pair => pair.split("_")[0] == cur);
            avail_list = pairs.map(pair => pair.split("_")[1]);
        }
    ).promise();
    return avail_list;
}

async function getListBt(cur="KRW") {
    let avail_list = [];
    await $.getJSON("https://api.bithumb.com/v1/market/all",
        (data) => {
            pairs = data.map(pair => pair.market);
            pairs = pairs.filter(pair => pair.split("-")[0] == cur);
            avail_list = pairs.map(pair => pair.split("-")[1]);
        }
    ).promise();
    return avail_list;
}

async function getList() {
    let foreign_list = await getListBk();
    let base_list = await getListBt();
    return foreign_list.filter(value => base_list.includes(value));
}

function loadState() {
    const params = new URLSearchParams(window.location.search);
    let state_base = params.get("state") || DEFAULT_BASE64;
    state = JSON.parse(window.atob(state_base));
    document.getElementById("rate_val").value = state.rate;
    document.getElementById("fee_val").value = state.fee;
    document.getElementById("kim_val").value = state.alert.kim;
    document.getElementById("rev_val").value = state.alert.rev;
    document.getElementById("dif_val").value = state.alert.dif;
    document.getElementById("current").innerText = `Current coins: ${state.coins.join(', ')}`;
}

function getSettings() {
    state.rate = parseFloat(document.getElementById("rate_val").value);
    state.fee = parseFloat(document.getElementById("fee_val").value);
    state.kim = parseFloat(document.getElementById("kim_val").value);
    state.rev = parseFloat(document.getElementById("rev_val").value);
}

function saveUrl() {
    const state_base = window.btoa(JSON.stringify(state));
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("state", state_base);
    window.history.replaceState(null, '', newUrl);
}