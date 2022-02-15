import { setToken, removeToken, setUserinfo, removeUserinfo } from "@/utils/access.token";
import { ActionTypes } from "./actionTypes";


export const actions = {
    // token
    async [ActionTypes.SET_TOKEN](token: string): Promise<boolean | Error> {
        try {
            this.token = token;
            setToken(token);
            return Promise.resolve(true);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    // 清除token
    async [ActionTypes.REMOVE_TOKEN]() {
        try {
            removeToken();
            return Promise.resolve(true);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    // userinfo
    async [ActionTypes.SET_USERINFO](data) {
        try {
            this.userinfo = data;
            setUserinfo(data);
            return Promise.resolve(true);
        } catch (e) {

            return Promise.reject(e);
        }
    },
    // 清除userinfo
    async [ActionTypes.REMOVE_USERINFO]() {
        try {

            removeUserinfo();
            return Promise.resolve(true);
        } catch (e) {

            return Promise.reject(e);
        }
    }
}
