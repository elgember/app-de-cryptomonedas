import { useEffect, useState } from "react"
import { NavMoneda } from './Component/NavMoneda';
import { ListMoneda } from './Component/ListMoneda';
import { Navigate, Route, Routes } from "react-router-dom";
import { Coin } from './Types/Coin';


function App() {

  const [moneda, setMoneda] = useState<Coin[]>([]);

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10');

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
  }, []); //array vacio solo ejecuta al montar componente

  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/inicio' replace  /> } />
        <Route path='/inicio' element={<><NavMoneda loading={loading} moneda={moneda} /> <ListMoneda moneda={moneda} loading={loading} /> </> } />
      </Routes>
    </div>
  )
}

export default App