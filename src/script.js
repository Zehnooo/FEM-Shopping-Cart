import { initDom } from './scripts/dom.js';
import { client } from './scripts/client.js';

(() => {
    console.log('hello');
    client.device.setDevice();
    initDom();

})();