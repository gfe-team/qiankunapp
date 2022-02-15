// 目录
// 一、BLOB下载 downloadFileByBlob
// 二、a 标签下载 saveFile  downloadBylink
// // 三、showSaveFilePicker API 下载
// 四、FileSaver 下载
// 五、Zip 下载  batchDownloadFiles
// //  六、附件形式下载
// // 七、base64 格式下载
// // 八、chunked 下载
// // 九、范围下载
// // 十、大文件分块下载
// 十一、文件流下载  downloadByUrl

import { ContentTypeEnum } from "@/enums/httpEnum";
import { defHttp } from "@/utils/http/axios";
import { message } from 'ant-design-vue';
import { Method } from "axios";
// import { Blob } from 'blob-polyfill';
// const streamSaver = require('./StreamSaver');
import streamSaver from "./StreamSaver";
// import streamSaver from "streamsaver";
import { WritableStream as ponyWritableStream } from 'web-streams-polyfill/ponyfill/es6';
// import iconv from 'iconv-lite';
import JSZip from 'jszip';
import FileSaver from "file-saver";
import { formatToDateTime } from "./dateUtil";

const win = window as any;
const isChrome = win.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
const isSafari = win.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

/**
 * Blob方式
 * @param url api地址
 * @param method 请求方法
 * @param params 请求参数
 * @param name 下载文件名称
 * @param fn 调用函数
 * @returns 
 */
export function downloadFileByBlob(url: string, method: Method, params: any, name: string, fn?: (r: any) => void, apiUrl?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const config = {
            url,
            method,
            params,
        }

        defHttp.request({
            ...config,
            responseType: 'arraybuffer'
        }, {
            apiUrl: apiUrl,
            isTransformRequestResult: false
        }).then(res => {

            resolve(trySaveFile(name, res, fn))
        }).catch(err => {
            reject(err)
        });
    })
}

// 支持回调的下载方式-Blob
export function trySaveFile(name: string, res: any, fn?: (r: any) => void) {

    const blob = new Blob([res]);
    if ('msSaveOrOpenBlob' in navigator) {
        // IE支持的下载方式
        //@ts-ignore
        window.navigator.msSaveBlob(blob, name);
    } else {
        const reader = new FileReader();
        reader.readAsText(blob, 'utf-8');
        reader.onload = () => {
            const str: string = reader.result as string;
            try {
                const result = JSON.parse(str);
                message.warning(`下载失败：${result?.Message || '下载服务异常'}`);
            } catch (error) {
                saveFile(name, res);
            }
            fn && fn(res);
        }
    }
}


// 模拟a标签下载方式
export function saveFile(name: string, data: any) {
    const a = document.createElement('a');
    const blob = new Blob([data], { 'type': ContentTypeEnum.OCTET_STREAM });
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
}

// 开启新窗口
export function openWindow(
    url: string,
    opt?: { target?: string; noopener?: boolean; noreferrer?: boolean },
) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];

    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');

    win.open(url, target, feature.join(','));
}

// 通过Url下载对应文件，一般使用在云(腾讯)文件的下载上
export function downloadByUrl({
    url,
    fileName,
}: {
    url: string;
    fileName?: string;
}): boolean {

    // 如果文件不携带扩展名的话 补充上扩展名
    if (!fileName?.includes('.')) {
        const index = url.lastIndexOf(".");
        fileName = `${fileName}.${url.substr(index + 1)}`;
    }

    const target = '_blank';

    if (/(iP)/g.test(win.navigator.userAgent)) {
        console.error('Your browser does not support download!');
        return false;
    }
    if (isChrome || isSafari) {
        try {
            if (!fetch || !win.WritableStream) throw Error(`Don't Support Fetch Or WritableStream !!!`);

            streamSaver.WritableStream = streamSaver.WritableStream || ponyWritableStream;
            streamSaver.mitm = location.origin + '/mitm.html';
            const fileStream = streamSaver.createWriteStream(fileName);

            fetch(url).then(res => {
                const readableStream = res.body;
                // @ts-ignore
                if (win.WritableStream && readableStream.pipeTo) {
                    // @ts-ignore
                    return readableStream.pipeTo(fileStream).then(() => console.log('done writing'));
                }

                const writer = fileStream.getWriter();

                // @ts-ignore
                const reader = res.body.getReader();
                const pump: any = () => reader.read().then(res => res.done ? writer.close() : writer.write(res.value).then(pump));
                pump();
            }, err => {

                console.log('fetch file stream error. switch link to continue download.')
                downloadBylink({ url, fileName, target });
            });
        } catch (error) {

            console.log('Downlaod file by filestream error.')
        }


        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', url, true);
        // xhr.responseType = 'blob';
        // xhr.onload = (e) => {
        //     const url = window.URL.createObjectURL(xhr.response);
        //     downloadBylink({ url, fileName, target });
        // };
        // xhr.onerror = () => {

        //     openWindow(url, { target });
        // }
        // xhr.send();
    } else {
        if (url.indexOf('?') === -1) {
            url += '?download';
        }

        openWindow(url, { target });
    }

    return true;
}

// 不发送HTTP请求，直接通过a标签的单击事件下载
export function downloadBylink({ url, fileName, target }: any) {

    const link = document.createElement('a');
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
        link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    }

    if (document.createEvent) {
        const e: MouseEvent = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
    }
}

// 批量下载，前端压缩
export function batchDownloadFiles(list) {
    try {
        const zip = new JSZip();
        const promises = [];
        list.forEach(item => {
            // 采用统一http请求，否则会有编码问题
            const promise = defHttp.request({ method: 'GET', url: item.url, responseType: 'arraybuffer' }, {
                apiUrl: '',
                isTransformRequestResult: false
            }).then((data: null) => {
                // 下载文件, 并存成ArrayBuffer对象
                const arr_name = item.fileName.split("/");
                const file_name = arr_name[arr_name.length - 1]; // 获取文件名
                // const buf = iconv.encode(data, 'GBK');
                zip.file(file_name, data, { binary: true }); // 逐个添加文件
            });
            promises.push(promise);
        });
        Promise.all(promises).then(() => {
            zip.generateAsync({ type: "blob" }).then(content => {
                // 生成二进制流
                const zipName: string = formatToDateTime(new Date());

                // 利用file-saver保存文件  自定义文件名
                FileSaver.saveAs(content, `${zipName}.zip`);
            });
        });

    } catch (err) {

        // console.error(err);
        message.warning('当前浏览器版本过低，不支持批量下载，请更换其它浏览器再试');
    }
}