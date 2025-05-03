import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import { AxiosResponse } from 'axios';
import axiosInstance from '../../helper/axios-instance';

import { StudentType } from '../../types/entities/StudentType';
import { GradesType } from '../../types/entities/GradesType';
import { DisciplineType } from '../../types/entities/DisciplineType';

import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';
import CardsContainer from '../../components/containers/CardsContainer';
import GradesCard from '../../components/card/GradesCard';
import Button from '../../components/buttons/Button';

const ManageGrades = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [grades, setGrades] = useState<GradesType>();
  const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);

  const [average, setAverage] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAverageModalOpen, setIsAverageModalOpen] = useState<boolean>(false);

  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, gradesResponse, disciplinesResponse]: [
          AxiosResponse<StudentType[]>,
          AxiosResponse<GradesType>,
          AxiosResponse<DisciplineType[]>
        ] = await Promise.all([
          axiosInstance.get('/students'),
          axiosInstance.get('/grades'),
          axiosInstance.get('/disciplines'),
        ]);

        setStudents(studentsResponse.data);
        setGrades(gradesResponse.data);
        setDisciplines(disciplinesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);

        alert('Erro ao buscar dados!');
      }
    };

    fetchData();
  }, []);

  const handleGrades = async (id: number, name: string) => {
    try {
      const response = await axiosInstance.get(
        `/grades/findAllGradesByStudentId/${id}`
      );

      setGrades(response.data);
      setSelectedStudent({ id, name });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar notas do aluno:', error);

      alert('Erro ao buscar notas do aluno!');
    }
  };

  const handleSaveGrade = async (
    studentId: number,
    disciplineId: number,
    gradeValue: number
  ) => {
    try {
      await axiosInstance.put(
        `/grades?studentId=${studentId}&disciplineId=${disciplineId}`,
        {
          gradeValue: Number(gradeValue),
        }
      );

      setGrades((prevGrades) => {
        if (!prevGrades) {
          return prevGrades;
        }

        const disciplineName = disciplines.find(
          (discipline) => discipline.id === disciplineId
        )?.name;

        if (grades?.grades && disciplineName) {
          if (disciplineName in grades.grades) {
            (grades.grades as unknown as Record<string, number>)[
              disciplineName
            ] = gradeValue;
          }
        }

        return {
          ...prevGrades,
          grades: {
            ...prevGrades.grades,
            [disciplineName as string]: gradeValue,
          },
        };
      });

      alert('Nota atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);

      alert('Erro ao atualizar nota!');
    }
  };

  const handleGradeAverage = async (id: number, name: string) => {
    try {
      const response = await axiosInstance.get(
        `/grades/findAverageStudentById/${id}`
      );

      setAverage(response.data.average);
      setSelectedStudent({ id, name });
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
              Notas do(a) aluno(a): {selectedStudent.name}
            </DialogTitle>
            <div className="space-y-2">
              {Array.from(
                grades?.grades ? Object.entries(grades.grades) : []
              ).map(([disciplineName, gradeValue], index) => (
                <div key={index} className="flex justify-between">
                  <p>{disciplineName}</p>
                  <div className="flex gap-2">
                    <p className="bg-gray-200 text-gray-800 font-semibold py-1 px-4 rounded">
                      {gradeValue}
                    </p>
                    <Button
                      className="bg-blue-500 hover:bg-blue-700"
                      handleClick={() => {
                        const value = prompt(
                          `Digite a nova nota para a disciplina ${disciplineName}`
                        );

                        if (value !== null) {
                          let numericValue = Number(value);

                          if (numericValue < 0) {
                            numericValue = 0;
                          }

                          if (numericValue > 10) {
                            numericValue = 10;
                          }

                          const disciplineId = disciplines.find(
                            (discipline) => discipline.name === disciplineName
                          )?.id;

                          if (!disciplineId) {
                            alert('Disciplina não encontrada!');

                            return;
                          }

                          handleSaveGrade(
                            selectedStudent.id,
                            disciplineId,
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
              Média Geral do(a) aluno(a): {selectedStudent.name}
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
