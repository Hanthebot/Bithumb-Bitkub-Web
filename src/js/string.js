
const CRAWL_STOP = "Resume";
const CRAWL_ON = "Stop Crawling";
const SOUND_ON = "Sound: ON";
const SOUND_OFF = "Sound: OFF";

const LAST_UPDATED = `Last updated at {0}. Crawling {1}/{2}!`;
const LAST_UPDATED_CRAWLING = `Last updated at {0}. Crawling {1}/{2}`;

const TABLE_TEMPLATE = `
            <tr class="table_border">
                <th>SYM</th>
                <th>${EXCHANGE_BASE}</th>
                <th>${EXCHANGE_FOREIGN}</th>
                <th>${EXCHANGE_FOREIGN} (KRW)</th>
                <th>%</th>
            </tr>`;

const TABLE_TOP_TEMPLATE = `
            <tr class="table_border">
                <th>Kim</th>
                <th>Rev</th>
                <th>Dif</th>
            </tr>`;