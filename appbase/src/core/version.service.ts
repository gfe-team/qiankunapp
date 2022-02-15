import { message } from "ant-design-vue";
import Startup from "./startup";

class VersionService {
    /**
     * 版本检测功能
     * 当app.json与meta标签内时间戳不一致时,可能客户端存在缓存
     * 上述情况会提示客户端有最新版本
     */
    public static async check() {
        const info = await Startup.bootstrap();

        const {
            app: {
                version
            }
        } = info;

        const metaEle:Element | any = document.querySelector('#version');
        const clientVersion: string | undefined = metaEle?.content;

        if ((version && clientVersion) && version !== clientVersion) {
            const w = window as any;
            if (!w.versionChecked) {
                w.versionChecked = true;
                message.success('检测到最新版本,请刷新后使用').then(
                    () => {
                        // 部分浏览器有存在自动刷新后仍然有缓存情况,会导致页面不断自动刷新
                        // w.location.reload() 
                    },
                    () => { },
                ).then();
            }
        }
    }
}

export default VersionService;