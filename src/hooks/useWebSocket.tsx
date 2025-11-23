import { useEffect, useState } from "react";

const defaultUrl = "wss://web-t.pinkpunk.io/ws"
const sdefaultSendMsg = {
    topic: 'trending',
    event: 'sub',
    interval: '',
    pair: '',
    chainId: '56',
    compression: 0  //是否压缩 0表示不压缩 1表示压缩
};

// 封装WebSocket
export const useWebSocket = (url = defaultUrl) => {

    const [trendingData, setTrendingData] = useState([])


    useEffect(() => {
        const ws = new WebSocket(url);

        // 连接
        ws.onopen = () => {
            console.log("WebSocket 已连接, 发送的数据为:", sdefaultSendMsg);
            ws.send(JSON.stringify(sdefaultSendMsg));
        };

        // 接受消息
        ws.onmessage = (event) => {
            let res = JSON.parse(event.data)
            console.log("收到消息:", res);
            setTrendingData(res.data)
        };

        // 出错
        ws.onerror = (err) => {
            console.error("错误:", err);
        };

        // 关闭
        ws.onclose = () => {
            console.log("连接已关闭");
        };

        // 页面卸载时关闭
        return () => ws.close();
    }, []);

    return { trendingData }
}