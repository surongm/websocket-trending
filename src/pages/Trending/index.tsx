import { useWebSocket } from '@/hooks/useWebSocket'
import React from 'react'

export const Trending = () => {
    const { trendingData } = useWebSocket()

    return (
        <div>Trending</div>
    )
}
