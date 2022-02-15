// 指定位数的随机数字
export const getRandomNum = (num = 6): number => (Math.random() * Math.pow(10, num)) >> 0;