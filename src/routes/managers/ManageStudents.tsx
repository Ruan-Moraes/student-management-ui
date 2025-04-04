import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../../helper/axios-instance';

import { StudentType } from '../../types/entities/StudentType';
import { DisciplineType } from '../../types/entities/DisciplineType';

import Main from '../../components/templates/Main';

import MainTitle from '../../components/titles/MainTitle';
import CardsContainer from '../../components/containers/CardsContainer';
import StudentCard from '../../components/card/StudentCard';
import Button from '../../components/buttons/Button';

const ManageStudents = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
    null
  );

  const openModal = (id: number) => {
    const student = students.find((student) => student.id === id) || null;

    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, disciplinesResponse]: [
          AxiosResponse<StudentType[]>,
          AxiosResponse<DisciplineType[]>
        ] = await Promise.all([
          axiosInstance.get('/students'),
          axiosInstance.get('/disciplines'),
        ]);

        setStudents(studentsResponse.data);
        setDisciplines(disciplinesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);

        alert('Erro ao buscar dados');
      }
    };

    fetchData();
  }, []);

  const handleRegister = async (disciplineId: number, studentId: number) => {
    try {
      await axiosInstance.post('/enrollments', {
        studentId: studentId,
        disciplineId: disciplineId,
      });

      alert('Aluno matriculado com sucesso!');
    } catch (error) {
      console.error('Erro ao matricular aluno:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert('Aluno já matriculado nesta disciplina');
        }

        if (error.response?.status === 404) {
          alert('Aluno ou disciplina não encontrados');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao matricular aluno');
      }
    }
  };

  const handleFrequency = async (id: number) => {
    const newFrequency = window.prompt('Digite a frequência do aluno:');

    if (!newFrequency || isNaN(Number(newFrequency))) {
      alert('Frequência inválida');

      return;
    }

    try {
      await axiosInstance.put(`/students/${id}`, {
        name: students.find((student) => student.id === id)?.name,
        frequency: Number(newFrequency),
      });

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? { ...student, frequency: Number(newFrequency) }
            : student
        )
      );

      alert('Frequência atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar frequência:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert('Aluno não encontrado');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao atualizar frequência');
      }
    }
  };

  const handleName = async (id: number) => {
    const newNome = window.prompt('Digite o novo nome do aluno:');

    if (
      !newNome ||
      newNome.trim() === '' ||
      newNome.length < 3 ||
      newNome.length > 100
    ) {
      alert('Nome inválido');

      return;
    }

    try {
      await axiosInstance.put(`/students/${id}`, {
        name: newNome,
        frequency: students.find((student) => student.id === id)?.frequency,
      });

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, name: newNome } : student
        )
      );

      alert('Nome atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nome:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert('Aluno não encontrado');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao atualizar nome');
      }
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('Deseja realmente deletar este aluno?');

    if (!isConfirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`/students/${id}`);

      setStudents((prev) => prev.filter((student) => student.id !== id));

      alert('Aluno deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert('Aluno não encontrado');
        }
      }

      if (!axios.isAxiosError(error)) {
        alert('Erro ao deletar aluno');
      }
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Alunos" />
      <CardsContainer>
        {students.map(({ id, name, frequency }) => (
          <StudentCard
            key={id}
            id={id}
            student={{
              name,
              frequency,
            }}
            openModal={openModal}
            handleFrequency={handleFrequency}
            handleName={handleName}
            handleDelete={handleDelete}
          />
        ))}
      </CardsContainer>
      <div>
        <p className="text-xs">
          Não se esqueça de colocar as notas dos alunos, você pode fazer isso
          clicando
          <Link to="/notas/gerenciar" className="text-blue-500">
            <span className="text-blue-500"> aqui</span>
          </Link>
        </p>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center mx-4"
      >
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          aria-hidden="true"
        />
        <DialogPanel className="bg-white p-4 rounded-lg shadow-lg w-96 z-20 flex flex-col gap-4">
          <DialogTitle className="text-xl font-bold">
            Matricular aluno(a): {selectedStudent?.name}
          </DialogTitle>
          <div>
            {disciplines.map(({ id, name }, index) => (
              <div
                key={id}
                className={`flex justify-between items-center py-2 ${
                  index === 0 ? '' : 'border-t border-gray-200'
                }`}
              >
                <h3 className="flex flex-col">
                  <span>
                    Disciplina: <span className="font-bold">{name}</span>
                  </span>
                  <span className="text-xs text-gray-500">Id: {id}</span>
                </h3>
                <Button
                  label="Matricular"
                  handleClick={() =>
                    selectedStudent && handleRegister(id, selectedStudent.id)
                  }
                  className="bg-green-500 hover:bg-green-700"
                />
              </div>
            ))}
          </div>
          <div>
            <Button
              label="Fechar"
              handleClick={() => setIsModalOpen(false)}
              className="bg-red-500 hover:bg-red-700"
            />
          </div>
        </DialogPanel>
      </Dialog>
    </Main>
  );
};

export default ManageStudents;
