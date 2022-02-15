
import mitt from 'mitt';
import { App } from 'vue';

const mitter = mitt();

export function setupMitt(app: App<Element>) {

    app.provide('mitter', mitter);
}