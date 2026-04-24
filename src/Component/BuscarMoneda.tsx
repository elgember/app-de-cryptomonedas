import { Coin } from '../Types/Coin';
import { CardMoneda } from './CardMoneda';

interface BuscarProps {
    item: Coin;
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
    <div>
        {loading ? (
            <p>Cargando...</p>
        ) : (
            <div className='text-center my-3'>
                <input className='bg-white pl-10 py-1 rounded-sm w-3/4' type="text" value={buscarMoneda} onChange={(e) => { setBuscarMoneda(e.target.value); setMostrarSugerencia(true); }} onFocus={() => setMostrarSugerencia(true)} placeholder='Buscar Moneda' />
            </div>
        )}
        <div>
            {mostrarSugerencia && buscarMoneda.length > 0 && (
                <ul>
                    {sugerencia.map(m => (
                        <li key={m.id}>
                            <span onClick={() => selecSugerencia(m.name)}>{m.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div>
            {buscarMoneda && filtarMonedas.length > 0 ? (
                <CardMoneda item={filtarMonedas[0]} />
            ) : buscarMoneda ? (
                <p>No se encontraron monedas</p>
            ) : null}
        </div>
    </div>
    )
}