const asyncHandler = require("express-async-handler");
const fs = require('fs');
const path = require('path');
const ABBR = {
    "Bt": "Bithumb",
    "Up": "Upbit",
    "Bk": "Bitkub",
    "Bi": "Binance",
    "Bg": "Bitget",
    "Ok": "Okx",
    "Gt": "Gate",
    "By": "Bybit",
    "Ku": "Kucoin"
}

const EXCHANGE_DATA = {
    "Bithumb": { abbr: "Bt", cur: "KRW", supported: true },
    "Upbit": { abbr: "Up", cur: "KRW", supported: false },
    "Bitkub": { abbr: "Bk", cur: "THB", supported: true },
    "Binance": { abbr: "Bi", cur: "USDT", supported: true },
    "Bitget": { abbr: "Bg", cur: "USDT", supported: true },
    "Okx": { abbr: "Ok", cur: "USDT", supported: true },
    "Gate": { abbr: "Gt", cur: "USDT", supported: false },
    "Bybit": { abbr: "By", cur: "USDT", supported: true },
    "Kucoin": { abbr: "Ku", cur: "USDT", supported: false }
}

const CUR_RATE = {
    "KRW": 1,
    "THB": 42.15,
    "USDT": 1470
}

function validateAbbr(abbr) {
    if (abbr.length != 4) {
        return [null, null];
    }
    let exchanges = [abbr.slice(0, 2), abbr.slice(2, 4)];
    if (!exchanges.every((exchange) => exchange in ABBR)) {
        return [null, null];
    }
    return exchanges.map((exchange) => ABBR[exchange]);
}

function renderFile(content, data) {
    let newContent = content;
    for (let key in data) {
        newContent = newContent.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
    }
    return newContent;
}

function extractFuncMarket(exchanges) {
    const funcMarketPath = path.join(__dirname, `../api_data/market.js`);

    const funcMarketContent = fs.readFileSync(funcMarketPath, 'utf8');
    let func_list = exchanges.map((exchange) => {
        let splitter = `async function crawl${exchange}`;
        return splitter + funcMarketContent.split(splitter)[1].split("async")[0];
    });
    return func_list;
}

function extractFuncAvail(exchanges) {
    const funcAvailPath = path.join(__dirname, `../api_data/availList.js`);

    const funcAvailContent = fs.readFileSync(funcAvailPath, 'utf8');
    let func_list = exchanges.map((exchange) => {
        let splitter = `async function getList${exchange}`;
        return splitter + funcAvailContent.split(splitter)[1].split("async")[0];
    });
    return func_list;
}

exports.app = asyncHandler(async (req, res, next) => {
    const recipeDir = path.join(__dirname, '../src/recipe');
    if (!fs.existsSync(recipeDir)) {
        fs.mkdirSync(recipeDir, { recursive: true });
    }
    const filePath = path.join(__dirname, `../src/recipe/${req.params.appId}.js`);
    if (!fs.existsSync(filePath)) {
        let [base, foreign] = validateAbbr(req.params.appId);
        if (base == null) {
            res.status(418).send("Exchange not found");
            return;
        }
        if (!EXCHANGE_DATA[base].supported || !EXCHANGE_DATA[foreign].supported) {
            if (!EXCHANGE_DATA[base].supported && !EXCHANGE_DATA[foreign].supported) {
                res.status(418).send(`${base} and ${foreign} not supported`);
            } else if (!EXCHANGE_DATA[base].supported) {
                res.status(418).send(`${base} not supported`);
            } else {
                res.status(418).send(`${foreign} not supported`);
            }
            return;
        }
        let def_rate = (CUR_RATE[EXCHANGE_DATA[foreign].cur] / CUR_RATE[EXCHANGE_DATA[base].cur]).toFixed(2);
        let base_cur_sym = EXCHANGE_DATA[base].cur;
        const templatePath = path.join(__dirname, '../views/script.js');
        const templateContent = fs.readFileSync(templatePath, 'utf8');

        let [baseFuncMarket, foreignFuncMarket] = extractFuncMarket([base, foreign]);
        let [baseFuncAvail, foreignFuncAvail] = extractFuncAvail([base, foreign]);

        let replace_data = {
            base: base,
            foreign: foreign,
            def_rate: def_rate,
            base_cur_sym: base_cur_sym,
            base_func_market: baseFuncMarket,
            foreign_func_market: foreignFuncMarket,
            base_func_avail: baseFuncAvail,
            foreign_func_avail: foreignFuncAvail
        };
        const newContent = renderFile(templateContent, replace_data);
        fs.writeFileSync(filePath, newContent);
    }
    res.render('index', {
        appId: req.params.appId
    });
    return;
});