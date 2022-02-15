import axios from "axios";

/**
 * 程序启动服务
 */
class Startup {
    /**
     * 程序启动，主要是请求app.json
     */
    public static async bootstrap() {
        const url = `/app.json?ran=${Math.random() * 1e8 >> 0}`;
        try {
            // 优先采用fetch获取
            return fetch(url).then(res => res.json());
        } catch (error) {

            // 不支持fetch时，使用axios获取
            return axios.get(url).then(res => new Promise(resolve => resolve(res.data)));
        }
    }
}

export default Startup;
