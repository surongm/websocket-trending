## 运行
npm run dev


## 功能



## 目录




## 字段意思
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
