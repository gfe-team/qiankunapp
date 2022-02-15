import { App } from "vue";

let app: App;

export const setApp = (_app: App): void => {

    app = _app;
}

export const getApp = (): App => app;

export const updateApp = (copy: App) => {

    Object.assign(app, copy);
}
