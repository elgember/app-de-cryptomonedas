import { useState } from "react"
import { Coin } from '../Types/Coin';
import { BuscarMoneda } from "./BuscarMoneda";

interface NavProps {
    moneda: Coin[];
    loading: boolean;
    item: Coin;
}

export const NavMoneda = ({ moneda, loading, item }: NavProps) => {

    //esdado para busqueda de las monedas
    const [buscarMoneda, setBuscarMoneda] = useState('');

    //mostra sugerencias de monedas que conincidan 
    const [mostrarSugerencia, setMostrarSugerencia] = useState(false);

    return (
    <div>
        <div>
            <BuscarMoneda item={item} buscarMoneda={buscarMoneda} setBuscarMoneda={setBuscarMoneda} mostrarSugerencia={mostrarSugerencia} setMostrarSugerencia={setMostrarSugerencia} moneda={moneda} loading={loading} />
        </div>
    </div>
    )
}