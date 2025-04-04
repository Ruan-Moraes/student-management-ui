import { useEffect, useState } from 'react';

import axiosInstance from '../../helper/axios-instance';

import { StudentAverageResponseType } from '../../types/responses/StudentAverageResponseType';
import { AverageResponseType } from '../../types/responses/AverageResponseType';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';

const AboveAverage = () => {
  const [aboveAverageStudents, setAboveAverageStudents] = useState<
    StudentAverageResponseType[]
  >([]);

  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const [aboveAverageStudentsResponse, AverageResponseType] =
          await Promise.all([
            axiosInstance.get<StudentAverageResponseType[]>(
              '/grades/findAboveAverageStudents'
            ),
            axiosInstance.get<AverageResponseType>(
              '/grades/calculateAverageAllGrades'
            ),
          ]);

        setAverage(AverageResponseType.data.average);
        setAboveAverageStudents(aboveAverageStudentsResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);

        alert('Erro ao buscar dados');
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
            <span className="font-bold">
              {average?.toFixed(2).replace('.', ',')} Pontos
            </span>
          </p>
        </div>
        <div>
          {aboveAverageStudents.length > 0 && (
            <table className="min-w-full bg-white border border-gray-600 shadow-sm mt-4">
              <thead className="bg-blue-500 text-white border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Média</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {aboveAverageStudents.map((student, index) => (
                  <tr key={index} className="hover:bg-blue-100">
                    <td className="px-4 py-2 border border-gray-300 font-bold">
                      {student.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {student.average?.toFixed(2).replace('.', ',')} Pontos
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
