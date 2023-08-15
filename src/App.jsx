import { useState } from "react";
import Cardnumber from "./components/Cardnumber";

function App() {
  const [qtdNumeros, setQtdNumeros] = useState(6);
  const [valorFaixa, setValorRange] = useState(60);
  const [arrNumeros, setArrNumeros] = useState([]);
  const [showCopy, setShowCopy] = useState(false);
  const [sortNumbers, setSortNumbers] = useState(true);

  const validaEntrada = () => {
    Number(valorFaixa) > Number(qtdNumeros)
      ? sortear()
      : alert(
          "A faixa de números deve ser maior que a quantidade de números escolhidos!"
        );
  };

  const validaFaixaMax = (valorFaixaMax) => {
    valorFaixaMax <= 100
      ? setValorRange(valorFaixaMax)
      : alert("Valor max é 100!");
  };

  const validaQtdMax = (valorQtdMax) => {
    valorQtdMax < 100 ? setQtdNumeros(valorQtdMax) : alert("Valor max é 99!");
  };

  const gerarNumero = () => {
    return Math.floor(Math.random() * valorFaixa) + 1;
  };

  const sortear = () => {
    let arrGerado = [];
    let i = 0;

    while (i < qtdNumeros) {
      const numero = gerarNumero();

      if (numero > 0 && !arrGerado.includes(numero)) {
        arrGerado.push(numero);
        i++;
      }
    }

    sortNumbers
      ? setArrNumeros(arrGerado.sort((a, b) => a - b))
      : setArrNumeros(arrGerado);

    navigator.userAgent.toLocaleLowerCase().includes("android") ||
    navigator.userAgent.toLocaleLowerCase().includes("iphone")
      ? setShowCopy(false)
      : setShowCopy(true);

    navigator.vibrate(200);
  };

  const botaoCopy = () => {
    navigator.clipboard
      .writeText(arrNumeros)
      .then(alert(`Copiado! ${arrNumeros}`));
  };

  return (
    <div className="bg-gray-800 w-full h-screen text-white font-sans  flex flex-1 flex-col justify-center items-center gap-5">
      <h1 className="text-3xl text-green-600 font-bold ">Números da Sorte</h1>
      <div>
        <p className="text-xl">
          Quantos números ?
          <input
            className="bg-gray-800 p-2 w-16 font-bold border rounded ml-2 focus:outline-green-600 text-green-600"
            value={qtdNumeros}
            min={1}
            max={60}
            type="number"
            onChange={(event) => validaQtdMax(Number(event.target.value))}
          />
        </p>
      </div>
      <div>
        <p className="text-xl">
          Faixa de números: <span className="font-bold">1</span> até{" "}
          <input
            className="bg-gray-800 p-2 w-16 font-bold border ml-2 rounded focus:outline-green-600 text-green-600"
            min={2}
            max={100}
            value={valorFaixa}
            onChange={(event) => validaFaixaMax(Number(event.target.value))}
            type="number"
          />
        </p>
      </div>
      <button
        className="border rounded p-2 self-center bg-green-600 hover:bg-green-500 active:scale-125 ease-linear duration-100"
        onClick={validaEntrada}
      >
        Gerar
      </button>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={() => setSortNumbers(!sortNumbers)}
          type="checkbox"
          defaultChecked
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Ordenar sequência?
        </span>
      </label>

      <div>
        {arrNumeros &&
          arrNumeros.map((numero, index) => (
            <Cardnumber key={index} num={numero} />
          ))}
      </div>
      {showCopy && (
        <button
          className="border rounded p-2 self-center bg-green-600 hover:bg-green-500 active:scale-125 ease-linear duration-100"
          onClick={botaoCopy}
        >
          Copiar sequência
        </button>
      )}
      <a
        className="mt-4"
        href="https://github.com/okida-rafael"
        target="_blank"
      >
        <img className="w-10" src="/github.png" alt="Rafael Okida" />
      </a>
    </div>
  );
}

export default App;
