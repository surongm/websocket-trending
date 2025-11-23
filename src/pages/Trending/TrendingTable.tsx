import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { TrendingItem } from "./type";
import { NumColumn, TokenColumn, TXsColumn } from "./ColumnItem";
import { compTimeDiff, formatNumber, formatPrice } from "@/utils";

const { Text } = Typography;

const columns: ColumnsType<TrendingItem> = [
    {
        title: "Token",
        dataIndex: "baseSymbol",
        width: 250,
        render: (_, record) => <TokenColumn record={record} />
    },
    {
        title: "Age",
        dataIndex: "timeDiff",
        width: 100,
        align: "center",
        sorter: (a, b) => compTimeDiff(a.timeDiff) - compTimeDiff(b.timeDiff),
    },
    {
        title: "Liq / MC",
        width: 150,
        align: "center",
        sorter: (a, b) => a.liquidity - b.liquidity,
        render: (_, r) => (
            <div>
                <Text>{formatNumber(r.liquidity)}</Text>
                <br />
                <Text type="secondary" className="text-secondary">{formatPrice(r.marketCap)}</Text>
            </div>
        ),
    },
    {
        title: "Price",
        dataIndex: "priceUsd",
        width: 150,
        align: "center",
        // sorter: true,
        sorter: (a, b) => a.priceUsd - b.priceUsd,
        render: (v) => <Text>{formatPrice(v)}</Text>,
    },
    {
        title: "24h Chg %",
        dataIndex: "priceChange24h",
        width: 150,
        align: "center",
        sorter: (a, b) => a.priceChange24h - b.priceChange24h,
        render: (v: number) => <NumColumn num={v} />,
    },
    {
        title: "24h TXs",
        width: 150,
        align: "center",
        sorter: (a: TrendingItem, b: TrendingItem) =>
            a.buyCount24h + a.sellCount24h - (b.buyCount24h + b.sellCount24h),
        render: (_: any, record: TrendingItem) => <TXsColumn record={record} />,
    },
    {
        title: "24h Vol",
        dataIndex: "volumeUsd24h",
        width: 150,
        align: "center",
        sorter: (a, b) => a.volumeUsd24h - b.volumeUsd24h,
        render: (v) => <Text>{formatNumber(v)}</Text>,
    },
    {
        title: "1m%",
        dataIndex: "priceChange1m",
        width: 150,
        align: "center",
        sorter: (a, b) => a.priceChange1m - b.priceChange1m,
        render: (v) => <NumColumn num={v} />,
    },
    {
        title: "5m%",
        dataIndex: "priceChange5m",
        width: 150,
        align: "center",
        sorter: (a, b) => a.priceChange5m - b.priceChange5m,
        render: (v) => <NumColumn num={v} />,
    },
    {
        title: "1h%",
        dataIndex: "priceChange1h",
        width: 150,
        align: "center",
        sorter: (a, b) => a.priceChange1h - b.priceChange1h,
        render: (v) => <NumColumn num={v} />,
    },
];

// 表格部分
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

