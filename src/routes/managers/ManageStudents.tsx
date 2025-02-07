import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from 'react-router-dom';

import axiosInstance from '../../helper/axios-instance';

import Main from '../../components/templates/Main';

import MainTitle from '../../components/titles/MainTitle';
import CardsContainer from '../../components/containers/CardsContainer';
import StudentCard from '../../components/card/StudentCard';
import Button from '../../components/buttons/Button';

type Student = {
  id: number;
  nome: string;
  percentualFrequencia: number;
};

type Disciplina = {
  id: number;
  nome: string;
};

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const openModal = (id: number) => {
    const student = students.find((student) => student.id === id) || null;

    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, disciplinasResponse] = await Promise.all([
          axiosInstance.get('/alunos/listar'),
          axiosInstance.get('/disciplinas/listar'),
        ]);

        setStudents(studentsResponse.data);
        setDisciplinas(disciplinasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegister = async (disciplinaId: number, studentId: number) => {
    try {
      await axiosInstance.post('/matriculas/criar', {
        aluno: { id: studentId },
        disciplina: { id: disciplinaId },
      });

      alert('Aluno matriculado com sucesso!');
    } catch (error) {
      // Todo: Resolver retorno da API

      alert('Erro ao matricular aluno');

      console.error('+ADSASDAD' + error);
    }
  };

  const handleFrequency = async (id: number) => {
    const newFrequency = window.prompt('Digite a frequência do aluno:');

    if (!newFrequency || isNaN(Number(newFrequency))) {
      alert('Frequência inválida');

      return;
    }

    try {
      await axiosInstance.put(`/alunos/atualizar/${id}`, {
        nome: students.find((student) => student.id === id)?.nome,
        percentualFrequencia: Number(newFrequency),
      });

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? { ...student, percentualFrequencia: Number(newFrequency) }
            : student
        )
      );

      alert('Frequência atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar frequência');

      console.error('Erro ao atualizar frequência:', error);
    }
  };

  const handleName = async (id: number) => {
    const newNome = window.prompt('Digite o novo nome do aluno:');

    if (!newNome) {
      alert('Nome inválido');

      return;
    }

    try {
      await axiosInstance.put(`/alunos/atualizar/${id}`, {
        nome: newNome,
        percentualFrequencia: students.find((student) => student.id === id)
          ?.percentualFrequencia,
      });

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, nome: newNome } : student
        )
      );

      alert('Nome atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nome:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('Deseja realmente deletar este aluno?');

    if (!isConfirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`/alunos/deletar/${id}`);

      setStudents((prev) => prev.filter((student) => student.id !== id));

      alert('Aluno deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Alunos" />
      <CardsContainer>
        {students.map(({ id, nome, percentualFrequencia }) => (
          <StudentCard
            key={id}
            id={id}
            nome={nome}
            percentualFrequencia={percentualFrequencia}
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
            Matricular aluno(a): {selectedStudent?.nome}
          </DialogTitle>
          <div>
            {disciplinas.map(({ id, nome }, index) => (
              <div
                key={id}
                className={`flex justify-between items-center py-2 ${
                  index === 0 ? '' : 'border-t border-gray-200'
                }`}
              >
                <h3 className="flex flex-col">
                  <span>
                    Disciplina: <span className="font-bold">{nome}</span>
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
