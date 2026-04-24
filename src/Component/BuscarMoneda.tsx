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
            <div>
                <input className='border' type="text" value={buscarMoneda} onChange={(e) => { setBuscarMoneda(e.target.value); setMostrarSugerencia(true); }} onFocus={() => setMostrarSugerencia(true)} placeholder='Buscar Moneda' />
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
            {filtarMonedas.length > 0 ? (
                <CardMoneda item={filtarMonedas[0]} />
            ) : (
                <p>No se encontraron monedas</p>
            )}
        </div>
    </div>
    )
}