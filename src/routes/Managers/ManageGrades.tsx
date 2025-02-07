import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import Main from '../../components/templates/Main';
import MainTitle from '../../titles/MainTitle';

const ManageGrades = () => {
  const [students, setStudents] = useState<
    { id: number; nome: string; percentualFrequencia: number }[]
  >([]);
  const [grades, setGrades] = useState<
    {
      id: number;
      matricula: number;
      aluno: string;
      disciplina: string;
      valorNota: number;
    }[]
  >([]);
  const [average, setAverage] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAverageModalOpen, setIsAverageModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    nome: string;
  } | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/alunos/listar');
        const data = await response.json();

        setStudents(data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleGrades = async (id: number, nome: string) => {
    try {
      const response = await fetch(`http://localhost:8080/notas/aluno/${id}`);

      if (!response.ok) {
        alert('Erro ao buscar notas do aluno!');

        return;
      }

      const data = await response.json();

      setGrades(data);
      setSelectedStudent({ id, nome });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar notas do aluno:', error);
    }
  };

  const handleSaveGrade = async (
    id: number,
    StudentId: number,
    disciplinaId: number,
    value: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/notas/atualizar/${StudentId}/${disciplinaId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            aluno: students.find((student) => student.id === StudentId)?.nome,
            disciplina: grades.find((grade) => grade.id === disciplinaId)
              ?.disciplina,
            valorNota: Number(value),
          }),
        }
      );

      if (!response.ok) {
        alert('Erro ao atualizar nota!');

        return;
      }

      setGrades((prev) =>
        prev.map((grade) => {
          if (grade.id === id) {
            return { ...grade, valorNota: value };
          }

          return grade;
        })
      );

      alert('Nota atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
    }
  };

  const handleGradeAverage = async (id: number, nome: string) => {
    try {
      const response = await await fetch(
        `http://localhost:8080/notas/aluno/${id}`
      );

      if (!response.ok) {
        alert('Erro ao buscar média geral do aluno!');
        return;
      }

      const data = await response.json();

      const sum = data.reduce(
        (
          acc: number,
          curr: {
            valorNota: number;
          }
        ) => {
          return acc + curr.valorNota;
        },
        0
      );

      setAverage(sum / data.length);
      setSelectedStudent({ id, nome });
      setIsAverageModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar média geral do aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Notas" />
      <div className="grid gap-4">
        {students.map(({ id, nome, percentualFrequencia }) => (
          <div
            key={id}
            className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="mt-8">
                <p className="text-lg text-gray-800 font-bold">{nome}</p>
                <p className="text-sm text-gray-500">
                  Frequência: {percentualFrequencia}%
                </p>
              </div>
              <p className="text-xs text-gray-500">ID: {id}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleGrades(id, nome)}
              >
                Editar Notas
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleGradeAverage(id, nome)}
              >
                Média Geral
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedStudent && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            aria-hidden="true"
          />
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-96 z-10">
            <DialogTitle className="text-xl font-bold mb-4">
              Notas do(a) aluno(a): {selectedStudent.nome}
            </DialogTitle>
            <div className="space-y-2">
              {grades.map(({ id, matricula, disciplina, valorNota }) => (
                <div key={id} className="flex justify-between">
                  <p>{disciplina}</p>
                  <div className="flex gap-2">
                    <p className="bg-gray-200 text-gray-800 font-semibold py-1 px-4 rounded">
                      {valorNota}
                    </p>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => {
                        const value = prompt(
                          `Digite a nova nota para a disciplina ${disciplina}`
                        );

                        if (value !== null) {
                          let numericValue = Number(value);

                          if (numericValue < 0) {
                            numericValue = 0;
                          }

                          if (numericValue > 10) {
                            numericValue = 10;
                          }

                          handleSaveGrade(
                            id,
                            selectedStudent.id,
                            matricula,
                            numericValue
                          );
                        }
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </button>
          </DialogPanel>
        </Dialog>
      )}
      {isAverageModalOpen && selectedStudent && (
        <Dialog
          open={isAverageModalOpen}
          onClose={() => setIsAverageModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            aria-hidden="true"
          />
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-96 z-10">
            <DialogTitle className="text-xl font-bold mb-4">
              Média Geral do(a) aluno(a): {selectedStudent.nome}
            </DialogTitle>
            <div className="flex justify-center">
              <p className="text-3xl font-bold text-blue-600 bg-blue-50 py-2 px-8 rounded-sm">
                {average?.toFixed(2)}
              </p>
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsAverageModalOpen(false)}
            >
              Fechar
            </button>
          </DialogPanel>
        </Dialog>
      )}
    </Main>
  );
};

export default ManageGrades;
