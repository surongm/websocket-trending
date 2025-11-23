import * as pako from 'pako';

// 数据解码方法
export function decompressData(compressedString: string) {
    // 1. 将 ISO-8859-1 字符串解码为字节数组
    const byteArray = new Uint8Array(compressedString.length);
    for (let i = 0; i < compressedString.length; i++) {
        byteArray[i] = compressedString.charCodeAt(i) & 0xFF; // 取低8位
    }

    // 2. GZIP 解压字节数据
    const decompressedData = pako.inflate(byteArray);

    // 3. 将解压后的字节数组转为 UTF-8 字符串
    return new TextDecoder('utf-8').decode(decompressedData);
}

// 处理数字
export function formatNumber(num: number): string {
    if (num === null || num === undefined) return '';
    if (num === 0) return "0.00";

    const abs = Math.abs(num);
    const sign = num < 0 ? "-" : "";

    if (abs >= 1000000000) {
        return sign + (abs / 1000000000).toFixed(2) + "B";
    }
    if (abs >= 1000000) {
        return sign + (abs / 1000000).toFixed(2) + "M";
    }
    if (abs >= 1000) {
        return sign + (abs / 1000).toFixed(2) + "K";
    }

    return sign + abs.toFixed(2); // 小于 1000 直接返回
}

// 处理价格
export function formatPrice(price: number): string {
    return '$' + formatNumber(price)
}

