const HEADER = `${EXCHANGE_BASE}-${EXCHANGE_FOREIGN} Price Comparison`;

const HEADER_SYMBOL = "SYM";
const HEADER_KIM = "Kim";
const HEADER_REV = "Rev";
const HEADER_DIF = "Dif";

const CRAWL_STOP = "Resume";
const CRAWL_ON = "Stop Crawling";
const SOUND_ON = "Sound: ON";
const SOUND_OFF = "Sound: OFF";

const LAST_UPDATED = `Last updated at {0}. Crawling {1}/{2}!`;
const LAST_UPDATED_CRAWLING = `Last updated at {0}. Crawling {1}/{2}`;

const TABLE_TEMPLATE = `
            <tr class="table_border">
                <th>${HEADER_SYMBOL}</th>
                <th>${EXCHANGE_BASE}</th>
                <th>${EXCHANGE_FOREIGN}</th>
                <th>${EXCHANGE_FOREIGN} (${HOME_CUR})</th>
                <th>%</th>
            </tr>`;

const TABLE_TOP_TEMPLATE = `
            <tr class="table_border">
                <th>${HEADER_KIM}</th>
                <th>${HEADER_REV}</th>
                <th>${HEADER_DIF}</th>
            </tr>`;