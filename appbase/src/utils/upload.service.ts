// 目录
// 一、单文件上传 uploadFile
// 二、多文件上传
// 三、目录上传
// 四、压缩目录上传
// 五、拖拽上传
// 六、剪贴板上传
// 七、大文件分块上传
// 八、上传至腾讯云
import { ContentTypeEnum } from "@/enums/httpEnum";
import { defHttp } from "@/utils/http/axios";
import { AxiosRequestConfig } from "axios";
import { RequestOptions } from "./http/axios/types";

// ajax 上传FormData
export const uploadFile = async (config: AxiosRequestConfig, formData: FormData, options?: RequestOptions) => {

    return defHttp.request({
        ...config,
        method: 'POST',
        data: formData,
        headers: {
            'Content-type': ContentTypeEnum.FORM_DATA
        },
    }, options);
}
