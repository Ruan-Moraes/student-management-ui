import { useState } from 'react';

import Main from '../components/templates/Main';
import MainTitle from '../titles/MainTitle';

interface Frequency {
  id: number;
  nome: string;
  percentualFrequencia: number;
}

const Frequency = () => {
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [cutoffValue, setCutoffValue] = useState(75);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/alunos/buscar/frequencia/${cutoffValue}`
      );
      const data = await response.json();

      setFrequencies(data);
    } catch (error) {
      console.error('Erro ao buscar frequências:', error);
    }
  };

  return (
    <Main>
      <MainTitle
        title={`Alunos
            com a frequência abaixo de ${cutoffValue}
        `}
      />
      <div>
        <form className="flex-col flex gap-4">
          <input
            type="number"
            onChange={(e) => setCutoffValue(Number(e.target.value))}
            placeholder="Digite o valor de corte"
            className="p-2 rounded-lg border border-gray-200"
          />
          <input
            type="submit"
            value="Buscar"
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSubmit}
          />
        </form>
      </div>
      <div>
        {frequencies.length > 0 &&
          frequencies.map(({ id, nome, percentualFrequencia }) => (
            <div
              key={id}
              className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200"
            >
              <div className="flex flex-col gap-2 justify-between h-full">
                <p className="text-xs text-gray-500">ID: {id}</p>

                <div className="mt-2">
                  <p className="font-semibold text-lg text-gray-800">{nome}</p>
                  <p className="text-sm text-gray-500">
                    Frequência: {percentualFrequencia}%
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Main>
  );
};

export default Frequency;
