import { useEffect, useRef, useState } from "react";
import type { TrendingItem } from "@/pages/Trending/type";

const defaultUrl = "wss://web-t.pinkpunk.io/ws";  //地址

const defaultSendMsg = {  //订阅消息
    topic: "trending",
    event: "sub",
    interval: "",
    pair: "",
    chainId: "56",
    compression: 0,
};

let pongMsg = {  //心跳
    topic: "pong",
    event: "sub",
    pong: Date.now().toString(),
    interval: "",
    pair: "",
    chainId: "",
    compression: 1,
};

type WsStatus = "idle" | "open" | "closed";

export const useWebSocket = (url = defaultUrl) => {
    const [trendingData, setTrendingData] = useState<TrendingItem[]>([]);
    const [status, setStatus] = useState<WsStatus>("idle");
    const [error, setError] = useState<unknown>(null);
    const [reconnectMsg, setReconnectMsg] = useState<string>("Loading trending data...");

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null); //重连
    const reconnectAttempts = useRef(0); //重连次数

    // 指数退避 避免重连次数过多 最大延迟 30 秒
    const getReconnectDelay = () =>
        Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);

    const clearReconnectTimer = () => {
        if (reconnectTimer.current) {
            clearTimeout(reconnectTimer.current);
            reconnectTimer.current = null;
        }
    };

    const connect = () => {
        if (wsRef.current) return; // 防止重复连接
        setError(null);

        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket 已连接, 发送的数据为:", defaultSendMsg);
            reconnectAttempts.current = 0;
            setStatus("open");

            ws.send(JSON.stringify(defaultSendMsg));
        };

        ws.onmessage = (event) => {
            try {
                const res = JSON.parse(event.data);
                console.log("收到消息:", res);

                // 处理 PING 心跳
                if ("ping" in res) {
                    pongMsg.pong = res.ping ?? Date.now().toString(),
                        ws.send(JSON.stringify(pongMsg));
                    // console.log("发送 pong:", pongMsg);
                    return;
                }

                // 处理 trending 数据
                if (res.topic === "trending" && Array.isArray(res.data)) {
                    setTrendingData(res.data);
                }
            } catch (e) {
                console.error("Message 解析错误:", e);
                setError(e);
            }
        };

        ws.onerror = (err) => {
            console.error("WebSocket 错误:", err);
            setError(err);
        };

        ws.onclose = (event) => {
            console.log(
                "WebSocket 连接已关闭 -> code:",
                event.code,
                "wasClean:",
                event.wasClean
            );
            setStatus("closed");
            wsRef.current = null;

            // 重连
            reconnect()
        };
    };

    // 重连
    const reconnect = () => {
        if (!reconnectTimer.current) {
            const delay = getReconnectDelay();
            // let msg = `webSocket连接失败，${delay / 1000}s 后重新连接...`
            const msg = reconnectAttempts.current === 0
                ? "Loading trending data..."
                : `WebSocket 第 ${reconnectAttempts.current} 次连接失败，${delay / 1000}s 后重新连接...`;
            setReconnectMsg(msg)
            console.log(msg);

            reconnectTimer.current = setTimeout(() => {
                reconnectAttempts.current++;
                reconnectTimer.current = null;
                connect();
            }, delay);
        }
    }

    useEffect(() => {
        connect();

        return () => {
            console.log("清除 WebSocket");
            clearReconnectTimer();
            wsRef.current?.close();
            wsRef.current = null;
        };
    }, [url]);

    return {
        trendingData,
        reconnectMsg,
        status,   // "idle" | "open"  | "closed"
        error,
    };
};
