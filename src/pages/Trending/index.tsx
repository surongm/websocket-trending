import { TrendingTable } from './TrendingTable'
import './index.scss'

export const Trending = () => {

    return (
        <div className='trending'>
            <header className='trending-header'>
                <div className='trending-header-title'>
                    Trending Tokens
                </div>
                <div className='trending-header-info'>
                    used WebSocket by SuRongmin  2025-11-23
                </div>
            </header>
            <TrendingTable />
        </div>
    )
}
