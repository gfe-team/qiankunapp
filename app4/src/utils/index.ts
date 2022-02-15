export const timestamp = () => +Date.now();
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
export const now = () => Date.now();


// 对象参数化
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    let url = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters;
    } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters;
    }
    return url;
}

// 深度合并
export function deepMerge<T = any>(src: any, target: any): T {
    let key: string;
    for (key in target) {
        src[key] =
            src[key] && src[key].toString() === '[object Object]'
                ? deepMerge(src[key], target[key])
                : (src[key] = target[key]);
    }
    return src;
}

// 根据数组中某个对象值去重
export function unique<T = any>(arr: T[], key: string): T[] {
    const map = new Map();
    return arr.filter((item) => {
        const _item = item as any;
        return !map.has(_item[key]) && map.set(_item[key], 1);
    });
}

// es6数组去重复
export function es6Unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}


// 获取URL参数
export function getParams(url: string) {
    if (!url.includes('?')) return {};
    const keyValueArr = (url || '').split("?")[1].split("&");
    const paramObj: any = {};
    (keyValueArr || []).forEach((item) => {
        const keyValue = item.split("=");

        paramObj[keyValue[0]] = keyValue[1];
    });

    return paramObj;
}

// Table空数据的默认配置
export function transformCellText(text: unknown) {
    if (text === undefined
        || text === null
        || text === '')

        return '--';

    return text;
}
