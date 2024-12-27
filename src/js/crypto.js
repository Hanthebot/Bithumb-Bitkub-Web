async function crawlUpbit(BTC="BTC", cur="KRW") {
    return fetch(`https://api.upbit.com/v1/orderbook?markets=${cur}-${BTC}`, {'User-Agent': 'Mozilla 5.0'})
        .then(response => response.json())
        .then(data => {
            return [data[0].orderbook_units[0].bid_price, data[0].orderbook_units[0].ask_price, data[0].orderbook_units[0].bid_size, data[0].orderbook_units[0].ask_size];
        });
} 

async function crawlBitkub(BTC="BTC", cur="THB") {
    return fetch(`https://api.bitkub.com/api/market/books?sym=${cur}_${BTC}&lmt=1`, {'User-Agent': 'Mozilla 5.0'})
        .then(response => response.json())
        .then(data => {
            return [data.result.bids[0][3], data.result.asks[0][3], data.result.bids[0][4], data.result.asks[0][4]];
        });
} 

function crawlList(data) {
    let promises = [];
    document.cryptoList.forEach((sym) => {
        const delay = Math.random() * 600 * document.cryptoList.length;
        promises.push(
            new Promise((resolve) => {
                setTimeout(() => {
                    Promise.all([crawlUpbit(sym).then((price) => {data[sym].upbit = price;}),
                    crawlBitkub(sym).then((price) => {data[sym].bitkub = price;})]).then(() => {
                    document.count += 1;
                    document.getElementById("textbox").innerText = `Last updated at ${document.lastUpdate}. Crawling ${document.count}/${document.cryptoList.length}`;
                    resolve();
                    });
                }, delay);
            }
        ));
    });
    return promises;
}