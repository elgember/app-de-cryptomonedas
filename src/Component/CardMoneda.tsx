import { Coin } from '../Types/Coin';

interface CryptoItem {
    item: Coin;
}

export const CardMoneda = ({ item }: CryptoItem) => {
    return (
    <div>
        <h3><strong>{item.name}</strong>${item.current_price}</h3>
    </div>
    )
}