import { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import axiosInstance from '../../helper/axios-instance';

import { AverageForEachDiscipline } from '../../types/entities/AverageForEachDisciplineType';
import { AverageForEachDisciplineResponseType } from '../../types/responses/AverageForEachDisciplineResponseType';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';

const AvarageDiscipline = () => {
  const [averageForEachDiscipline, setAverageForEachDiscipline] =
    useState<AverageForEachDiscipline>();

  useEffect(() => {
    const fetchAveragePerDiscipline = async () => {
      try {
        const avarageForEachDisciplineResponse: AxiosResponse<AverageForEachDisciplineResponseType> =
          await axiosInstance.get('/grades/averageGradesByDiscipline');

        const AverageByDiscipline = new Map<string, number>(
          Object.entries(
            avarageForEachDisciplineResponse.data.averageByDiscipline
          )
        );

        setAverageForEachDiscipline(AverageByDiscipline);
      } catch (error) {
        console.error('Erro ao buscar média da turma:', error);

        alert('Erro ao buscar média da turma');
      }
    };

    fetchAveragePerDiscipline();
  }, []);

  return (
    <Main>
      <div>
        <MainTitle title="Média por disciplina" />
        <div>
          {averageForEachDiscipline && (
            <table className="min-w-full bg-white border border-gray-600 shadow-sm mt-4">
              <thead className="bg-blue-500 text-white border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Disciplina</th>
                  <th className="px-4 py-2 text-left">Média</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {Array.from(averageForEachDiscipline).map(
                  ([averageByDiscipline, average], index) => (
                    <tr key={index} className="hover:bg-blue-100">
                      <td className="px-4 py-2 border border-gray-300 font-bold">
                        {averageByDiscipline}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {average.toFixed(2).replace('.', ',')} Pontos
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Main>
  );
};

export default AvarageDiscipline;
