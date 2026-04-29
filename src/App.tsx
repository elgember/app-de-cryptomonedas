import { useEffect, useRef, useState } from "react"
import { NavMoneda } from './Component/NavMoneda';
import { ListMoneda } from './Component/ListMoneda';
import { Navigate, Route, Routes } from "react-router-dom";
import { Coin, PriceHistory } from './Types/Coin';
import { Moneda } from "./Component/Moneda";


function App() {

  //estado para guardar el array de monedas
  const [moneda, setMoneda] = useState<Coin[]>([]);

  //estado para controlar la carga de datos
  const [loading, setLoading] = useState(false); 

  //estado para guardar el historial de precios
  const [historial, setHistorial] = useState<PriceHistory[]>([]);

  const precioAnterior = useRef<{ [key: string]: number }>({}); // Ref para almacenar los precios anteriores de las monedas

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30');

        if (!response.ok) {
          throw new Error('Hubo un error al cargar');
        }

        const data = await response.json();
        setMoneda(data); //guardar el array
      }

      catch (error) {
        console.log('Hubo un error', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 60000); // Actualizar cada 60 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []); //array vacio solo ejecuta al montar componente


  //useEffect para detectar cambios en el precio de las monedas
  useEffect(() => {
      if (moneda.length === 0) return; // Si no hay monedas, no hacer nada

      const nuevosCambios: PriceHistory[] = [];

      moneda.forEach((coin) => {
        const pAnterior = precioAnterior.current[coin.id];
        const pNuevo = coin.current_price;

        if (pAnterior !== undefined && pAnterior !== pNuevo) {
          nuevosCambios.push({
            coinId: coin.id,
            name: coin.name,
            oldPrice: pAnterior,
            newPrice: pNuevo,
            date: new Date().toLocaleTimeString(),
            type: pNuevo > pAnterior ? 'up' : 'down'
          });
        }
        precioAnterior.current[coin.id] = pNuevo;
    })
    if (nuevosCambios.length > 0) {
        setHistorial((prev) => {
          const actualizado = [...nuevosCambios, ...prev].slice(0, 50);
          return actualizado;
        })
      }
  }, [moneda]) //se ejecuta cada vez que cambia el estado de moneda


  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/inicio' replace  /> } />
        <Route path='/inicio' element={<><NavMoneda loading={loading} moneda={moneda} /> <ListMoneda moneda={moneda} loading={loading} /> </> } />
        <Route path="/moneda/:id" element={<Moneda historial={historial} moneda={moneda} loading={loading} setLoading={setLoading} /> } />
      </Routes>
    </div>
  )
}

export default App