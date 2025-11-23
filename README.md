## 运行
需要VPN
线上地址 https://surongm.github.io/

```tsx
npm install
npm run dev
npm run build
npm run test
```


## 功能
1、webSocket 获取数据，心跳机制和出错指数退避重连
2、点击表头可对该列进行排序
3、Token列点击查询图标跳转到查询页面，点击复制图标可复制该列的合约地址


## 实现
React + TypeScript + WebSocket + Jest + Antd
使用Ts约束类型
使用react封装了自定义hooks useWebSocket
使用Antd快速生成表格页面
使用Scss方便写css代码
使用Jest库写了utils的测试用例
使用错误边界页面处理页面报错情况


## 目录
src/
├── assets/                      # 静态资源（图片、图标等）
│   ├── default-token.png        # 有些数据没有图标，找了一个默认的图标
│   └── react.svg
│
├── hooks/
│   └── useWebSocket.tsx         # 自定义 WebSocket Hook，处理连接/重连/消息流等
│
├── pages/
│   ├── Error/                   # 错误边界 & 错误页面
│   │   ├── ErrorBoundary.tsx    # React 错误边界（Class 组件）
│   │   ├── ErrorFallback.tsx    # ErrorBoundary 捕获错误时展示的 UI
│   │   └── NotFound.tsx         # 404 页面
│   │
│   └── Trending/                # Trending 页面模块
│       ├── ColumnItem.tsx       # 单元格渲染逻辑
│       ├── index.scss           # 页面样式
│       ├── index.tsx            # Trending 主页面
│       ├── TrendingTable.tsx    # 表格组件（接收 WebSocket 数据）
│       └── type.ts              # Trending 数据类型定义
│
├── utils/
│   ├── index.ts                 # 工具函数
│   └── util.test.ts             # 工具函数测试（Jest）
│
├── App.tsx                      # 应用根组件
├── App.css                      # 全局css变量
├── index.css
├── main.tsx                     # 项目入口
│
├── vite.config.ts               # Vite 配置
└── tsconfig.json                # TypeScript 配置


## 材料
WebSocket地址 Source：wss://web-t.pinkpunk.io/ws 这是一个公开的ws推数据源，任何人都可以订阅
参考GMGN （https://gmgn.ai/）和Binance Web3 （https://web3.binance.com/）

订阅trending数据
{
    "topic": "trending",
    "event": "sub",
    "interval": "",
    "pair": "",
    "chainId": "56",
    "compression": 0
}
检查心跳
{
    "topic": "pong",
    "event": "sub",
    "pong": "1762871018290",
    "interval": "",
    "pair": "",
    "chainId": "",
    "compression": 1
}

rgba(255, 255, 255, 1) Primary text color
rgba(255, 255, 255, 0.4) Secondary text color
rgba(238, 171, 189, 1) Primary pink color
rgba(244, 188, 204, 1) Row hovered color
rgba(70, 193, 127, 1) Upside color
rgba(229, 56, 56, 1)  Downside color
rgba(0, 0, 0, 1) Background color
rgba(60, 43, 47, 1) Border color


## 字段
接口返回的字段意思
baseDecimals	Token 精度（小数位数）
volumeUsd24h	过去 24 小时成交额（美元）
quoteToken	    交易对的报价币 Token 地址（如 USDT/WBNB）
liquidity	    流动性池中的资金量（美元）
baseSymbol	    主代币的 Symbol（简称）
priceChange4h	4 小时涨跌幅（%）
timeDiff	    Token 创建／池子创建至今的时间（如 “2h”）
dex	            交易所（如 PancakeSwapV2）
price	        Token 当前价格（以报价币计价）
baseName	    Token 名称（全名）
info	        包含 logo、网站、推特、TG 等信息的 JSON 字符串
marketCap	    市值（当前价格 * 流通数量）
priceUsd	    Token 当前美元价格
count24h	    过去 24h 的成交次数
priceNative	    当前价格的主链计价（如 BNB 价格）
sellCount24h	过去 24 小时卖单数量
priceChange1m	1 分钟涨跌幅（%）
priceChange5m	5 分钟涨跌幅（%）
priceChange1h	1 小时涨跌幅（%）
pair	        交易对合约地址（在 DEX 上的 pair 地址）
baseSupply	    Token 总供应量
lastTimeDiff	上次交易/上次活动距离现在时间（如 “4s”）
chainId	        链 ID（如 56 = BSC）
baseToken	    主代币的 Token 地址
priceChange24h	24 小时涨跌幅（%）
buyCount24h	    24 小时买单数量
quoteName	    报价币名称（如 USDT）
quoteSymbol	    报价币符号


字段分类
价格相关        price, priceUsd, priceNative   priceChange1m/5m/1h/4h/24h
交易量相关      volumeUsd24h, count24h, buyCount24h, sellCount24h
Token 信息      baseName, baseSymbol, baseDecimals, baseToken, baseSupply
DEX 信息        dex, pair
链信息          chainId
时间信息        timeDiff（创建时间）、lastTimeDiff（活跃时间）
池子信息        liquidity（流动性）marketCap（市值）
额外信息 JSON   info（logo、推特、官网、TG）


表头对应字段
Token	        baseName, baseToken, info.baseLogo	   Token 名字、地址、图标
Age	timeDiff	Token                                  上线时间（如 2h、3d）
Liq / MC	    liquidity + marketCap	                Liquidity（流动性）/ Market Cap（市值）
Price	        price 或 priceUsd	                   当前价格
24h Chg %	    priceChange24h	                       24 小时价格涨跌幅（百分比）
24h TXs	        buyCount24h + sellCount24h	           24 小时交易数量（买+卖）
24h Vol	        volumeUsd24h	                       24 小时成交量（美元）
1m %	        priceChange1m	                       1 分钟涨跌幅
5m %	        priceChange5m	                       5 分钟涨跌幅
1h %	        priceChange1h	                       1 小时涨跌幅
