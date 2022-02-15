
import { getApp } from '@/useApp';
import { isDevMode } from '@/utils/env';
import { FrameworkConfiguration, initGlobalState, MicroAppStateActions, start } from 'qiankun';
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import DevPage from '../dev';
import Style from './style.module.less';

export default defineComponent({
    name: 'portal',
    setup() {
        const router = useRouter();
        const app: any = getApp();

        // 页面loaindg
        const appLoading: Ref<boolean> = ref(true);
        const timer: NodeJS.Timer = setInterval(() => {
            console.log('wathing')
            if (appLoading.value) {
                appLoading.value = app.loading;
            } else {
                clearInterval(timer);
            }
        }, 500)


        // 初始化 state
        const state: Record<string, any> = {
            'main.version': 'v0.0.1'
        };
        const actions: MicroAppStateActions = initGlobalState(state);
        // actions.onGlobalStateChange((state, prev) => {
        //     // state: 变更后的状态; prev 变更前的状态
        //     console.log(state, prev);
        // });
        actions.setGlobalState(state);
        // actions.offGlobalStateChange();


        // 启动微服务
        onMounted(() => {
            if (!(window as any).qiankunStarted) {
                (window as any).qiankunStarted = true;

                // 启用微服务
                const isPrefetch = !isDevMode();
                const opts: FrameworkConfiguration = {
                    // 在生产模式下开启预加载
                    prefetch: isPrefetch,
                    // 此处禁用沙箱 以提高部分性能
                    sandbox: false
                };
                start(opts);
            }
        });

        // 改变全局状态
        const changeGlobalState = async () => {
            console.log('change global state');
            actions.setGlobalState({
                ...state,
                'stamp': new Date().getTime()
            });
        }

        // 应用跳转
        const redirectUrl = (path: string) => {

            router.replace(`/portal${path}`);
        }

        return () => (
            <>
                <a-layout>
                    <a-layout-header style={{ 'background-color': '#fff' }}>
                        <h1 style={{ display: 'inline-block' }}>AppBase Portal {appLoading.value && 'loading'}</h1>
                        <DevPage>
                            {{
                                buttons: () => (
                                    <a-button onClick={changeGlobalState}>修改全局状态</a-button>
                                )
                            }}
                        </DevPage>
                    </a-layout-header>
                    <a-layout>
                        <a-layout-sider theme="light">
                            <a-menu>
                                <a-menu-item onClick={() => redirectUrl('/app1')} key="app1">
                                    App1
                                </a-menu-item>
                                <a-menu-item onClick={() => redirectUrl('/app2')} key="app2">
                                    App2
                                </a-menu-item>
                                <a-menu-item onClick={() => redirectUrl('/app3')} key="app3">
                                    App3
                                </a-menu-item>
                                <a-menu-item onClick={() => redirectUrl('/app4')} key="app4">
                                    App4
                                </a-menu-item>
                                <a-menu-item onClick={() => redirectUrl('/app5')} key="app5">
                                    App5
                                </a-menu-item>
                            </a-menu>
                        </a-layout-sider>
                        <a-layout-content>
                            {
                                appLoading.value && (
                                    <div class={Style.loadEffect}>
                                        <div><span></span></div>
                                        <div><span></span></div>
                                        <div><span></span></div>
                                        <div><span></span></div>
                                    </div>
                                )
                            }
                            <div id="subapp" style={{ 'min-height': '100vh', 'padding': '11px' }}></div>
                        </a-layout-content>
                    </a-layout>
                    <a-layout-footer>Footer</a-layout-footer>
                </a-layout>
            </>
        )
    }
});