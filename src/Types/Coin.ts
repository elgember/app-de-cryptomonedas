export interface Coin {
    name: string;
    price: number;
    id: string;
    current_price: number;
    image: string;
    symbol: string;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
}

export interface PriceHistory {
    coinId: string;
    oldPrice: number;
    newPrice: number;
    date: string;
    type: 'up' | 'down';
    name: string;
}