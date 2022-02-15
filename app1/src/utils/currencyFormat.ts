// 数字转换
export const currencyFormat = v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// 保留两位小数点
export const currencyFormatToFixed = (v)=>{
    const a = Number(v).toFixed(2);
    return `${a}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}