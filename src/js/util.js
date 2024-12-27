var intervalId;
document.cryptoData = {};
document.lastUpdate = "N/A";

document.template = `
            <tr class="table_border">
                <th class="sym">SYM</th>
                <th>Upbit</th>
                <th>Bitkub</th>
                <th>Bitkub (KRW)</th>
                <th>%</th>
            </tr>`;
            
function clear() {
    if (typeof intervalId !== 'undefined') {
        window.clearInterval(intervalId);
        intervalId = undefined;
    }
}

function pad(val){
    return (val<10) ? '0' + val : val;
}

function toTime(date) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function recomputePercentage() {
    document.kim_best = document.cryptoList[0];
    document.rev_best = document.cryptoList[0];
    document.cryptoList.forEach((sym) => {
        let kim = document.cryptoData[sym].upbit[0] / document.cryptoData[sym].bitkub[1] / document.rate * document.fee - 1;
        document.cryptoData[sym].kim = parseFloat(kim * 100);
        let rev = document.cryptoData[sym].bitkub[0] / document.cryptoData[sym].upbit[1] * document.rate * document.fee - 1;
        document.cryptoData[sym].rev  = parseFloat(rev * 100);
        
        document.cryptoData[sym].kim_class = document.cryptoData[sym].kim >= document.kim ? "green" : "red";
        document.cryptoData[sym].rev_class = document.cryptoData[sym].rev >= document.rev ? "green" : "red";

        if (document.cryptoData[sym].kim > document.cryptoData[document.kim_best].kim) document.kim_best = sym;
        if (document.cryptoData[sym].rev > document.cryptoData[document.rev_best].rev) document.rev_best = sym;
    });
    document.cryptoData[document.kim_best].kim_class += " best";
    document.cryptoData[document.rev_best].rev_class += " best";
}

function rowTemplate(sym) {
    let dat = document.cryptoData[sym];
    return `<tr>
            <td rowspan="2" class="sym">${sym}</td>
            <td>${dat.upbit[0]}</td>
            <td>${dat.bitkub[0]}</td>
            <td>${(dat.bitkub[0] * document.rate).toFixed(2)}</td>
            <td class="${dat.kim_class}">${dat.kim.toFixed(2)}%</td>
        </tr>
        <tr class="table_border">
            <td>${dat.upbit[1]}</td>
            <td>${dat.bitkub[1]}</td>
            <td>${(dat.bitkub[1] * document.rate).toFixed(2)}</td>
            <td class="${dat.rev_class}">${dat.rev.toFixed(2)}%</td>
        </tr>
        `;
}

function updateTable() {
    let str = document.template;
    document.cryptoList.forEach((sym) => {
        str += rowTemplate(sym);
    });
    document.getElementById("main_data").innerHTML = str;
};

function updateMinMax() {
    let str = document.template;
    
    [document.kim_best, document.rev_best].forEach((sym) => {
        str += rowTemplate(sym);
    });
    document.getElementById("top_data").innerHTML = str;
};

function updateWholeTable() {
    recomputePercentage();
    updateTable();
    updateMinMax();
}

function applyData() {
    getSettings();
    updateWholeTable();
}

function crawlAndUpdate() {
    document.count = 0;
    let promises = crawlList(document.cryptoData, document.cryptoList)
    Promise.all(promises).then(() => {
        updateWholeTable();
        document.lastUpdate = toTime(new Date());
        document.getElementById("textbox").innerText = `Crawled all ${document.cryptoList.length}/${document.cryptoList.length}! Last updated at ${document.lastUpdate}`;
    });
}

function crawlRepeat() {
    clear();
    crawlAndUpdate();
    intervalId = window.setInterval(crawlAndUpdate, 30000);
}