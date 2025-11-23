import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { TrendingItem } from "./type";
import { NumColumn, TokenColumn, TXsColumn } from "./ColumnItem";
import { formatNumber, formatPrice } from "@/utils";

const { Text } = Typography;

const columns: ColumnsType<TrendingItem> = [
    {
        title: "Token",
        dataIndex: "baseSymbol",
        fixed: "left",
        width: 250,
        render: (_, record) => <TokenColumn record={record} />
    },
    {
        title: "Age",
        dataIndex: "timeDiff",
        width: 100,
        align: "center",
    },
    {
        title: "Liq / MC",
        width: 200,
        align: "center",
        render: (_, r) => (
            <div>
                <Text>{formatNumber(r.liquidity)}</Text>
                <br />
                <Text type="secondary" style={{ color: 'var(--color-text-secondary)' }}>{formatPrice(r.marketCap)}</Text>
            </div>
        ),
    },
    {
        title: "Price",
        dataIndex: "priceUsd",
        width: 150,
        align: "center",
        render: (v) => <Text>{formatPrice(v)}</Text>,
    },
    {
        title: "24h Chg %",
        dataIndex: "priceChange24h",
        width: 150,
        align: "center",
        render: (v: number) => <NumColumn num={v} />,
    },
    {
        title: "24h TXs",
        width: 150,
        align: "center",
        render: (_: any, record: TrendingItem) => <TXsColumn record={record} />,
    },
    {
        title: "24h Vol",
        dataIndex: "volumeUsd24h",
        width: 150,
        align: "center",
        render: (v) => <Text>{formatNumber(v)}</Text>,
    },
    {
        title: "1m%",
        dataIndex: "priceChange1m",
        width: 150,
        align: "center",
        render: (v) => <NumColumn num={v} />,
    },
    {
        title: "5m%",
        dataIndex: "priceChange5m",
        width: 150,
        align: "center",
        render: (v) => <NumColumn num={v} />,
    },
    {
        title: "1h%",
        dataIndex: "priceChange1h",
        width: 150,
        align: "center",
        render: (v) => <NumColumn num={v} />,
    },
];

export const TrendingTable = () => {
    const { trendingData } = useWebSocket()

    return (
        <div className="trending-table">
            <Table
                dataSource={trendingData}
                columns={columns}
                pagination={false}
                rowKey={'baseToken'}
            />
        </div>
    );
};

