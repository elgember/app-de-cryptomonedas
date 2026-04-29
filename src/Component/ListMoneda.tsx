import { CardMoneda } from "./CardMoneda";
import { Coin } from '../Types/Coin';

interface CryptoProp {
    loading: boolean;
    moneda: Coin[];
}

export const ListMoneda = ({ loading, moneda }: CryptoProp) => {
    return (
    <div className="bg-[#eee] w-full h-screen overflow-y-auto">
        {loading ? (
            <p>Cargando datos...</p>
        ) : (
            <div className="bg-white w-full overflow-hidden rounded-lg p-4 lg:w-[60%] mx-auto">
                <h1 className="text-center my-4 font-bold">Cryptomonedas</h1>
                <ul>
                    {moneda.map((item) => (
                        <li key={item.id}>
                            <CardMoneda item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
    )
}