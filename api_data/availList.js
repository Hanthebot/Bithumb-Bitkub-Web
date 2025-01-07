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
    // as of 07 Jan 2025
    let avail_list = ['BIO', 'PEOPLE', 'AXS', 'ZK', 'BONE', 'GHST', 'BIGTIME', 'ICP', 'MOVR', 'CLV', 'TURBO', 'XAUT', 'WIN', 'LRC', 'ELON', 'MAGIC', 'AGLD', 'GAS', 'ZETA', 'AVAX', 'USDC', 'GALFT', 'GMX', 'LQTY', 'ONDO', 'DEP', 'ZRX', 'GPT', 'GOG', 'BZZ', 'THETA', 'LAMB', 'CORE', 'GRT', 'ADA', 'TRX', 'RENDER', 'XLM', 'OM', 'GLMR', 'LEO', 'APE', 'NOT', 'LPT', 'PNUT', 'BONK', 'T', 'CTXC', 'CITY', 'ME', 'ORDI', 'AR', 'XTZ', 'DIA', 'NMR', 'PRQ', 'ARTY', 'KDA', 'MILO', 'BTC', 'DAO', 'ZEUS', 'GODS', 'ARB', 'LAT', 'LSK', 'RPL', 'ONE', 'RIO', 'ACH', 'CVC', 'EIGEN', 'BADGER', 'SAFE', 'SLERF', 'RVN', 'MEMEFI', 'POL', 'SATS', 'ATH', 'KSM', 'ORBS', 'SC', 'SNT', 'AAVE', 'DOGE', 'RUNECOIN', 'SNX', 'AUCTION', 'USTC', 'FIL', 'ARG', 'CXT', 'GMT', 'OKB', 'SPURS', 'CTC', 'OKSOL', 'ELF', 'MORPHO', 'CATI', '1INCH', 'GALA', 'SUSHI', 'BAT', 'PRCL', 'DGB', 'RAY', 'MASK', 'UXLINK', 'BOME', 'MANA', 'MAX', 'INJ', 'RADAR', 'TRB', 'CVX', 'MXC', 'ID', 'KP3R', 'ENJ', 'HBAR', 'NEAR', 'ULTI', 'XR', 'ZERO', 'ZKJ', 'MOVE', 'RSS3', 'ALPHA', 'ETC', 'DORA', 'MOODENG', 'PEPE', 'SAND', 'ICE', 'RSR', 'SHIB', 'WOO', 'STRK', 'SOL', 'AERGO', 'BANANA', 'CELO', 'FORTH', 'DOT', 'ZIL', 'ERN', 'CHZ', 'OP', 
        'ASTR', 'ZBCN', 'WAXP', 'GOAT', 'SLP', 'EGLD', 'ALCX', 'BTT', 'ZENT', 'TIA', 'MINA', 'TNSR', 'SCR', 'DYDX', 'ILV', 'LTC', 'PENDLE', 'X', 'ACE', 'POR', 'STORJ', 'API3', 'YGG', 'W', 'IOTA', 'GOAL', 'MERL', 'LDO', 'LBR', 'OAS', 'RON', 'FET', 'FXS', 'ETHW', 'CETUS', 'BCH', 'FLOW', 'BORA', 'BNT', 'CRO', 'SWFTC', 'BSV', 'FTM', 'OMI', 'VELODROME', 'TRA', 'SWEAT', 'ETHFI', 'POLYDOGE', 'AEVO', 'JUP', 'STX', 'CRV', 'PERP', 'CSPR', 'FLM', 'IQ', 'PIXEL', 'MAJOR', 'MKR', 'SD', 'BAL', 'FLOKI', 'VRA', 'KNC', 'UNI', 'KAIA', 'GEAR', 'RDNT', 'SKL', 'PYTH', 'GLM', 'MEW', 'ARKM', 'WBTC', 'LUNA', 'BLUR', 'HMSTR', 'IMX', 'MDT', 'ATOM', 'KISHU', 'PHA', 'ICX', 'PENGU', 'WIF', 'MLN', 'QTUM', 'CFX', 'BNB', 'MEME', 'IOST', 'BABYDOGE', 'LINK', 'BAND', 'APT', 'AIDOGE', 'DEGEN', 'BICO', 'DOGS', 'G', 'XCH', 'SSWP', 'CAT', 'JTO', 'WLD', 'ENS', 'MENGO', 'NFT', 'ONT', 'XRP', 'LOOKS', 'METIS', 'OKT', 'RACA', 'PSTAKE', 'VELO', 'XNO', 'ALGO', 'FOXY', 'SUI', 'PYUSD', 'CELR', 'NEIRO', 'FLR', 'NULS', 'JST', 'OXT', 'EOS', 'LUNC', 'UMA', 'BETH', 'DAI', 'OL', 'TON', 'VENOM', 'ETH', 'ACA', 'CFG', 'SAMO', 'COMP', 'JOE', 'SSV', 'YFI', 'ZRO', 'STETH', 'NEO', 'ACT'];
    // await $.getJSON("https://www.okx.com/priapi/v5/public/instruments?instType=SPOT",
    //     (resp) => {
    //         pairs = resp.data;
    //         pairs = pairs.filter(pair => pair.quoteCcy == cur);
    //         avail_list = pairs.map(pair => pair.baseCcy);
    //     }
    // ).promise();
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

async function getListBybit(cur="USDT") {
    let avail_list = [];
    await $.getJSON("https://api-testnet.bybit.com/v5/market/instruments-info?category=spot",
        (resp) => {
            pairs = resp.result.list;
            pairs = pairs.filter(pair => pair.quoteCoin == cur);
            avail_list = pairs.map(pair => pair.baseCoin);
        }
    ).promise();
    return avail_list;
}

async function getListKucoin(cur="USDT") {
    let avail_list = [];
    await $.getJSON("https://api.kucoin.com/api/v2/symbols",
        (resp) => {
            pairs = resp.data;
            pairs = pairs.filter(pair => pair.quoteCurrency == cur);
            avail_list = pairs.map(pair => pair.baseCurrency);
        }
    ).promise();
    return avail_list;
}
