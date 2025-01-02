function pad(val){
    return (val<10) ? '0' + val : val;
}

function toTime(date) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function recomputePercentage() {
    let kim_best = state.coins[0];
    let rev_best = state.coins[0];
    state.coins.forEach((sym) => {
        let kim = data.cryptoData[sym].base[0] / data.cryptoData[sym].foreign[1] / state.rate * state.fee - 1;
        data.cryptoData[sym].kim = parseFloat(kim * 100);
        let rev = data.cryptoData[sym].foreign[0] / data.cryptoData[sym].base[1] * state.rate * state.fee - 1;
        data.cryptoData[sym].rev  = parseFloat(rev * 100);
        
        data.cryptoData[sym].kim_class = data.cryptoData[sym].kim >= state.alert.kim ? "green" : "red";
        data.cryptoData[sym].rev_class = data.cryptoData[sym].rev >= state.alert.rev ? "green" : "red";

        if (data.cryptoData[sym].kim > data.cryptoData[kim_best].kim) kim_best = sym;
        if (data.cryptoData[sym].rev > data.cryptoData[rev_best].rev) rev_best = sym;
    });
    data.cryptoData[kim_best].kim_class += " best";
    data.cryptoData[rev_best].rev_class += " best";
    data.best = {
        kim: kim_best, 
        rev: rev_best
    };
}

function rowTemplate(sym) {
    let dat = data.cryptoData[sym];
    return `<tr>
            <td rowspan="2" class="sym">${sym}</td>
            <td>${dat.base[0]}</td>
            <td>${dat.foreign[0]}</td>
            <td>${(dat.foreign[0] * state.rate).toFixed(2)}</td>
            <td class="${dat.kim_class}">${dat.kim.toFixed(2)}%</td>
        </tr>
        <tr class="table_border">
            <td>${dat.base[1]}</td>
            <td>${dat.foreign[1]}</td>
            <td>${(dat.foreign[1] * state.rate).toFixed(2)}</td>
            <td class="${dat.rev_class}">${dat.rev.toFixed(2)}%</td>
        </tr>
        `;
}

function updateTable() {
    let str = TABLE_TEMPLATE;
    state.coins.forEach((sym) => {
        str += rowTemplate(sym);
    });
    document.getElementById("main_data").innerHTML = str;
};

function updateMinMax() {
    let str = TABLE_TOP_TEMPLATE;
    let kim_best_val = data.cryptoData[data.best.kim].kim;
    let rev_best_val = data.cryptoData[data.best.rev].rev;
    str += `
    <tr class="table_border">
        <td class="${(kim_best_val >= state.alert.kim) ? 'green' : 'red'} best">${(kim_best_val).toFixed(2)}% - ${data.best.kim}</td>
        <td class="${(rev_best_val >= state.alert.rev) ? 'green' : 'red'} best">${(rev_best_val).toFixed(2)}% - ${data.best.rev}</td>
        <td class="${(kim_best_val + rev_best_val >= state.alert.dif) ? 'green' : 'red'} best">${(kim_best_val+rev_best_val).toFixed(2)}% - ${data.best.kim}&${data.best.rev}</td>
    </tr>
    `;
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

async function crawlAndUpdate() {
    data.count = 0;
    let promises = crawlList(state.coins)
    return Promise.all(promises).then(() => {
        updateWholeTable();
        data.lastUpdate = toTime(new Date());
        document.getElementById("textbox").innerText = LAST_UPDATED.format(data.lastUpdate, data.count, state.coins.length);
    });
}

function crawlRepeat() {
    if (data.execute_continue) {
        crawlAndUpdate().then(() => {
            setTimeout(crawlRepeat, 1000);
        });
    }
}

function addOption(select, sym) {
    let option = document.createElement("option");
    option.text = sym;
    option.value = sym;
    select.add(option);
}

function deleteOption(select, sym) {
    for (let i = 0; i < select.length; i++) {
        if (select.options[i].value == sym) {
            select.remove(i);
            break;
        }
    }
}

function addCoin() {
    let sym = document.getElementById("coin_select").value;
    if (state.coins.includes(sym)) return;
    state.coins.push(sym);
    deleteOption(document.getElementById("coin_select"), sym);
    addOption(document.getElementById("coin_delete"), sym);
    data.cryptoData[sym] = {
        base: [0, 0, 0, 0],
        foreign: [0, 0, 0, 0],
        kim: 0,
        rev: 0
    };
    updateWholeTable();
    document.getElementById("current").innerText = CURRENT_COINS.format(state.coins.join(', '));
    saveUrl();
}

function removeCoin() {
    let sym = document.getElementById("coin_delete").value;
    if (!state.coins.includes(sym)) return;
    deleteOption(document.getElementById("coin_delete"), sym);
    addOption(document.getElementById("coin_select"), sym);
    state.coins = state.coins.filter((value) => value != sym);
    delete data.cryptoData[sym];
    updateWholeTable();
    document.getElementById("current").innerText = CURRENT_COINS.format(state.coins.join(', '));
    saveUrl();
}

function toggleExecute() {
    if (data.execute_continue) {
        data.execute_continue = false;
        document.getElementById("execute_toggle_btn").textContent = CRAWL_STOP;
    } else {
        data.execute_continue = true;
        document.getElementById("execute_toggle_btn").textContent = CRAWL_ON;
        crawlRepeat();
    }
}

function toggleSound() {
    if (state.sound) {
        state.sound = false;
        document.getElementById("sound_toggle_btn").textContent = SOUND_OFF;
        saveUrl();
    } else {
        state.sound = true;
        document.getElementById("sound_toggle_btn").textContent = SOUND_ON;
        saveUrl();
        crawlRepeat();
    }
}