import {
    addGlobalUncaughtErrorHandler,
    FrameworkLifeCycles,
    registerMicroApps,
    RegistrableApp,
    runAfterFirstMounted
} from "qiankun";
import '@/plugins/polyfills';
import { createApp, App as AppType } from "vue";
import App from './App';
import { setupComponents } from './components';
import { setupDirectives } from './directives';
// import { setupHooks } from './hooks';
import { setupI18n } from './locales';
import { setupAntd, /**setupEcharts,*/ setupMitt, setupVxe } from './plugins';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { getApp, setApp, updateApp } from './useApp';
import { mockXHR } from '@/mock/index';
import { isDevMode, isMockMode } from './utils/env';
// import 'css-doodle';
import './style.less';
// Tailwind
// import "@/assets/css/styles.css";
import { setupEcharts } from "./plugins/echarts";
import { AppPager as pager } from "./core/app.pager";
import { apps } from "./core/apps";

// 主应用
let app: AppType<Element> | any;

// 生产模式覆盖console方法为空函数
function disableConsole() {

    // @ts-ignore
    Object.keys(window.console).forEach(v => window.console[v] = function () { });
}
!isDevMode() && disableConsole();


// 判断是否为mock模式
isMockMode() && mockXHR();


// 封装渲染函数
const loader = (loading: boolean) => render({ loading });
const render = (props: any) => {
    const { appContent, loading } = props;
    if (!app) {

        app = createApp(App);

        // app
        setApp(app);

        // ui
        setupAntd(app);

        // store
        setupStore(app);

        // router
        setupRouter(app);

        // components
        setupComponents(app);

        // directives
        setupDirectives(app);

        // i18n
        setupI18n(app);

        // report
        setupEcharts(app);

        // EventBus
        setupMitt(app);

        // DataTable
        setupVxe(app);

        // mount
        router.isReady().then(() => {

            app.mount('#app', true);
        });
    } else {
        // console.log(app);
        console.log('loading : ', loading);
        app.content = appContent;
        app.loading = loading;
        updateApp(app);
    }
}

// 主应用渲染
render({ loading: true });


// 注册子应用
const microApps: RegistrableApp<any>[] = [
    ...apps.map(mapp => {
        return {
            ...mapp,
            props: {
                ...mapp.props,
                app,
                pager
            }
        } as RegistrableApp<any>;
    })
];
const lifeCycles: FrameworkLifeCycles<any> = {
    // beforeLoad: app => new Promise(resolve => {

    //     console.log("app beforeLoad", app);
    //     resolve(true);
    // }),
    // afterUnmount: app => new Promise(resolve => {

    //     console.log("app afterUnmount", app);
    //     resolve(true);
    // })
};
registerMicroApps(microApps, lifeCycles);

// // 启动微服务
// const opts: FrameworkConfiguration = { prefetch: false };
// start(opts);

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {

    console.log('First App Mounted !!!')
});

// 设置全局未捕获异常处理器
addGlobalUncaughtErrorHandler(event => {

    console.log(event);
});