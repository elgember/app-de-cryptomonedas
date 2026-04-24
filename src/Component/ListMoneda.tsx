import { CardMoneda } from "./CardMoneda";
import { Coin } from '../Types/Coin';

interface CryptoProp {
    loading: boolean;
    moneda: Coin[];
}

export const ListMoneda = ({ loading, moneda }: CryptoProp) => {
    return (
    <div>
        <h1>Cryptomonedas</h1>
        {loading ? (
            <p>Cargando datos...</p>
        ) : (
            <ul>
                {moneda.map((item) => (
                    <li key={item.id}>
                        <CardMoneda item={item} />
                    </li>
                ))}
            </ul>
        )}
    </div>
    )
}