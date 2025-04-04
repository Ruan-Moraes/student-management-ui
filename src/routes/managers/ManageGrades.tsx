import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import { AxiosResponse } from 'axios';
import axiosInstance from '../../helper/axios-instance';

import { StudentType } from '../../types/entities/StudentType';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import CardsContainer from '../../components/containers/CardsContainer';
import GradesCard from '../../components/card/GradesCard';
import Button from '../../components/buttons/Button';

const ManageGrades = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
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
    const fetchData = async () => {
      try {
        const [studentsResponse, gradesResponse]: [
          AxiosResponse<StudentType[]>,
          AxiosResponse<any[]>
        ] = await Promise.all([
          axiosInstance.get('/alunos/listar'),
          axiosInstance.get('/notas/alunos'),
        ]);

        setStudents(studentsResponse.data);
        setGrades(gradesResponse.data);
      } catch (error) {
        alert('Erro ao buscar dados!');

        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleGrades = async (id: number, nome: string) => {
    try {
      const response = await axiosInstance.get(`/notas/alunos/${id}`);

      setGrades(response.data);
      setSelectedStudent({ id, nome });
      setIsModalOpen(true);
    } catch (error) {
      alert('Erro ao buscar notas do aluno!');

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
      await axiosInstance.put(`/notas/atualizar/${StudentId}/${disciplinaId}`, {
        aluno: students.find((student) => student.id === StudentId)?.name,
        disciplina: grades.find((grade) => grade.id === disciplinaId)
          ?.disciplina,
        valorNota: Number(value),
      });

      setGrades((prev) =>
        prev.map((grade) =>
          grade.id === id ? { ...grade, valorNota: value } : grade
        )
      );

      alert('Nota atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar nota!');

      console.error('Erro ao atualizar nota:', error);
    }
  };

  const handleGradeAverage = async (id: number, nome: string) => {
    try {
      const response = await axiosInstance.get(`/notas/media/${id}`);

      setAverage(response.data);
      setSelectedStudent({ id, nome });
      setIsAverageModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar média geral do aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Notas" />
      <CardsContainer>
        {students.map(({ id, name, frequency }) => (
          <GradesCard
            key={id}
            id={id}
            student={{
              name,
              frequency,
            }}
            handleGrades={handleGrades}
            handleGradeAverage={handleGradeAverage}
          />
        ))}
      </CardsContainer>

      {isModalOpen && selectedStudent && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center mx-4"
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
                    <Button
                      className="bg-blue-500 hover:bg-blue-700"
                      handleClick={() => {
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
                      label="Editar"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-4 bg-red-500 hover:bg-red-700"
              handleClick={() => setIsModalOpen(false)}
              label="Fechar"
            />
          </DialogPanel>
        </Dialog>
      )}
      {isAverageModalOpen && selectedStudent && (
        <Dialog
          open={isAverageModalOpen}
          onClose={() => setIsAverageModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center mx-4"
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
                {typeof average === 'number' ? average.toFixed(2) : 'N/A'}
              </p>
            </div>
            <Button
              className="mt-4 bg-red-500 hover:bg-red-700"
              handleClick={() => setIsAverageModalOpen(false)}
              label="Fechar"
            />
          </DialogPanel>
        </Dialog>
      )}
    </Main>
  );
};

export default ManageGrades;
