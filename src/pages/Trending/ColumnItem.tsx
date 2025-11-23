import { Avatar, Tooltip, Typography } from "antd"
import { SearchOutlined, CopyOutlined } from "@ant-design/icons";
import defaultToken from '@/assets/default-token.png'
import type { TrendingItem } from "./type"
import { formatNumber, onCopy } from "@/utils";

const { Text } = Typography;

// 一些自定义单元格内容

// 渲染token列
export const TokenColumn = ({ record }: { record: TrendingItem }) => {
    const info = {
        baseLogo: JSON.parse(record.info)?.baseLogo || defaultToken
    };
    const tokenInfo = `${record.baseToken.slice(0, 6)}...${record.baseToken.slice(-4)}`;

    // 点击查询
    const handleClickSearch = (e: React.MouseEvent) => {
        e.stopPropagation();
        const keyword = record.baseName || record.baseSymbol;
        const url = `https://x.com/search?q=${encodeURIComponent(keyword)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // 点击复制
    const handleClickCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // 复制
        await onCopy(record.baseToken)
    };

    return <div className="table-column-token" >
        <Avatar src={info.baseLogo} size={32} />

        <div>
            {/* 名字 + 搜索图标 */}
            <div className="token-name">
                <Text>{record.baseName}</Text>
                <Tooltip title="在 X 上搜索">
                    <SearchOutlined onClick={handleClickSearch} className="token-name-icon" />
                </Tooltip>
            </div>

            {/* 地址 + 复制 */}
            <div className="token-address">
                <Text type="secondary" className="text-secondary">
                    {tokenInfo}
                </Text>
                <Tooltip title="复制合约地址">
                    <CopyOutlined onClick={handleClickCopy} className="token-address-icon" />
                </Tooltip>
            </div>
        </div>
    </div>
}

// 渲染 24h TXs
export const TXsColumn = ({ record }: { record: TrendingItem }) => {
    return (
        <div className="table-column-txs"        >
            {/* 总数 */}
            <Text>{record.count24h}</Text>

            {/* 买 / 卖 */}
            <div style={{ fontSize: 12 }}>
                <span className="txs-buy">
                    {record.buyCount24h}
                </span>
                <span className="text-secondary"> / </span>
                <span className="text-downside">{record.sellCount24h}</span>
            </div>
        </div>
    );
}

// 渲染数字列
export const NumColumn = ({ num }: { num: number }) => {
    return <Text className={num > 0 ? 'text-upside' : 'text-downside'}>
        {formatNumber(num * 100)}%
    </Text>
}
