import { Avatar, Typography } from "antd"
import type { TrendingItem } from "./type"
import defaultToken from '@/assets/default-token.png'
import { formatNumber } from "@/utils";

const { Text } = Typography;

// 渲染token列
export const TokenColumn = ({ record }: { record: TrendingItem }) => {
    const info = {
        baseLogo: JSON.parse(record.info)?.baseLogo || defaultToken
    };
    const tokenInfo = `${record.baseToken.slice(0, 6)}...${record.baseToken.slice(-4)}`; //截取显示

    return <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar src={info.baseLogo} size={32} />
        <div>
            <Text style={{ fontSize: 14 }}>{record.baseName}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                {tokenInfo}
            </Text>
        </div>
    </div>
}

// 渲染 24h TXs
export const TXsColumn = ({ record }: { record: TrendingItem }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: 1.2,
            }}
        >
            {/* 总数 */}
            <Text>{record.count24h}</Text>

            {/* 买 / 卖 */}
            <div style={{ fontSize: 12 }}>
                <span style={{ color: "var(--color-upside)", marginRight: 4 }}>
                    {record.buyCount24h} /
                </span>
                <span style={{ color: "var(--color-downside)" }}>{record.sellCount24h}</span>
            </div>
        </div>
    );
}

// 渲染数字列
export const NumColumn = ({ num }: { num: number }) => {
    return <Text style={{ color: num >= 0 ? 'var(--color-upside)' : 'var(--color-downside)' }}>
        {formatNumber(num)}%
    </Text>
}
