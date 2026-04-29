import { Link, useLocation } from 'react-router-dom';
import { Coin } from '../Types/Coin';

interface CryptoItem {
    item: Coin;
}

export const CardMoneda = ({ item }: CryptoItem) => {

    const porcentaje = item.price_change_percentage_24h;
    const esNegativo = porcentaje < 0;

    // Obtener la ubicación actual para verificar la ruta
    const location = useLocation();
    
    // Verificar si la ruta actual es "/moneda" y no renderizar el componente en ese caso
    if (location.pathname === '/moneda') {
        return null; // No renderizar el componente si la ruta es "/moneda"
    }

    return (
    <div className='w-full h-full p-4 overflow-hidden'>
        <Link className='flex items-center gap-4 w-full' to={`/moneda/${item.id}`}>
             <img className='w-10 h-10 object-contain' src={item.image} alt={item.name} />
            <div className='grid grid-cols-3 gap-30 items-center w-full md:gap-44'>
                <h3><strong>{item.name}</strong></h3>
                <p>${Number(item.current_price).toFixed(2)}</p>
                <span className={esNegativo ? 'text-red-500' : 'text-green-500'}>
                    {esNegativo ? '↓' : '↑'} {Math.abs(porcentaje).toFixed(2)}%
                </span>
            </div>
        </Link>
    </div>
    )
}