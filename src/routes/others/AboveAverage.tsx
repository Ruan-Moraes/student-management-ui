import { useEffect, useState } from 'react';

import Main from '../../components/templates/Main';
import MainTitle from '../../titles/MainTitle';

const AboveAverage = () => {
  const [students, setStudents] = useState<{ nome: string; media: number }[]>(
    []
  );
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/notas/media-todos-alunos'
        );

        const data = await response.json();

        setAverage(data);
      } catch (error) {
        console.error('Erro ao buscar média da turma:', error);
      }
    };

    const fetchStudentsAboveAverage = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/notas/alunos-acima-media-turma'
        );
        const data = await response.json();

        setStudents(data);
      } catch (error) {
        console.error('Erro ao buscar alunos acima da média:', error);
      }
    };

    fetchAverage();
    fetchStudentsAboveAverage();
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
                      {student.media}
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
