// 开发模式
const devMode = 'development';

// 生产模式
const prodMode = 'production';

// MOCK
const mockMode = 'mock';


// BASE_URL: "/"
// NODE_ENV: "development"
// VUE_APP_BASE_API: "https://gateway-service-dev.wetax.com.cn"
// VUE_APP_NODE_ENV: "development"
// console.log(process.env);


// 是否是开发模式
export const isDevMode = (): boolean => process.env.NODE_ENV == devMode;

// 是否MOCK模式
export const isMockMode = (): boolean => process.env.VUE_APP_NODE_ENV == mockMode;

// API根路径(网关地址)
export const BASE_API = process.env.VUE_APP_BASE_API;
