import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import { useUserStore } from '@/store/user';
// import { userStore } from '@/store/modules/user';
// import store from '@/store';
import { deepMerge, setObjToUrlParams } from '@/utils';
import { formatRequestDate } from '@/utils/dateUtil';
import { BASE_API } from '@/utils/env';
import { isString } from '@/utils/is';
import { message as _Message, Modal } from 'ant-design-vue';
// import type { AxiosResponse } from 'axios';
import { VAxios } from './axios';
import { AxiosTransform } from './axios.transform';
import { checkStatus } from './check.status';
import { errorResult } from './const';
import { CreateAxiosOptions, RequestOptions } from './types';
const prefix = '';//globSetting.urlPrefix;


const transform: AxiosTransform = {
    // 处理请求数据
    transformRequestData: (res, options: RequestOptions) => {

        const { isTransformRequestResult } = options;

        // if(res._CALCEL_) return;

        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformRequestResult) {

            return res.data;
        }

        // 错误的时候返回
        const { data } = res;
        if (!data) {
            // return '[HTTP] Request has no return value';
            // console.log('[HTTP] Request has no return value')
            return Promise.reject(errorResult);
            // return errorResult;

        }

        /***
         * 接口 有两种返回格式需要兼容
         * 第一种：{ ActionResult，Data，Message }，有大小写两种情况
         * 第二种：{ status:{ statusCode,statusReason },result:{} }
         */
        const _data = data as any || {};
        // const code = _data.code;
        const content = _data;
        const message = _data.status.statusReason;

        // 这里逻辑可以根据项目进行修改
        const isResultSuccess: boolean = _data?.status?.statusCode?.toString() == '0';
        const hasSuccess = _data && _data.status.statusCode == 0 && isResultSuccess;
        // console.log('hasSuccess ： ', hasSuccess);
        if (!hasSuccess) {
            if (message) {
                // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                if (options.errorMessageMode === 'modal') {
                    // createErrorModal({ title: '错误提示', content: message });
                    Modal.error({
                        title: () => '错误提示',
                        content: () => message,
                    });
                } else {
                    // createMessage.error(message);
                    _Message.error(message);
                    return Promise.reject(message);
                }
            }
            return Promise.reject(errorResult);
        }

        // 接口请求成功，直接返回结果
        if (isResultSuccess) {
            return { status: content.status, result: content.result };
        }

        // 接口请求错误，统一提示错误信息
        if (!isResultSuccess) {
            if (message) {
                // createMessage.error(data.message);
                _Message.error(message);
                Promise.reject(message);
            } else {
                const msg = '操作失败,系统异常!';
                // createMessage.error(msg);
                _Message.error(msg);
                Promise.reject(msg);
            }

            // console.log('createMessage.error')
            return errorResult;
        }
        // // 登录超时
        // if (code === ResultEnum.TIMEOUT) {
        //     const timeoutMsg = '登录超时,请重新登录!';
        //     _Message.error(timeoutMsg);
        //     Promise.reject(new Error(timeoutMsg));
        //     return errorResult;
        // }

        return errorResult;
    },

    // 请求之前处理config
    beforeRequestHook: (config, options) => {

        // console.log(config)
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate } = options;

        if (joinPrefix) {
            config.url = `${prefix}${config.url}`;
        }

        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }
        if (config.method === RequestEnum.GET) {
            const now = new Date().getTime();
            if (!isString(config.params)) {
                config.data = {
                    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                    params: Object.assign(config.params || {}, {
                        _t: now,
                    }),
                };
            } else {
                // 兼容restful风格
                config.url = config.url + config.params + `?_t=${now}`;
                config.params = undefined;
            }
        } else {
            if (!isString(config.params)) {
                formatDate && formatRequestDate(config.params);
                // 常规HTTP请求
                if (!config.data) {
                    config.data = config.params;
                    config.params = undefined;
                } else {
                    // 文件上传HTTP
                    const confData = config.data;
                    config.data = confData;
                    config.params = confData;
                }

                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url as string, config.data);
                }
            } else {
                // 兼容restful风格
                config.url = config.url + config.params;
                config.params = undefined;
            }
        }
        return config;
    },

    // 请求拦截器处理
    requestInterceptors: (config) => {
        // console.log(config);

        // 请求之前处理config
        const userStore = useUserStore();
        const token = userStore?.token;

        if (token) {
            config.headers.Authorization = `${token}`;
        }

        return config;
    },

    // 响应错误处理
    responseInterceptorsCatch: (error: any) => {
        // errorStore.setupErrorHandle(error);
        const { response, code, message } = error || {};
        const msg: string = response && response.data && response.data.error ? response.data.error.message : '';
        const err: string = error.toString();
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                message.error('接口请求超时,请刷新页面重试!');
                return;
            }
            if (err && err.includes('Network Error')) {
                // createErrorModal({
                //   title: '网络异常',
                //   content: '请检查您的网络连接是否正常!',
                // });
                Modal.error({
                    title: () => '网络异常',
                    content: () => '请检查您的网络连接是否正常!',
                });
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
        checkStatus(error.response && error.response.status, msg);
        return error;
    },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
        deepMerge(
            {
                timeout: 6 * 10 * 1000,
                // 基础接口地址
                // baseURL: globSetting.apiUrl,
                // 接口可能会有通用的地址部分，可以统一抽取出来
                prefixUrl: prefix,
                headers: { 'Content-Type': ContentTypeEnum.JSON },
                // 数据处理方式
                transform,
                // 配置项，下面的选项都可以在独立的接口请求中覆盖
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 需要对返回数据进行处理
                    isTransformRequestResult: true,
                    // post请求的时候添加参数到url
                    joinParamsToUrl: false,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 消息提示类型
                    errorMessageMode: 'none',
                    // 接口地址
                    apiUrl: BASE_API
                },
            },
            opt || {}
        )
    );
}
export const defHttp = createAxios();
