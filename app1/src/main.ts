import { mockXHR } from '@/mock/index';
import '@/plugins/polyfills';
import { App as AppType, createApp } from "vue";
import App from './App';
import { setupComponents } from './components';
import { setPager } from './core/app.pager';
import { setupDirectives } from './directives';
// import { setupHooks } from './hooks';
import { setupI18n } from './locales';
import { setupAntd, /**setupEcharts,*/ setupMitt, setupVxe } from './plugins';
// Tailwind
// import "@/assets/css/styles.css";
import { setupEcharts } from "./plugins/echarts";
import router, { setupRouter } from './router';
import { setupStore } from './store';
// import 'css-doodle';
import './style.less';
import { setApp } from './useApp';
import { isDevMode, isMockMode } from './utils/env';

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
// const loader = (loading: boolean) => render({ loading });
const render = (props: any) => {
    const {
        appContent,
        loading,
        container,
        pager
    } = props;
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

        // registe pager
        setPager(pager);

        // mount
        router.isReady().then(() => {

            app.mount(container ? container.querySelector('#app') : '#app', true);
        });
    } else {
        app.content = appContent;
        app.loading = loading;
    }
}

// 是否运行在微服务环境中
const isMicroApp: boolean = (window as any).__POWERED_BY_QIANKUN__;

// 允许独立运行 方便调试
isMicroApp || render({});

if (isMicroApp) __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;

// 微服务接入协议
export async function bootstrap() {

}

export async function mount(props: any) {

    // 订阅主应用全局状态变更通知事件
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev);
    });

    render(props);
}

export async function unmount() {
    if (app) {
        app.unmount();
        app._container.innerHTML = '';
        app = null;
    }
}
