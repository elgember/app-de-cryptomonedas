import { Link } from 'react-router-dom';
import { Coin } from '../Types/Coin';

interface CryptoItem {
    item: Coin;
}

export const CardMoneda = ({ item }: CryptoItem) => {
    return (
    <div className='bg-white shadow-lg w-full h-full rounded-lg p-4 flex flex-col items-center gap-4 overflow-hidden'>
        <Link className='px-40' to={`/moneda/${item.id}`}>
        <img className='w-30 h-30 object-contain' src={item.image} alt={item.name} />
            <div className='flex flex-col items-center'>
                <h3><strong>{item.name}</strong></h3>
                <p>${Number(item.current_price).toFixed(2)}</p>
            </div>
        </Link>
    </div>
    )
}