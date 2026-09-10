import { initDom } from './scripts/dom.js';
import { client } from './scripts/client.js';

(() => {
    console.log('init');
    client.device.setDevice();
    initDom();
})();