import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalPagar } from "./helpers";

function App() {
  // Los states se declaran para valores que pueden o van a cambiar

  // const [Estado, funcionQueCambiaElEstado] = useState(ValorInicial)
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  // Se ejecuta por lo menos una vez y cada vez que cambie el valor del state que se le pase
  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);

    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  useEffect(() => {
    setPago(total / meses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // Variables normales si no van a cambiar durante el programa
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  // handle se le llama a una funcion relacionada con un onChange
  function handleChange(e) {
    // El + convierte el string a un numero
    setCantidad(+e.target.value);
  }

  function handleClickDecremento() {
    const valor = cantidad - STEP;

    if (valor < MIN) {
      alert(`El valor minimo es ${MIN}`);

      return;
    }

    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if (valor > MAX) {
      alert(`El valor maximo es ${MAX}`);

      return;
    }

    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />

      <div className="flex justify-between my-14">
        <Button operador="-" fn={handleClickDecremento} />
        <Button operador="+" fn={handleClickIncremento} />
      </div>

      <input
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-800"
        onChange={handleChange}
        max={MAX}
        min={MIN}
        step={STEP}
        value={cantidad}
      />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {formatearDinero(cantidad)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={meses}
        onChange={(e) => setMeses(+e.target.value)}
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen<span className="text-indigo-600">de pagos</span> a pagar
        </h2>

        <p className="text-gray-500 text-xl text-center font-bold">
          {meses} Meses
        </p>
        <p className="text-gray-500 text-xl text-center font-bold">
          {formatearDinero(total)} Total
        </p>
        <p className="text-gray-500 text-xl text-center font-bold">
          {formatearDinero(pago)} Mensual
        </p>
      </div>
    </div>
  );
}

export default App;
