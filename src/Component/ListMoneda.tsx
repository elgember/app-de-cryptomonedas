import { CardMoneda } from "./CardMoneda";
import { Coin } from '../Types/Coin';

interface CryptoProp {
    loading: boolean;
    moneda: Coin[];
}

export const ListMoneda = ({ loading, moneda }: CryptoProp) => {
    return (
    <div className="bg-[#eee]">
        <h1>Cryptomonedas</h1>
        {loading ? (
            <p>Cargando datos...</p>
        ) : (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] h-full gap-4 mx-4">
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