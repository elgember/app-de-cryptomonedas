import { useState } from "react"
import { Coin } from '../Types/Coin';
import { BuscarMoneda } from "./BuscarMoneda";

interface NavProps {
    moneda: Coin[];
    loading: boolean;
}

export const NavMoneda = ({ moneda, loading }: NavProps) => {

    //esdado para busqueda de las monedas
    const [buscarMoneda, setBuscarMoneda] = useState('');

    //mostra sugerencias de monedas que conincidan 
    const [mostrarSugerencia, setMostrarSugerencia] = useState(false);

    return (
    <div>
        <div>
            <BuscarMoneda buscarMoneda={buscarMoneda} setBuscarMoneda={setBuscarMoneda} mostrarSugerencia={mostrarSugerencia} setMostrarSugerencia={setMostrarSugerencia} moneda={moneda} loading={loading} />
        </div>
    </div>
    )
}