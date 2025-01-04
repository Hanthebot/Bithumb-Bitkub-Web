async function getListBitkub(cur="THB") {
    let avail_list = [];
    await $.getJSON("https://api.bitkub.com/api/market/symbols",
        (resp) => {
            pairs = resp.result.map(pair => pair.symbol);
            pairs = pairs.filter(pair => pair.split("_")[0] == cur);
            avail_list = pairs.map(pair => pair.split("_")[1]);
        }
    ).promise();
    return avail_list;
}

async function getListBithumb(cur="KRW") {
    let avail_list = [];
    await $.getJSON("https://api.bithumb.com/v1/market/all",
        (resp) => {
            pairs = resp.map(pair => pair.market);
            pairs = pairs.filter(pair => pair.split("-")[0] == cur);
            avail_list = pairs.map(pair => pair.split("-")[1]);
        }
    ).promise();
    return avail_list;
}

async function getListBinance(cur="USDT") {
    let avail_list = [];
    await $.getJSON("https://api.binance.com/api/v3/exchangeInfo",
        (resp) => {
            pairs = resp.symbols;
            pairs = pairs.filter(pair => pair.quoteAsset == cur && pair.status == "TRADING");
            avail_list = pairs.map(pair => pair.baseAsset);
        }
    ).promise();
    return avail_list;
}

async function getListUpbit(cur="KRW") {
    let avail_list = [];
    await $.getJSON("https://api.upbit.com/v1/market/all",
        (resp) => {
            pairs = resp.map(pair => pair.market);
            pairs = pairs.filter(pair => pair.split("-")[0] == cur);
            avail_list = pairs.map(pair => pair.split("-")[1]);
        }
    ).promise();
    return avail_list;
}

async function getListBitget(cur="USDT") {
    let avail_list = [];
    await $.getJSON("https://api.bitget.com/api/v2/spot/public/symbols",
        (resp) => {
            pairs = resp.data;
            pairs = pairs.filter(pair => pair.quoteCoin == cur);
            avail_list = pairs.map(pair => pair.baseCoin);
        }
    ).promise();
    return avail_list;
}

async function getListOkx(cur="USDT") {
    let avail_list = [];
    await $.getJSON("https://www.okx.com/priapi/v5/public/instruments?instType=SPOT",
        (resp) => {
            pairs = resp.data;
            pairs = pairs.filter(pair => pair.quoteCcy == cur);
            avail_list = pairs.map(pair => pair.baseCcy);
        }
    ).promise();
    return avail_list;
}

async function getListGate(cur="USDT") {
    let avail_list = [];
    await $.getJSON("https://api.gateio.ws/api/v4/spot/currency_pairs",
        (resp) => {
            pairs = resp;
            pairs = pairs.filter(pair => pair.quote == cur);
            avail_list = pairs.map(pair => pair.base);
        }
    ).promise();
    return avail_list;
}
