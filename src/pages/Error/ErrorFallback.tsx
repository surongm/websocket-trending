// ErrorFallback.tsx
export function ErrorFallback({ error, reset }: any) {
    return (
        <div style={{ padding: 40, textAlign: "center" }}>
            <h1>⚠️ 页面出错了</h1>
            <p style={{ color: "#999" }}>{error?.message}</p>
            <button onClick={reset}>刷新页面</button>
        </div>
    );
}
