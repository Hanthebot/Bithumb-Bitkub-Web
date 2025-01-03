const EXCHANGE_BASE = "Bithumb";
const EXCHANGE_FOREIGN = "Bitkub";
const HOME_CUR = "KRW";
const DEFAULT_RATE = 42.15;

async function crawlBithumb(BTC="BTC", cur="KRW") {
    let price = []
    await $.getJSON(`https://api.bithumb.com/public/orderbook/${BTC}`,
        (rst) => {
            price = [rst.data.bids[0].price, rst.data.asks[0].price, rst.data.bids[0].quantity, rst.data.asks[0].quantity];
        }
    ).promise();
    return price;
} 

async function crawlBitkub(BTC="BTC", cur="THB") {
    let price = [];
    await $.getJSON(`https://api.bitkub.com/api/market/books?sym=${cur}_${BTC}&lmt=1`,
        (rst) => {
            price = [rst.result.bids[0][3], rst.result.asks[0][3], rst.result.bids[0][4], rst.result.asks[0][4]];
        }
    ).promise();
    return price;
}

async function getListBk(cur="THB") {
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

async function getListBt(cur="KRW") {
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

const crawlBase = crawlBithumb;
const crawlForeign = crawlBitkub;
const getListForeign = getListBk;
const getListBase = getListBt;