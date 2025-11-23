import { decompressData, formatNumber, formatPrice, compTimeDiff } from "./";

describe("formatNumber", () => {
    test("格式化为 B", () => {
        expect(formatNumber(2000000000)).toBe("2.00B");
    });

    test("格式化为 M", () => {
        expect(formatNumber(3500000)).toBe("3.50M");
    });

    test("格式化为 K", () => {
        expect(formatNumber(4500)).toBe("4.50K");
    });

    test("格式化小于 1000 的数字", () => {
        expect(formatNumber(123.456)).toBe("123.46");
    });

    test("负数格式", () => {
        expect(formatNumber(-1200)).toBe("-1.20K");
    });

    test("null / undefined", () => {
        expect(formatNumber(null)).toBe("");
        expect(formatNumber(undefined)).toBe("");
    });
});

describe("formatPrice", () => {
    test("格式化价格", () => {
        expect(formatPrice(123456)).toBe("$123.46K");
    });
});

describe("compTimeDiff", () => {
    test("天 (d)", () => {
        expect(compTimeDiff("2d")).toBe(2 * 86400);
    });

    test("小时 (h)", () => {
        expect(compTimeDiff("3h")).toBe(3 * 3600);
    });

    test("分钟 (m)", () => {
        expect(compTimeDiff("5m")).toBe(5 * 60);
    });

    test("秒 (无单位)", () => {
        expect(compTimeDiff("15")).toBe(15);
    });

    test("空值", () => {
        expect(compTimeDiff("")).toBe(0);
    });
});

// -----------------------
// decompressData 测试
// -----------------------

// (globalThis as any).TextDecoder = TextDecoder;
// describe("decompressData", () => {
//     test("GZIP 压缩 + 解压", () => {
//         const original = JSON.stringify({ a: 1, b: "hello" });

//         // gzip 压缩
//         const compressed = pako.gzip(original);

//         // 模拟服务器以 ISO-8859-1 字符串传输
//         const compressedString = String.fromCharCode(...compressed);

//         const result = decompressData(compressedString);
//         expect(result).toBe(original);
//     });

//     test("解压失败时抛异常", () => {
//         expect(() => decompressData("invalid data")).toThrow();
//     });
// });
