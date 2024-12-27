async function getListBk(cur="THB") {
    return fetch("https://api.bitkub.com/api/market/symbols")
        .then(response => response.json())
        .then(data => {
            pairs = data.result.map(pair => pair.symbol);
            pairs = pairs.filter(pair => pair.split("_")[0] == cur);
            return pairs.map(pair => pair.split("_")[1]);
            });
}

async function getListUp(cur="KRW") {
    return fetch("https://api.upbit.com/v1/market/all")
        .then(response => response.json())
        .then(data => {
            pairs = data.map(pair => pair.market);
            pairs = pairs.filter(pair => pair.split("-")[0] == cur);
            return pairs.map(pair => pair.split("-")[1]);
            });
}

async function getList() {
    let bk_list = await getListBk();
    let up_list = await getListUp();
    return bk_list.filter(value => up_list.includes(value));
}

function getSettings() {
    document.rate = parseFloat(document.getElementById("rate_val").value);
    document.fee = parseFloat(document.getElementById("fee_val").value);
    document.kim = parseFloat(document.getElementById("kim_val").value);
    document.rev = parseFloat(document.getElementById("rev_val").value);
}