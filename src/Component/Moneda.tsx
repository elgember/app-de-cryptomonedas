import {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Coin, PriceHistory } from '../Types/Coin';

interface MonedaProps {
    moneda: Coin[];
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    historial: PriceHistory[];
}

export const Moneda = ({ moneda, loading, setLoading, historial }: MonedaProps) => {

    const { id } = useParams<{ id: string }>(); // Obtener el ID de la moneda desde los parámetros de la URL

    const monedaId = moneda.find((item) => String(item.id) === String(id)); // Buscar la moneda correspondiente al ID

    useEffect(() => {
        if (!monedaId) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [monedaId, setLoading]);

    if (loading || !monedaId) {
        return <p>Cargando datos...</p>;
    }

    return (
    <div className='flex flex-col items-center gap-4 m-6 p-4 bg-white rounded-lg shadow-md w-full lg:w-1/2 mx-auto'>
        <div className='p-2'>
            <img className='w-20 h-20 object-contain' src={monedaId.image} alt={monedaId.name} />
            <h2 className='text-2xl font-bold'>{monedaId.name}</h2>
        </div>
        <div>
            <p className='p-2'><strong>Precio: </strong>${Number(monedaId.current_price)}</p>
            <p className='p-2'><strong>Capitalización de mercado: </strong>${Number(monedaId.market_cap).toLocaleString()}</p>
            <p className='p-2'><strong>Volumen total: </strong>${Number(monedaId.total_volume).toLocaleString()}</p>
        </div>
        <div>
            <h3 className='text-xl font-semibold mb-2'>Historial de precios:</h3>
            {historial.length === 0 ? (
                <p>No hay cambios de precio registrados.</p>
            ) : (
                historial.map((item, index) => (
                    <div key={index}>
                        <p><strong>{item.name}</strong> cambió de ${item.oldPrice} a ${item.newPrice} el {item.date} ({item.type === 'up' ? 'Subió' : 'Bajó'})</p>
                    </div>
                ))
            )}
        </div>
    </div>
    )
}