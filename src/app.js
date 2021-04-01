import 'regenerator-runtime/runtime';

import { render, html } from 'lit-html';

const template = html`<p>Hello world!</p>`;
render(template, document.getElementById('app'));
 
 async function test() {
    await setTimeout(() => console.log('test'), 5000);
}

test();