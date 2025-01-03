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

function crawlList(coinList) {
    let promises = [];
    let delay = state.delay;
    data.count = 0;
    for (let i = 0; i < coinList.length; i++) {
        let sym = coinList[i];
        promises.push(
            new Promise((resolve) => {
                let timeoutCrawl = setTimeout(() => {
                    if (data.cryptoData[sym] == undefined) {
                        data.cryptoData[sym] = structuredClone(PRICE_TEMPLATE);
                    }
                    if (!data.execute_continue) resolve();
                    Promise.all([
                        crawlBase(sym).then((price) => {
                            data.cryptoData[sym].base = price;
                        }),
                        crawlForeign(sym).then((price) => {data.cryptoData[sym].foreign = price;})
                    ]).then(() => {
                        data.count++;
                        document.getElementById("textbox").innerText = LAST_UPDATED_CRAWLING.format(data.lastUpdate, data.count, coinList.length);
                        resolve();
                    });
                }, (i+1)*delay);
                data.timeoutCrawls.push(timeoutCrawl);
            }
        ));
    }
    return promises;
}