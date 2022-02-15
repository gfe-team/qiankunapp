import type { App } from 'vue';
import { createI18n,useI18n } from 'vue-i18n';
//@ts-ignore
import zh from "@/locales/i18n/zh";
//@ts-ignore
import en from "@/locales/i18n/en";

const localesConfigs = {
    zh: {
        ...zh,
    },
    en: {
        ...en,
    },
};

export const i18n = createI18n({
    locale: "zh-cn",
    fallbackLocale: "en",
    messages: localesConfigs,
    legacy: false,
    globalInjection: true,
});


export function setupI18n(app: App<Element>) {

    app.use(i18n)
}

export default useI18n;