import { Base64 } from 'js-base64';
const { encode, decode } = Base64;
import SparkMD5 from 'spark-md5'





// base64加密
export const Base64Encryption = (content) => encode(content);

// base64解密
export const Base64Decryption = (content) => decode(content);

// MD5 文件加密
export const getFileMD5 = (file: File, callback: (val: string) => void): void => {
    const chunkSize: number = 1024 * 1024 * 2;
    const chunks: number = Math.ceil(file.size / chunkSize);
    const spark: SparkMD5.ArrayBuffer = new SparkMD5.ArrayBuffer();
    const fileReader: FileReader = new FileReader();

    let currentChunk = 0;

    function loadNext() {
        const start: number = currentChunk * chunkSize;
        const end: number = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(file.slice(start, end));
    }

    fileReader.onload = event => {
        if (event?.target !== null) {
            spark.append((event.target.result as ArrayBuffer));
            currentChunk++;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                callback(spark.end());
            }
        }
    }
    loadNext();
}