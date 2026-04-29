import { Coin } from '../Types/Coin';
import { Icon } from '@iconify/react';


interface BuscarProps {
    moneda: Coin[];
    loading: boolean;
    buscarMoneda: string;
    setBuscarMoneda: (buscar: string) => void;
    mostrarSugerencia: boolean;
    setMostrarSugerencia: (mostrar: boolean) => void;
}

export const BuscarMoneda = ({ buscarMoneda, setBuscarMoneda, mostrarSugerencia, setMostrarSugerencia, moneda, loading }: BuscarProps) => {

    //filtramos las monedas 
    const filtarMonedas = moneda.filter(m => 
        m.name.toLowerCase().includes(buscarMoneda.toLowerCase())
    );

    const sugerencia = moneda.filter(m => m.name.toLowerCase().includes(buscarMoneda.toLowerCase())).slice(0,5);

    const selecSugerencia = (nombre: string) => {
        setBuscarMoneda(nombre);
        setMostrarSugerencia(false);
    }

    return (
    <div className='w-full lg:w-1/2 mx-auto'>
        {loading ? (
            <p className='text-center pt-8'>Cargando...</p>
        ) : (
            <div className='text-center my-3 relative w-full'>
                <Icon className='absolute left-1/15 top-1/2 transform -translate-y-1/2' icon="mdi:search" width="24" height="24" />
                <input className='bg-white pl-10 py-1 rounded-sm w-[90%]' type="text" value={buscarMoneda} onChange={(e) => { setBuscarMoneda(e.target.value); setMostrarSugerencia(true); }} onFocus={() => setMostrarSugerencia(true)} placeholder='Buscar Moneda' />
            </div>
        )}
        <div>
            {mostrarSugerencia && buscarMoneda.length > 0 && (
                <ul className='grid grid-cols-4 h-full w-full items-center gap-4 m-4'>
                    {sugerencia.map(m => (
                        <li key={m.id} className='p-2 bg-white shadow-sm  text-center rounded-md cursor-pointer'>
                            <span onClick={() => selecSugerencia(m.name)}>{m.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className={`${buscarMoneda ? 'p-4' : '' } text-center`}>
            {buscarMoneda && filtarMonedas.length > 0 ? (
                <p>Se encontraron <strong>{filtarMonedas.length}</strong> monedas similares</p>
            ) : buscarMoneda ? (
                <p>No se encontraron monedas</p>
            ) : null}
        </div>
    </div>
    )
}