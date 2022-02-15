import { App } from 'vue';
import EmptyAction from "./empty.action";

export function setupComponents(app: App<Element>) {

    app.component('EmptyAction', EmptyAction);
}
