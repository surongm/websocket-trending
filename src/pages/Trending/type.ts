
// 每一项的字段
export interface TrendingItem {
    baseName: string;
    baseSymbol: string;
    baseToken: string;
    info: string;
    lastTimeDiff: string;
    timeDiff: string;
    liquidity: number;
    marketCap: number;
    price: number;
    priceUsd: number;
    priceChange24h: number;
    priceChange1m: number;
    priceChange5m: number;
    priceChange1h: number;
    volumeUsd24h: number;
    sellCount24h: number;
    count24h: number;
    buyCount24h: number;
}

// info内容
export interface InfoType {
    quoteLogo: string;
    twitter: string;
    website: string;
    telegram: string;
    baseLogo: string;
}

// 接口返回的所有字段
export interface TrendingAllItem {
    baseDecimals: number;
    baseName: string;
    baseSupply: number;
    baseSymbol: string;
    baseToken: string;
    buyCount24h: number;
    chainId: string;
    count24h: number;
    dex: string;
    info: string;
    lastTimeDiff: string;
    liquidity: number;
    marketCap: number;
    pair: string;
    price: number;
    priceChange1h: number;
    priceChange1m: number;
    priceChange24h: number;
    priceChange4h: number;
    priceChange5m: number;
    priceNative: number;
    priceUsd: number;
    quoteName: string;
    quoteSymbol: string;
    quoteToken: string;
    sellCount24h: number;
    timeDiff: string;
    volumeUsd24h: number;
}
