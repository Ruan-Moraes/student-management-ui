import { useEffect, useState } from 'react';
import Main from '../../components/templates/Main';
import MainTitle from '../../titles/MainTitle';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface Student {
  id: number;
  nome: string;
  percentualFrequencia: number;
}

interface Disciplina {
  id: number;
  nome: string;
}

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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

    const fetchDisciplinas = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/disciplinas/listar'
        );
        const data = await response.json();
        setDisciplinas(data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchStudents();
    fetchDisciplinas();
  }, []);

  const openModal = (id: number) => {
    const student = students.find((student) => student.id === id) || null;
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleRegister = async (disciplinaId: number, studentId: number) => {
    try {
      const response = await fetch('http://localhost:8080/matriculas/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aluno: { id: studentId },
          disciplina: { id: disciplinaId },
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao matricular aluno');
      }

      alert('Aluno matriculado com sucesso!');
    } catch (error) {
      // Todo: Resolve na API

      alert('Aluno já matriculado nesta disciplina');

      console.warn('Erro ao matricular aluno:', error);

      console.clear();
    }
  };

  const handleFrequency = async (id: number) => {
    const newFrequency = window.prompt('Digite a frequência do aluno:');

    if (!newFrequency || isNaN(Number(newFrequency))) {
      alert('Frequência inválida');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/alunos/atualizar/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: students.find((student) => student.id === id)?.nome,
            percentualFrequencia: Number(newFrequency),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar frequência');
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? { ...student, percentualFrequencia: Number(newFrequency) }
            : student
        )
      );

      alert('Frequência atualizada com sucesso!');
    } catch (error) {
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
      const response = await fetch(
        `http://localhost:8080/alunos/atualizar/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: newNome,
            percentualFrequencia: students.find((student) => student.id === id)
              ?.percentualFrequencia,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar nome');
      }

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
      const response = await fetch(
        `http://localhost:8080/alunos/deletar/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao deletar aluno');
      }

      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Alunos" />
      <div className="grid gap-4">
        {students.map(({ id, nome, percentualFrequencia }) => (
          <div
            key={id}
            className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="mt-8">
                <h2 className="text-lg text-gray-800 font-bold">{nome}</h2>
                <p className="text-sm text-gray-500">
                  Frequência: {percentualFrequencia}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ID: {id}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="px-3 py-1 bg-green-400 text-white rounded-lg hover:bg-green-500 text-sm cursor-pointer"
                onClick={() => openModal(id)}
              >
                Matricular
              </button>
              <button
                className="px-3 py-1 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 text-sm cursor-pointer"
                onClick={() => handleFrequency(id)}
              >
                Alterar Frequência
              </button>
              <button
                className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 text-sm cursor-pointer"
                onClick={() => handleName(id)}
              >
                Alterar Nome
              </button>
              <button
                className="px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-500 text-sm cursor-pointer"
                onClick={() => handleDelete(id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          aria-hidden="true"
        />
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-96 z-10">
          <DialogTitle className="text-xl font-bold mb-4">
            Matricular aluno(a): {selectedStudent?.nome}
          </DialogTitle>
          <div className="space-y-2">
            {disciplinas.map(({ id, nome }) => (
              <div key={id} className="flex justify-between items-center">
                <p>{nome}</p>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    selectedStudent && handleRegister(id, selectedStudent.id)
                  }
                >
                  Matricular
                </button>
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
    </Main>
  );
};

export default ManageStudents;
