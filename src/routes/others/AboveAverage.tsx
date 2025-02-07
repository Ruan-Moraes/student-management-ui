import { useEffect, useState } from 'react';

import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';

const AboveAverage = () => {
  const [students, setStudents] = useState<{ nome: string; media: number }[]>(
    []
  );
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const [averageResponse, studentsResponse] = await Promise.all([
          axiosInstance.get('/notas/media-todos-alunos'),
          axiosInstance.get('/notas/alunos-acima-media-turma'),
        ]);

        setAverage(averageResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        alert('Erro ao buscar dados');

        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDate();
  }, []);

  return (
    <Main>
      <div>
        <MainTitle title="Alunos acima da média da turma" />
        <div>
          <p className="text-sm">
            Média da turma:{' '}
            <span className="font-bold">{average?.toFixed(2)} Pontos</span>
          </p>
        </div>
        <div>
          {students.length > 0 && (
            <table className="min-w-full bg-white border border-gray-600 shadow-sm mt-4">
              <thead className="bg-blue-500 text-white border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Média</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-blue-100">
                    <td className="px-4 py-2 border border-gray-300 font-bold">
                      {student.nome}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {student.media?.toFixed(2)}
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

export default AboveAverage;
