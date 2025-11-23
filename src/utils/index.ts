import { message } from 'antd';
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
export function formatNumber(num: number | null | undefined): string {
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

    return sign + abs.toFixed(2); // 小于 1000 原样返回
}

// 处理价格
export function formatPrice(price: number | null | undefined): string {
    return '$' + formatNumber(price)
}

// 比较时间
export const compTimeDiff = (v: string | null | undefined): number => {
    if (!v) return 0;
    const num = parseFloat(v);
    if (v.includes("d")) return num * 86400;
    if (v.includes("h")) return num * 3600;
    if (v.includes("m")) return num * 60;
    return num; // 秒
};

// 复制公共方法
export const onCopy = async (token: string) => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(token);
        } else {
            const input = document.createElement("input");
            input.value = token;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
        }
        message.success("复制成功");
    } catch (err) {
        console.error(err);
        message.error("复制失败");
    }
}
