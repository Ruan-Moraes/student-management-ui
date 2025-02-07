import { useEffect, useState } from 'react';
import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';

interface DisciplineAverage {
  id: number;
  nome: string;
  media: number;
}

const AvarageDiscipline = () => {
  const [listAveragse, setListAverages] = useState<DisciplineAverage[]>([]);

  useEffect(() => {
    const fetchAveragePerDiscipline = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/notas/media-todos-alunos-disciplina/'
        );

        const data: DisciplineAverage[] = await response.json();

        setListAverages(data);
      } catch (error) {
        console.error('Erro ao buscar média da turma:', error);
      }
    };

    fetchAveragePerDiscipline();
  }, []);

  return (
    <Main>
      <div>
        <MainTitle title="Média por disciplina" />
        <div>
          {listAveragse.length > 0 && (
            <table className="min-w-full bg-white border border-gray-600 shadow-sm mt-4">
              <thead className="bg-blue-500 text-white border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Disciplina</th>
                  <th className="px-4 py-2 text-left">Média</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {listAveragse.map((average) => (
                  <tr key={average.id} className="hover:bg-blue-100">
                    <td className="px-4 py-2 border border-gray-300 font-bold">
                      {average.nome}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {average.media?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Main>
  );
};

export default AvarageDiscipline;
