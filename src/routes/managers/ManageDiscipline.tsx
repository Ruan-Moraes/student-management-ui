import { useEffect, useState } from 'react';
import Main from '../../components/templates/Main';
import MainTitle from '../../components/titles/MainTitle';

interface Disciplina {
  id: number;
  nome: string;
}

const ManageStudents = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
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

    fetchDisciplinas();
  }, []);

  const handleName = async (id: number) => {
    const newNome = window.prompt('Digite o nome da disciplina');

    if (!newNome) {
      alert('Nome inválido');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/disciplinas/atualizar/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: newNome,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar nome');
      }

      alert('Nome atualizado com sucesso!');

      setDisciplinas((prev) =>
        prev.map((disciplina) =>
          disciplina.id === id ? { ...disciplina, nome: newNome } : disciplina
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar nome:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Deseja realmente deletar esta Disciplina?'
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/disciplinas/deletar/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao deletar disciplina');
      }

      setDisciplinas((prev) =>
        prev.filter((disciplina) => disciplina.id !== id)
      );
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  return (
    <Main>
      <MainTitle title="Gestão de Disciplinas" />
      <div className="grid gap-4">
        {disciplinas.map(({ id, nome }) => (
          <div
            key={id}
            className="bg-blue-100 p-4 rounded-lg flex justify-between items-center"
          >
            <div className="flex flex-col">
              <h2 className="font-bold">{nome}</h2>
              <p className="text-xs text-gray-500">ID: {id}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleName(id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded cursor-pointer"
              >
                Editar nome
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded cursor-pointer"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default ManageStudents;
