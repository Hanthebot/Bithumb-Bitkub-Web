async function crawlBitkub(BTC="BTC", cur="THB") {
    let price = [];
    await $.getJSON(`https://api.bitkub.com/api/market/books?sym=${cur}_${BTC}&lmt=1`,
        (rst) => {
            price = [rst.result.bids[0][3], rst.result.asks[0][3], rst.result.bids[0][4], rst.result.asks[0][4]];
        }
    ).promise();
    return price;
}

async function crawlBithumb(BTC="BTC", cur="KRW") {
    let price = []
    await $.getJSON(`https://api.bithumb.com/public/orderbook/${BTC}`,
        (rst) => {
            price = [rst.data.bids[0].price, rst.data.asks[0].price, rst.data.bids[0].quantity, rst.data.asks[0].quantity];
        }
    ).promise();
    return price;
}

async function crawlBinance(BTC="BTC", cur="USDT") {
    let price = [];
    await $.getJSON(`https://api.binance.com/api/v3/depth?symbol=${BTC}${cur}&limit=5`,
        (rst) => {
            price = [rst.bids[0][0], rst.asks[0][0], rst.bids[0][1], rst.asks[0][1]];
        }
    ).promise();
    return price;
}

async function crawlUpbit(BTC="BTC", cur="KRW") {
    let price = [];
    await $.getJSON(`https://api.upbit.com/v1/orderbook?markets=${cur}-${BTC}`,
        (rst) => {
            price = [rst[0].orderbook_units[0].bid_price, rst[0].orderbook_units[0].ask_price, rst[0].orderbook_units[0].bid_size, rst[0].orderbook_units[0].ask_size];
        }
    ).promise();
    return price;
}

async function crawlBitget(BTC="BTC", cur="USDT") {
    let price = [];
    await $.getJSON(`https://api.bitget.com/api/v2/spot/market/orderbook?symbol=${BTC}${cur}&type=step0&limit=10`,
        (rst) => {
            price = [rst.data.bids[0][0], rst.data.asks[0][0], rst.data.bids[0][1], rst.data.asks[0][1]];
        }
    ).promise();
    return price;
}

async function crawlOkx(BTC="BTC", cur="USDT") {
    let price = [];
    await $.getJSON(`https://www.okx.com/api/v5/market/books?instId=${BTC}-${cur}`,
        (rst) => {
            price = [rst.data[0].bids[0][0], rst.data[0].asks[0][0], rst.data[0].bids[0][1], rst.data[0].asks[0][1]];
        }
    ).promise();
    return price;
}

async function crawlGate(BTC="BTC", cur="USDT") {
    let price = [];
    await $.getJSON(`https://api.gateio.ws/api/v4/spot/order_book?currency_pair=${BTC}_${cur}`,
        (rst) => {
            price = [rst.bids[0][0], rst.asks[0][0], rst.bids[0][1], rst.asks[0][1]];
        }
    ).promise();
    return price;
}

async function crawlBybit(BTC="BTC", cur="USDT") {
    let price = [];
    await $.getJSON(`https://api.bybit.com/v5/market/orderbook?category=spot&symbol=${BTC}${cur}`,
        (rst) => {
            price = [rst.result.b[0][0], rst.result.a[0][0], rst.result.b[0][1], rst.result.a[0][1]];
        }
    ).promise();
    return price;
}

async function crawlKucoin(BTC="BTC", cur="USDT") {
    let price = [];
    await $.getJSON(`https://api.kucoin.com/api/v1/market/orderbook/level2_20?symbol=${BTC}-${cur}`,
        (rst) => {
            price = [rst.data.bids[0][0], rst.data.asks[0][0], rst.data.bids[0][1], rst.data.asks[0][1]];
        }
    ).promise();
    return price;
}
